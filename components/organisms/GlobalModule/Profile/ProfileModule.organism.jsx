import React, { useState } from "react";
import { endsWith } from "lodash";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

import { SCProfileModule } from "./ProfileModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import Button from "../../../atoms/Button/Button.atom";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { AdminProfile } from "./Role/AdminProfile.organism";
import { ClientProfile } from "./Role/ClientProfile.organism";
import { CompanyProfile } from "./Role/CompanyProfile.organism";
import { ManagerProfile } from "./Role/ManagerProfile.organism";
import { UnsubscriptionModal } from "../../Modal/ContractModal/UnsubscriptionModal/UnsubscriptionModal.organism";

import { deleteAccount, updateAccount } from "../../../../lib/api/account";

import { useAuth } from "../../../../context";

export const ProfileModule = ({ user, setOpenInfoModal, openInfoModal }) => {
  const [haveChange, setHaveChange] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [openUnsubscriptionModal, setOpenUnsubscriptionModal] = useState(false);

  const router = useRouter();
  const { logout } = useAuth();

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const handleUpdateAccount = async (data) => {
    let email = "";
    let phoneNumber = "";

    Object.keys(data).forEach((element) => {
      if (endsWith(element, "email")) {
        email = data[element];
      }
      if (endsWith(element, "phone")) {
        phoneNumber = data[element];
      }
    });

    const updatedUser = {
      account: {
        email: email != "" ? email : user.Email,
        phoneNumber: phoneNumber != "" ? phoneNumber : user.phoneNumber,
      },
    };

    const response = await updateAccount(
      user.roleCode,
      user.UserId,
      updatedUser
    );

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      const newOpenInfoModal = { ...openInfoModal };
      newOpenInfoModal["open"] = true;
      newOpenInfoModal["message"] =
        "Hemos recibido tu solicitud de actualización.";
      setOpenInfoModal(newOpenInfoModal);
    }

    setHaveChange(false);

    setTimeout(() => {
      setErrorMessage();
    }, 5000);
  };

  const handleDeleteUser = async () => {
    await deleteAccount(user.roleCode, user.UserId);
    logout();
    router.push("/login-cliente");
  };

  return (
    <>
      {openUnsubscriptionModal && (
        <UnsubscriptionModal
          closeAction={() => setOpenUnsubscriptionModal(false)}
          action={() => handleDeleteUser()}
          message="¿Estás seguro que quieres dar de baja tu cuenta de usuario?"
        />
      )}
      <SCProfileModule>
        <div className="data-wrapper">
          <SCTextXL color="primary">Mis Datos:</SCTextXL>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleUpdateAccount)}>
              {user.roleCode == 1 ? (
                <AdminProfile data={user} setHaveChange={setHaveChange} />
              ) : user.roleCode == 2 ? (
                <ManagerProfile data={user} />
              ) : (
                <>
                  {user?.LegalName != "" ? (
                    <CompanyProfile data={user} setHaveChange={setHaveChange} />
                  ) : (
                    <ClientProfile data={user} setHaveChange={setHaveChange} />
                  )}
                </>
              )}

              <div className="action-wrapper">
                <div>
                  <Button type="submit" disabled={!haveChange}>
                    Guardar cambios
                  </Button>

                  {errorMessage && (
                    <SCTextSLight className="info-message" color="red">
                      {errorMessage}
                    </SCTextSLight>
                  )}
                </div>

                <div className="selected-wrapper">
                  <ButtonSelect
                    color="primary"
                    action={() => router.push("/pass-cambiar")}
                  >
                    Cambiar contraseña
                  </ButtonSelect>

                  {user.roleCode == 3 && (
                    <ButtonSelect
                      checked={openUnsubscriptionModal}
                      color="red"
                      action={() => setOpenUnsubscriptionModal(true)}
                    >
                      Dar de baja
                    </ButtonSelect>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </SCProfileModule>
    </>
  );
};

// const [fullContractData] = useState(contracts);
// const [contractData, setContractData] = useState(contracts);

// const filterAttributes = (element) => {
//   const contract = pick(element, [
//     "ContractCode",
//     "Address",
//     "InitDate",
//     "FinalDate",
//     "Payer",
//     "CUPS",
//     "State",
//   ]);

//   contract.State = contract.State ? "Activo" : "Inactivo";

//   return contract;
// };

// const handleOnClikContract = (contractId) => {
//   optionsList("contract", {
//     contractId,
//     contractList: fullContractData,
//   });
// };

// const handleSearchContract = (value) => {
//   if (value == "") {
//     setContractData(fullContractData);
//   } else {
//     const newContractData = findContractsByAtttribute(
//       fullContractData,
//       "Address",
//       value
//     );

//     setContractData(newContractData);
//   }
// };

// const handleAddDoc = () => {
//   router.push("/alta");
// };

/* {user.roleCode == 1 || (
        <div className="data-wrapper">
          <div className="title-contract-wrapper">
            <SCTextXL color="black">Contratos:</SCTextXL>
            <div className="icons-wrapper">
              <Search action={handleSearchContract} />
              <ButtonIcon action={handleAddDoc} icon={<AddDocIcon />}>
                Añadir contrato
              </ButtonIcon>
            </div>
          </div>

          <div className="contract-wrapper">
            {isEmpty(contractData) ? (
              <div className="contract-empty-wrapper">
                <SCTextSLight color="black">
                  No tienes contratos asociados
                </SCTextSLight>
              </div>
            ) : (
              <div className="list-contract-wrapper">
                {contractData.map((element, index) => (
                  <ItemContractList
                    key={index}
                    withOutCheck
                    data={filterAttributes(element)}
                    action={() => handleOnClikContract(element?.ContractCode)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
*/

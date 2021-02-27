import React, { useEffect, useState } from "react";
import { endsWith, isEmpty, uniqBy } from "lodash";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

import { SCAddUserModule } from "./AddUserModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { SingleDropdown } from "../../../molecules/Dropdown/Single/SingleDropdown.molecule";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { InputText } from "../../../atoms/Input/Input.atom";
import Button from "../../../atoms/Button/Button.atom";
import { Search } from "../../../atoms/Search/Search.atom";
import { ItemClient } from "../../../molecules/ItemClient/ItemClient.molecule";
import { SCSpinner } from "../../../atoms/Spinner/Spinner.styled";
import { UnsubscriptionModal } from "../../Modal/ContractModal/UnsubscriptionModal/UnsubscriptionModal.organism";
import { InfoModal } from "../../Modal/InfoModal/InfoModal.organism";

import CloseIcon from "../../../../public/icon/close_icon.svg";

import {
  deleteAccount,
  updateAccount,
  createAccount,
} from "../../../../lib/api/account";
import { getAccounts, getAccount } from "../../../../lib/api/account";

export const AddUserModule = ({ clientData, user, optionsList }) => {
  const [haveChange, setHaveChange] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [openRole, setOpenRole] = useState({
    role_2: false,
    role_3: false,
  });
  const [openCloseIcon, setOpenCloseIcon] = useState({
    role_2: false,
    role_3: false,
  });
  const [selectRoles, _] = useState(["Cliente", "Gestor", "Administrador"]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [clientDataList, setClientDataList] = useState([]);
  const [fullClientDataList, setFullClientDataList] = useState([]);
  const [clientDetail, setClientDetail] = useState({});
  const [openUnsubscriptionModal, setOpenUnsubscriptionModal] = useState({
    clientId: null,
    open: false,
  });
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [visibleActionButton, setVisibleActionButton] = useState(false);
  const [openInfoUpdateModal, setOpenInfoUpdateModal] = useState({
    message: null,
    open: false,
  });

  const router = useRouter();

  const { getValues } = useForm();

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const handleActionAccount = (data) => {
    if (isEmpty(clientDetail)) {
      handleCreateUser(data);
    } else {
      handleUpdateAccount(data);
    }
  };

  const handleUpdateAccount = async (data) => {
    let email = "";

    Object.keys(data).forEach((element) => {
      if (endsWith(element, "email")) {
        email = data[element];
      }
    });

    const updatedUser = {
      account: {
        email: email != "" ? email : user.Email,
      },
    };

    const response = await updateAccount(
      user.roleCode,
      user.UserId,
      updatedUser
    );

    if (response?.error) {
      setOpenInfoUpdateModal({
        open: true,
        message:
          "Este usuario ya tiene una solicitud de actualización pendiente.",
      });
    } else {
      setOpenInfoUpdateModal({
        open: true,
        message:
          "Hemos recibido tu solicitud de actualización para este usuario.",
      });
    }

    setHaveChange(false);

    setTimeout(() => {
      setErrorMessage();
    }, 5000);
  };

  const handleCreateUser = async (data) => {
    const { client_dni, client_email, client_name, client_surname } = data;

    const [lastName, secondLastName] = client_surname.split(" ");

    const roleProfileCollection = Object.keys(selectedRoles).map((element) => {
      switch (selectedRoles[element]) {
        case "Administrador":
          return { roleId: 1, profileId: 1 };
        case "Gestor":
          return { roleId: 2, profileId: 2 };
        case "Cliente":
          return { roleId: 3, profileId: 3 };
      }
    });

    const roleProfile = uniqBy(roleProfileCollection, "roleId");

    const account = {
      email: client_email,
      nif: client_dni,
      passwordHash: "",
      phoneNumber: "",
      name: client_name,
      lastName,
      secondLastName: secondLastName || "",
      legalName: "",
      legalLastName: "",
      legalSecondLastName: "",
      legalNIFCIF: "",
      roleProfile,
    };

    const response = await createAccount(user.roleCode, { account });

    if (response?.error) {
      if (response?.error["Account.NIF"])
        setOpenInfoUpdateModal({
          open: true,
          message: response?.error?.Account.NIF,
        });
    } else {
      setOpenInfoUpdateModal({
        open: true,
        message: "Hemos recibido tu solicitud de alta.",
      });
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteAccount(user.roleCode, id);
    setOpenUnsubscriptionModal({
      open: false,
      clientId: null,
    });
    optionsList("client");
  };

  const handleHaveChange = (value) => {
    if (value == "") return;
    setHaveChange(true);
  };

  const handleSelectedRole = (name, value) => {
    if (value == "") return;

    if (name == "role_1") {
      setOpenRole({ ...openRole, role_2: true });
    }

    if (name == "role_2") {
      setOpenRole({ ...openRole, role_3: true });
      setOpenCloseIcon({ ...openCloseIcon, role_2: true });
    }

    if (name == "role_3") {
      setOpenCloseIcon({ ...openCloseIcon, role_3: true });
    }

    const newSelectedRoles = { ...selectedRoles };
    newSelectedRoles[name] = value;
    setSelectedRoles(newSelectedRoles);
  };

  const handleUnselectedRole = (name) => {
    if (name == "") return;

    let newOpenRole = { ...openRole };
    let newOpenCloseIcon = { ...openCloseIcon };

    if (name == "role_2") {
      newOpenRole = { ...newOpenRole, role_2: false };
      newOpenCloseIcon = { ...newOpenCloseIcon, role_2: false };
    }

    if (name == "role_3") {
      newOpenRole = { ...newOpenRole, role_3: false };
      newOpenCloseIcon = { ...newOpenCloseIcon, role_3: false };
    }

    if (!newOpenRole.role_2 && !newOpenRole.role_3) {
      newOpenRole = { ...newOpenRole, role_2: true };
    }

    setOpenRole(newOpenRole);
    setOpenCloseIcon(newOpenCloseIcon);

    const newSelectedRoles = { ...selectedRoles };
    newSelectedRoles[name] = "";
    setSelectedRoles(newSelectedRoles);
  };

  const handleClickItem = async (index) => {
    const clientItem = clientDataList[index];

    const { data } = await getAccount(user.roleCode, clientItem.UserId);

    setClientDetail(data);
    setVisibleActionButton(true);
  };

  const handleSearchClient = (value) => {
    if (value == "") {
      setClientDataList(fullClientData);
      return;
    }

    const newFullClientData = fullClientDataList.filter((element) => {
      return element?.Email.toLowerCase().includes(value.toLowerCase());
    });

    setClientDataList(newFullClientData);
  };

  const getDataAccounts = async () => {
    const { data } = await getAccounts(user.roleCode);

    setClientDataList(data);
    setFullClientDataList(data);
    setLoadingSpinner(false);
  };

  useEffect(() => {
    if (!clientData) {
      getDataAccounts();
    } else {
      setClientDataList(clientData);
      setFullClientDataList(clientData);
      setLoadingSpinner(false);
    }
  }, [clientData]);

  useEffect(() => {
    if (!clientDetail) return;

    const { Role } = clientDetail;

    if (Role) {
      const [role_2, role_3] = [...Role];

      if (role_2) {
        setOpenRole({ role_2: true, role_3: false });
        setOpenCloseIcon({
          role_2: true,
          role_3: false,
        });

        if (role_3) {
          setOpenRole({ role_2: true, role_3: false });
          setOpenCloseIcon({
            role_2: true,
            role_3: true,
          });
        }
      }
    }
  }, [clientDetail]);

  return (
    <>
      {openInfoUpdateModal.open && (
        <InfoModal
          setOpenInfoModal={setOpenInfoUpdateModal}
          openInfoModal={openInfoUpdateModal}
        />
      )}
      {openUnsubscriptionModal.open && (
        <UnsubscriptionModal
          closeAction={() =>
            setOpenUnsubscriptionModal({ open: false, clientId: null })
          }
          action={() => handleDeleteUser(openUnsubscriptionModal.clientId)}
          message="¿Estás seguro que quieres dar de baja esta cuenta?"
        />
      )}
      <SCAddUserModule>
        <div className="data-wrapper">
          <SCTextXL color="primary">Añadir usaurio</SCTextXL>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleActionAccount)}>
              <div className="client-wrapper">
                <InputText
                  label="DNI / NIE"
                  name="client_dni"
                  validation={{
                    required: true,
                    validate: async (value) => handleHaveChange(value),
                  }}
                  defaultValue={clientDetail?.NIF}
                  disabled={!isEmpty(clientDetail)}
                />
                <div />
                <div />
                <InputText
                  label="Nombre"
                  name="client_name"
                  validation={{
                    required: true,
                    validate: async (value) => handleHaveChange(value),
                  }}
                  defaultValue={clientDetail?.Name}
                  disabled={!isEmpty(clientDetail)}
                />
                <InputText
                  label="Apellidos"
                  name="client_surname"
                  validation={{
                    required: true,
                    validate: async (value) => handleHaveChange(value),
                  }}
                  defaultValue={clientDetail?.LastName}
                  disabled={!isEmpty(clientDetail)}
                />
                <div />

                <InputText
                  label="Email"
                  name="client_email"
                  validation={{
                    required: true,
                    validate: async (value) => handleHaveChange(value),
                  }}
                  defaultValue={clientDetail?.Email}
                />
                <div />
                <div />

                <SingleDropdown
                  label="Perfil"
                  name="role_1"
                  options={selectRoles}
                  validation={{
                    validate: async (value) =>
                      handleSelectedRole("role_1", value),
                  }}
                  placeholder={
                    clientDetail?.Role ? clientDetail?.Role[0] : "Añade un rol"
                  }
                  disabled={!isEmpty(clientDetail)}
                />

                <div />
                <div />

                {openRole.role_2 && (
                  <>
                    <div className="single-wrapper">
                      <SingleDropdown
                        label="Añdir nuevo perfil"
                        name="role_2"
                        options={selectRoles}
                        validation={{
                          validate: async (value) =>
                            handleSelectedRole("role_2", value),
                        }}
                        placeholder={
                          clientDetail?.Role
                            ? clientDetail.Role[1]
                            : "Añade un rol"
                        }
                        disabled={!isEmpty(clientDetail)}
                      />
                      {isEmpty(clientDetail) && (
                        <div
                          className="icon-wrapper"
                          onClick={() => handleUnselectedRole("role_2")}
                        >
                          {openCloseIcon.role_2 && <CloseIcon />}
                        </div>
                      )}
                    </div>
                    <div />
                    <div />
                  </>
                )}
                {openRole.role_3 && (
                  <>
                    <div className="single-wrapper">
                      <SingleDropdown
                        label="Añdir nuevo perfil"
                        name="role_3"
                        options={selectRoles}
                        validation={{
                          validate: async (value) =>
                            handleSelectedRole("role_3", value),
                        }}
                        placeholder={
                          clientDetail?.Role
                            ? clientDetail.Role[2]
                            : "Añade un rol"
                        }
                        disabled={!isEmpty(clientDetail)}
                      />
                      {isEmpty(clientDetail) && (
                        <div
                          className="icon-wrapper"
                          onClick={() => handleUnselectedRole("role_3")}
                        >
                          {openCloseIcon.role_3 && <CloseIcon />}
                        </div>
                      )}
                    </div>
                    <div />
                    <div />
                  </>
                )}
              </div>

              <div className="action-wrapper">
                <div>
                  <Button type="submit" disabled={!haveChange}>
                    {isEmpty(clientDetail)
                      ? "Añadir Usuario"
                      : "Guardar Cambios"}
                  </Button>

                  {errorMessage && (
                    <SCTextSLight className="info-message" color="red">
                      {errorMessage}
                    </SCTextSLight>
                  )}
                </div>

                {visibleActionButton && (
                  <div className="selected-wrapper">
                    <ButtonSelect
                      color="primary"
                      action={() => router.push("/pass-cambiar")}
                    >
                      Cambiar contraseña
                    </ButtonSelect>

                    <ButtonSelect
                      checked={openUnsubscriptionModal.open}
                      color="red"
                      action={() =>
                        setOpenUnsubscriptionModal({
                          open: true,
                          clientId: clientDetail.UserId,
                        })
                      }
                    >
                      Dar de baja
                    </ButtonSelect>
                  </div>
                )}
              </div>
            </form>
          </FormProvider>
        </div>

        <div className="client-wrapper">
          <div className="title-wrapper">
            <SCTextXL color="primary">Usuarios</SCTextXL>
            <div className="icons-wrapper">
              <Search action={handleSearchClient} />
            </div>
          </div>

          <div className="table-client-wraper">
            <div className="title-table-wrapper">
              <SCTextSLight color="black">Titular</SCTextSLight>
              <SCTextSLight color="black">Estado</SCTextSLight>
            </div>
            {loadingSpinner ? (
              <div className="spinner-wrapper">
                <SCSpinner />
              </div>
            ) : (
              <>
                {clientDataList.length > 0 ? (
                  <>
                    {clientDataList.map((element, index) => {
                      return (
                        <ItemClient
                          data={element}
                          key={index}
                          action={() => handleClickItem(index)}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div className="empty-list">
                    <SCTextSLight color="black">No hay clientes</SCTextSLight>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </SCAddUserModule>
    </>
  );
};

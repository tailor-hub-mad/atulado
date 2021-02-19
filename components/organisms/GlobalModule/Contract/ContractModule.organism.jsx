import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isEmpty, pick } from "lodash";
import FileDownload from "js-file-download";

import { SCContractModule } from "./ContractModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { Search } from "../../../atoms/Search/Search.atom";
import { ButtonIcon } from "../../../atoms/ButtonIcon/ButtonIcon.atom";
import { ItemContractList } from "../../../molecules/ItemList/ItemList.molecule";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { SCSpinner } from "../../../atoms/Spinner/Spinner.styled";
import { IbanModal } from "../../Modal/ContractModal/IbanModal/IbanModal.organism";
import { AddressModal } from "../../Modal/ContractModal/AddressModal/AddressModal.organism";
import { UnsubscriptionModal } from "../../Modal/ContractModal/UnsubscriptionModal/UnsubscriptionModal.organism";
import { InfoModal } from "../../Modal/InfoModal/InfoModal.organism";

import AddDocIcon from "../../../../public/icon/add-doc_icon.svg";
import DownloadIcon from "../../../../public/icon/download_icon.svg";

import { findContractsByAtttribute } from "../../../../utils/contract";
import {
  downloadContractById,
  deleteContract,
  updateContractIban,
  updateContractDeliveryAddress,
} from "../../../../lib/api/contract";

import {
  contractKeysTable,
  contractFilterAttributeTable,
} from "../../../../utils/contract";

export const ContractModule = ({
  user,
  contracts,
  optionsList,
  setOpenDownloadScreen,
}) => {
  const [fullContractData, setFullContractData] = useState();
  const [contractData, setContractData] = useState();
  const [selectedContract, setSelectedContract] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  const [openIbanModal, setOpenIbanModal] = useState({
    contractId: null,
    open: false,
  });
  const [openAddressModal, setOpenAddressModal] = useState({
    contractId: null,
    open: false,
  });
  const [openUnsubscriptionModal, setOpenUnsubscriptionModal] = useState({
    contractId: null,
    open: false,
  });
  const [openInfoUpdateModal, setOpenInfoUpdateModal] = useState({
    message: null,
    open: false,
  });

  console.log(fullContractData);

  const router = useRouter();

  const filterAttributes = (element) => {
    const contract = pick(element, contractFilterAttributeTable);

    contract.State = contract.State ? "Activo" : "Inactivo";

    return contract;
  };

  const handleSearchContract = (value) => {
    if (value == "") {
      setContractData(fullContractData);
    } else {
      const newContractData = findContractsByAtttribute(
        fullContractData,
        "Address",
        value
      );

      setContractData(newContractData);
    }
  };

  const handleOnClikCheckContract = (value, contractId) => {
    const newSelectedContract = new Set([...selectedContract]);

    !value
      ? newSelectedContract.delete(contractId)
      : newSelectedContract.add(contractId);

    setSelectedContract([...newSelectedContract]);
  };

  const handleOnClikContract = (contractId) => {
    optionsList("contract", {
      contractId,
      contractList: fullContractData,
    });
  };

  const handleDownloadDoc = async () => {
    setOpenDownloadScreen({
      error: false,
      open: true,
    });

    await Promise.all(
      selectedContract.map((element) => {
        return downloadContractById(user.roleCode, user.UserId, element).then(
          (response) => {
            if (response.data) {
              const buf = Buffer.from(response.data.Content, "base64");
              FileDownload(buf, response.data.FileName);

              setOpenDownloadScreen({
                error: false,
                open: false,
              });
            }
            if (response?.error) {
              setOpenDownloadScreen({
                error: true,
                open: true,
              });
            }
          }
        );
      })
    );
  };

  const handleAddDoc = () => {
    router.push("/tarifas");
  };

  const handleDeleteContrat = async (id) => {
    const response = await deleteContract(user.roleCode, user.UserId, id);

    const message = response?.error
      ? "Este contrato ya tiene una solicitud de baja pendiente."
      : "Hemos recibido tú solicitud de baja.";

    setOpenInfoUpdateModal({ open: true, message });
    setOpenUnsubscriptionModal({ open: false, index: null });
  };

  const handleUpdateContractDeliberyAddress = async (id, address) => {
    const response = await updateContractDeliveryAddress(
      user.roleCode,
      user.UserId,
      id,
      address
    );

    const message = response?.error
      ? "Este contrato ya tiene una solicitud de cambio de dirección pendiente."
      : "Hemos recibido tu solicitud de cambio de dirección.";

    setOpenInfoUpdateModal({ open: true, message });
    setOpenAddressModal({ open: false, index: null });
  };

  const handleUpdateContractIban = async (id, iban) => {
    const response = await updateContractIban(
      user.roleCode,
      user.UserId,
      id,
      iban
    );

    const message = response?.error
      ? "Este contrato ya tiene una solicitud de camibio de IBAN pendiente."
      : "Hemos recibido tu solicitud de cambio de IBAN.";

    setOpenInfoUpdateModal({ open: true, message });
    setOpenIbanModal({ open: false, index: null });
  };

  useEffect(() => {
    if (!contracts) return;

    setFullContractData(contracts);
    setContractData(contracts);
    setLoadingSpinner(false);
  }, [contracts]);

  return (
    <>
      {openInfoUpdateModal.open && (
        <InfoModal
          setOpenInfoModal={setOpenInfoUpdateModal}
          openInfoModal={openInfoUpdateModal}
        />
      )}

      {openIbanModal.open && (
        <IbanModal
          closeAction={() => setOpenIbanModal(false)}
          action={(iban) =>
            handleUpdateContractIban(openIbanModal.contractId, iban)
          }
        />
      )}
      {openAddressModal.open && (
        <AddressModal
          closeAction={() => setOpenAddressModal(false)}
          action={(address) =>
            handleUpdateContractDeliberyAddress(
              openAddressModal.contractId,
              address
            )
          }
        />
      )}
      {openUnsubscriptionModal.open && (
        <UnsubscriptionModal
          closeAction={() => setOpenUnsubscriptionModal(false)}
          action={() => handleDeleteContrat(openUnsubscriptionModal.contractId)}
        />
      )}

      <SCContractModule>
        <div className="title-wrapper">
          <SCTextXL color="primary">Contratos:</SCTextXL>
          <div className="icons-wrapper">
            <Search action={handleSearchContract} />
            <ButtonIcon
              action={handleDownloadDoc}
              icon={<DownloadIcon />}
              disabled={isEmpty(selectedContract)}
            >
              Descargar contrato/s
            </ButtonIcon>
            {user?.roleCode == "3" && (
              <ButtonIcon action={handleAddDoc} icon={<AddDocIcon />}>
                Nuevo contrato
              </ButtonIcon>
            )}
          </div>
        </div>

        <div className="type-data-wrapper">
          {contractKeysTable.map((element, index) => (
            <SCTextSLight key={index} color="black">
              {element}
            </SCTextSLight>
          ))}
          <SCTextSLight color="primary">Opciones</SCTextSLight>
        </div>

        {loadingSpinner ? (
          <div className="spinner-wrapper">
            <SCSpinner />
          </div>
        ) : (
          <>
            {isEmpty(contractData) ? (
              <div className="contract-empty-wrapper">
                <SCTextSLight color="black">
                  No tienes contratos asociados
                </SCTextSLight>
              </div>
            ) : (
              <div className="list-contract-wrapper">
                <>
                  {contractData.map((element, index) => (
                    <ItemContractList
                      key={index}
                      data={filterAttributes(element)}
                      actionCheck={(value) =>
                        handleOnClikCheckContract(value, element?.ContractCode)
                      }
                      action={() => handleOnClikContract(element?.ContractCode)}
                      optionsMenu={[
                        "Cambiar IBAN",
                        "Cambiar Info contacto",
                        "Baja contrato",
                        "Cambiar titular y/o pagador",
                        "Cambiar tarifa y/o potencia",
                        "Descargar contrato",
                      ]}
                      setOpenDownloadScreen={setOpenDownloadScreen}
                      setOpenIbanModal={setOpenIbanModal}
                      setOpenAddressModal={setOpenAddressModal}
                      setOpenUnsubscriptionModal={setOpenUnsubscriptionModal}
                      user={user}
                    />
                  ))}
                </>
              </div>
            )}
          </>
        )}
      </SCContractModule>
    </>
  );
};

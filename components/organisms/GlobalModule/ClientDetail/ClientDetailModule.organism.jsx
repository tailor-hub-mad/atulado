import React, { useState, useEffect } from "react";
import { findIndex, isEmpty, pick, flatten, uniqBy } from "lodash";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

import { SCClientDetailModule } from "./ClientDetailModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { Search } from "../../../atoms/Search/Search.atom";
import { ButtonIcon } from "../../../atoms/ButtonIcon/ButtonIcon.atom";
import { ItmeInvoiceList } from "../../../molecules/ItemList/ItemList.molecule";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { SCSpinner } from "../../../atoms/Spinner/Spinner.styled";
import { ItemManagement } from "../../../molecules/ItemManagement/ItemManagement.molecule";
import { InputText } from "../../../atoms/Input/Input.atom";
import Button from "../../../atoms/Button/Button.atom";
import { ItemContractList } from "../../../molecules/ItemList/ItemList.molecule";
import { ProcessModal } from "../../Modal/ProcessModal/ProcessModal.organism";
import { UnsubscriptionModal } from "../../Modal/ContractModal/UnsubscriptionModal/UnsubscriptionModal.organism";

import ForwardIcon from "../../../../public/icon/forward_icon.svg";
import BackwardIcon from "../../../../public/icon/backward_icon.svg";
import AddDocIcon from "../../../../public/icon/add-doc_icon.svg";

import {
  getAccount,
  deleteAccount,
  updateAccount,
} from "../../../../lib/api/account";
import {
  getProcess,
  deleteProcessById,
  validateDocumentation,
  getProcessByClient,
} from "../../../../lib/api/process";
import { getContractsByAccount } from "../../../../lib/api/contract";
import { getInvoicesByContract } from "../../../../lib/api/invoice";

import {
  invoiceKeysTable,
  invoiceFilterAttributeTable,
  findInvoiceByAddress,
} from "../../../../utils/invoice";
import {
  contractKeysTable,
  contractFilterAttributeTable,
  findContractsByAtttribute,
} from "../../../../utils/contract";
import {
  findProcessByAddress,
  findProcessByContract,
  findProcessByCups,
} from "../../../../utils/process";
import { IbanModal } from "../../Modal/ContractModal/IbanModal/IbanModal.organism";
import { AddressModal } from "../../Modal/ContractModal/AddressModal/AddressModal.organism";
import { InfoModal } from "../../Modal/InfoModal/InfoModal.organism";

const INCREMENT = 3;

export const ClientDetailModule = ({
  user,
  optionsList,
  clientDetail,
  clientData,
  setOpenDownloadScreen,
  setOpenClaimInvoiceModal,
  openClaimInvoiceModal,
}) => {
  const [loadingSpinner, setLoadingSpinner] = useState({
    management: true,
    contract: true,
    invoice: true,
  });

  // client
  const [_userId, setUserId] = useState(clientDetail.UserId);
  const [clientDetailData, setClientDetailData] = useState({});
  const [clientDataList, setClientDataList] = useState([]);
  const [indexClient, setIndexClient] = useState();
  const [openUnsubscriptionModal, setOpenUnsubscriptionModal] = useState({
    open: false,
    userId: null,
  });

  // management
  const [dataManagement, setDataManagement] = useState([]);
  const [fullDataManagement, setFullDataManagement] = useState([]);
  const [closeManagementModal, setCloseManagementModal] = useState({
    open: false,
    index: null,
  });
  const [openIbanModal, setOpenIbanModal] = useState({
    contractId: null,
    open: false,
  });
  const [openAddressModal, setOpenAddressModal] = useState({
    contractId: null,
    open: false,
  });

  const [openInfoUpdateModal, setOpenInfoUpdateModal] = useState({
    message: null,
    open: false,
  });
  const [filterManagementParameters, setFilterManagementParameters] = useState({
    search: null,
  });

  // contracts
  const [fullContractData, setFullContractData] = useState();
  const [contractData, setContractData] = useState();

  // invoices
  const [fullInvoiceData, setFullInvoiceData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [visibleContracts, setVisibleContracts] = useState(3);
  const [visibleInvoices, setVisibleInvoices] = useState(3);
  const [filterInvoicesParameters, setFilterInvoicesParameters] = useState({
    search: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  // Client
  ////////////////////////////////////////////////////

  const handleDeleteUser = async (id) => {
    await deleteAccount(user.roleCode, id);
    setOpenUnsubscriptionModal({
      open: false,
      index: null,
    });
    setClientDetailData({});
    optionsList("client");
    return;
  };

  const handleArrow = (direction) => {
    let newIndexClient;

    if (direction == "back") {
      newIndexClient =
        indexClient === 0 ? clientDataList.length - 1 : indexClient - 1;
    } else {
      newIndexClient =
        indexClient === clientDataList.length - 1 ? 0 : indexClient + 1;
    }
    setIndexClient(newIndexClient);
    const { UserId } = clientDataList[newIndexClient];

    setUserId(UserId);
  };

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  // Management
  ////////////////////////////////////////////////////

  const handleClickManagementItem = (index) => {
    optionsList("home", { clientDetail, clientData, returnPageClient: true });
  };

  const handleDeleteManagement = async (index) => {
    const process = dataManagement?.filter((element) => element["Status"] != "Procesado")[index];

    const { ContractCode, RegistrationId, ProcessId } = process;

    const response = await deleteProcessById(
      user.roleCode,
      user.UserId,
      ContractCode,
      RegistrationId,
      ProcessId
    );

    if (response?.error) {
      setErrorMessage("El registro ya ha sido gestionado.");

      setTimeout(() => {
        setErrorMessage();
        setCloseManagementModal({
          open: false,
          index: null,
        });
      }, 5000);

      return;
    } else {
      const getProcessById = async (id) => {
        const { data } = await getProcessByClient(user.roleCode, id);

        setDataManagement(data);
        setFullDataManagement(data);
      }

      getProcessById(_userId);
      setTimeout(() => {
        setCloseManagementModal({
          open: false,
          index: null,
        });
      }, 1000);
    }
  };

  const handleFilterManagement = () => {
    const { search } = filterManagementParameters;
    let newManagementFilterData = fullDataManagement;

    if (search != null) {
      const newManagementFilterDataAddress = findProcessByAddress(
        newManagementFilterData,
        search
      );

      const newManagementFilterDataContract = findProcessByContract(
        newManagementFilterData,
        search
      );

      const newManagementFilterDataCups = findProcessByCups(
        newManagementFilterData,
        search
      );

      const uniqueNewManagementFilter = uniqBy(
        flatten([
          newManagementFilterDataAddress,
          newManagementFilterDataContract,
          newManagementFilterDataCups,
        ]),
        "ProcessId"
      );

      newManagementFilterData = uniqueNewManagementFilter;
    }

    return newManagementFilterData;
  };

  const handleSearchManagement = (value) => {
    const newDataFilterInvoicesParameters = { ...filterManagementParameters };

    newDataFilterInvoicesParameters["search"] = value == "" ? null : value;

    setFilterManagementParameters(newDataFilterInvoicesParameters);
  };

  const handleValidateProcess = (index) => {
    const process = dataManagement[index];

    const { RegistrationId, ProcessId } = process;

    validateDocumentation(
      user.roleCode,
      user.UserId,
      ProcessId,
      RegistrationId
    );
  };

  // Contracts
  ////////////////////////////////////////////////////

  const filterAttributesContract = (element) => {
    const contract = pick(element, contractFilterAttributeTable);

    //contract.State = contract.State ? "Activo" : "Inactivo";
    switch (contract.ContractStatus) {
      case 1:
        contract.State = "Firmado cliente";
        break;
      case 2:
        contract.State = "Tramitación ATR";
        break;
      case 3:
        contract.State = "Anulado";
        break;
      case 4:
        contract.State = "Aceptado ATR";
        break;
      case 5:
        contract.State = "Rechazado ATR";
        break;
      case 6:
        contract.State = "Activado";
        break;
      case 7:
        contract.State = "Baja";
        break;
      case 8:
        contract.State = "Pendiente Firma";
        break;
      case 9:
        contract.State = "Creado Web";
        break;
      case 10:
        contract.State = "Corte";
        break;
      default:
        contract.State = "Inactivo"
    }
    delete contract.ContractStatus;

    return contract;
  };

  const handleAddDoc = () => {
    router.push("/alta?newContract=true");
  };

  const handleOnClikContract = (contractId) => {
    optionsList("contract", {
      contractId,
      contractList: fullContractData,
    });
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

  // Invoice
  ////////////////////////////////////////////////////

  const filterAttributesInvoice = (element) => {
    const invoice = pick(element, invoiceFilterAttributeTable);

    invoice.Amount = invoice.Amount.toString() + ` €`;

    invoice.Address = invoice.Address.Street;

    return invoice;
  };

  const handleFilterInvoices = () => {
    const { search } = filterInvoicesParameters;
    let newInvoiceFilterData = fullInvoiceData;

    if (search != null) {
      newInvoiceFilterData = findInvoiceByAddress(newInvoiceFilterData, search);
    }

    return newInvoiceFilterData;
  };

  const handleSearchInvoice = (value) => {
    const newDataFilterInvoicesParameters = { ...filterInvoicesParameters };

    newDataFilterInvoicesParameters["search"] = value == "" ? null : value;

    setFilterInvoicesParameters(newDataFilterInvoicesParameters);
  };

  const handleOnClikInvoice = (invoiceId, contractId) => {
    optionsList("invoice", {
      invoiceId,
      contractId,
      listInvoice: fullInvoiceData,
    });
  };

  const displayContracts = () => {
    return new Array(
      visibleContracts > contractData?.length
        ? contractData.length
        : visibleContracts
    )
      .fill(0)
      .map((_, index) => {
        const element = contractData[index];
        return (
          <ItemContractList
            key={index}
            data={filterAttributesContract(element)}
            actionCheck={() => { }}
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
            withOutCheck
            admin
          />
        );
      });
  };

  const displayInvoices = () => {
    return new Array(
      visibleInvoices > invoiceData?.length
        ? invoiceData.length
        : visibleInvoices
    )
      .fill(0)
      .map((_, index) => {
        const element = invoiceData[index];

        return (
          <ItmeInvoiceList
            key={index}
            data={filterAttributesInvoice(element)}
            actionCheck={() => { }}
            action={() =>
              handleOnClikInvoice(element?.Id, element?.ContractCode)
            }
            optionsMenu={[
              "Reclamar factura",
              "Descargar factura",
              "Descargar detalle factura",
            ]}
            setOpenDownloadScreen={setOpenDownloadScreen}
            type="invoice"
            setOpenClaimInvoiceModal={setOpenClaimInvoiceModal}
            openClaimInvoiceModal={openClaimInvoiceModal}
            withOutCheck
          />
        );
      });
  };
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  useEffect(() => {
    async function getAccountData(id) {
      const { data } = await getAccount(user.roleCode, id);

      setClientDetailData(data);

      const index = findIndex(clientDataList, (object) => {
        return object.UserId == id;
      });

      setIndexClient(index);
    }

    async function getContractData(id) {
      const { data } = await getContractsByAccount(user.roleCode, id);

      setFullContractData(data?.Contracts || []);
      setContractData(data?.Contracts || []);

      if (data?.Contracts.length == 0) {
        setFullInvoiceData([]);
        setInvoiceData([]);
      }
    }

    async function getProcessById(id) {
      const { data } = await getProcessByClient(user?.roleCode, id);

      setDataManagement(data);
      setFullDataManagement(data);
    }

    if (!_userId) return;

    setLoadingSpinner({
      management: true,
      contract: true,
      invoice: true,
    });

    getAccountData(_userId);
    getProcessById(_userId);
    getContractData(_userId);
  }, [_userId, user]);

  useEffect(() => {
    if (!clientData) return;

    setClientDataList(clientData);
  }, [clientData]);

  useEffect(() => {
    if (!fullContractData || fullContractData.length == 0) return;

    Promise.all(
      fullContractData.map((element) => {
        if (!element.ContractCode) return;

        return getInvoicesByContract(
          user.roleCode,
          user.UserId,
          element.ContractCode
        ).then((response) => response.data);
      })
    ).then((response) => {
      const newInvoices = response
        .filter((element) => {
          element?.Succeeded && element?.InvoicesCrMemos.length > 0;
        })
        .map((element) => element.InvoicesCrMemos);

      const newFlattenInvoice = flatten(newInvoices);

      setFullInvoiceData(newFlattenInvoice);
      setInvoiceData(newFlattenInvoice);
    });
  }, [fullContractData]);

  useEffect(() => {
    const newLoadingSpinner = { ...loadingSpinner };

    if (dataManagement) {
      newLoadingSpinner["management"] = false;
    }

    if (fullContractData) {
      newLoadingSpinner["contract"] = false;
    }

    if (fullInvoiceData) {
      newLoadingSpinner["invoice"] = false;
    }

    setLoadingSpinner(newLoadingSpinner);
  }, [fullContractData, dataManagement, fullInvoiceData]);

  useEffect(() => {
    const newFilterManagement = handleFilterManagement();

    setDataManagement(newFilterManagement);
  }, [filterManagementParameters]);

  useEffect(() => {
    const newFilterInvoices = handleFilterInvoices();

    setInvoiceData(newFilterInvoices);
  }, [filterInvoicesParameters]);

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
          closeAction={() =>
            setOpenUnsubscriptionModal({ open: false, userId: null })
          }
          action={() => handleDeleteUser(openUnsubscriptionModal.userId)}
          message="¿Estás seguro que quieres dar de baja tu cuenta de usuario?"
        />
      )}
      {closeManagementModal.open && (
        <ProcessModal
          handleDeleteManagement={handleDeleteManagement}
          setCloseManagementModal={setCloseManagementModal}
          index={closeManagementModal.index}
          errorMessage={errorMessage}
        />
      )}
      <SCClientDetailModule>
        <div className="title-wrapper">
          <SCTextXL color="primary">
            <span className="link" onClick={() => optionsList("client")}>
              Clientes
            </span>{" "}
            <span>{">"}</span> {clientDetailData?.UserName}
          </SCTextXL>
          <div className="icons-wrapper">
            <ButtonIcon
              action={() => handleArrow("back")}
              icon={<BackwardIcon />}
            >
              Anterior cliente
            </ButtonIcon>
            <ButtonIcon action={() => handleArrow()} icon={<ForwardIcon />}>
              Siguiente cliente
            </ButtonIcon>
          </div>
        </div>

        <div className="data-wrapper">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit()}>
              <div className="client-wrapper">
                <InputText
                  disabled
                  label="DNI / NIE"
                  name="client_dni"
                  defaultValue={clientDetailData?.NIF}
                />
                <div />
                <div />
                <InputText
                  disabled
                  label="Nombre"
                  name="client_name"
                  defaultValue={clientDetailData?.Name}
                />
                <InputText
                  disabled
                  label="Apellidos"
                  name="client_surname"
                  defaultValue={clientDetailData?.LastName}
                />
                <div />
              </div>

              <div className="action-wrapper">
                <div></div>

                <div className="selected-wrapper">
                  <ButtonSelect
                    checked={openUnsubscriptionModal.open}
                    color="red"
                    action={() =>
                      setOpenUnsubscriptionModal({
                        open: true,
                        userId: _userId,
                      })
                    }
                  >
                    Dar de baja
                  </ButtonSelect>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>

        <div>
          <div className="title-wrapper">
            <SCTextXL color="primary">Gestiones pendientes:</SCTextXL>
            <div className="icons-wrapper">
              <Search action={handleSearchManagement} />
            </div>
          </div>

          <div className="management-section">
            <div className="title-table-management">
              <SCTextSLight color="black">Gestiones</SCTextSLight>
              <SCTextSLight color="black">Estado</SCTextSLight>
              <SCTextSLight color="black">Contrato/CUPS</SCTextSLight>
              <SCTextSLight color="black">Dirección</SCTextSLight>
              <SCTextSLight color="black">Fecha Inicio</SCTextSLight>
              <SCTextSLight color="black">Ultima modificación</SCTextSLight>
            </div>

            <div className="option-table-management">
              {loadingSpinner?.management ? (
                <div className="spinner-wrapper">
                  <SCSpinner />
                </div>
              ) : (
                <>
                  {dataManagement.length > 0 ? (
                    dataManagement
                      .filter((element) => element["Status"] != "Procesado")
                      .map((element, index) => (
                        <ItemManagement
                          key={index}
                          closeAction={() => {
                            const getProcessById = async (id) => {
                              const { data } = await getProcessByClient(user.roleCode, id);

                              setDataManagement(data);
                              setFullDataManagement(data);
                            }
                            setCloseManagementModal({
                              open: true,
                              index,
                            })
                            getProcessById(_userId);
                          }}
                          action={() => handleClickManagementItem(index)}
                          validateAction={() => handleValidateProcess(index)}
                          data={element}
                        />
                      ))
                  ) : (
                    <div className="empty-management">
                      <SCTextSLight color="black">
                        No hay gestiones pendientes
                      </SCTextSLight>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="contract-client-wrapper">
          <div className="title-wrapper">
            <SCTextXL color="primary">Contratos:</SCTextXL>
            <div className="icons-wrapper">
              <Search action={handleSearchContract} />

              <ButtonIcon action={handleAddDoc} icon={<AddDocIcon />}>
                Nuevo contrato
              </ButtonIcon>
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

          {loadingSpinner.contract ? (
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
                <>
                  <div className="list-contract-wrapper">
                    <>{contractData && displayContracts()}</>
                  </div>
                  <Button
                    className="see-more-button"
                    disabled={visibleContracts >= contractData?.length}
                    color="primary"
                    onClick={() =>
                      setVisibleContracts(
                        visibleContracts + INCREMENT >= contractData?.length
                          ? visibleContracts +
                          contractData?.length -
                          visibleContracts
                          : visibleContracts + INCREMENT
                      )
                    }
                  >
                    Ver más
                  </Button>
                </>
              )}
            </>
          )}
        </div>

        <div className="invoice-client-wrapper">
          <div className="title-wrapper">
            <SCTextXL color="primary">Facturas:</SCTextXL>
            <div className="icons-wrapper">
              <Search action={handleSearchInvoice} />
            </div>
          </div>

          <div className="type-data-wrapper">
            {invoiceKeysTable.map((element, index) => (
              <SCTextSLight key={index} color="black">
                {element}
              </SCTextSLight>
            ))}
            <SCTextSLight color="primary">Opciones</SCTextSLight>
          </div>

          {loadingSpinner.invoice ? (
            <div className="spinner-wrapper">
              <SCSpinner />
            </div>
          ) : (
            <>
              {isEmpty(invoiceData) ? (
                <div className="contract-empty-wrapper">
                  <SCTextSLight color="black">
                    No tienes facturas asociadas
                  </SCTextSLight>
                </div>
              ) : (
                <>
                  <div className="list-contract-wrapper">
                    <>{invoiceData && displayInvoices()}</>
                  </div>
                  <Button
                    className="see-more-button"
                    disabled={visibleInvoices >= invoiceData?.length}
                    color="primary"
                    onClick={() =>
                      setVisibleInvoices(
                        visibleInvoices + INCREMENT >= invoiceData?.length
                          ? visibleInvoices +
                          invoiceData?.length -
                          visibleInvoices
                          : visibleInvoices + INCREMENT
                      )
                    }
                  >
                    Ver más
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </SCClientDetailModule>
    </>
  );
};

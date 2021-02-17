import React, { useState, useEffect } from "react";
import { findIndex, isEmpty, pick, flatten } from "lodash";
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

import ForwardIcon from "../../../../public/icon/forward_icon.svg";
import BackwardIcon from "../../../../public/icon/backward_icon.svg";
import AddDocIcon from "../../../../public/icon/add-doc_icon.svg";

import { getAccount } from "../../../../lib/api/account";
import { getProcess } from "../../../../lib/api/process";
import { getContractsByAccount } from "../../../../lib/api/contract";
import { getInvoicesByContract } from "../../../../lib/api/invoice";

import {
  invoiceKeysTable,
  invoiceFilterAttributeTable,
} from "../../../../utils/invoice";
import {
  contractKeysTable,
  contractFilterAttributeTable,
} from "../../../../utils/contract";

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
  const [errorMessage, setErrorMessage] = useState();
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
  const [haveChange, setHaveChange] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);

  // management
  const [dataManagement, setDataManagement] = useState();
  const [closeManagementModal, setCloseManagementModal] = useState({
    open: false,
    index: null,
  });

  // contracts
  const [fullContractData, setFullContractData] = useState();
  const [contractData, setContractData] = useState();

  // invoices
  const [fullInvoiceData, setFullInvoiceData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [visibleContracts, setVisibleContracts] = useState(3);
  const [visibleInvoices, setVisibleInvoices] = useState(3);

  const router = useRouter();

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
        "Hemos recibido tu solicitud de actualzación";
      setOpenInfoModal(newOpenInfoModal);
    }

    setHaveChange(false);

    setTimeout(() => {
      setErrorMessage();
    }, 5000);
  };

  const handleDeleteUser = async () => {
    // if (!isConfirmation) {
    //   return setIsConfirmation(true);
    // }
    // setIsConfirmation(false);
    // const { error } = await deleteAccount(user.roleCode, user.UserId);
    // // error -> manejo de errores
    // router.push("/login-cliente");
  };

  const handleHaveChange = (value) => {
    if (value == "") return;
    setHaveChange(true);
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
    optionsList("home", dataManagement[index]);
  };

  // Pendiente de implementar
  const handleDeleteManagement = async (index) => {
    // const process = dataManagement[index];
    // const { ContractCode, RegistrationId, ProcessId } = process;
    // const { error } = await deleteProcessById(
    //   user.roleCode,
    //   user.UserId,
    //   ContractCode,
    //   RegistrationId,
    //   ProcessId
    // );
    // if (error) {
    //   // handle error
    // }
    // setCloseManagementModal({
    //   open: false,
    //   index: null,
    // });
  };

  const handleSearchManagement = (value) => {
    // Pendiente de implementar
  };

  // Contracts
  ////////////////////////////////////////////////////

  const filterAttributesContract = (element) => {
    const contract = pick(element, contractFilterAttributeTable);

    contract.State = contract.State ? "Activo" : "Inactivo";

    return contract;
  };

  const handleAddDoc = () => {
    router.push("/tarifas");
  };

  const handleOnClikContract = (contractId) => {
    optionsList("contract", {
      contractId,
      contractList: fullContractData,
    });
  };

  const handleSearchContract = (value) => {
    // Pendiente de implementar
  };

  // Invoice
  ////////////////////////////////////////////////////

  const filterAttributesInvoice = (element) => {
    const invoice = pick(element, invoiceFilterAttributeTable);

    invoice.Amount = invoice.Amount.toString() + ` €`;

    invoice.Address = invoice.Address.Street;

    return invoice;
  };

  const handleSearchInvoice = (value) => {
    // Pendiente de implementar
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
            actionCheck={() => {}}
            action={() => handleOnClikContract(element?.ContractCode)}
            optionsMenu={[
              "Cambiar IBAN",
              "Cambiar Info contacto",
              "Cambiar titular y/o pagador",
              "Cambiar tarifa y/o potencia",
              "Descargar contrato",
            ]}
            setOpenDownloadScreen={setOpenDownloadScreen}
            withOutCheck
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
            actionCheck={() => {}}
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
      const { data } = await getProcess(user.roleCode, id);

      setDataManagement(data);
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

  return (
    <>
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
            <form onSubmit={methods.handleSubmit(handleUpdateAccount)}>
              <div className="client-wrapper">
                <InputText
                  disabled
                  label="DNI / NIE"
                  name="client_dni"
                  validation={{
                    required: true,
                    validate: async (value) => handleHaveChange(value),
                  }}
                  defaultValue={clientDetailData?.NIF}
                />
                <div />
                <div />
                <InputText
                  disabled
                  label="Nombre"
                  name="client_name"
                  validation={{
                    required: true,
                    validate: async (value) => handleHaveChange(value),
                  }}
                  defaultValue={clientDetailData?.Name}
                />
                <InputText
                  disabled
                  label="Apellidos"
                  name="client_surname"
                  validation={{
                    required: true,
                    validate: async (value) => handleHaveChange(value),
                  }}
                  defaultValue={clientDetailData?.LastName}
                />
                <div />
              </div>

              <div className="action-wrapper">
                <div></div>

                <div className="selected-wrapper">
                  <ButtonSelect
                    color="primary"
                    action={() => router.push("/pass-cambiar")}
                  >
                    Cambiar contraseña
                  </ButtonSelect>

                  <ButtonSelect color="red" action={() => handleDeleteUser()}>
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
                          closeAction={() =>
                            setCloseManagementModal({
                              open: true,
                              index,
                            })
                          }
                          action={() => handleClickManagementItem(index)}
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

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { findIndex, pick, isEmpty } from "lodash";
import FileDownload from "js-file-download";

import { SCContractDetailModule } from "./ContractDetailModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { Search } from "../../../atoms/Search/Search.atom";
import { ButtonIcon } from "../../../atoms/ButtonIcon/ButtonIcon.atom";
import { ItmeInvoiceList } from "../../../molecules/ItemList/ItemList.molecule";
import { SCTextXSLight } from "../../../atoms/Text/TextXS.styled";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { BarChart } from "../../../molecules/BarChart/BarChart.molecule";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { OptionList } from "../../../atoms/OptionList/OptionList.atom";
import { SCSpinner } from "../../../atoms/Spinner/Spinner.styled";
import { ItemManagement } from "../../../molecules/ItemManagement/ItemManagement.molecule";
import { ProcessModal } from "../../Modal/ProcessModal/ProcessModal.organism";
import { IbanModal } from "../../Modal/ContractModal/IbanModal/IbanModal.organism";
import { AddressModal } from "../../Modal/ContractModal/AddressModal/AddressModal.organism";
import { UnsubscriptionModal } from "../../Modal/ContractModal/UnsubscriptionModal/UnsubscriptionModal.organism";
import { InfoModal } from "../../Modal/InfoModal/InfoModal.organism";

import DownloadIcon from "../../../../public/icon/download_icon.svg";
import ForwardIcon from "../../../../public/icon/forward_icon.svg";
import BackwardIcon from "../../../../public/icon/backward_icon.svg";
import MenuIcon from "../../../../public/icon/menu_icon.svg";

import useClickOutside from "../../../../hooks/useClickOutside";
import { getInvoicesByContract } from "../../../../lib/api/invoice";
import {
  downloadContractById,
  deleteContract,
  getContractById,
  updateContractIban,
  updateContractDeliveryAddress,
} from "../../../../lib/api/contract";
import { downloadInvoiceById } from "../../../../lib/api/invoice";
import { getProcess, deleteProcessById } from "../../../../lib/api/process";

import {
  findInvoiceByAddress,
  findInvoiceByYear,
  findInvoiceByMonth,
  invoiceKeysTable,
  invoiceFilterAttributeTable,
} from "../../../../utils/invoice";
import { dataYearTemplate, chartTemplate } from "../../../../utils/contract";
import {
  getCodeMonthByPosition,
  getPositionMonthByCode,
} from "../../../../utils/date";
import { getAverage } from "../../../../utils/number";

import colorChart from "../../../../utils/data/colors.json";
import {
  CONDITIONS_1,
  CONDITIONS_2,
  CONDITIONS_3,
} from "../../../../utils/constants";

export const ContractDetailModule = ({
  options,
  user,
  optionsList,
  setOpenDownloadScreen,
  setOpenInfoModal,
  openInfoModal,
  setOpenClaimInvoiceModal,
  openClaimInvoiceModal,
}) => {
  const { contractId, contractList } = options;

  const [openMenu, setOpenMenu] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [dataManagement, setDataManagement] = useState([]);
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
  const [openUnsubscriptionModal, setOpenUnsubscriptionModal] = useState({
    contractId: null,
    open: false,
  });
  const [openInfoUpdateModal, setOpenInfoUpdateModal] = useState({
    message: null,
    open: false,
  });

  // contract
  const [_contractId, _setContractId] = useState(contractId);
  const [dataContract, setDataContract] = useState();
  const [indexContract, setIndexContract] = useState();

  // invoices
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [dataInvoices, setDataInvoices] = useState();
  const [dataFilterInvoices, setDataFilterInvoices] = useState();
  const [filterInvoicesParameters, setFilterInvoicesParameters] = useState({
    search: null,
    years: [],
    month: null,
  });

  const router = useRouter();

  const handleFilterInvoices = () => {
    const { search, years, month } = filterInvoicesParameters;
    let newInvoiceFilterData = dataInvoices;

    if (search != null) {
      newInvoiceFilterData = findInvoiceByAddress(newInvoiceFilterData, search);
    }
    if (years.length > 0) {
      newInvoiceFilterData = findInvoiceByYear(newInvoiceFilterData, years);
    }
    if (month != null) {
      newInvoiceFilterData = findInvoiceByMonth(newInvoiceFilterData, month);
    }

    return newInvoiceFilterData;
  };

  const handleSearchInvoice = (value) => {
    const newDataFilterInvoicesParameters = { ...filterInvoicesParameters };

    newDataFilterInvoicesParameters["search"] = value == "" ? null : value;

    setFilterInvoicesParameters(newDataFilterInvoicesParameters);
  };

  const handleOnClickBarChart = (value) => {
    const newDataFilterInvoicesParameters = { ...filterInvoicesParameters };

    newDataFilterInvoicesParameters["month"] =
      filterInvoicesParameters["month"] == value ? null : value;

    setFilterInvoicesParameters(newDataFilterInvoicesParameters);
  };

  const handleClickOnYear = (value, year) => {
    const newDataFilterInvoicesParameters = {
      ...filterInvoicesParameters,
    };
    const newFilterYear = [...newDataFilterInvoicesParameters["years"]];

    if (value) {
      newFilterYear.push(year);
    } else {
      const index = newFilterYear.indexOf(year);
      newFilterYear.splice(index, 1);
    }

    newDataFilterInvoicesParameters["years"] = newFilterYear;

    setFilterInvoicesParameters(newDataFilterInvoicesParameters);
  };

  const filterAttributes = (element) => {
    const invoice = pick(element, invoiceFilterAttributeTable);

    invoice.Amount = invoice.Amount.toString() + ` €`;
    invoice.Address = invoice.Address.Street;

    return invoice;
  };

  const getInvoiceYears = () => {
    if (!dataInvoices) return [];

    let setYears = new Set();

    dataInvoices.forEach((element) => {
      const date = new Date(element.StartDate);
      const year = date.getFullYear();
      setYears.add(year);
    });

    return [...setYears].sort((a, b) => a - b);
  };

  const getInvoicePriceByMonth = (invoices) => {
    const dataYear = { ...dataYearTemplate };

    invoices.forEach((element) => {
      const date = new Date(element.StartDate);
      const month = date.getMonth();

      const codeMonth = getCodeMonthByPosition(month);
      dataYear[codeMonth].push(element.Amount);
    });

    Object.keys(dataYear).forEach((element) => {
      dataYear[element] =
        dataYear[element].length > 0
          ? `${getAverage(dataYear[element]).toFixed(2)} €`
          : "-";
    });

    return dataYear;
  };

  const buildData = () => {
    if (!dataFilterInvoices) return [];

    const chart = [...chartTemplate];

    const info = [];
    let setKeys = new Set();

    const invoicePlace = [dataInvoices[0]?.Address?.Street];

    invoicePlace.forEach((element, index) => {
      const placeData = {};

      placeData["place"] = element;
      placeData["info"] = getInvoicePriceByMonth(dataFilterInvoices);
      placeData["color"] = colorChart[index];

      info.push(placeData);
    });

    info.forEach((element, index) => {
      const months = element.info;

      Object.keys(months).forEach((month) => {
        const position = getPositionMonthByCode(month);
        const value = months[month].replace(" €", "");

        const formatValue = Number(value == "-" ? "0" : value);

        const auxMonth = chart[position];

        auxMonth[`data_${index}`] = formatValue;
        auxMonth[`data_${index}_color`] = element.color;
        setKeys.add(`data_${index}`);
      });
    });

    return { info, chart, key: [...setKeys] };
  };

  const handleOnClikCheckInvoice = (value, invoiceId) => {
    const newSelectedInvoice = [...selectedInvoice];

    if (!value) {
      const index = findIndex(newSelectedInvoice, (element) => {
        return element.invoiceId == invoiceId;
      });

      newSelectedInvoice.splice(index, 1);
    } else {
      newSelectedInvoice.push({
        invoiceId,
        contractId,
      });
    }

    setSelectedInvoice(newSelectedInvoice);
  };

  const handleOnClikInvoice = (invoiceId, contractId) => {
    optionsList("invoice", {
      invoiceId,
      contractId,
      listInvoice: dataFilterInvoices,
    });
  };

  const handleArrow = (direction) => {
    let newIndexContract;

    if (direction == "back") {
      newIndexContract =
        indexContract === 0 ? contractList.length - 1 : indexContract - 1;
    } else {
      newIndexContract =
        indexContract === contractList.length - 1 ? 0 : indexContract + 1;
    }

    setIndexContract(newIndexContract);

    const { ContractCode } = contractList[newIndexContract];

    _setContractId(ContractCode);
  };

  const handleDownloadDoc = async (type) => {
    setOpenDownloadScreen({ error: false, open: true });

    if (type == "invoice") {
      await Promise.all(
        selectedInvoice.map((element) => {
          return downloadInvoiceById(
            user.roleCode,
            user.UserId,
            element.contractId,
            element.invoiceId
          ).then((response) => {
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
          });
        })
      );
    } else {
      await downloadContractById(user.roleCode, user.UserId, _contractId).then(
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
    }
  };

  const handleActionMenu = () => {
    const newOpenMenu = !openMenu;
    setOpenMenu(newOpenMenu);
  };

  const handleSelectedOption = (_, index) => {
    const { ContractCode: contractID } = dataContract;

    switch (index) {
      case 0:
        setOpenMenu(false);
        setOpenIbanModal({ open: true, contractId: contractID });
        break;
      case 1:
        setOpenMenu(false);
        setOpenAddressModal({ open: true, contractId: contractID });
        break;
      case 2:
        setOpenMenu(false);
        setOpenUnsubscriptionModal({ open: true, contractId: contractID });
        break;
      case 3:
        return router.push(
          `/alta?refWindow=3&updateContract=true&contractCode=${contractID}`
        );
      case 4:
        return router.push(
          `/alta?refWindow=1&updateContract=true&contractCode=${contractID}`
        );
      default:
        setOpenMenu(false);
        handleDownloadDoc("contract");
        break;
    }
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

  const handleGetProcessById = async () => {
    getProcess(user.roleCode, user.UserId).then(({ data }) => {
      const managementData = data.filter((element) => {
        return element.ContractCode == _contractId;
      });

      setDataManagement(managementData);
      setLoadingSpinner(false);
    });
  };

  const handleClickManagementItem = (index) => {
    optionsList("home", {
      ...dataManagement[index],
      contractList,
      _contractId,
      returnPageContract: true,
    });
  };

  const handleDeleteManagement = async (index) => {
    const process = dataManagement[index];

    const { ContractCode, RegistrationId, ProcessId } = process;

    const { error } = await deleteProcessById(
      user.roleCode,
      user.UserId,
      ContractCode,
      RegistrationId,
      ProcessId
    );

    if (error) {
      // handle error
    }

    setCloseManagementModal({
      open: false,
      index: null,
    });
  };

  useEffect(() => {
    setLoadingSpinner(true);

    async function getContract() {
      const { data } = await getContractById(
        user.roleCode,
        user.UserId,
        _contractId
      );

      setDataContract(data);
    }

    async function getInvoices() {
      const { data } = await getInvoicesByContract(
        user.roleCode,
        user.UserId,
        _contractId
      );

      setDataInvoices(data.InvoicesCrMemos);
      setDataFilterInvoices(data.InvoicesCrMemos);
    }

    getContract();
    getInvoices();

    if (!contractList) return;

    const index = findIndex(contractList, (object) => {
      return object.ContractCode == _contractId;
    });

    setIndexContract(index);

    handleGetProcessById();
  }, [_contractId, user]);

  useEffect(() => {
    const newFilterInvoices = handleFilterInvoices();

    setDataFilterInvoices(newFilterInvoices);
  }, [filterInvoicesParameters]);

  const iconRef = useRef();

  useClickOutside(iconRef, () => setOpenMenu(false));

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
            setOpenUnsubscriptionModal({ open: false, contractId: null })
          }
          action={() => handleDeleteContrat(openUnsubscriptionModal.contractId)}
          message="¿Estás seguro que quieres dar de baja el contrato?"
        />
      )}
      <SCContractDetailModule>
        {closeManagementModal.open && (
          <ProcessModal
            handleDeleteManagement={handleDeleteManagement}
            setCloseManagementModal={setCloseManagementModal}
            index={closeManagementModal.index}
          />
        )}
        <div>
          <div className="title-wrapper">
            <SCTextXL color="primary">
              <span className="link" onClick={() => optionsList("contract")}>
                Contratos
              </span>{" "}
              <span>{">"}</span> {_contractId}
            </SCTextXL>
            <div className="icons-wrapper">
              <ButtonIcon
                action={() => handleArrow("back")}
                icon={<BackwardIcon />}
              >
                Anterior contrato
              </ButtonIcon>
              <ButtonIcon action={() => handleArrow()} icon={<ForwardIcon />}>
                Siguiente contrato
              </ButtonIcon>
              <ButtonIcon action={handleDownloadDoc} icon={<DownloadIcon />}>
                Descargar contrato
              </ButtonIcon>
              <div className="menu-wrapper" ref={iconRef}>
                <ButtonIcon action={handleActionMenu} icon={<MenuIcon />}>
                  Menu
                </ButtonIcon>
                {openMenu && (
                  <div className="option-list-wrapper">
                    {openMenu && (
                      <OptionList
                        options={[
                          "Cambiar IBAN",
                          "Cambiar Info contacto",
                          "Baja contrato",
                          "Cambiar titular y/o pagador",
                          "Cambiar tarifa y/o potencia",
                          "Descargar contrato",
                        ]}
                        action={handleSelectedOption}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="detail-wrapper">
            <SCTextSLight color="black">
              <span></span>
              Contrato: {dataContract?.ContractCode}
            </SCTextSLight>
            <SCTextSLight color="black">
              Titular: {dataContract?.Holder?.Name}
            </SCTextSLight>
            <SCTextSLight color="black">
              Fecha inicio: {dataContract?.InitDate}
            </SCTextSLight>
            <SCTextSLight color="black">
              CUPS: {dataContract?.CUPS}
            </SCTextSLight>
            <SCTextSLight color="black">
              Dirección: {dataContract?.DeliveryAddress?.Street}{" "}
              {dataContract?.DeliveryAddress?.Number}{" "}
              {dataContract?.DeliveryAddress?.Floor}
            </SCTextSLight>
            <SCTextSLight color="black">
              Fecha fin: {dataContract?.FinalDate}
            </SCTextSLight>
          </div>

          <div>
            <div className="title-wrapper">
              <SCTextXL color="primary">Gestiones pendientes:</SCTextXL>
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
                {loadingSpinner ? (
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

          <div className="contract-wrapper">
            <div className="action-wrapper">
              <div className="select-wrapper">
                {getInvoiceYears().map((element, index) => (
                  <ButtonSelect
                    key={index}
                    action={(value) => handleClickOnYear(value, element)}
                  >
                    {element}
                  </ButtonSelect>
                ))}
              </div>
              <div className="icons-invoice-container">
                <Search action={handleSearchInvoice} />
                <ButtonIcon
                  disabled={isEmpty(selectedInvoice)}
                  action={() => handleDownloadDoc("invoice")}
                  icon={<DownloadIcon />}
                >
                  Descargar factura/s
                </ButtonIcon>
              </div>
            </div>

            <BarChart
              indexBy="month"
              keys={buildData().key}
              action={handleOnClickBarChart}
              dataInfo={buildData().info}
              dataChart={buildData().chart}
            />
          </div>

          <div className="type-data-wrapper">
            {invoiceKeysTable.map((element, index) => (
              <SCTextSLight key={index} color="black">
                {element}
              </SCTextSLight>
            ))}
            <SCTextSLight color="primary">Opciones</SCTextSLight>
          </div>

          <div className="list-contract-wrapper">
            {dataFilterInvoices && (
              <>
                {isEmpty(dataFilterInvoices) ? (
                  <div className="contract-empty-wrapper">
                    <SCTextSLight color="black">
                      No tienes facturas asociadas al contrato
                    </SCTextSLight>
                  </div>
                ) : (
                  dataFilterInvoices.map((element, index) => {
                    return (
                      <ItmeInvoiceList
                        key={index}
                        data={filterAttributes(element)}
                        actionCheck={(value) =>
                          handleOnClikCheckInvoice(value, element?.Id)
                        }
                        action={() =>
                          handleOnClikInvoice(
                            element?.Id,
                            element?.ContractCode
                          )
                        }
                        optionsMenu={[
                          "Reclamar factura",
                          "Descargar factura",
                          "Descargar detalle factura",
                        ]}
                        type="invoice"
                        setOpenClaimInvoiceModal={setOpenClaimInvoiceModal}
                        openClaimInvoiceModal={openClaimInvoiceModal}
                        setOpenDownloadScreen={setOpenDownloadScreen}
                      />
                    );
                  })
                )}
              </>
            )}
          </div>

          <div className="conditions-wrapper">
            <SCTextXSLight color="black">{CONDITIONS_1}</SCTextXSLight>
            <div className="separator" />
            <SCTextXSLight color="black">{CONDITIONS_2}</SCTextXSLight>
            <div className="separator" />
            <SCTextXSLight color="black">{CONDITIONS_3}</SCTextXSLight>
          </div>
        </div>

        <ButtonSelect
          color="red"
          checked={openUnsubscriptionModal.open}
          action={() =>
            setOpenUnsubscriptionModal({
              open: true,
              contractId: dataContract.ContractCode,
            })
          }
        >
          Dar de baja
        </ButtonSelect>
      </SCContractDetailModule>
    </>
  );
};

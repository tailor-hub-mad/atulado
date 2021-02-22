import React, { useState, useEffect, useRef } from "react";
import { findIndex } from "lodash";
import FileDownload from "js-file-download";

import { SCInvoiceDetailModule } from "./InvoiceDetailModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { ButtonIcon } from "../../../atoms/ButtonIcon/ButtonIcon.atom";
import { SCTextM } from "../../../atoms/Text/TextM.styled";
import { BarChart } from "../../../molecules/BarChart/BarChart.molecule";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { OptionList } from "../../../atoms/OptionList/OptionList.atom";

import DownloadIcon from "../../../../public/icon/download_icon.svg";
import ForwardIcon from "../../../../public/icon/forward_icon.svg";
import BackwardIcon from "../../../../public/icon/backward_icon.svg";
import MenuIcon from "../../../../public/icon/menu_icon.svg";

import {
  getInvoiceById,
  downloadInvoiceById,
  downloadInvoicePaymentById,
  getInvoicesByContract,
  downloadInvoiceDetailById,
} from "../../../../lib/api/invoice";
import useClickOutside from "../../../../hooks/useClickOutside";

const colorBarChart = "#FBB040";

export const InvoiceDetailModule = ({
  options,
  user,
  setOpenDownloadScreen,
  setOpenClaimInvoiceModal,
  openClaimInvoiceModal,
  optionsList,
}) => {
  const { invoiceId, contractId } = options;

  const [_invoiceId, _setInvoiceId] = useState(invoiceId);
  const [indexInvoice, setIndexInvoice] = useState();
  const [invoiceList, setInvoiceList] = useState();
  const [_contractId] = useState(contractId);
  const [dataInvoice, setDataInvoice] = useState();
  const [resetButton, setResetButton] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleOnClickClaimInvoice = () => {
    const newOpenClaimInvoiceModal = { ...openClaimInvoiceModal };
    newOpenClaimInvoiceModal["open"] = true;
    newOpenClaimInvoiceModal["info"] = {
      contract: _contractId,
      invoice: _invoiceId,
    };
    setOpenClaimInvoiceModal(newOpenClaimInvoiceModal);
  };

  const buildData = () => {
    if (!dataInvoice) return [];

    const { DailyEnergyConsuption: invoiceDetail } = dataInvoice;

    let chart = [];
    let infoChart = {};

    invoiceDetail.forEach((element) => {
      const { Date, Total } = element;
      const formatDate = Date.split("").slice(0, 5).join("");

      chart.push({
        day: formatDate,
        data_1: Total,
        data_1_color: colorBarChart,
      });

      const newInfo = { ...infoChart };
      newInfo[formatDate] = `${Total} €`;
      infoChart = newInfo;
    });

    const info = [{ info: infoChart }];

    return { info, chart };
  };

  const handleArrow = (direction) => {
    let newIndexInvoice;

    if (direction == "back") {
      newIndexInvoice =
        indexInvoice === 0 ? invoiceList.length - 1 : indexInvoice - 1;
    } else {
      newIndexInvoice =
        indexInvoice === invoiceList.length - 1 ? 0 : indexInvoice + 1;
    }

    setIndexInvoice(newIndexInvoice);

    const { Id: invoiceID } = invoiceList[newIndexInvoice];

    _setInvoiceId(invoiceID);
  };

  const handleDownloadDoc = async (type) => {
    const { NavSalesType } = dataInvoice;

    setOpenDownloadScreen({
      error: false,
      open: true,
    });

    if (type == "detail") {
      await downloadInvoiceDetailById(
        user.roleCode,
        user.UserId,
        _contractId,
        _invoiceId
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
    } else {
      if (NavSalesType) {
        await downloadInvoicePaymentById(
          user.roleCode,
          user.UserId,
          _contractId,
          _invoiceId
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
      } else {
        await downloadInvoiceById(
          user.roleCode,
          user.UserId,
          _contractId,
          _invoiceId
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
      }
    }

    setResetButton(true);
  };

  const handleActionMenu = () => {
    const newOpenMenu = !openMenu;
    setOpenMenu(newOpenMenu);
  };

  const handleSelectedOption = (_, index) => {
    switch (index) {
      case 0:
        setOpenMenu(false);
        handleOnClickClaimInvoice();
        break;

      case 1:
        setOpenMenu(false);
        handleDownloadDoc();
        break;

      case 2:
        setOpenMenu(false);
        handleDownloadDoc("detail");
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    async function getInvoiceData() {
      const { data } = await getInvoicesByContract(
        user.roleCode,
        user.UserId,
        _contractId
      );

      setInvoiceList(data.InvoicesCrMemos);
    }

    getInvoiceData();
  }, []);

  useEffect(() => {
    if (!invoiceList) return;
    async function getInvoiceDetail() {
      const newIndexInvoice = findIndex(
        invoiceList,
        (element) => element.Id == _invoiceId
      );

      const invoiceFilterData = invoiceList[newIndexInvoice];

      const response = await getInvoiceById(
        user.roleCode,
        user.UserId,
        _contractId,
        _invoiceId
      );

      if (response?.data) {
        setIndexInvoice(newIndexInvoice);
        setDataInvoice({ ...invoiceFilterData, ...response.data });
      }

      if (response?.error) {
        setOpenError(true);
      }
    }

    getInvoiceDetail();
  }, [_invoiceId, invoiceList]);

  const iconRef = useRef();

  useClickOutside(iconRef, () => setOpenMenu(false));

  return (
    <SCInvoiceDetailModule>
      <div>
        <div className="title-wrapper">
          <SCTextXL color="primary">
            <span className="link" onClick={() => optionsList("invoice")}>
              Facturas
            </span>{" "}
            <span>{">"}</span> {_invoiceId}
          </SCTextXL>
          <div className="icons-wrapper">
            <ButtonIcon
              action={() => handleArrow("back")}
              icon={<BackwardIcon />}
            >
              Anterior factura
            </ButtonIcon>
            <ButtonIcon action={() => handleArrow()} icon={<ForwardIcon />}>
              Siguiente Factura
            </ButtonIcon>
            <ButtonIcon action={handleDownloadDoc} icon={<DownloadIcon />}>
              Descargar factura
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
                        "Reclamar factura",
                        "Descargar factura",
                        "Descargar detalle factura",
                      ]}
                      action={handleSelectedOption}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="detail-wrapper ">
          <SCTextM color="black">Nº Factura: {dataInvoice?.InvoiceId}</SCTextM>
          <SCTextM color="black">Titular: {dataInvoice?.InvoiceId}</SCTextM>
          <SCTextM color="black">
            Fecha Inicio: {dataInvoice?.StartDate}
          </SCTextM>
          <SCTextM color="black">Contrato: {dataInvoice?.ContractCode}</SCTextM>
          <SCTextM color="black">
            Dirección:{" "}
            {dataInvoice?.Address
              ? `${dataInvoice?.Address?.Street} 
              ${dataInvoice?.Address?.Number}, ${dataInvoice?.Address?.CityId}, 
              ${dataInvoice?.Address?.CountyId}`
              : ""}
            {}
          </SCTextM>
          <SCTextM color="black">Fecha Fin: {dataInvoice?.EndDate}</SCTextM>
          <SCTextM color="black">CUPS: {dataInvoice?.CUPS}</SCTextM>
          <SCTextM color="black">Importe: {dataInvoice?.InvoiceId}</SCTextM>
          <SCTextM color="black">Emisión: {dataInvoice?.DocumentDate}</SCTextM>
        </div>

        <div className="download-wrapper">
          <ButtonSelect
            color="black"
            action={() => handleDownloadDoc()}
            reset={resetButton}
          >
            Descargar pdf
          </ButtonSelect>
          <ButtonSelect
            color="black"
            action={() => handleDownloadDoc("detail")}
            reset={resetButton}
          >
            Descargar detalle
          </ButtonSelect>
        </div>

        <div className="invoice-wrapper">
          <BarChart
            indexBy="day"
            keys={["data_1"]}
            action={() => {}}
            dataInfo={buildData().info}
            dataChart={buildData().chart}
          />
        </div>
      </div>

      {openError && (
        <div className="error-message">
          <SCTextM color="red">
            Ha ocurrido un error con la visualización de su factura. Por favor,
            vuelva a intentarlo mas tarde.
          </SCTextM>
        </div>
      )}

      {openError || (
        <>
          <div className="claim-wrapper">
            <ButtonSelect
              color="red"
              action={handleOnClickClaimInvoice}
              checked={openClaimInvoiceModal["open"]}
            >
              Reclamar factura
            </ButtonSelect>
          </div>
        </>
      )}
    </SCInvoiceDetailModule>
  );
};

import React, { useState, useEffect, useLayoutEffect } from "react";
import { pick, find, flatten, isEmpty, findIndex } from "lodash";
import FileDownload from "js-file-download";

import { SCInvoiceModule } from "./InvoiceModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { Search } from "../../../atoms/Search/Search.atom";
import { ButtonIcon } from "../../../atoms/ButtonIcon/ButtonIcon.atom";
import { ItmeInvoiceList } from "../../../molecules/ItemList/ItemList.molecule";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { BarChart } from "../../../molecules/BarChart/BarChart.molecule";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { SCSpinner } from "../../../atoms/Spinner/Spinner.styled";

import DownloadIcon from "../../../../public/icon/download_icon.svg";

import {
  getInvoicesByContract,
  downloadInvoiceById,
} from "../../../../lib/api/invoice";

import {
  findInvoiceByAddress,
  findInvoiceByYear,
  findInvoiceByMonth,
  invoiceKeysTable,
  invoiceFilterAttributeTable,
  invoiceFilterAttributeTableMobile,
} from "../../../../utils/invoice";
import { dataYearTemplate, chartTemplate } from "../../../../utils/contract";
import {
  getCodeMonthByPosition,
  getPositionMonthByCode,
} from "../../../../utils/date";
import { getAverage } from "../../../../utils/number";

import colorChart from "../../../../utils/data/colors.json";

export const InvoiceModule = ({
  contracts,
  user,
  optionsList,
  setOpenDownloadScreen,
  setOpenClaimInvoiceModal,
  openClaimInvoiceModal,
}) => {
  const [screenSizeMobile, setScreenSizeMobile] = useState();

  const [dataInvoiceTable, setDataInvoiceTable] = useState();
  const [dataInvoiceFilterTable, setDataInvoiceFilterTable] = useState();
  const [filterInvoicesParameters, setFilterInvoicesParameters] = useState({
    search: null,
    years: [],
    month: null,
  });

  const [fullInvoiceDataChart, setInvoiceFullDataChart] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  const handleFilterInvoices = () => {
    const { search, years, month } = filterInvoicesParameters;
    let newInvoiceFilterData = dataInvoiceTable;

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
    const invoice = screenSizeMobile
      ? pick(element, invoiceFilterAttributeTableMobile)
      : pick(element, invoiceFilterAttributeTable);

    invoice.Amount = invoice.Amount.toString() + ` €`;

    if (!screenSizeMobile) {
      invoice.Address = invoice.Address.Street;
    }

    return invoice;
  };

  const getInvoiceYears = () => {
    if (!fullInvoiceDataChart) return [];

    let setYears = new Set();

    fullInvoiceDataChart.forEach((element) => {
      element.forEach((invoice) => {
        const date = new Date(invoice.StartDate);
        const year = date.getFullYear();
        setYears.add(year);
      });
    });

    return [...setYears].sort((a, b) => a - b);
  };

  const getInvoicePlaces = (fullInvoices) => {
    return fullInvoices.map((element) => {
      return element[0]?.Address?.Street;
    });
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
    if (!fullInvoiceDataChart) return [];

    const info = [];
    let setKeys = new Set();

    const invoicePlace = getInvoicePlaces(fullInvoiceDataChart);

    invoicePlace.forEach((element, index) => {
      const placeData = {};

      const invoiceSet = fullInvoiceDataChart.find((set) => {
        return find(set, (invoice) => invoice.Address.Street == element);
      });

      placeData["place"] = element;
      placeData["info"] = getInvoicePriceByMonth(invoiceSet);
      placeData["color"] = colorChart[index];

      info.push(placeData);
    });

    const chart = [...chartTemplate];

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

  const handleOnClikCheckInvoice = (value, invoiceId, contractId) => {
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
      listInvoice: flatten(dataInvoiceFilterTable),
    });
  };

  // const handleDownloadDoc = async () => {
  //   setOpenDownloadScreen({
  //     error: false,
  //     open: true,
  //   });
  //   await Promise.all(
  //     selectedInvoice.map((element) => {
  //       return downloadInvoiceById(
  //         user.roleCode,
  //         user.UserId,
  //         element.contractId,
  //         element.invoiceId
  //       ).then((response) => {
  //         if (response.data) {
  //           const buf = Buffer.from(response.data.Content, "base64");
  //           FileDownload(buf, response.data.FileName);

  //           setOpenDownloadScreen({
  //             error: false,
  //             open: false,
  //           });
  //         }
  //         if (response?.error) {
  //           setOpenDownloadScreen({
  //             error: true,
  //             open: true,
  //           });
  //         }
  //       });
  //     })
  //   );
  // };

  useEffect(() => {
    if (!contracts || !user) return;

    Promise.all(
      contracts.map((element) => {
        return getInvoicesByContract(
          user.roleCode,
          user.UserId,
          element.ContractCode
        ).then((response) => response.data);
      })
    ).then((response) => {
      const newInvoices = response
        .filter(
          (element) => element.Succeeded && element.InvoicesCrMemos.length > 0
        )
        .map((element) => element.InvoicesCrMemos);

      setInvoiceFullDataChart(newInvoices);

      const newFlattenInvoice = flatten(newInvoices);

      setDataInvoiceTable(newFlattenInvoice);
      setDataInvoiceFilterTable(newFlattenInvoice);
      setLoadingSpinner(false);
    });
  }, [contracts, user]);

  useEffect(() => {
    const newFilterInvoices = handleFilterInvoices();

    setDataInvoiceFilterTable(newFilterInvoices);
  }, [filterInvoicesParameters]);

  useLayoutEffect(() => {
    if (window.innerWidth <= 769) {
      setScreenSizeMobile(true);
    } else {
      setScreenSizeMobile(false);
    }
  }, []);

  return (
    <SCInvoiceModule>
      <div>
        <div className="title-wrapper">
          <SCTextXL color="primary">Facturas:</SCTextXL>
          <div className="icons-wrapper">
            <Search action={handleSearchInvoice} />
            {/* <ButtonIcon
              action={handleDownloadDoc}
              disabled={isEmpty(selectedInvoice)}
              icon={<DownloadIcon />}
            >
              Descargar factura/s
            </ButtonIcon> */}
          </div>
        </div>

        {user.roleCode == 3 && (
          <div className="invoice-wrapper">
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

            <BarChart
              indexBy="month"
              keys={buildData().key}
              action={handleOnClickBarChart}
              dataInfo={buildData().info}
              dataChart={buildData().chart}
            />
          </div>
        )}

        <div className="type-data-wrapper">
          {invoiceKeysTable.map((element, index) => (
            <SCTextSLight key={index} color="black">
              {element}
            </SCTextSLight>
          ))}
          <SCTextSLight color="primary">Opciones</SCTextSLight>
        </div>

        <div className="list-contract-wrapper">
          {loadingSpinner ? (
            <div className="spinner-wrapper">
              <SCSpinner />
            </div>
          ) : (
            <>
              {dataInvoiceFilterTable && (
                <>
                  {isEmpty(dataInvoiceFilterTable) ? (
                    <div className="contract-empty-wrapper">
                      <SCTextSLight color="black">
                        No hay facturas asociadas
                      </SCTextSLight>
                    </div>
                  ) : (
                    dataInvoiceFilterTable.map((element, index) => {
                      return (
                        <ItmeInvoiceList
                          withOutCheck
                          key={index}
                          data={filterAttributes(element)}
                          actionCheck={(value) =>
                            handleOnClikCheckInvoice(
                              value,
                              element?.Id,
                              element?.ContractCode
                            )
                          }
                          action={() =>
                            handleOnClikInvoice(
                              element?.Id,
                              element?.ContractCode
                            )
                          }
                          optionsMenu={[
                            "Reclamar factura",
                            // "Descargar factura",
                            "Descargar detalle factura",
                          ]}
                          setOpenDownloadScreen={setOpenDownloadScreen}
                          type="invoice"
                          setOpenClaimInvoiceModal={setOpenClaimInvoiceModal}
                          openClaimInvoiceModal={openClaimInvoiceModal}
                        />
                      );
                    })
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </SCInvoiceModule>
  );
};

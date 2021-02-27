import { getCodeMonthByPosition } from "../utils/date";

export const findInvoiceByAddress = (invoices, value) => {
  return invoices.filter((element) => {
    return element["Address"]?.Street?.toLowerCase().includes(
      value.toLowerCase()
    );
  });
};

export const findInvoiceByYear = (invoices, value) => {
  return invoices.filter((element) => {
    const date = new Date(element["StartDate"]);
    const year = date.getFullYear();
    return value.includes(year);
  });
};

export const findInvoiceByMonth = (invoices, value) => {
  return invoices.filter((element) => {
    const date = new Date(element["StartDate"]);
    const month = date.getMonth();
    return value == getCodeMonthByPosition(month);
  });
};

export const invoiceKeysTable = [
  "Nº Factura",
  "Emisión",
  "Dirección",
  "Fecha inicio",
  "Fecha fin",
  "Contrato",
  "CUPS",
  "Importe",
];

export const invoiceFilterAttributeTable = [
  "Id",
  "DocumentDate",
  "Address",
  "StartDate",
  "EndDate",
  "ContractCode",
  "CUPS",
  "Amount",
];

export const invoiceFilterAttributeTableMobile = [
  "Id",
  "CUPS",
  "ContractCode",
  "StartDate",
  "Amount",
];

export const invoiceDetailInfo = [
  "Nº Factura",
  "Titular",
  "Fecha inicio",
  "Contrato",
  "Dirección",
  "Fecha fin",
  "CUP",
  "Importe",
  "Emision",
];

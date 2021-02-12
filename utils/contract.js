export const findContractsByAtttribute = (contracts, attribute, value) => {
  return contracts.filter((element) => {
    return element[attribute]?.toLowerCase().includes(value.toLowerCase());
  });
};

export const contractKeysTable = [
  "Contrato",
  "Dirección",
  "Fecha inicio",
  "Fecha fin",
  "Titular",
  "CUPS",
  "Estado",
];

export const contractFilterAttributeTable = [
  "ContractCode",
  "Address",
  "InitDate",
  "FinalDate",
  "Payer",
  "CUPS",
  "State",
];

export const dataYearTemplate = {
  Ene: [],
  Feb: [],
  Mar: [],
  Abr: [],
  May: [],
  Jun: [],
  Jul: [],
  Ago: [],
  Sep: [],
  Oct: [],
  Nov: [],
  Dic: [],
};

export const chartTemplate = [
  {
    month: "Ene",
  },
  {
    month: "Feb",
  },
  {
    month: "Mar",
  },
  {
    month: "Abr",
  },
  {
    month: "May",
  },
  {
    month: "Jun",
  },
  {
    month: "Jul",
  },
  {
    month: "Ago",
  },
  {
    month: "Sep",
  },
  {
    month: "Oct",
  },
  {
    month: "Nov",
  },
  {
    month: "Dic",
  },
];

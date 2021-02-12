import { flatten } from "lodash";

export const findProcessByAddress = (process, value) => {
  return process.filter((element) => {
    if (element?.SupplyAddress) {
      return element.SupplyAddress?.toLowerCase().includes(value.toLowerCase());
    }

    return false;
  });
};

export const findProcessByContract = (process, value) => {
  return process.filter((element) => {
    if (element?.ContractCode) {
      return element.ContractCode?.toLowerCase().includes(value.toLowerCase());
    }

    return false;
  });
};

export const findProcessByCups = (process, value) => {
  return process.filter((element) => {
    if (element?.CUPS) {
      return element.CUPS?.toLowerCase().includes(value.toLowerCase());
    }

    return false;
  });
};

export const findProcessByStatus = (process, value) => {
  return process.filter((element) => {
    if (element?.Status) {
      return element?.Status?.toLowerCase().includes(value.toLowerCase());
    }

    return false;
  });
};

export const findProcessByType = (process, value) => {
  const processId = flatten(
    value.map((element) => {
      switch (element) {
        case 0: //Sin Documentacion
          return [1, 2, 3];
        case 1: // Sin firma
          return [5, 6];
        case 2: // Sin validación
          return [7];
        case 3: // Fecha fija
          return [4];
      }
    })
  );

  return process.filter((element) => {
    return processId.includes(element.ProcessTypeId);
  });
};

import { getConnector, postConnector } from "../connector";
import { API_VERSION, COMPANY_ID } from "../../utils/constants";

export const getContractsByAccount = async (roleCode, userID) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts`
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data };
    }
  } catch (error) {
    throw error;
  }
};

export const getContractById = async (roleCode, userID, contractID) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/${contractID}`
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Contract };
    }
  } catch (error) {
    throw error;
  }
};

export const downloadContractById = async (roleCode, userID, contractID) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/${contractID}/ExportToPdf`
    );

    return { data };
  } catch (error) {
    if (error?.response) {
      const { data } = error.response;
      return { error: data };
    }

    throw error;
  }
};

export const deleteContract = async (roleCode, UserId, contractID) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/contracts/${contractID}/process/LeaveContract`,
      {
        leaveContractFixedDate: false,
      }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    }
  } catch (error) {
    if (error?.response) {
      const { data } = error.response;
      return { error: data };
    }

    throw error;
  }
};

export const updateContractIban = async (
  roleCode,
  UserId,
  contractID,
  iban
) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/contracts/${contractID}/process/UpdateBankAccount`,
      {
        iban,
      }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    }
  } catch (error) {
    if (error?.response) {
      const { data } = error.response;
      return { error: data };
    }

    throw error;
  }
};

export const updateContractDeliveryAddress = async (
  roleCode,
  UserId,
  contractID,
  deliveryAddress
) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/contracts/${contractID}/process/UpdateDeliveryAddress`,
      deliveryAddress
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    }
  } catch (error) {
    if (error?.response) {
      const { data } = error.response;
      return { error: data };
    }

    throw error;
  }
};

import { getConnector, postConnector } from "../connector";
import { API_VERSION, COMPANY_ID } from "../../utils/constants";

export const getInvoicesByContract = async (roleCode, userID, contractID) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/${contractID}/invoicesCrMemos`
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

export const getInvoiceById = async (
  roleCode,
  userID,
  contractID,
  invoiceID
) => {
  try {
    return await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/${contractID}/InvoicesCrMemosDaily/${invoiceID}`
    );
  } catch (error) {
    if (error?.response) {
      const { data } = error.response;
      return { error: data };
    }

    throw error;
  }
};

export const downloadInvoiceById = async (
  roleCode,
  userID,
  contractID,
  invoiceId
) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/${contractID}/invoicePDF/${invoiceId}`
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

export const downloadInvoicePaymentById = async (
  roleCode,
  userID,
  contractID,
  invoiceId
) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/${contractID}/invoiceCreditPDF/${invoiceId}`
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

export const downloadInvoiceDetailById = async (
  roleCode,
  userID,
  contractID,
  invoiceId
) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/${contractID}/invoicesCrMemos/${invoiceId}`
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

export const claimInvoice = async (
  roleCode,
  UserId,
  contractID,
  invoiceID,
  claimData
) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/contracts/${contractID}/invoicesCrMemos/${invoiceID}/ClaimInvoice`,
      claimData
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    }
  } catch (error) {
    throw error;
  }
};

import { getConnector, postConnector } from "../connector";
import { API_VERSION, COMPANY_ID } from "../../utils/constants";

export const getProcess = async (roleCode) => {
  try {
    return await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/ProcessQueues`,
      {}
    );
  } catch (error) {
    throw error;
  }
};

export const getProcessByContract = async (roleCode, userID, contractId) => {
  try {
    return await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/${contractId}/ProcessQueue`
    );
  } catch (error) {
    throw error;
  }
};

export const getProcessByClient = async (roleCode, userID) => {
  try {
    return await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/ProcessQueue`
    );
  } catch (error) {
    throw error;
  }
};

export const getProcessById = async (roleCode, userID, proccessId) => {
  try {
    return await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/Contracts/ProcessQueue/${proccessId}`
    );
  } catch (error) {
    throw error;
  }
};

export const deleteProcessById = async (
  roleCode,
  userID,
  contractID,
  processID,
  processRegistration
) => {
  try {
    let response = null;
    if (processRegistration == 0 && contractID) {
      response = await postConnector(
        `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${userID}/contracts/${contractID}/processqueue/process/delete/${processID}`,
        {}
      );
    } else {
      response = await postConnector(
        `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Register/DeleteRegistration/${processID}`,
        {}
      );
    }

    const { data } = response;

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

export const validateDocumentation = async (
  roleCode,
  userID,
  proccessId,
  processRegistration
) => {
  try {
    return await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/${userID}/Register/UpdateDocValidation`,
      {
        idRegistration: processRegistration,
        idProcess: proccessId,
        value: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const sendReminder = async (roleCode, processID) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/processqueue/SignaturitProcessReminder/${processID}`,
      {}
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    }
  } catch (error) {
    throw error;
  }
};

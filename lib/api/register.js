import { postConnector, getConnector } from "../connector";
import { API_VERSION, COMPANY_ID } from "../../utils/constants";

export const createRegistration = async (dataRegister) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Register/CreateRegistration`,
      dataRegister
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const createContract = async (roleCode, UserId, dataRegister) => {
  const newDataRegister = { ...dataRegister, holderNIF: dataRegister?.holder?.nif };
  delete newDataRegister.holder;

  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/Register/CreateContract`,
      newDataRegister
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const updateRegistration = async (
  roleCode,
  processId,
  dataUpdateRegister
) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Register/UpdateRegistration/${processId}`,
      dataUpdateRegister
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const updateRegistrationContract = async (
  roleCode,
  UserId,
  contractId,
  dataUpdateContract
) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/contracts/${contractId}/process/UpdateTechnicalAndAdministrativeConditions`,
      dataUpdateContract
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const readRegistration = async (roleCode, processId) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Register/ReadRegistration/${processId}`
    );

    return { data };
  } catch (error) {
    return null;
  }
};

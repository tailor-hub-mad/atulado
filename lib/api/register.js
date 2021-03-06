import { postConnector, getConnector } from "../connector";
import { API_VERSION, COMPANY_ID } from "../../utils/constants";

export const createRegistration = async (dataRegister) => {
  if (dataRegister?.contractDate && new Date(dataRegister.contractDate)) {
    const date = new Date(dataRegister.contractDate);
    if (date)
      dataRegister.contractDate = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear()
  }

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
  let newDataRegister = { ...dataRegister, holderNIF: dataRegister?.holder?.nif };
  delete newDataRegister.holder;


  if (newDataRegister?.contractDate && new Date(newDataRegister.contractDate)) {
    const date = new Date(newDataRegister.contractDate);
    if (date)
      newDataRegister.contractDate = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear()
  }

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
  if (dataUpdateContract?.contractDate && new Date(dataUpdateContract.contractDate)) {
    const date = new Date(dataUpdateContract.contractDate);
    if (date)
      dataUpdateContract.contractDate = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear()
  }

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

export const readTechnicalRegistration = async (
  roleCode,
  UserId,
  contractId,
  processId
) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/contracts/${contractId}/process/ReadTechnicalAndAdministrativeConditions/${processId}`
    );

    return { data };
  } catch (error) {
    return null;
  }
};
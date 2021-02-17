import { getConnector } from "../connector";
import { API_VERSION, COMPANY_ID } from "../../utils/constants";

export const getSIPSInformation = async (cups) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Validators/getSIPSInformation?cups=${cups}`
    );

    if (data?.Succeeded) {
      return { data: data.SIPSInformation };
    }
    if (!data?.Succeeded) {
      return { error: data.Errors[0] };
    }
    return { error: null };
  } catch (error) {
    throw error;
  }
};

export const getOfferedRates = async (roleCode) => {
  try {
    const url = roleCode
      ? `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/OfferedRates`
      : `/api/${API_VERSION}/${COMPANY_ID}/OfferedRates`;

    const { data } = await getConnector(url);

    if (data) return { data };
    return { error: null };
  } catch (error) {
    throw error;
  }
};

export const getOfferedRatesById = async (id, roleCode) => {
  try {
    const url = roleCode
      ? `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/OfferedRates/${id}`
      : `/api/${API_VERSION}/${COMPANY_ID}/OfferedRates/${id}`;

    const { data } = await getConnector(url);

    if (data) return { data };
    return { error: null };
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const getNormalizePowers = async (
  measurementType,
  maxValue,
  minValue
) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}//NormalizedPower?measurementType=${measurementType}&maxValue=${maxValue}&minValue=${minValue}`
    );

    if (data) return { data };
    return { error: null };
  } catch (error) {
    throw error;
  }
};

export const getSubscriptionReason = async () => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/MasterValues/MasterTableValues/MotivoAltaWeb`
    );

    if (data) return { data };
    return { error: null };
  } catch (error) {
    throw error;
  }
};

export const getOscumValues = async () => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/MasterValues/MasterTableValues/TipoAutoconsumo`
    );

    if (data) return { data };
    return { error: null };
  } catch (error) {
    throw error;
  }
};

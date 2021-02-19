import { getConnector } from "../connector";
import _ from "lodash";

import { API_VERSION, COMPANY_ID } from "../../utils/constants";

export const getProvinceCode = async () => {
  try {
    const { data } = await getConnector(`/api/${API_VERSION}/AddressInfoData`);

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Data };
    }
  } catch (error) {
    throw error;
  }
};

export const getMunicipalitiesCode = async (county) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/AddressInfoData?CountyCode=${county}`
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Data };
    }
  } catch (error) {
    throw error;
  }
};

export const getMunicipalitiesByPostalCode = async (postalCode) => {
  try {
    return await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Validators/ValidateMunicipalitiesByPostalCode/${postalCode}`
    );
  } catch (error) {
    if (error?.response) {
      const { status, detail } = error.response.data;

      if (status == 404) {
        return { error: detail };
      }
    }

    throw error;
  }
};

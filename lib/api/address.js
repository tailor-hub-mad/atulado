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

export const getRoadsCode = async (county, municipalityINECode) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/AddressInfoData?CountyCode=${county}&municipalityINECode=${municipalityINECode}`
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
    throw error;
  }
};

export const getAddressCode = async ({
  postal_code,
  city,
  name_road,
  number_road,
}) => {
  try {
    const number = number_road;
    const countyCode = Number(postal_code.substring(0, 2)).toString();
    let municipalityINECode = "null";
    let roadCode = "null";

    const { data: municipalities } = await getMunicipalitiesCode(countyCode);

    if (municipalities) {
      const municipality = _.find(
        municipalities,
        (element) => element.Description.toUpperCase() == city.toUpperCase()
      );

      if (municipality?.Code) municipalityINECode = municipality?.Code;
    }

    const { data: roads } = await getRoadsCode(countyCode, municipalityINECode);

    if (roads) {
      const road = _.find(
        roads,
        (element) => element.Description == name_road.toUpperCase()
      );

      if (road?.Code) roadCode = road?.Code;
    }

    return {
      data: {
        countyCode,
        municipalityINECode,
        roadCode,
        number,
      },
    };
  } catch (error) {
    return null;
  }
};

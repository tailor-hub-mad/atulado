import { postConnector, getConnector } from "../connector";
import { API_VERSION, COMPANY_ID } from "../../utils/constants";
import _ from "lodash";

export const validateNIF = async (NIF) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Validators/validateNIFCIFNIE`,
      {
        NIF,
      }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Succeeded };
    }
  } catch (error) {
    return null;
  }
};

export const validateCUPS = async (cups) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Validators/validateCUPS`,
      {
        cups,
      }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Succeeded };
    }
  } catch (error) {
    return null;
  }
};

export const validateAddress = async ({
  countyCode,
  municipalityINECode,
  roadCode,
  number,
}) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Validators/validateAddress`,
      {
        countyCode,
        municipalityINECode,
        roadCode,
        number,
      }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Succeeded };
    }
  } catch (error) {
    return null;
  }
};

export const validateATRPower = async ({ atr, Powers, SIPSInformation }) => {
  try {
    return await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Validators/validateATRPower`,
      {
        atr,
        Powers,
        SIPSInformation,
      }
    );
  } catch (error) {
    const { data } = error.response;

    if (data.status === 400) {
      return { error: data.errors };
    }

    return null;
  }
};

export const validateFriendCode = async (amigocode) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Validators/validateAMIGOCode`,
      {
        amigocode,
      }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Succeeded };
    }
  } catch (error) {
    return null;
  }
};

export const validateEmail = async (email) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Validators/ValidateEmail`,
      {
        email,
      }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Succeeded };
    }
  } catch (error) {
    return null;
  }
};

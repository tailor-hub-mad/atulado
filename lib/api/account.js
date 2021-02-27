import { postConnector, getConnector } from "../connector";
import {
  API_VERSION,
  COMPANY_ID,
  PASSWORD_MUST_HAVE,
} from "../../utils/constants";

import _ from "lodash";

export const accountLogin = async (roleCode, { Account }) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/Login`,
      {
        Account,
      }
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

export const createAccount = async (roleCode, { account }) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/Create`,
      {
        account,
      }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data };
    }
  } catch (error) {
    if (error?.response) {
      const { data } = error.response;
      return { error: data };
    }

    throw error;
  }
};

export const getAccount = async (roleCode, UserId) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}?detailed=true`
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

export const getAccounts = async (roleCode) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account`
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data: data.Users };
    }
  } catch (error) {
    throw error;
  }
};

export const getAccountMe = async (roleCode) => {
  try {
    const { data } = await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/Me`
    );

    if (data) return { data };
    return { error: null };
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (roleCode, UserId) => {
  try {
    postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/Delete/${UserId}`,
      {}
    );
  } catch (error) {
    throw error;
  }
};

export const updateAccount = async (roleCode, UserId, updatedUser) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/Update/${UserId}`,
      updatedUser
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    }
  } catch (error) {
    if (error?.response) {
      const { data } = error.response;
      if (data.status == 400) {
        const { errors } = data;
        if (errors[""]) {
          return { error: errors[""][0] };
        }
        return errors;
      }
    }
    throw error;
  }
};

export const forgotPassword = async (nif) => {
  try {
    const {
      data,
    } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Account/ForgotPassword`,
      { nif }
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    }
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (roleCode, UserId, updatedPassword) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/PasswordUpdate/${UserId}`,
      updatedPassword
    );

    if (!data.Succeeded) {
      return { error: PASSWORD_MUST_HAVE };
    }
  } catch (error) {
    if (error?.response) {
      const { data } = error.response;
      if (data.status == 400) {
        const { errors } = data;
        if (errors?.NewPasswordHash) {
          return { error: errors.NewPasswordHash[0] };
        }
        if (errors?.OldPasswordHash) {
          return { error: errors.OldPasswordHash[0] };
        }
      }
    }
    throw error;
  }
};

export const updatePasswordToken = async (updatePasswordToken) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/Account/PasswordUpdateToken`,
      updatePasswordToken
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    }
  } catch (error) {
    throw error;
  }
};

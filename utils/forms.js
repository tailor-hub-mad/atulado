import { VALIDATE_FORM_DEFAULT, VALIDATE_FORM_REQUIRED } from "./constants";
import { isEmpty, startsWith } from "lodash";

import { getMunicipalitiesByPostalCode } from "../lib/api/address";

export const hasError = (errors, name) => name in errors;

export const generateErrorMessage = (data) => {
  if (!data) return;

  switch (data.type) {
    case "required":
      return data.message || VALIDATE_FORM_REQUIRED;

    case "api_validation":
      return data.message;

    default:
      return VALIDATE_FORM_DEFAULT;
  }
};

import React from "react";
import {
  InputText,
  InputPassword,
} from "../../components/atoms/Input/Input.atom";
import { PLACEHOLDER_FORM_CUP } from "../../utils/constants";

export default {
  title: "Atoms/Input",
};

export const Text = () => (
  <InputText
    label="Text"
    name="text"
    validation={{
      required: true,
    }}
  />
);

export const Info = () => (
  <InputText
    label="Info"
    name="info"
    placeholder={PLACEHOLDER_FORM_CUP}
    validation={{
      minLength: 10,
      required: true,
    }}
  />
);

export const Disabled = () => (
  <InputText
    disabled
    label="Disabled"
    name="disabled"
    validation={{
      required: true,
    }}
  />
);

export const Password = () => (
  <InputPassword
    label="Password"
    name="pass"
    validation={{
      required: true,
    }}
  />
);

export const Password_Disabled = () => (
  <InputPassword
    disabled
    label="Password Disabled"
    name="pass_disabled"
    validation={{
      required: true,
    }}
  />
);

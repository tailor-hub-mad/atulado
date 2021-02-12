import React from "react";
import { SingleDropdown } from "../../components/molecules/Dropdown/Single/SingleDropdown.molecule";

export default {
  title: "Molecules/SingleDropdown",
};

export const Default = () => (
  <SingleDropdown
    name="bill-access"
    label="Tarifa de acceso"
    validation={{
      required: true,
    }}
    options={["Cambiar cuenta", "Cambiar pagador", "Cambiar cuenta bancaria"]}
  ></SingleDropdown>
);
export const Disabled = () => (
  <SingleDropdown
    disabled
    name="bill-access"
    label="Tarifa de acceso"
    validation={{
      required: true,
    }}
    options={["Cambiar cuenta", "Cambiar pagador", "Cambiar cuenta bancaria"]}
  ></SingleDropdown>
);

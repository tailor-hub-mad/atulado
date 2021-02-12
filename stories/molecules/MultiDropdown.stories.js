import React from "react";
import { MultiDropdown } from "../../components/molecules/Dropdown/Multi/MultiDropdown.molecule";

export default {
  title: "Molecules/MultiDropdown",
};

export const Default = () => (
  <MultiDropdown
    name="power"
    label="Elige tus potencias"
    validation={{
      required: true,
    }}
    options={[
      { name: "data_1", values: ["123kw", "150kw", "113kw"] },
      { name: "data_2", values: ["123kw", "150kw", "113kw"] },
      { name: "data_3", values: ["123kw", "150kw", "113kw"] },
    ]}
  ></MultiDropdown>
);
export const Disabled = () => (
  <MultiDropdown
    disabled
    name="power"
    label="Elige tus potencias"
    validation={{
      required: true,
    }}
    options={[
      { name: "data_1", values: ["123kw", "150kw", "113kw"] },
      { name: "data_2", values: ["123kw", "150kw", "113kw"] },
      { name: "data_3", values: ["123kw", "150kw", "113kw"] },
    ]}
  ></MultiDropdown>
);

import React from "react";
import { ButtonSelect } from "../../components/atoms/ButtonSelect/ButtonSelect.atom";

export default {
  title: "Atoms/ButtonSelect",
};

export const Default = () => <ButtonSelect>Button Select</ButtonSelect>;
export const Color = () => (
  <ButtonSelect color="#9B0505">Button Select</ButtonSelect>
);
export const Disabled = () => (
  <ButtonSelect disabled>Button Select</ButtonSelect>
);

import React from "react";
import { SCTip } from "./Tip.styled";

export const Tip = ({ children, type }) => {
  return <SCTip type={type}>{children}</SCTip>;
};

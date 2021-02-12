import React from "react";
import { ButtonCheck } from "../../components/atoms/ButtonCheck/ButtonCheck.atom";

export default {
  title: "Atoms/ButtonCheck",
};

export const Default = () => <ButtonCheck>This is a test question</ButtonCheck>;
export const Disabled = () => (
  <ButtonCheck disabled>This is a test question</ButtonCheck>
);

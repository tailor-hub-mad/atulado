import React from "react";
import { ButtonFile } from "../../components/atoms/ButtonFile/ButtonFile.atom";

export default {
  title: "Atoms/ButtonFile",
};

export const Default = () => <ButtonFile>Adjuntar archivo</ButtonFile>;
export const Color = () => (
  <ButtonFile color="red">Adjuntar archivo</ButtonFile>
);
export const Disabled = () => (
  <ButtonFile disabled>Adjuntar archivo</ButtonFile>
);

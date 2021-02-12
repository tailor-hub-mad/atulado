import React from "react";
import { SCTextXL } from "../../components/atoms/Text/TextXL.styled";
import { SCTextL } from "../../components/atoms/Text/TextL.styled";
import { SCTextM } from "../../components/atoms/Text/TextM.styled";
import {
  SCTextSMedium,
  SCTextSLight,
} from "../../components/atoms/Text/TextS.styled";
import {
  SCTextXSMedium,
  SCTextXSLight,
} from "../../components/atoms/Text/TextXS.styled";

export default {
  title: "Atoms/Text",
};

export const Default = () => (
  <>
    <SCTextXL>LLorem ipsum dolor sit amet.</SCTextXL>
    <SCTextL>LLorem ipsum dolor sit amet.</SCTextL>
    <SCTextM>LLorem ipsum dolor sit amet.</SCTextM>
    <SCTextSMedium>LLorem ipsum dolor sit amet.</SCTextSMedium>
    <SCTextSLight>LLorem ipsum dolor sit amet.</SCTextSLight>
    <SCTextXSMedium>LLorem ipsum dolor sit amet.</SCTextXSMedium>
    <SCTextXSLight>LLorem ipsum dolor sit amet.</SCTextXSLight>
  </>
);

import React from "react";
import { SCOptionList } from "./OptionList.styled";
import { SCTextSLight } from "../Text/TextS.styled";

export const OptionList = ({ options = [], action }) => (
  <SCOptionList>
    {options.map((element, index) => (
      <div key={index} onClick={() => action(element, index)}>
        <SCTextSLight color="black">{element}</SCTextSLight>
      </div>
    ))}
  </SCOptionList>
);

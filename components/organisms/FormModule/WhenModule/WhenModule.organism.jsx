import React, { useState, useEffect } from "react";

import { SCWhenModule } from "./WhenModule.styled";
import { InputText } from "../../../atoms/Input/Input.atom";
import { ButtonRound } from "../../../atoms/ButtonRound/ButtonRound.atom";

export const WhenModule = ({ defaultInfoUpdateContract }) => {
  const [optionSelected, setOptionSelected] = useState(true);
  const [defaultDate, setDefaultDate] = useState("");

  useEffect(() => {
    if (!defaultInfoUpdateContract) return;

    if (defaultInfoUpdateContract?.contract?.ContractDate != "") {
      const newDate = new Date(
        defaultInfoUpdateContract?.contract?.ContractDate
      );

      const formatDate = `${String(newDate.getFullYear())}-${String(
        newDate.getDay()
      ).padStart("2", 0)}-${String(newDate.getMonth()).padStart("2", 0)}`;

      setDefaultDate(formatDate);
      setOptionSelected(false);
    }
  }, [defaultInfoUpdateContract]);

  return (
    <SCWhenModule>
      <ButtonRound
        action={(value) => {
          setOptionSelected(true);
        }}
        checked={optionSelected}
      >
        Lo antes posible
      </ButtonRound>
      <ButtonRound
        action={(value) => {
          setOptionSelected(false);
        }}
        checked={!optionSelected}
      >
        Cuando termine mi permanencia
      </ButtonRound>
      <div className="calendar-wrapper">
        <InputText
          type="date"
          name="date"
          disabled={optionSelected}
          defaultValue={defaultDate}
        />
      </div>
    </SCWhenModule>
  );
};

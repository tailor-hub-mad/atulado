import React, { useState, useEffect } from "react";

import { SCWhenModule } from "./WhenModule.styled";
import { InputText } from "../../../atoms/Input/Input.atom";
import { ButtonRound } from "../../../atoms/ButtonRound/ButtonRound.atom";

export const WhenModule = ({ defaultInfoUpdateContract }) => {
  const [optionSelected, setOptionSelected] = useState(true);
  const [defaultDate, setDefaultDate] = useState("");

  useEffect(() => {
    if (!defaultInfoUpdateContract) return;

    if (defaultInfoUpdateContract?.contract?.ContractDate != "" && defaultInfoUpdateContract?.contract?.ContractDate) {
      const dateFormat = defaultInfoUpdateContract?.contract?.ContractDate.split("/")
      const old = new Date(`${dateFormat[1]}/${dateFormat[0]}/${dateFormat[2]}`);

      const newDate = new Date(
        defaultInfoUpdateContract?.contract?.ContractDate
      );

      const formatDate = `${String(old.getFullYear())}-${String(old.getMonth() + 1).padStart("2", 0)}-${String(
        old.getDate()
      ).padStart("2", 0)}`;

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

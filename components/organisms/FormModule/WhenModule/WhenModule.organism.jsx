import React, { useState } from "react";

import { SCWhenModule } from "./WhenModule.styled";
import { InputText } from "../../../atoms/Input/Input.atom";
import { ButtonRound } from "../../../atoms/ButtonRound/ButtonRound.atom";

export const WhenModule = ({ defaultInfoUpdateContract }) => {
  const [optionSelected, setOptionSelected] = useState(true);

  const handleRoundButton = (name, value) => {};

  return (
    <SCWhenModule>
      <ButtonRound
        action={(value) => {
          handleRoundButton("date_soon", value);
          setOptionSelected(true);
        }}
        checked={optionSelected}
      >
        Lo antes posible
      </ButtonRound>
      <ButtonRound
        action={(value) => {
          handleRoundButton("date_later", value);
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
          placeholder="00/00/00"
          disabled={optionSelected}
        />
      </div>
    </SCWhenModule>
  );
};

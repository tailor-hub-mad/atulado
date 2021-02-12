import React, { useState, useEffect } from "react";
import { SCButtonCheck } from "./ButtonCheck.styled";
import { SCTextSLight } from "../Text/TextS.styled";

export const ButtonCheck = ({
  children,
  action,
  options,
  checked = false,
  disabled = false,
  withOutOptions = false,
}) => {
  const [state, setState] = useState(checked);

  const handleOnClick = () => {
    const newState = !state;
    setState(newState);

    if (options) {
      return newState
        ? action(options.option_2.type)
        : action(options.option_1.type);
    }

    return action(newState);
  };

  useEffect(() => {
    setState(checked);
  }, [checked]);

  return (
    <SCButtonCheck
      onClick={() => handleOnClick()}
      checked={state}
      disabled={disabled}
      options={options?.option_2.name == "" ? false : options ? true : false}
      textCheck={options?.option_2.name == "" ? true : options ? false : true}
    >
      <SCTextSLight color="black">{children}</SCTextSLight>
      <div className="action-wrapper">
        {withOutOptions || (
          <p className={disabled ? undefined : state ? undefined : "checked"}>
            {options ? options.option_1.name : "No"}
          </p>
        )}

        <div className="checked-button-wrapper">
          <div className="selector" />
        </div>

        {withOutOptions || (
          <p className={disabled ? undefined : state ? "checked" : undefined}>
            {options ? options.option_2.name : "Si"}
          </p>
        )}
      </div>
    </SCButtonCheck>
  );
};

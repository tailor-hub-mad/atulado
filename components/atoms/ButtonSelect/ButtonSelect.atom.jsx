import React, { useState, useEffect } from "react";
import { SCButtonSelect } from "./ButtonSelect.styled";

export const ButtonSelect = ({
  children,
  action,
  color,
  disabled = false,
  checked = false,
  reset = false,
  ...props
}) => {
  const [state, setState] = useState(checked);

  useEffect(() => {
    if (state !== checked) {
      const newState = !state;
      setState(newState);
    }
  }, [checked]);

  useEffect(() => {
    if (!reset) return;

    setState(false);
  }, [reset]);

  const handleOnClick = () => {
    const newState = !state;
    setState(newState);
    action(newState);
  };
  return (
    <SCButtonSelect
      type="button"
      color={color}
      disabled={disabled}
      checked={state}
      onClick={() => handleOnClick()}
      {...props}
    >
      {children}
    </SCButtonSelect>
  );
};

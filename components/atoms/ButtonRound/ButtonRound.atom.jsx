import React, { useState, useEffect } from "react";
import { SCButtonRound } from "./ButtonRound.styled";

export const ButtonRound = ({
  children,
  action,
  disabled = false,
  checked = false,
}) => {
  const [state, setState] = useState(checked);

  useEffect(() => {
    if (state !== checked) {
      const newState = !state;
      setState(newState);
    }
  }, [checked]);

  const handleOnClick = () => {
    const newState = !state;
    setState(newState);
    action(newState);
  };

  return (
    <SCButtonRound
      disabled={disabled}
      checked={state}
      onClick={() => handleOnClick()}
    >
      <div className="round-wrapper">
        <div className="checked" />
      </div>
      <div className="text-wrapper">
        <p>{children}</p>
      </div>
    </SCButtonRound>
  );
};

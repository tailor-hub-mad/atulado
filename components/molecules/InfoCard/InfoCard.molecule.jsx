import React, { useState, useEffect } from "react";
import { SCInfoCard } from "./InfoCard.styled";

export const InfoCard = ({
  children,
  action,
  checked = false,
  disabled = false,
  withOutCheck = false,
}) => {
  const [state, setState] = useState(checked);

  useEffect(() => {
    if (state !== checked) {
      const newState = !state;
      setState(newState);
    }
  }, [checked]);

  const handleOnClick = () => {
    const newState = state ? true : false;

    setState(newState);
    action(newState);
  };

  return (
    <SCInfoCard checked={state} disabled={disabled}>
      {withOutCheck || (
        <div className="round-wrapper" onClick={() => handleOnClick()}>
          <div className="checked" />
        </div>
      )}

      {disabled || children}
    </SCInfoCard>
  );
};

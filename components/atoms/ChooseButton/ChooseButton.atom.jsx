import React from "react";
import { SCChooseButton } from "./ChooseButton.styled";

export const ChooseButton = ({
  icon,
  children,
  action,
  active = false,
  disabled = false,
}) => {
  return (
    <SCChooseButton active={active} disabled={disabled} onClick={() => action()}>
      {React.cloneElement(icon)}
      <div className="text">
        {
          children
        }
      </div>
    </SCChooseButton>
  );
};

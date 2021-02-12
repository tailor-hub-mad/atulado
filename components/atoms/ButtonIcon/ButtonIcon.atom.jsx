import React from "react";
import { SCTag } from "../Tag/Tag.styled";
import { SCButtonIcon } from "./ButtonIcon.styled";

export const ButtonIcon = ({
  icon,
  withoutTag = false,
  children,
  action,
  active = false,
  disabled = false,
}) => {
  return (
    <SCButtonIcon active={active} disabled={disabled} onClick={() => action()}>
      {React.cloneElement(icon)}
      {withoutTag || <SCTag className="tag-wrapper">{children}</SCTag>}
    </SCButtonIcon>
  );
};

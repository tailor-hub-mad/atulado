import React, { useState, useRef } from "react";
import { withTheme } from "styled-components";
import HelpIcon from "../../icons/Help";
import { SCHelper } from "./Helper.styled";
import useClickOutside from "../../../hooks/useClickOutside";

export const Helper = withTheme(({ children, theme }) => {
  const [state, setState] = useState(false);

  const handleOnClick = () => {
    const newState = !state;
    setState(newState);
  };

  const iconRef = useRef();

  useClickOutside(iconRef, () => setState(false));

  return (
    <SCHelper checked={state} ref={iconRef}>
      <div className="icon-wrapper" onClick={() => handleOnClick()}>
        <HelpIcon
          color={state ? theme.color.white : theme.color.primary}
          bgColor={state ? theme.color.primary : theme.color.white}
        />
      </div>
      {children && state && <div className="helper-wrapper">{children}</div>}
    </SCHelper>
  );
});

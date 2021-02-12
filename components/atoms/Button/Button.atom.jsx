import React, { useCallback } from "react";
import { oneOf, string, func, objectOf, number, bool } from "prop-types";
import { SCButton } from "./Button.styled";

export default function Button({
  children,
  style,
  className,
  buttonType,
  type,
  title,
  disabled,
  onClick,
  onKeyUp,
}) {
  const handleKeyUp = useCallback(
    (e) => {
      // Si es el Enter
      if (e.keyCode === 13) {
        if (onKeyUp) {
          onKeyUp();
        } else if (onClick) {
          onClick();
        }
      }
    },
    [onKeyUp, onClick]
  );
  return (
    <SCButton
      style={style}
      className={className}
      type={type}
      buttonType={buttonType}
      onClick={onClick}
      onKeyUp={handleKeyUp}
      title={title}
      disabled={disabled}
    >
      {children}
    </SCButton>
  );
}

Button.propTypes = {
  children: string,
  className: string,
  style: objectOf(oneOf([string, number])),
  buttonType: oneOf(["primary", "secondary"]),
  type: oneOf(["button", "submit"]),
  title: string,
  disabled: bool,
  onClick: func,
  onKeyUp: func,
};

Button.defaultProps = {
  children: "",
  className: "",
  style: null,
  buttonType: "primary",
  type: "button",
  title: "",
  disabled: false,
  onClick: null,
  onKeyUp: null,
};

import React from "react";
import { SCCard } from "./Card.styled";

export const Card = ({ children, button, image }) => {
  const handleClick = () => {
    button.action();
  };

  return (
    <SCCard>
      <div className="card-wrapper">
        <div className="text-wrapper">{children}</div>
        {button?.text && (
          <button
            className={button?.action ? "action-button" : "cancel-button"}
            onClick={handleClick}
          >
            {button.action ? button.text : "Cancelar"}
          </button>
        )}
      </div>
      <div>{React.cloneElement(image)}</div>
    </SCCard>
  );
};

import React from "react";
import { SCModal } from "./Modal.styled";
import CloseIcon from "../../../public/icon/close_icon.svg";

export const Modal = ({ children, closeAction, type }) => {
  return (
    <SCModal type={type}>
      <div className="modal-wrapper">
        <div className="icon-wrapper" onClick={() => closeAction()}>
          <CloseIcon />
        </div>
        <div className="info-wrapper">{children}</div>
      </div>
    </SCModal>
  );
};

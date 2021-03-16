import React from "react";

import { SCProcessModal } from "./ProcessModal.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { Modal } from "../../../molecules/Modal/Modal.molecule";
import Button from "../../../atoms/Button/Button.atom";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";

export const ProcessModal = ({
  setCloseManagementModal,
  handleDeleteManagement,
  index,
  errorMessage
}) => {
  return (
    <Modal closeAction={() => setCloseManagementModal(false)}>
      <SCProcessModal>
        <div className="title-modal-wrapper">
          <SCTextXL>¿Estás seguro que quieres cancelar esta gestión?</SCTextXL>
        </div>

        <div className="button-modal-wrapper">
          <Button
            className="button-white"
            onClick={() => setCloseManagementModal(false)}
          >
            Cancelar
          </Button>
          <Button onClick={() => handleDeleteManagement(index)}>Aceptar</Button>
        </div>
        {errorMessage && (
          <SCTextSLight className="error-message" color="red">
            {errorMessage}
          </SCTextSLight>
        )}
      </SCProcessModal>
    </Modal>
  );
};

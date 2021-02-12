import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import { SCUnsubscriptionModal } from "./UnsubscriptionModal.styled";
import { SCTextXL } from "../../../../atoms/Text/TextXL.styled";
import { Modal } from "../../../../molecules/Modal/Modal.molecule";
import Button from "../../../../atoms/Button/Button.atom";

export const UnsubscriptionModal = ({ closeAction, action, index }) => {
  return (
    <Modal closeAction={closeAction}>
      <SCUnsubscriptionModal>
        <div className="title-modal-wrapper">
          <SCTextXL>¿Estás seguro que quiere dar de baja el contrato?</SCTextXL>
        </div>

        <div className="button-modal-wrapper">
          <Button className="button-white" onClick={closeAction}>
            Cancelar
          </Button>
          <Button onClick={action}>Aceptar</Button>
        </div>
      </SCUnsubscriptionModal>
    </Modal>
  );
};

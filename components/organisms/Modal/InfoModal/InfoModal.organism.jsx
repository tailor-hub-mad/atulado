import React from "react";

import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextM } from "../../../atoms/Text/TextM.styled";
import { Modal } from "../../../molecules/Modal/Modal.molecule";
import { Logo } from "../../../atoms/Logo/Logo.atom";
import Button from "../../../atoms/Button/Button.atom";

export const InfoModal = ({ setOpenInfoModal, openInfoModal }) => {
  const handleCloseInfoModal = () => {
    const newOpenInfoModal = { ...openInfoModal };
    newOpenInfoModal["open"] = false;
    newOpenInfoModal["message"] = "";
    setOpenInfoModal(newOpenInfoModal);
  };

  return (
    <Modal closeAction={handleCloseInfoModal}>
      <div className="modal">
        <SCTextXL>{openInfoModal.message}</SCTextXL>
        <SCTextM>
          Pronto tendrás noticias nuestras. Gracias por contactar con{" "}
          <span className="proxima">
            <span className="blue">Próxima</span>
            <span className="green">energía</span>
          </span>
        </SCTextM>
      </div>
      <Logo type="logo" className="logo" />
      <Button onClick={handleCloseInfoModal}>Aceptar</Button>
    </Modal>
  );
};

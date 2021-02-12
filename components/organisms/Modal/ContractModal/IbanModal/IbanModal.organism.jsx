import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import { SCIbanModal } from "./IbanModal.styled";
import { SCTextXL } from "../../../../atoms/Text/TextXL.styled";
import { Modal } from "../../../../molecules/Modal/Modal.molecule";
import Button from "../../../../atoms/Button/Button.atom";
import { InputText } from "../../../../atoms/Input/Input.atom";

import { updateContractIban } from "../../../../../lib/api/contract";

import { useAuth } from "../../../../../context";

export const IbanModal = ({ closeAction, action }) => {
  const methods = useForm({
    mode: "onBlur",
  });

  const onSubmit = (dataInputs) => {
    const { iban } = dataInputs;
    action(iban);
  };

  return (
    <Modal closeAction={closeAction}>
      <SCIbanModal>
        <div className="title-modal-wrapper">
          <SCTextXL>Cambiar IBAN</SCTextXL>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputText
              label="IBAN o Número de cuenta bancaria (CCC)"
              name={"iban"}
              validation={{
                required: true,
              }}
            />
            <div className="button-modal-wrapper">
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </FormProvider>
      </SCIbanModal>
    </Modal>
  );
};

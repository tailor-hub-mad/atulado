import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextM } from "../../../atoms/Text/TextM.styled";
import { SCTextXSLight } from "../../../atoms/Text/TextXS.styled";
import { Modal } from "../../../molecules/Modal/Modal.molecule";
import Button from "../../../atoms/Button/Button.atom";
import { ButtonCheck } from "../../../atoms/ButtonCheck/ButtonCheck.atom";
import { InputText, InputTextArea } from "../../../atoms/Input/Input.atom";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";

import { useAuth } from "../../../../context";
import { claimInvoice } from "../../../../lib/api/invoice";

import { PRIVACY_POLICY } from "../../../../utils/constants";

export const ClaimInvoceModal = ({
  setOpenClaimInvoiceModal,
  openClaimInvoiceModal,
  setOpenInfoModal,
  openInfoModal,
}) => {
  const [requiredData, setRequiredData] = useState(false);

  const { user } = useAuth();

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const onSubmit = async (values) => {
    const claimData = {
      name: values["claim-name"],
      lastName: values["claim-surname"],
      phone: values["claim-phone"],
      email: values["claim-email"],
      comment: values["claim-comment"],
    };

    const { contract, invoice } = openClaimInvoiceModal.info;

    const response = await claimInvoice(
      user.roleCode,
      user.UserId,
      contract,
      invoice,
      claimData
    );

    if (response?.error) {
      return;
    }

    setOpenClaimInvoiceModal({
      open: false,
      info: {
        contract: null,
        invoice: null,
      },
    });

    const newOpenInfoModal = { ...openInfoModal };
    newOpenInfoModal["open"] = true;
    newOpenInfoModal["message"] = "Hemos recibido tú solicitud de reclamación.";
    setOpenInfoModal(newOpenInfoModal);
  };

  const handleCloseInfoModal = () => {
    setOpenClaimInvoiceModal({
      open: false,
      info: {
        contract: null,
        invoice: null,
      },
    });
  };

  return (
    <Modal closeAction={handleCloseInfoModal} type="claim">
      <div className="claim-modal">
        <div className="claim-modal-title">
          <SCTextXL>Reclamar factura</SCTextXL>
          <SCTextM>
            Pronto tendrás noticias nuestras. Gracias por contactar con{" "}
            <span className="proxima">
              <span className="blue">Próxima</span>
              <span className="green">energía</span>
            </span>
          </SCTextM>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="form-wrapper"
          >
            <InputText
              label="Nombre"
              name="claim-name"
              validation={{
                required: true,
              }}
            />
            <InputText
              label="Apellidos"
              name="claim-surname"
              validation={{
                required: true,
              }}
            />
            <InputText
              label="Email"
              name="claim-email"
              validation={{
                required: true,
              }}
            />
            <InputText
              label="Teléfono"
              name="claim-phone"
              validation={{
                required: true,
              }}
            />

            <InputTextArea
              label="Comentarios"
              name="claim-comment"
              validation={{
                required: true,
              }}
            />

            <div className="policy-wrapper">
              <ButtonCheck
                withOutOptions
                action={(value) => setRequiredData(value)}
              />
              <SCTextSLight color="black">
                He leído y acepto la
                <span>
                  {" "}
                  <a href="" target="_blank">
                    política de privacidad
                  </a>{" "}
                </span>
                y
                <span>
                  {" "}
                  <a href="" target="_blank">
                    condiciones generales
                  </a>
                </span>
                .
              </SCTextSLight>
            </div>

            <div className="submit">
              <Button type="submit" disabled={!requiredData}>
                Reclamar
              </Button>
            </div>
          </form>
        </FormProvider>

        <SCTextXSLight color="black">{PRIVACY_POLICY}</SCTextXSLight>
      </div>
    </Modal>
  );
};

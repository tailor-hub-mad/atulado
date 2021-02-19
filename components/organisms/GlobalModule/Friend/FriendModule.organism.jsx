import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { SCFriendModule } from "./FriendModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import Button from "../../../atoms/Button/Button.atom";
import { InputText } from "../../../atoms/Input/Input.atom";
import { InfoModal } from "../../Modal/InfoModal/InfoModal.organism";

import { createFriendCampaign } from "../../../../lib/api/friend";
import { useAuth } from "../../../../context";

export const FriendModule = ({}) => {
  const [errorMessage, setErrorMessage] = useState();
  const [openInfoModal, setOpenInfoModal] = useState({
    message: null,
    open: false,
  });

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const { user } = useAuth();

  const onSubmit = async (data) => {
    const { contract_from, contract_to } = data;

    if (!contract_from || !contract_to) return;

    const response = await createFriendCampaign(
      user.roleCode,
      user.UserId,
      String(contract_from),
      String(contract_to)
    );

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      setOpenInfoModal({
        open: true,
        message: "Hemos generado una nueva campaña amigo.",
      });
    }

    setTimeout(() => {
      setErrorMessage();
    }, 5000);
  };

  return (
    <>
      {openInfoModal.open && (
        <InfoModal
          setOpenInfoModal={setOpenInfoModal}
          openInfoModal={openInfoModal}
        />
      )}
      <SCFriendModule>
        <div className="data-wrapper">
          <SCTextXL color="primary">Mis Datos:</SCTextXL>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="friend-wrapper">
                <InputText
                  label="Contrato original"
                  name="contract_from"
                  placeholder="Añade el código de contrato Original (COM/02017)"
                  validation={{
                    required: true,
                  }}
                />
                <div />

                <InputText
                  label="Contratro destino"
                  name="contract_to"
                  placeholder="Añade el código de contrato destino (COM/02017)"
                  validation={{
                    required: true,
                  }}
                />
              </div>

              <div className="action-wrapper">
                <div>
                  <Button type="submit">Aplicar</Button>

                  {errorMessage && (
                    <SCTextSLight className="info-message" color="red">
                      {errorMessage}
                    </SCTextSLight>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </SCFriendModule>
    </>
  );
};

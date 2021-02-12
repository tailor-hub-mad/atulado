import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { SCFriendModule } from "./FriendModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import Button from "../../../atoms/Button/Button.atom";
import { InputText } from "../../../atoms/Input/Input.atom";

export const FriendModule = ({}) => {
  const [errorMessage, setErrorMessage] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const { getValues } = useForm();

  const onSubmit = async (data) => {
    // if (response?.error) {
    //   setErrorMessage(response.error);
    // } else {
    //   const newOpenInfoModal = { ...openInfoModal };
    //   newOpenInfoModal["open"] = true;
    //   newOpenInfoModal["message"] =
    //     "Hemos recibido tu solicitud de actualzación";
    //   setOpenInfoModal(newOpenInfoModal);
    // }
    // setHaveChange(false);
    // setTimeout(() => {
    //   setErrorMessage();
    // }, 5000);
  };

  useEffect(() => {
    if (!getValues()["contract_from"] || !getValues()["contract_to"]) return;

    if (
      getValues()["contract_from"] == "" ||
      getValues()["contract_to"] == ""
    ) {
      return setIsDisabled(true);
    }

    return setIsDisabled(false);
  }, [getValues()]);

  return (
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
                <Button type="submit" disabled={isDisabled}>
                  Aplicar
                </Button>

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
  );
};

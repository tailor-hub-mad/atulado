import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";

import { SCPassword } from "./Password.styled";
import { SCTextXL } from "../../atoms/Text/TextXL.styled";
import { Navbar } from "../../molecules/Navbar/Navbar.molecule";
import { InputPassword, InputText } from "../../atoms/Input/Input.atom";
import { SCTextSLight } from "../../atoms/Text/TextS.styled";
import Button from "../../atoms/Button/Button.atom";
import { Logo } from "../../atoms/Logo/Logo.atom";
import { SCTextM } from "../../atoms/Text/TextM.styled";

import {
  updatePassword,
  forgotPassword,
  updatePasswordToken,
} from "../../../lib/api/account";

import {
  SEND_RECOVER_PASSWORD,
  NOT_ALLOWED_RECOVER_PASSWORD,
  PASSWORD_MUST_BE_EQUAL,
} from "../../../utils/constants";

export default function PasswordTemplate({ action = "create" }) {
  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const { user } = useAuth();
  const router = useRouter();

  const { user: userRoute, token: tokenRoute } = router.query;

  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");

  const onSubmit = async (values) => {
    switch (action) {
      case "recover":
        if (!tokenRoute && !userRoute) {
          return setErrorMessage(NOT_ALLOWED_RECOVER_PASSWORD);
        }

        const { passwordHash, repeatPasswordHash } = values;

        if (passwordHash !== repeatPasswordHash)
          return setErrorMessage(PASSWORD_MUST_BE_EQUAL);

        const responseRecoverPassword = await updatePasswordToken({
          userId: userRoute,
          token: tokenRoute,
          newPasswordHash: passwordHash,
        });

        // -> Pendiente de respuesta con el token que traer el correo.

        // if (responseRecoverPassword?.error) {
        //   setErrorMessage(responseRecoverPassword.error);
        // } else {
        //   setInfoMessage(SEND_RECOVER_PASSWORD);
        // }

        // setTimeout(() => {
        //   setErrorMessage();
        //   setInfoMessage();
        // }, 5000);

        break;

      case "send":
        const { nif } = values;
        const responseForgotPassword = await forgotPassword(nif);

        if (responseForgotPassword?.error) {
          setErrorMessage(responseForgotPassword.error);
        } else {
          setInfoMessage(SEND_RECOVER_PASSWORD);
        }

        setTimeout(() => {
          setErrorMessage();
          setInfoMessage();
        }, 5000);

        break;

      case "change":
        const { oldPasswordHash, newPasswordHash } = values;
        const updatePasswordResponse = await updatePassword(
          user.roleCode,
          user.UserId,
          {
            oldPasswordHash: oldPasswordHash,
            newPasswordHash: newPasswordHash,
          }
        );

        if (updatePasswordResponse?.error) {
          setErrorMessage(updatePasswordResponse?.error);

          setTimeout(() => {
            setErrorMessage();
          }, 5000);

          return;
        }

        router.push("/");

        break;
      default:
        // create password
        break;
    }
  };

  useEffect(() => {
    switch (action) {
      case "recover":
      case "send":
        setTitle("Recuperar contraseña");
        setButtonText("Enviar");
        break;
      case "change":
        setTitle("Cambiar contraseña");
        setButtonText("Cambiar contraseña");
        break;
      default:
        setTitle("Crea tu contraseña");
        setButtonText("Crear contraseña");
        break;
    }
  }, [action]);

  return (
    <SCPassword>
      <div className="nav-mobile-wrapper">
        <Navbar
          optionList={[
            { option: "Tarifas", link: "/", visible: true },
            { option: "Contratar", link: "/", visible: true },
            { option: "Área cliente", link: "/", visible: true },
          ]}
          withoutMenu
        />
      </div>

      <nav className="nav-desktop-wrapper">
        <Logo height="15%" width="15%" type="text" />
        <div className="options-wrapper">
          <SCTextM>
            <a href="">Tarifas</a>
          </SCTextM>
          <SCTextM>
            <a href="">Contratar</a>
          </SCTextM>
          <SCTextM>
            <a href="">Área cliente</a>
          </SCTextM>
        </div>
      </nav>
      <div className="login-wrapper">
        <div className="login-card">
          <SCTextXL className="page-title">{title}</SCTextXL>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="form-wrapper"
            >
              {action == "recover" && (
                <>
                  <InputPassword
                    label="Nueva contraseña"
                    name="passwordHash"
                    validation={{
                      required: true,
                    }}
                    className="login-input"
                  />
                  <InputPassword
                    label="Repite tu nueva contraseña"
                    name="repeatPasswordHash"
                    validation={{
                      required: true,
                    }}
                    className="login-input"
                  />
                </>
              )}
              {action == "change" && (
                <>
                  <InputPassword
                    label="Contraseña actual"
                    name="oldPasswordHash"
                    validation={{
                      required: true,
                    }}
                    className="login-input"
                  />
                  <InputPassword
                    label="Contraseña nueva"
                    name="newPasswordHash"
                    validation={{
                      required: true,
                    }}
                    className="login-input"
                  />
                </>
              )}

              {action == "send" && (
                <InputText
                  label="DNI / NIF"
                  name="nif"
                  validation={{
                    required: true,
                  }}
                  className="login-input"
                />
              )}

              {errorMessage && (
                <SCTextSLight className="error-message" color="red">
                  {errorMessage}
                </SCTextSLight>
              )}

              {infoMessage && (
                <SCTextSLight color="primary">{infoMessage}</SCTextSLight>
              )}

              <div className="button-wrapper">
                <Button type="submit">{buttonText}</Button>
              </div>

              {action == "send" && (
                <Link href="/login-cliente">
                  <a>
                    <SCTextSLight color="black" className="forgot-password">
                      ¿Quieres iniciar sesión?
                    </SCTextSLight>
                  </a>
                </Link>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </SCPassword>
  );
}

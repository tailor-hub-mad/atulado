import React, { useState } from "react";
import { SCTextXL } from "../../atoms/Text/TextXL.styled";
import { SCLogin } from "./Login.styled";
import { FormProvider, useForm } from "react-hook-form";
import { InputPassword, InputText } from "../../atoms/Input/Input.atom";
import Button from "../../atoms/Button/Button.atom";
import { SCTextSLight } from "../../atoms/Text/TextS.styled";
import Link from "next/link";
import { useAuth } from "../../../context";
import { useRouter } from "next/router";
import { Logo } from "../../atoms/Logo/Logo.atom";
import { SCTextM } from "../../atoms/Text/TextM.styled";

export default function LoginTemplate({ role = "cliente" }) {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const getRoleCode = () => {
    switch (role) {
      case "administrador":
        return 1;
      case "gestor":
        return 2;
      case "cliente":
        return 3;
      default:
        return 3;
    }
  };
  const onSubmit = async (values) => {
    const result = await login(values, getRoleCode());

    const { error } = result;
    if (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } else {
      router.push("/global");
    }
  };

  return (
    <SCLogin>
      <div className="nav-wrapper">
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
      </div>
      <div className="login-wrapper">
        <div className="login-card">
          <SCTextXL className="page-title">Área {role}</SCTextXL>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="form-wrapper"
            >
              <InputText
                label="DNI / NIE / CIF"
                name="nif"
                validation={{
                  required: true,
                }}
                className="login-input"
              />
              <InputPassword
                label="Contraseña"
                name="passwordHash"
                validation={{
                  required: true,
                }}
                className="login-input"
              />
              {errorMessage && (
                <SCTextSLight className="error-message">
                  {errorMessage}
                </SCTextSLight>
              )}
              <div className="button-wrapper">
                <Button type="submit">Acceder</Button>
              </div>
            </form>
            <Link href="/pass-enviar-recuperar">
              <a>
                <SCTextSLight color="black" className="forgot-password">
                  ¿Has olvidado tu contraseña?
                </SCTextSLight>
              </a>
            </Link>
          </FormProvider>
        </div>
      </div>
      {role === "cliente" && (
        <SCTextSLight color="white" className="change-login">
          ¿Eres{" "}
          <Link href="/login-gestor">
            <a>
              <span>Gestor</span>
            </a>
          </Link>{" "}
          o{" "}
          <Link href="/login-administrador">
            <a>
              <span>Administrador</span>
            </a>
          </Link>
          ?
        </SCTextSLight>
      )}
      {role !== "cliente" && (
        <SCTextSLight color="white" className="change-login">
          <Link href="/login-cliente">
            <a>Volver a cliente</a>
          </Link>
        </SCTextSLight>
      )}
    </SCLogin>
  );
}

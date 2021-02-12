import React from "react";
import { Logo } from "../../atoms/Logo/Logo.atom";
import { SCTextM } from "../../atoms/Text/TextM.styled";
import { SCTextXL } from "../../atoms/Text/TextXL.styled";
import { SCDownloadScreen } from "./DownloadScreen.styled";

export default function DownloadScreen({ error }) {
  return (
    <SCDownloadScreen>
      <div className="modal">
        <div>
          {error ? (
            <SCTextXL color="red">
              Ha ocurrido un error en la descarga de tus documentos...
            </SCTextXL>
          ) : (
            <SCTextXL>Estamos descargando tus documentos...</SCTextXL>
          )}

          {error ? (
            <SCTextM color="red">
              Por favor, vuelva a intentarlo más tarde.
            </SCTextM>
          ) : (
            <SCTextM>esta acción puede tardar unos segundos</SCTextM>
          )}
        </div>

        <Logo type="logo" className="logo" />
      </div>
    </SCDownloadScreen>
  );
}

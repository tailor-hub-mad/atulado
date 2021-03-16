import React, { useState, useEffect } from "react";
import { SCHowModule } from "./HowModule.styled";
import { SCTextXSLight } from "../../../atoms/Text/TextXS.styled";
import { ButtonCheck } from "../../../atoms/ButtonCheck/ButtonCheck.atom";
import { ButtonFile } from "../../../atoms/ButtonFile/ButtonFile.atom";
import { Tip } from "../../../atoms/Tip/Tip.atom";

export const HowModule = ({
  summaryData,
  setSummaryData,
  extraDataRegister,
  setExtraDataRegister,
  defaultInfoUpdateContract,
  attachmentFile,
  setAttachmentFile,
  changeTitularyProp
}) => {
  const [changeTitulary, setChangeTitulary] = useState(false);
  const [paperInvoice, setPaperInvoice] = useState(false);
  const [isSubrogate, setIsSubrogate] = useState(false);
  const [openInfoAttachment, setOpenInfoAttachment] = useState(true);

  const handleCheckButton = (name, value) => {
    if (name == "electronic_invoice") {
      setPaperInvoice(value);

      const newSummaryData = { ...summaryData };

      newSummaryData["contract"] = {
        ...newSummaryData["contract"],
        paperInvoice: value,
      };

      setSummaryData(newSummaryData);
    }

    if (name == "previous_contract") {
      setIsSubrogate(value);
    }

    if (name == "change_titularity") {
      setChangeTitulary(value);

      if (!value) {
        setOpenInfoAttachment(true);

        const newAttachmentFile = { ...attachmentFile };
        newAttachmentFile["change_titularity_doc"] = undefined;
        setAttachmentFile(newAttachmentFile);
      }
    }

    if (name == "change_titularity_doc") {
      const newAttachmentFile = { ...attachmentFile };
      newAttachmentFile[name] = {
        fileName: value.name,
        content: value.content,
        mimeType: value.type,
      };

      setAttachmentFile(newAttachmentFile);
      return;
    }

    const newExtraDataRegister = { ...extraDataRegister };
    if (name == "electronic_invoice") {
      newExtraDataRegister[name] = !value;
    } else {
      newExtraDataRegister[name] = value;
    }

    setExtraDataRegister(newExtraDataRegister);
  };

  useEffect(() => {
    if (!defaultInfoUpdateContract) return;

    const {
      eInvoice,
      Subrogation,
      HolderChange,
    } = defaultInfoUpdateContract.contract;

    const newExtraDataRegister = { ...extraDataRegister };
    newExtraDataRegister[electronic_invoice] = eInvoice;

    setExtraDataRegister(newExtraDataRegister);
    setIsSubrogate(Subrogation);
    if (changeTitularyProp) {
      setChangeTitulary(changeTitularyProp);
      handleCheckButton("change_titularity", changeTitularyProp)
    } else {
      setChangeTitulary(HolderChange);
    }
    setPaperInvoice(!eInvoice);
  }, [defaultInfoUpdateContract]);

  return (
    <SCHowModule>
      <ButtonCheck
        checked={changeTitulary}
        action={(value) => handleCheckButton("change_titularity", value)}
      >
        ¿Es un cambio de titularidad?
      </ButtonCheck>

      {changeTitulary && (
        <>
          <div className="file-wrapper">
            <SCTextXSLight color="black">
              Necesitamos que añadas una nota simple, escritura de compraventa,
              contrato de arrendamiento o declaración de herederos.
            </SCTextXSLight>
            <ButtonFile
              action={(value) => {
                handleCheckButton("change_titularity_doc", value);
                setOpenInfoAttachment(false);
              }}
            >
              Adjuntar archivo
            </ButtonFile>
          </div>
          {openInfoAttachment && (
            <div className="tip-wrapper">
              <Tip type="warning">
                <p>
                  ¿No tienes la documentación a mano? no te preocupes, puedes
                  completar el regsistro y adjuntarnos la documentación más
                  adelante desde la sección Gestiones de tu área cliente.
                </p>
              </Tip>
            </div>
          )}
        </>
      )}

      {changeTitulary && (
        <>
          <ButtonCheck
            checked={isSubrogate}
            action={(value) => handleCheckButton("previous_contract", value)}
          >
            ¿Quieres subrogarte al contrato anterior?
          </ButtonCheck>
          <div className="tip-wrapper">
            {isSubrogate ? (
              <Tip type="warning">
                <p>
                  El cambio de titularidad es gratuito, y no tiene costes
                  asociados, pero el nuevo titular se hace responsable del
                  contrato anterior, incluyendo en su caso las deudas.
                </p>
              </Tip>
            ) : (
              <Tip type="warning">
                <p>
                  Al no subrogarte estarás dando de alta un nuevo contrato, y
                  tendrás que abonar a la distribuidora los derechos de enganche
                  que correspondan.
                </p>
              </Tip>
            )}
          </div>
        </>
      )}

      <ButtonCheck
        checked={paperInvoice}
        action={(value) => handleCheckButton("electronic_invoice", value)}
      >
        Factura en papel
      </ButtonCheck>
      {paperInvoice && (
        <div className="tip-wrapper">
          <Tip type="warning">
            <p>
              Este servicio tiene un sobrecoste{" "}
              {summaryData["contract"]?.fee?.paperFee &&
                ` de ${summaryData["contract"]?.fee?.paperFee}`}
              {" €"}. Además, si eliges esta opción, no te podremos enviar
              factura electrónica.
            </p>
          </Tip>
        </div>
      )}
    </SCHowModule>
  );
};

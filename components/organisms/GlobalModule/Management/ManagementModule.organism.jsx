import React from "react";
import { useRouter } from "next/router";

import { SCManagementModule } from "./ManagementModule.styled";

import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { Card } from "../../../atoms/Card/Card.atom";
import { ButtonCheck } from "../../../atoms/ButtonCheck/ButtonCheck.atom";

import ContractIncompleteImage from "../../../../public/image/contract-incomplete_image.svg";
import SignatureImage from "../../../../public/image/signature_image.svg";
import AttachImage from "../../../../public/image/attach_image.svg";
import ContractImage from "../../../../public/image/contract_image.svg";

import {
  validateDocumentation,
  sendReminder,
} from "../../../../lib/api/process";

export const ManagementModule = ({
  options,
  optionsList,
  user,
  setOpenInfoModal,
}) => {
  const router = useRouter();

  const handleSendReminder = async (processId) => {
    const { error } = sendReminder(user.roleCode, processId);

    setOpenInfoModal({ open: true, message: "Se ha enviado el recordatorio." });
  };

  const handleAction = (type) => {
    const { CUPS, ProcessId, RegistrationId } = options;

    switch (type) {
      case 1:
      case 2:
        return router.push(
          `/alta?refWindow=1&cups=${CUPS}&updateProcess=true&proccessId=${RegistrationId}`
        );
      case 3:
        return router.push(
          `/alta?refWindow=3&cups=${CUPS}&updateProcess=true&proccessId=${RegistrationId}`
        );

      case 5:
      case 6:
        handleSendReminder(ProcessId);
        break;

      default:
        return null;
    }
  };

  const handleText = (type) => {
    switch (type) {
      case 1:
      case 2:
      case 3:
        return "Revisar proceso";

      case 5:
      case 6:
        return "Enviar recordatorio";

      default:
        return null;
    }
  };

  const handleImage = (type) => {
    switch (type) {
      case 1:
      case 2:
      case 3:
        return <AttachImage />;

      case 4:
        return <ContractImage />;
      case 5:
      case 6:
        return <SignatureImage />;

      default:
        return <ContractIncompleteImage />;
    }
  };

  const handleDescription = (description) => {
    const keyWords = [/\b(BIE)\b/i, /\b([A-Z])+\b/, /\b([0-9])+\b/];

    return description.split(" ").map((element, index) => {
      const match = keyWords.some((key) => element.match(RegExp(key)));

      return match ? (
        <span key={index} className="important">
          {element}{" "}
        </span>
      ) : (
        <span key={index}>{element} </span>
      );
    });
  };

  const handleValidateAllOptions = (value) => {
    if (!value) return;

    const { RegistrationId, ProcessId } = options;

    const { error } = validateDocumentation(
      user.roleCode,
      user.UserId,
      ProcessId,
      RegistrationId
    );

    if (error) {
      // handle error
    }
  };

  const handleClickReturn = () => {
    const {
      returnPageContract,
      contractList,
      _contractId,
      returnPageClient,
      clientDetail,
      clientData,
    } = options;

    if (returnPageContract) {
      optionsList("contract", {
        contractId: _contractId,
        contractList,
      });
    } else if (returnPageClient) {
      optionsList("client", {
        clientDetail,
        clientData,
      });
    } else {
      optionsList("home");
    }
  };

  return (
    <SCManagementModule>
      <div className="title-wrapper">
        <SCTextXL color="primary">
          <span className="link" onClick={handleClickReturn}>
            {options.returnPageContract ? "Gestiones contrato" : "Gestiones"}
          </span>
          <span>{" >"}</span>{" "}
          {options.returnPageContract
            ? options._contractId
            : options.CUPS
            ? options.CUPS
            : options.ContractCode}
        </SCTextXL>
        {options?.Alerts?.length == 0 || (
          <ButtonCheck
            action={handleValidateAllOptions}
            options={{
              option_2: {
                name: "",
                type: true,
              },
              option_1: {
                name: "Documentación validada",
                type: false,
              },
            }}
          />
        )}
      </div>

      {options?.Alerts?.length == 0 ? (
        <div className="empty-alerts-wrapper">
          <SCTextSLight color="black">No hay alertas pendientes</SCTextSLight>
        </div>
      ) : (
        <div className="info-wrapper">
          {options?.Alerts?.map((element, index) => {
            return (
              <Card
                key={index}
                button={{
                  action: () => handleAction(element.AlertType),
                  text: handleText(element.AlertType),
                }}
                image={handleImage(element.AlertType)}
              >
                <p>
                  {handleDescription(element.Description).map(
                    (element) => element
                  )}
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </SCManagementModule>
  );
};

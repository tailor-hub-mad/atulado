import React from "react";

import { SCItemManagement } from "./ItemManagement.styled";
import { SCTextSLight } from "../../atoms/Text/TextS.styled";
import { SCTagManagement } from "../../atoms/TagManagement/TagManagement.styled";
import { ButtonCheck } from "../../atoms/ButtonCheck/ButtonCheck.atom";

import CloseIcon from "../../../public/icon/close_icon.svg";

export const ItemManagement = ({
  data = {},
  closeAction,
  action,
  validateAction,
  user,
}) => {
  const handleColor = (tag) => {
    switch (tag) {
      case "Pendiente":
        return "#FBB040";

      case "En proceso":
        return "#009845";

      case "Cancelado":
        return "#C4C4C4";

      case "Error":
        return "#9B0505";

      default:
        return "#C4C4C4";
    }
  };

  const handleDate = (date) => {
    const formatDate = new Date(date);
    return `${formatDate.getDate()}/${
      formatDate.getMonth() + 1
    }/${formatDate.getFullYear()}`;
  };

  return (
    <SCItemManagement>
      <div className="content-wrapper" onClick={action}>
        <SCTextSLight color="black">
          {data["ProcessTypeDescription"] || "-"}
        </SCTextSLight>

        {data["Status"] ? (
          <SCTagManagement color={handleColor(data["Status"])}>
            {data["Status"]}
          </SCTagManagement>
        ) : (
          <SCTextSLight color="black">-</SCTextSLight>
        )}

        <SCTextSLight color="black">{data["CUPS"] || "-"}</SCTextSLight>

        <SCTextSLight color="black">
          {data["SupplyAddress"] || "-"}
        </SCTextSLight>

        <SCTextSLight color="black">
          {handleDate(data["Created"]) || "-"}
        </SCTextSLight>

        <SCTextSLight color="black">
          {handleDate(data["LastModified"]) || "-"}
        </SCTextSLight>
      </div>

      {user?.roleCode == 3 || (
        <div className="button-check-wrapper">
          <ButtonCheck action={validateAction} withOutOptions />
        </div>
      )}

      <div className="icon-wrapper" onClick={closeAction}>
        <CloseIcon />
      </div>
    </SCItemManagement>
  );
};

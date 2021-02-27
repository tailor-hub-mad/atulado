import React, { useLayoutEffect, useState } from "react";

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
  const [reduceStatus, setReduceStatus] = useState();

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

  const handleStatus = (status) => {
    return reduceStatus ? status.toUpperCase().split("")[0] : status;
  };

  useLayoutEffect(() => {
    if (window.innerWidth <= 800) {
      setReduceStatus(true);
    } else {
      setReduceStatus(false);
    }
  }, []);

  return (
    <SCItemManagement>
      <div className="content-wrapper" onClick={action}>
        <p color="black">{data["ProcessTypeDescription"] || "-"}</p>

        {data["Status"] ? (
          <SCTagManagement color={handleColor(data["Status"])}>
            {handleStatus(data["Status"])}
          </SCTagManagement>
        ) : (
          <p color="black">-</p>
        )}

        <p color="black">{data["CUPS"] || "-"}</p>

        <p className="responsive-wrapper" color="black">
          {data["SupplyAddress"] || "-"}
        </p>

        <p className="responsive-wrapper" color="black">
          {handleDate(data["Created"]) || "-"}
        </p>

        <p className="responsive-wrapper" color="black">
          {handleDate(data["LastModified"]) || "-"}
        </p>
      </div>

      {user?.roleCode == 3 || (
        <div className="responsive-wrapper" className="button-check-wrapper">
          <ButtonCheck action={validateAction} withOutOptions />
        </div>
      )}

      <div className="icon-wrapper" onClick={closeAction}>
        <CloseIcon />
      </div>
    </SCItemManagement>
  );
};

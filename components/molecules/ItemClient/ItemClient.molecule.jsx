import React, { useState } from "react";

import { SCItemClient } from "./ItemClient.styled";
import { SCTextSLight } from "../../atoms/Text/TextS.styled";

export const ItemClient = ({ data = {}, action }) => {
  return (
    <SCItemClient>
      <div className="content-wrapper" onClick={action}>
        <SCTextSLight color="black">{data["Name"] || "-"}</SCTextSLight>
      </div>
    </SCItemClient>
  );
};

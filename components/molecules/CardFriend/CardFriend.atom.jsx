import React from "react";

import { SCTextXL } from "../../atoms/Text/TextXL.styled";
import { SCCardFriend } from "./CardFriend.styled";
import { Helper } from "../../atoms/Helper/Helper.atom";
import Button from "../../atoms/Button/Button.atom";
import { SCTextSMedium, SCTextSLight } from "../../atoms/Text/TextS.styled";

import FacesImage from "../../../public/image/faces_image.svg";

export const CardFriend = ({ options = [], helperAction, cardAction }) => {
  return (
    <SCCardFriend>
      <div className="title-wrapper">
        <SCTextXL>Plan amigo</SCTextXL>
        <div onClick={helperAction}>
          <Helper />
        </div>
      </div>
      <div className="img-faces-wrapper">
        <FacesImage />
      </div>

      <div className="btn-wrapper" onClick={cardAction}>
        <Button>Invitar a un amigo</Button>
      </div>

      <div className="options-wrapper">
        <div>
          <SCTextSMedium color="black">Código</SCTextSMedium>
          <SCTextSMedium className="price-text" color="black">
            Saldo
          </SCTextSMedium>
        </div>

        {options.map((element, index) => {
          return (
            <div key={index}>
              <SCTextSLight color="black">{element.SupplyAddress}</SCTextSLight>
              <SCTextSLight className="price-text" color="black">
                {element.AmigoAmount}
              </SCTextSLight>
            </div>
          );
        })}
      </div>
    </SCCardFriend>
  );
};

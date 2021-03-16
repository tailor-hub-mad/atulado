import { uniqueId } from "lodash";
import Link from "next/link";
import React from "react";
import { SCTextM } from "../../atoms/Text/TextM.styled";
import { SCTextSLight, SCTextSMedium } from "../../atoms/Text/TextS.styled";
import { SCTextXL } from "../../atoms/Text/TextXL.styled";
import { SCTextXSLight, SCTextXSMedium } from "../../atoms/Text/TextXS.styled";
import Arrow from "../../icons/Arrow";
import Check from "../../icons/Check";
import { SCRateCard } from "./RateCard.styled";

import { useAuth } from "../../../context";

export default function RateCard({
  icon,
  description,
  name,
  hours,
  rates,
  ...props
}) {
  const { user } = useAuth();

  const displayHours = () => {
    return hours?.map(({ name, values }) => {
      return (
        <div className="hours-container" key={uniqueId()}>
          <SCTextXSMedium>{name}</SCTextXSMedium>
          {values.map((value) => (
            <SCTextXSLight key={uniqueId()}>{value}</SCTextXSLight>
          ))}
        </div>
      );
    });
  };

  const displayRates = () => {
    return rates.map(({ name, data, info, button }) => {
      return (
        <div className="rate-green-card" key={uniqueId()}>
          <div className="green-card-wrapper">
            <SCTextSMedium className="center-text">{name}</SCTextSMedium>
            <div className="data">
              {data.map((d) => {
                return (
                  <div className="data-item" key={uniqueId()}>
                    <Check />
                    <SCTextSLight>{d}</SCTextSLight>
                  </div>
                );
              })}
            </div>
            <div className="info">
              {Object.keys(info).map((key) => {
                return (
                  <div
                    key={uniqueId()}
                    className={
                      key === "Potencia"
                        ? "potencia-item info-item"
                        : "info-item"
                    }
                  >
                    <SCTextXSLight>{key}</SCTextXSLight>
                    <SCTextXSLight>{info[key]}</SCTextXSLight>
                  </div>
                );
              })}
            </div>
            <div className="link-container center-text">
              <Link
                href={user ? `${button.link}&newContract=true` : button.link}
              >
                <a>
                  <SCTextM>{button.name}</SCTextM>
                  <Arrow />
                </a>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <SCRateCard hours={hours?.length || 1}>
      <div className="card-header">
        {React.cloneElement(icon)}
        <SCTextXL>{name}</SCTextXL>
      </div>
      <SCTextSLight className="rate-description">{description}</SCTextSLight>
      {hours && <div className="hours">{displayHours()}</div>}
      {rates && <div className="rates-cards">{displayRates()}</div>}

      <div className="terms">
        <SCTextXSLight>Válida desde: 01/01/2021</SCTextXSLight>
        <SCTextXSLight>Precios antes de impuesto eléctrico (5,113%) e IVA (21%)</SCTextXSLight>
      </div>
    </SCRateCard>
  );
}

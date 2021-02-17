import React from "react";
import { SCTabBar } from "./TabBar.styled";
import Button from "../../atoms/Button/Button.atom";
import { SCTextSLight } from "../../atoms/Text/TextS.styled";
import { SCTextXSLight } from "../../atoms/Text/TextXS.styled";
import { SCTextM } from "../../atoms/Text/TextM.styled";
import { useAuth } from "../../../context";
import Link from "next/link";

export const TabBar = ({ optionList = [], action, user }) => {
  const { logout } = useAuth();

  return (
    <SCTabBar>
      <div className="options-wrapper">
        <ul>
          {optionList
            .filter((element) => element.visible)
            .map((element, index) => {
              return (
                <li
                  key={index}
                  onClick={() => action(element.name)}
                  className={
                    element.disabled
                      ? "item-disabled"
                      : element.active
                      ? "item-active"
                      : ""
                  }
                >
                  <SCTextM color={element.disabled ? "lightGray" : "white"}>
                    {element.value}
                  </SCTextM>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="actions-wrapper">
        {user?.roleCode != 1 ? (
          <Link href="/tarifas">
            <a>
              <Button className="action-button">Contratar</Button>
            </a>
          </Link>
        ) : (
          <Button
            className="action-button"
            onClick={() => action("client", { addUser: true })}
          >
            Añadir usuario
          </Button>
        )}
        <div onClick={() => logout()}>
          <SCTextSLight color="white">Salir</SCTextSLight>
        </div>

        <div className="policy-wrapper">
          <a href="" target="_blank">
            <SCTextXSLight color="white">
              Politica de privacidad y cookies
            </SCTextXSLight>
          </a>
        </div>
      </div>
    </SCTabBar>
  );
};

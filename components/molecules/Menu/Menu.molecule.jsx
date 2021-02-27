import React, { createRef } from "react";
import { SCMenu } from "./Menu.styled";
import { SCTextM } from "../../atoms/Text/TextM.styled";
import Link from "next/link";
import useClickOutside from "../../../hooks/useClickOutside";
import { useAuth } from "../../../context";

export const Menu = ({ optionList, setState, action }) => {
  const menuRef = createRef();

  const { logout } = useAuth();

  useClickOutside(menuRef, () => setState(false));

  return (
    <SCMenu>
      <nav ref={menuRef}>
        <ul>
          {optionList
            .filter((element) => element.visible)
            .map((element, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    +setState(false);
                    action(element.name);
                  }}
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

        <div className="actions-wrapper">
          <SCTextM onClick={() => logout()} color="black">
            Salir
          </SCTextM>
        </div>
      </nav>
    </SCMenu>
  );
};

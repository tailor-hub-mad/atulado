import React, { createRef } from "react";
import { SCMenu } from "./Menu.styled";
import { SCTextM } from "../../atoms/Text/TextM.styled";
import Link from "next/link";
import useClickOutside from "../../../hooks/useClickOutside";

export const Menu = ({ optionList, setState, action }) => {
  const menuRef = createRef();

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
                  onClick={() => action(element.link)}
                  className={
                    element.disabled
                      ? "item-disabled"
                      : element.active
                      ? "item-active"
                      : ""
                  }
                >
                  <SCTextM color={element.disabled ? "lightGray" : "black"}>
                    {element.option}
                  </SCTextM>
                </li>
              );
            })}
        </ul>

        <div className="actions-wrapper">
          <Link href="">
            <SCTextM color="black">Salir</SCTextM>
          </Link>
        </div>
      </nav>
    </SCMenu>
  );
};

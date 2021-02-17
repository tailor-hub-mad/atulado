import React, { createRef } from "react";
import { SCMenu } from "./Menu.styled";
import { SCTextSMedium } from "../../atoms/Text/TextS.styled";
import Link from "next/link";
import useClickOutside from "../../../hooks/useClickOutside";

export const Menu = ({ optionList, setState, action }) => {
  const menuRef = createRef();

  useClickOutside(menuRef, () => setState(false));

  console.log(optionList);

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
                  <SCTextSMedium
                    color={element.disabled ? "lightGray" : "black"}
                  >
                    {element.option}
                  </SCTextSMedium>
                </li>
              );
            })}
        </ul>

        <div className="actions-wrapper">
          <Link href="">
            <SCTextSMedium color="black">Salir</SCTextSMedium>
          </Link>
        </div>
      </nav>
    </SCMenu>
  );
};

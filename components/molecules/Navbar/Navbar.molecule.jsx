import React, { useState } from "react";
import { SCNavbar } from "./Navbar.styled";
import { Logo } from "../../atoms/Logo/Logo.atom";
import { SCTextSLight } from "../../atoms/Text/TextS.styled";
import { SCTextL } from "../../atoms/Text/TextL.styled";
import { Menu } from "../Menu/Menu.molecule";
import MenuMobileIcon from "../../../public/icon/menu-mobile_icon.svg";

export const Navbar = ({ optionList, action, withoutMenu = false }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  return (
    <SCNavbar>
      <div>
        <Logo mode="white" height="45%" width="45%" type="text" />
      </div>

      <div className="info-wrapper">
        <SCTextL color="white">900 818 852</SCTextL>
      </div>
      {withoutMenu || (
        <div className="menu-wrapper" onClick={() => handleOpenMenu()}>
          <MenuMobileIcon />
        </div>
      )}
      {openMenu && (
        <Menu optionList={optionList} setState={setOpenMenu} action={action} />
      )}
    </SCNavbar>
  );
};

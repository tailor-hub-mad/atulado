import React from "react";
import { Menu } from "../../components/molecules/Menu/Menu.molecule";

export default {
  title: "Molecules/Menu",
};

export const Default = () => (
  <Menu
    optionList={[
      { option: "Home", link: "/", disabled: true },
      { option: "Contratos", link: "/", active: true },
      { option: "Facturas", link: "/" },
      { option: "Perfil", link: "/" },
    ]}
  ></Menu>
);

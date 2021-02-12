import React from "react";
import { TabBar } from "../../components/molecules/TabBar/TabBar.molecule";

export default {
  title: "Molecules/TabBar",
};

export const Default = () => (
  <TabBar
    optionList={[
      { option: "Home", link: "/", disabled: true },
      { option: "Contratos", link: "/", active: true },
      { option: "Facturas", link: "/" },
      { option: "Perfil", link: "/" },
    ]}
  ></TabBar>
);

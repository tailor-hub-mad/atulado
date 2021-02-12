import React from "react";
import { Helper } from "../../components/atoms/Helper/Helper.atom";

export default {
  title: "Atoms/Helper",
};

export const Default = () => (
  <Helper>
    <p>
      El CUPS es código que identifica el punto de suministro de energía de tu
      vivienda y con él podemos averiguar tu potencia, consumo y tarifa de
      acceso.
    </p>
    <p>
      Lo puedes encontrar en tu factura de luz, apartado{" "}
      <span>Datos de Contrato</span>.
    </p>
  </Helper>
);

import React from "react";
import { Tip } from "../../components/atoms/Tip/Tip.atom";

export default {
  title: "Atoms/Tip",
};

export const Info = () => (
  <Tip type="info">
    <p>
      Si tienes permanencia puedes indicarnos la fecha a partir de la cual
      quieres cambiar tu suministro. Nosotros tramitaremos automáticamente tu
      alta a la fecha que nos indiques para que no te penalicen.
    </p>
  </Tip>
);

export const Warning = () => (
  <Tip type="warning">
    <p>
      Si tienes permanencia puedes indicarnos la fecha a partir de la cual
      quieres cambiar tu suministro. Nosotros tramitaremos automáticamente tu
      alta a la fecha que nos indiques para que no te penalicen.
    </p>
  </Tip>
);

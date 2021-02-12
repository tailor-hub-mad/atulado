import React from "react";
import { Card } from "../../components/atoms/Card/Card.atom";

import SignatureImage from "../../public/image/signature_image.svg";
import AttachActiveImage from "../../public/image/attach-active_image.svg";

export default {
  title: "Atoms/Card",
};

export const Action = () => (
  <Card
    image={<SignatureImage />}
    button={{
      action: () => console.log("Execute action!"),
      text: "Firmar contrato",
    }}
  >
    <p>
      <span className="title">¡Hey!</span> Acuerdate de firmar tu contrato
      Signaturit de C/Virgen del <span className="uppercase">AMP 5 3B</span>.
    </p>
  </Card>
);
export const Cancel = () => (
  <Card
    image={<AttachActiveImage />}
    button={{ cancel: () => console.log("Execute cancel action!") }}
  >
    <p>
      <span className="subtitle">Necesitamos que adjuntes:</span>{" "}
      <span className="important">Documentación</span>
      acreditativa para{" "}
      <span className="important">
        cambio titularidad contrato suministro
      </span>{" "}
      de
      <span className="uppercase"> C/ RODRIGO LAMENTO5 2B</span>.
    </p>
  </Card>
);

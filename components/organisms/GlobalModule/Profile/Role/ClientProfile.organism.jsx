import React, { useLayoutEffect, useState } from "react";

import { InputText } from "../../../../atoms/Input/Input.atom";

export const ClientProfile = ({ data, setHaveChange }) => {
  const [screenSizeMobile, setScreenSizeMobile] = useState();

  const handleHaveChenge = (value) => {
    if (value == "") return;
    setHaveChange(true);
  };

  useLayoutEffect(() => {
    if (window.innerWidth <= 769) {
      setScreenSizeMobile(true);
    } else {
      setScreenSizeMobile(false);
    }
  }, []);

  return (
    <div className="client-wrapper">
      <InputText
        disabled
        label="DNI / NIE"
        name="client_dni"
        placeholder={data?.NIF}
      />
      {screenSizeMobile || <div />}

      <InputText
        disabled
        label="Nombre"
        name="client_name"
        placeholder={data?.Name}
      />
      <InputText
        disabled
        label="Apellidos"
        name="client_surname"
        placeholder={data?.LastName}
      />
      <InputText
        label="Email"
        name="client_email"
        placeholder={data?.Email}
        validation={{
          validate: async (value) => handleHaveChenge(value),
        }}
      />
      <InputText
        label="Nº de teléfono"
        name="client_phone"
        placeholder={data?.PhoneNumber}
        validation={{
          validate: async (value) => handleHaveChenge(value),
        }}
      />
    </div>
  );
};

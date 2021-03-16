import React, { useLayoutEffect, useState } from "react";

import { InputText } from "../../../../atoms/Input/Input.atom";

export const CompanyProfile = ({ data, setHaveChange }) => {
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
    <div className="company-wrapper">
      <InputText
        disabled
        label="CIF empresa"
        name="company_cif"
        placeholder={data?.LegalNIFCIF}
      />
      {screenSizeMobile || <div />}
      <InputText
        disabled
        label="Nombre empresa"
        name="company_name"
        placeholder={data?.Name}
      />
      {screenSizeMobile || <div />}
      <InputText
        disabled
        label="DNI / NIE"
        name="company_dni"
        placeholder={data?.NIF}
      />
      {screenSizeMobile || <div />}
      <InputText
        disabled
        label="Nombre"
        name="company_name"
        placeholder={data?.LegalName}
      />
      <InputText
        disabled
        label="Apellidos"
        name="company_surname"
        placeholder={data?.LegalLastName}
      />
      <InputText
        label="Email"
        name="company_email"
        placeholder={data?.Email}
        defaultValue={data?.Email}
        validation={{
          validate: async (value) => handleHaveChenge(value),
        }}
      />
      <InputText
        label="Nº de teléfono"
        name="company_phone"
        placeholder={data?.PhoneNumber}
        defaultValue={data?.PhoneNumber}
        validation={{
          validate: async (value) => handleHaveChenge(value),
        }}
      />
    </div>
  );
};

import React from "react";

import { InputText } from "../../../../atoms/Input/Input.atom";

export const ManagerProfile = ({ data = {} }) => {
  return (
    <div className="manager-wrapper">
      <InputText
        disabled
        label="Nombre"
        name="manager_name"
        defaultValue={`${data?.Name} ${data?.LastName}`}
      />
      <InputText label="Rol" disabled placeholder="Gestor" />
      <InputText
        label="Email"
        name="manager_email"
        placeholder={data?.Email}
        validation={{
          validate: async (value) => handleHaveChenge(value),
        }}
      />
      <InputText
        label="Nº de teléfono"
        name="manager_phone"
        placeholder={data?.PhoneNumber}
        validation={{
          validate: async (value) => handleHaveChenge(value),
        }}
      />
    </div>
  );
};

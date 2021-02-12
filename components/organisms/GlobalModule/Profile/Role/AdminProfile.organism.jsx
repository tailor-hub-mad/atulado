import React from "react";
import { useRouter } from "next/router";

import { InputText } from "../../../../atoms/Input/Input.atom";

export const AdminProfile = ({ data = {} }) => {
  const router = useRouter();

  return (
    <div className="admin-wrapper">
      <div className="admin-data-wrapper">
        <InputText
          label="Email"
          name="admin_email"
          defaultValue={data?.Email}
        />
        {/* <InputPassword
          label="Contraseña"
          name="admin_password"
          defaultValue={null}
          disabled
        /> */}
      </div>

      {/* <div className="admin-email-wrapper">
        <SCTextXL color="black">Configurador Correo</SCTextXL>
        <InputText
          label="Email desde"
          name="admin_email_from"
          defaultValue={null}
        />
        <InputText name="admin_server" label="Servidor SMTP" />

        <div className="button-wrapper">
          <ButtonCheck action={(value) => {}}>Activar SSL</ButtonCheck>
        </div>

        <InputText label="Puerto SMPT" name="admin_port" defaultValue={null} />
        <InputText
          label="Email alamecenamiento"
          name="admin_email_storage"
          defaultValue={null}
        />
      </div> */}
    </div>
  );
};

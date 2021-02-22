import React from "react";
import { useRouter } from "next/router";

import { InputText } from "../../../../atoms/Input/Input.atom";

export const AdminProfile = ({ data = {} }) => {
  const router = useRouter();

  const handleHaveChenge = (value) => {
    if (value == "") return;
    setHaveChange(true);
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-data-wrapper">
        <InputText
          label="Email"
          name="admin_email"
          defaultValue={data?.Email}
          validation={{
            validate: async (value) => handleHaveChenge(value),
          }}
        />
      </div>
    </div>
  );
};

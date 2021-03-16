import React, { useEffect, useState } from "react";

import { SCClientModule } from "./ClientModule.styled";
import { Search } from "../../../atoms/Search/Search.atom";
import { ItemClient } from "../../../molecules/ItemClient/ItemClient.molecule";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { ButtonIcon } from "../../../atoms/ButtonIcon/ButtonIcon.atom";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { SCSpinner } from "../../../atoms/Spinner/Spinner.styled";

import AddUserIcon from "../../../../public/icon/add-user_icon.svg";

import { getAccounts } from "../../../../lib/api/account";

export const ClientModule = ({ user, optionsList }) => {
  const [clientData, setClientData] = useState([]);
  const [fullClientData, setFullClientData] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  const handleClickItem = (index) => {
    return optionsList("client", {
      clientDetail: clientData[index],
      clientData: fullClientData,
    });
  };

  const handleSearchClient = (value) => {
    if (value == "") {
      setClientData(fullClientData);
      return;
    }

    const newFullClientData = fullClientData.filter((element) => {
      return element?.NIF.toLowerCase().includes(value.toLowerCase());
    });

    setClientData(newFullClientData);
  };

  const handleAddUser = () => {
    return optionsList("client", {
      addUser: true,
      clientData: fullClientData,
    });
  };

  useEffect(() => {
    async function getDataAccounts() {
      const { data } = await getAccounts(user.roleCode);

      setClientData(data);
      setFullClientData(data);
      setLoadingSpinner(false);
    }

    getDataAccounts();
  }, []);

  return (
    <SCClientModule>
      <div className="title-wrapper">
        <SCTextXL color="primary">Clientes</SCTextXL>
        <div className="icons-wrapper">
          <Search action={handleSearchClient} />
          <ButtonIcon action={handleAddUser} icon={<AddUserIcon />}>
            Añadir usuario
          </ButtonIcon>
        </div>
      </div>

      <div className="table-client-wraper">
        <div className="title-table-wrapper">
          <SCTextSLight color="black">Titular</SCTextSLight>
        </div>
        {loadingSpinner ? (
          <div className="spinner-wrapper">
            <SCSpinner />
          </div>
        ) : (
          <>
            {clientData.length > 0 ? (
              <>
                {clientData.map((element, index) => {
                  return (
                    <ItemClient
                      data={element}
                      key={index}
                      action={() => handleClickItem(index)}
                    />
                  );
                })}
              </>
            ) : (
              <div className="empty-list">
                <SCTextSLight color="black">No hay clientes</SCTextSLight>
              </div>
            )}
          </>
        )}
      </div>
    </SCClientModule>
  );
};

import React, { useEffect, useState } from "react";
import { endsWith } from "lodash";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

import { SCAddUserModule } from "./AddUserModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { SingleDropdown } from "../../../molecules/Dropdown/Single/SingleDropdown.molecule";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { InputText } from "../../../atoms/Input/Input.atom";
import Button from "../../../atoms/Button/Button.atom";
import { Search } from "../../../atoms/Search/Search.atom";
import { ItemClient } from "../../../molecules/ItemClient/ItemClient.molecule";

import CloseIcon from "../../../../public/icon/close_icon.svg";

import { deleteAccount, updateAccount } from "../../../../lib/api/account";
import { getAccounts, getAccount } from "../../../../lib/api/account";

export const AddUserModule = ({ clientData, user }) => {
  const [haveChange, setHaveChange] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [openRole, setOpenRole] = useState({
    role_2: false,
    role_3: false,
  });
  const [openCloseIcon, setOpenCloseIcon] = useState({
    role_2: false,
    role_3: false,
  });
  const [selecteRoles, setSelectRoles] = useState([
    "Cliente",
    "Gestor",
    "Administrador",
  ]);
  const [clientDataList, setClientDataList] = useState([]);
  const [fullClientDataList, setFullClientDataList] = useState([]);
  const [clientDetail, setClientDetail] = useState({});

  const router = useRouter();

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const handleUpdateAccount = async (data) => {
    let email = "";
    let phoneNumber = "";

    Object.keys(data).forEach((element) => {
      if (endsWith(element, "email")) {
        email = data[element];
      }
      if (endsWith(element, "phone")) {
        phoneNumber = data[element];
      }
    });

    const updatedUser = {
      account: {
        email: email != "" ? email : user.Email,
        phoneNumber: phoneNumber != "" ? phoneNumber : user.phoneNumber,
      },
    };

    const response = await updateAccount(
      user.roleCode,
      user.UserId,
      updatedUser
    );

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      const newOpenInfoModal = { ...openInfoModal };
      newOpenInfoModal["open"] = true;
      newOpenInfoModal["message"] =
        "Hemos recibido tu solicitud de actualzación";
      setOpenInfoModal(newOpenInfoModal);
    }

    setHaveChange(false);

    setTimeout(() => {
      setErrorMessage();
    }, 5000);
  };

  const handleDeleteUser = async () => {
    // if (!isConfirmation) {
    //   return setIsConfirmation(true);
    // }
    // setIsConfirmation(false);
    // const { error } = await deleteAccount(user.roleCode, user.UserId);
    // // error -> manejo de errores
    // router.push("/login-cliente");
  };

  const handleHaveChange = (value) => {
    if (value == "") return;
    setHaveChange(true);
  };

  const handleSelectedRole = (name, value) => {
    if (value == "") return;

    // const newSelectRoles = [...selecteRoles];

    // if (value == "Cliente") {
    //   newSelectRoles.splice(0, 1);
    // }

    // if (value == "Gestor") {
    //   newSelectRoles.splice(1, 1);
    // }

    // if (value == "Administrador") {
    //   newSelectRoles.splice(2, 1);
    // }

    // setSelectRoles(newSelectRoles);

    if (name == "role_1") {
      setOpenRole({ ...openRole, role_2: true });
    }

    if (name == "role_2") {
      setOpenRole({ ...openRole, role_3: true });
      setOpenCloseIcon({ ...openCloseIcon, role_2: true });
    }

    if (name == "role_3") {
      setOpenCloseIcon({ ...openCloseIcon, role_3: true });
    }
  };

  const handleUnselectedRole = (name) => {
    if (name == "") return;

    if (name == "role_2") {
      if (openRole.role_3) {
        setOpenRole({ ...openRole, role_3: false });
        setOpenCloseIcon({
          ...openCloseIcon,
          role_3: false,
        });
      } else {
        setOpenRole({ ...openRole, role_2: false });
        setOpenCloseIcon({
          role_2: false,
          role_3: false,
        });
      }
    }

    if (name == "role_3") {
      setOpenRole({ ...openRole, role_3: false });
      setOpenCloseIcon({
        ...openCloseIcon,
        role_3: false,
      });
    }
  };

  const handleActionCheck = (index) => {
    // quitar funcionalidad en el item
  };

  const handleClickItem = async (index) => {
    const clientItem = clientDataList[index];

    const { data } = await getAccount(user.roleCode, clientItem.UserId);

    setClientDetail(data);
  };

  const handleSearchClient = (value) => {
    if (value == "") {
      setClientDataList(fullClientData);
      return;
    }

    const newFullClientData = fullClientDataList.filter((element) => {
      return element?.Email.toLowerCase().includes(value.toLowerCase());
    });

    setClientDataList(newFullClientData);
  };

  useEffect(() => {
    async function getDataAccounts() {
      const { data } = await getAccounts(user.roleCode);

      setClientDataList(data);
      setFullClientDataList(data);
    }

    if (!clientData) {
      getDataAccounts();
    } else {
      setClientDataList(clientData);
      setFullClientDataList(clientData);
    }
  }, [clientData]);

  useEffect(() => {
    if (!clientDetail) return;

    const { Role } = clientDetail;

    if (Role) {
      const [role_2, role_3] = [...Role];

      if (role_2) {
        setOpenRole({ role_2: true, role_3: false });
        setOpenCloseIcon({
          role_2: true,
          role_3: false,
        });

        if (role_3) {
          setOpenRole({ role_2: true, role_3: false });
          setOpenCloseIcon({
            role_2: true,
            role_3: true,
          });
        }
      }
    }
  }, [clientDetail]);

  return (
    <SCAddUserModule>
      <div className="data-wrapper">
        <SCTextXL color="primary">Añadir usaurio</SCTextXL>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleUpdateAccount)}>
            <div className="client-wrapper">
              <InputText
                label="DNI / NIE"
                name="client_dni"
                validation={{
                  required: true,
                  validate: async (value) => handleHaveChange(value),
                }}
                defaultValue={clientDetail?.NIF}
              />
              <div />
              <div />
              <InputText
                label="Nombre"
                name="client_name"
                validation={{
                  required: true,
                  validate: async (value) => handleHaveChange(value),
                }}
                defaultValue={clientDetail?.Name}
              />
              <InputText
                label="Apellidos"
                name="client_surname"
                validation={{
                  required: true,
                  validate: async (value) => handleHaveChange(value),
                }}
                defaultValue={clientDetail?.LastName}
              />
              <div />

              <InputText
                label="Email"
                name="client_email"
                validation={{
                  required: true,
                  validate: async (value) => handleHaveChange(value),
                }}
                defaultValue={clientDetail?.Email}
              />
              <div />
              <div />

              <SingleDropdown
                label="Perfil"
                name="role_1"
                options={selecteRoles}
                validation={{
                  validate: async (value) =>
                    handleSelectedRole("role_1", value),
                }}
                placeholder={
                  clientDetail?.Role ? clientDetail?.Role[0] : "Añade un rol"
                }
              />

              <div />
              <div />

              {openRole.role_2 && (
                <>
                  <div className="single-wrapper">
                    <SingleDropdown
                      label="Añdir nuevo perfil"
                      name="role_2"
                      options={selecteRoles}
                      validation={{
                        validate: async (value) =>
                          handleSelectedRole("role_2", value),
                      }}
                      placeholder={clientDetail?.Role[1] || "Añade un rol"}
                    />
                    <div
                      className="icon-wrapper"
                      onClick={() => handleUnselectedRole("role_2")}
                    >
                      {openCloseIcon.role_2 && <CloseIcon />}
                    </div>
                  </div>
                  <div />
                  <div />
                </>
              )}
              {openRole.role_3 && (
                <>
                  <div className="single-wrapper">
                    <SingleDropdown
                      label="Añdir nuevo perfil"
                      name="role_3"
                      options={selecteRoles}
                      validation={{
                        validate: async (value) =>
                          handleSelectedRole("role_3", value),
                      }}
                      placeholder={clientDetail?.Role[2] || "Añade un rol"}
                    />
                    <div
                      className="icon-wrapper"
                      onClick={() => handleUnselectedRole("role_3")}
                    >
                      {openCloseIcon.role_3 && <CloseIcon />}
                    </div>
                  </div>
                  <div />
                  <div />
                </>
              )}
            </div>

            <div className="action-wrapper">
              <div>
                <Button type="submit" disabled={!haveChange}>
                  Guardar Cambios
                </Button>

                {errorMessage && (
                  <SCTextSLight className="info-message" color="red">
                    {errorMessage}
                  </SCTextSLight>
                )}
              </div>

              <div className="selected-wrapper">
                <ButtonSelect
                  color="primary"
                  action={() => router.push("/pass-cambiar")}
                >
                  Cambiar contraseña
                </ButtonSelect>

                <ButtonSelect color="red" action={() => handleDeleteUser()}>
                  Dar de baja
                </ButtonSelect>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      <div className="client-wrapper">
        <div className="title-wrapper">
          <SCTextXL color="primary">Usuarios</SCTextXL>
          <div className="icons-wrapper">
            <Search action={handleSearchClient} />
          </div>
        </div>

        <div className="table-client-wraper">
          <div className="title-table-wrapper">
            <SCTextSLight color="black">Titular</SCTextSLight>
            <SCTextSLight color="black">Estado</SCTextSLight>
          </div>
          {clientDataList.length > 0 ? (
            <>
              {clientDataList.map((element, index) => {
                return (
                  <ItemClient
                    data={element}
                    key={index}
                    action={() => handleClickItem(index)}
                    actionCheck={() => handleActionCheck(index)}
                  />
                );
              })}
            </>
          ) : (
            <div className="empty-list">
              <SCTextSLight color="black">No hay clientes</SCTextSLight>
            </div>
          )}
        </div>
      </div>
    </SCAddUserModule>
  );
};

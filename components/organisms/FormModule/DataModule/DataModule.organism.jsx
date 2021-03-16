import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { SCDataModule } from "./DataModule.styled";
import { SCTextL } from "../../../atoms/Text/TextL.styled";
import { InputText } from "../../../atoms/Input/Input.atom";
import { ButtonCheck } from "../../../atoms/ButtonCheck/ButtonCheck.atom";
import { ButtonRound } from "../../../atoms/ButtonRound/ButtonRound.atom";
import { AddressModule } from "../../../organisms/FormModule/AddressModule/AddressModule.organism";
import { PLACEHOLDER_FORM_CUP } from "../../../../utils/constants";
import { isEmpty, isEqual } from "lodash";
import {
  validateNIF,
  validatePayerNIF,
  validateEmail,
  validateFriendCode,
} from "../../../../lib/api/validators";

export const DataModule = ({
  summaryData,
  setSummaryData,
  extraDataRegister,
  setExtraDataRegister,
  defaultUserNewContract,
  defaultInfoUpdateContract,
  setHasFormErros,
  hasFormErrors,
  disactiveNav = false
}) => {
  const [defaultAddress, setDefaultAddress] = useState({
    fiscal: null,
    delivery: null,
  });
  const [defaultUser, setDefaultUser] = useState();
  const [defaultPayer, setDefaultPayer] = useState();
  const [isCompany, setIsCompany] = useState(false);
  const [isCompanyPayer, setIsCompanyPayer] = useState(false);
  const [isFiscalAddress, setIsFiscalAddress] = useState(false);
  const [isContactAddress, setIsContactAddress] = useState(false);
  const [isPayer, setIsPayer] = useState(false);
  const [hasCodeFriend, setHasCodeFriend] = useState(false);

  const { getValues } = useFormContext();

  const [clientPayerInfo, setClientPayerInfo] = useState({
    client_payer_dni: "",
    client_payer_name: "",
    client_payer_surname: "",
    client_payer_email: "",
    client_payer_phone: "",
  });

  const [companyPayerInfo, setCompanyPayerInfo] = useState({
    company_payer_cif: "",
    company_payer_name: "",
    company_payer_email: "",
    company_payer_phone: "",
    company_payer_admin_dni: "",
    company_payer_admin_name: "",
    company_payer_admin_surname: "",
  });

  const [clientInfo, setClientInfo] = useState({
    client_dni: "",
    client_name: "",
    client_surname: "",
    client_email: "",
    client_phone: "",
  });

  const [companyInfo, setCompanyInfo] = useState({
    company_cif: "",
    company_name: "",
    company_email: "",
    company_phone: "",
    company_admin_dni: "",
    company_admin_name: "",
    company_admin_surname: "",
  });

  const handleIsPayer = (value) => {
    setIsPayer(value);

    const newExtraDataRegister = { ...extraDataRegister };
    newExtraDataRegister["isPayer"] = value;

    setExtraDataRegister({ ...extraDataRegister, ...newExtraDataRegister });
  };

  const handleIsCompany = (value) => {
    setIsCompany(value);

    const newExtraDataRegister = { ...extraDataRegister };
    newExtraDataRegister["isCompany"] = value;

    setExtraDataRegister({ ...extraDataRegister, ...newExtraDataRegister });
  };

  const handleIsCompanyPayer = (value) => {
    setIsCompanyPayer(value);
    const newExtraDataRegister = { ...extraDataRegister };

    newExtraDataRegister["isCompanyPayer"] = value;

    setExtraDataRegister({ ...extraDataRegister, ...newExtraDataRegister });
  };

  const handleIsFiscalAddress = (value) => {
    setIsFiscalAddress(value);

    const newExtraDataRegister = { ...extraDataRegister };
    newExtraDataRegister["isFiscalAddress"] = value;

    setExtraDataRegister({ ...extraDataRegister, ...newExtraDataRegister });
  };

  const handleIsContactAddress = (value) => {
    setIsContactAddress(value);

    const newExtraDataRegister = { ...extraDataRegister };
    newExtraDataRegister["isContactAddress"] = value;

    setExtraDataRegister({ ...extraDataRegister, ...newExtraDataRegister });
  };

  const handleDataIban = (iban) => {
    const newExtraDataRegister = { ...extraDataRegister };
    newExtraDataRegister["iban"] = iban;

    setExtraDataRegister({ ...extraDataRegister, ...newExtraDataRegister });
  };

  const handleDataPayer = (name, value) => {
    if (isCompanyPayer) {
      const newPayerInfo = { ...companyPayerInfo };
      newPayerInfo[name] = value;
      setCompanyPayerInfo(newPayerInfo);

      if (
        Object.keys(newPayerInfo).some((element) =>
          isEmpty(newPayerInfo[element])
        )
      )
        return;

      const newSummaryData = { ...summaryData };
      newSummaryData["client_payer"] = {
        ...newPayerInfo,
        type: "company",
      };

      setSummaryData(newSummaryData);
    } else {
      const newPayerInfo = { ...clientPayerInfo };
      newPayerInfo[name] = value;
      setClientPayerInfo(newPayerInfo);

      if (
        Object.keys(newPayerInfo).some((element) =>
          isEmpty(newPayerInfo[element])
        )
      )
        return;

      const newSummaryData = { ...summaryData };
      newSummaryData["client_payer"] = {
        ...newPayerInfo,
        type: "client",
      };

      setSummaryData(newSummaryData);
    }
  };

  const handleDataClient = (name, value) => {
    if (isCompany) {
      const newCompanyInfo = { ...companyInfo };
      newCompanyInfo[name] = value;
      setCompanyInfo(newCompanyInfo);

      if (
        Object.keys(newCompanyInfo).some((element) =>
          isEmpty(newCompanyInfo[element])
        )
      )
        return;

      const newSummaryData = { ...summaryData };
      newSummaryData["client"] = {
        ...newCompanyInfo,
        type: "company",
      };

      setSummaryData(newSummaryData);
    } else {
      const newClientInfo = { ...clientInfo };
      newClientInfo[name] = value;
      setClientInfo(newClientInfo);

      if (
        Object.keys(newClientInfo).some((element) =>
          isEmpty(newClientInfo[element])
        )
      ) {
        return;
      }
      const newSummaryData = { ...summaryData };
      newSummaryData["client"] = {
        ...newClientInfo,
        type: "client",
      };

      setSummaryData(newSummaryData);
    }
  };

  useEffect(() => {
    if (!defaultUserNewContract) return;

    const newSummaryData = { ...summaryData };

    const {
      Email,
      LastName,
      LegalNIFCIF,
      LegalName,
      NIF,
      Name,
      PhoneNumber,
      SecondLastName,
      LegalSecondLastName,
      LegalLastName,
    } = defaultUserNewContract;

    if (LegalName) {
      const newCompanyDefualtUser = {
        company_cif: LegalNIFCIF.toUpperCase(),
        company_name: Name,
        company_email: Email,
        company_phone: PhoneNumber,
        company_admin_dni: NIF?.toUpperCase(),
        company_admin_name: LegalName,
        company_admin_surname: `${LegalLastName} ${LegalSecondLastName}`,
      };

      newSummaryData["client"] = {
        ...newCompanyDefualtUser,
        type: "company",
      };

      const newExtraDataRegister = { ...extraDataRegister };
      newExtraDataRegister["isCompany"] = true;

      setIsCompany(true);
      setDefaultUser(newCompanyDefualtUser);
      setExtraDataRegister({ ...extraDataRegister, ...newExtraDataRegister });
    } else {
      const newClientDefualtUser = {
        client_dni: NIF?.toUpperCase(),
        client_name: Name,
        client_surname: `${LastName} ${SecondLastName}`,
        client_email: Email,
        client_phone: PhoneNumber,
      };
      setDefaultUser(newClientDefualtUser);

      newSummaryData["client"] = {
        ...newClientDefualtUser,
        type: "client",
      };
    }

    setSummaryData(newSummaryData);
  }, [defaultUserNewContract]);

  useEffect(() => {
    if (!defaultInfoUpdateContract) return;

    const newSummaryData = { ...summaryData };
    newSummaryData["iban"] = defaultInfoUpdateContract?.contract?.Payer?.IBAN;

    const {
      DeliveryAddress,
      FiscalAddress,
      SupplyAddress,
      PromotionalCode,
    } = defaultInfoUpdateContract.contract;

    if (PromotionalCode) {
      setHasCodeFriend(true);
    }

    const newDefaultAddress = { ...defaultAddress };

    if (FiscalAddress && !isEqual(DeliveryAddress, FiscalAddress)) {
      setIsFiscalAddress(true);

      const {
        PostalCode: postalCode,
        CountyId: province,
        CityId: city,
        Street,
        Number: number_road,
        Portal: doorway,
        Stair: stair,
        Floor,
      } = FiscalAddress;

      const [floor, door] = [...Floor.split(" ")];
      const splitStreet = Street.split(" ");
      const type_road = "";
      const name_road = Street;

      newDefaultAddress["fiscal"] = {
        postalCode,
        city,
        province,
        type_road,
        name_road,
        number_road,
        doorway,
        stair,
        floor,
        door,
      };
    }

    if (DeliveryAddress && !isEqual(DeliveryAddress, SupplyAddress)) {
      setTimeout(() => {
        setIsContactAddress(true);
      }, 1000);

      const {
        PostalCode: postalCode,
        CountyId: province,
        CityId: city,
        Street,
        Number: number_road,
        Portal: doorway,
        Stair: stair,
        Floor,
      } = DeliveryAddress;

      const [floor, door] = [...Floor.split(" ")];
      const splitStreet = Street.split(" ");
      const type_road = "";
      const name_road = Street;

      newDefaultAddress["delivery"] = {
        postalCode,
        city,
        province,
        type_road,
        name_road,
        number_road,
        doorway,
        stair,
        floor,
        door,
      };
    }

    setDefaultAddress(newDefaultAddress);

    const { Payer, Holder } = defaultInfoUpdateContract.contract;

    if (Payer && Holder?.NIF != Payer?.NIF) {
      setIsPayer(true);

      const {
        Email,
        LastName,
        LegalNIFCIF,
        LegalName,
        NIF,
        Name,
        PhoneNumber,
        SecondLastName,
      } = Payer;

      if (LegalName) {
        const newCompanyDefualtPayer = {
          company_payer_cif: LegalNIFCIF.toUpperCase(),
          company_payer_name: LegalName,
          company_payer_email: Email,
          company_payer_phone: PhoneNumber,
          company_payer_admin_dni: NIF?.toUpperCase(),
          company_payer_admin_name: Name,
          company_payer_admin_surname: `${LastName} ${SecondLastName}`,
        };

        setIsCompanyPayer(true);
        setDefaultPayer(newCompanyDefualtPayer);

        newSummaryData["client_payer"] = {
          ...newCompanyDefualtPayer,
          type: "company",
        };
      } else {
        const newClientDefualtPayer = {
          client_payer_dni: NIF?.toUpperCase(),
          client_payer_name: Name,
          client_payer_surname: `${LastName} ${SecondLastName}`,
          client_payer_email: Email,
          client_payer_phone: PhoneNumber,
        };

        setDefaultPayer(newClientDefualtPayer);

        newSummaryData["client_payer"] = {
          ...newClientDefualtPayer,
          type: "client",
        };
      }
    }

    if (Holder) {
      const {
        Email,
        LastName,
        LegalNIFCIF,
        LegalName,
        NIF,
        Name,
        PhoneNumber,
        SecondLastName,
        LegalSecondLastName,
        LegalLastName,
      } = Holder;

      if (LegalName) {
        const newCompanyDefualtUser = {
          company_cif: LegalNIFCIF.toUpperCase(),
          company_name: Name,
          company_email: Email,
          company_phone: PhoneNumber,
          company_admin_dni: NIF?.toUpperCase(),
          company_admin_name: LegalName,
          company_admin_surname: `${LegalLastName} ${LegalSecondLastName}`,
        };

        newSummaryData["client"] = {
          ...newCompanyDefualtUser,
          type: "company",
        };

        const newExtraDataRegister = { ...extraDataRegister };
        newExtraDataRegister["isCompany"] = true;

        setIsCompany(true);
        setDefaultUser(newCompanyDefualtUser);
        setExtraDataRegister({ ...extraDataRegister, ...newExtraDataRegister });
      } else {
        const newClientDefualtUser = {
          client_dni: NIF?.toUpperCase(),
          client_name: Name,
          client_surname: `${LastName} ${SecondLastName}`,
          client_email: Email,
          client_phone: PhoneNumber,
        };
        setDefaultUser(newClientDefualtUser);

        newSummaryData["client"] = {
          ...newClientDefualtUser,
          type: "client",
        };
      }
    }

    setSummaryData(newSummaryData);
  }, [defaultInfoUpdateContract]);

  return (
    <SCDataModule>
      <div className="title-wrapper">
        <SCTextL color="black">Datos del titular</SCTextL>
      </div>
      <div>
        <div className="padding-left-wrapper">
          <ButtonRound
            checked={!isCompany}
            action={() => handleIsCompany(false)}
          >
            Particular
          </ButtonRound>
          <ButtonRound checked={isCompany} action={() => handleIsCompany(true)}>
            Empresa
          </ButtonRound>
        </div>
        {isCompany ? (
          <div>
            <div className="wrapper-1column">
              <InputText
                label="CIF Empresa"
                name="company_cif"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("company_cif", value),
                }}
                apiValidation={!isEmpty(defaultInfoUpdateContract) || disactiveNav ? validatePayerNIF : validateNIF}
                defaultValue={defaultUser?.company_cif}
              //disabled={!isEmpty(defaultInfoUpdateContract)}
              />
            </div>
            <div className="wrapper-2column">
              <InputText
                label="Nombre empresa"
                name="company_name"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("company_name", value),
                }}
                defaultValue={defaultUser?.company_name}
              />
            </div>
            <div className="wrapper-2column">
              <InputText
                label="Email empresa"
                name="company_email"
                apiValidation={validateEmail}
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("company_email", value),
                }}
                defaultValue={defaultUser?.company_email}
                setHasFormErros={setHasFormErros}
                hasFormErrors={hasFormErrors}
              />
            </div>
            <div className="wrapper-2column">
              <InputText
                label="Teléfono empresa"
                name="company_phone"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("company_phone", value),
                }}
                defaultValue={defaultUser?.company_phone}
              />
            </div>
            <div className="wrapper-2column">
              <InputText
                label="DNI / NIE Administrador"
                name="company_admin_dni"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("company_admin_dni", value),
                }}
                apiValidation={validatePayerNIF}
                defaultValue={defaultUser?.company_admin_dni}
                setHasFormErros={setHasFormErros}
                hasFormErrors={hasFormErrors}
              />
            </div>
            <div className="wrapper-2column">
              <InputText
                label="Nombre Administrador"
                name="company_admin_name"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("company_admin_name", value),
                }}
                defaultValue={defaultUser?.company_admin_name}
              />

              <InputText
                label="Apellidos Administrador"
                name="company_admin_surname"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("company_admin_surname", value),
                }}
                defaultValue={defaultUser?.company_admin_surname}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="wrapper-1column">
              <InputText
                label="DNI / NIE del titular del contrato"
                name="client_dni"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("client_dni", value),
                }}
                apiValidation={!isEmpty(defaultInfoUpdateContract) || disactiveNav ? validatePayerNIF : validateNIF}
                defaultValue={defaultUser?.client_dni}
                setHasFormErros={setHasFormErros}
                hasFormErrors={hasFormErrors}
              //disabled={!isEmpty(defaultInfoUpdateContract)}
              />
            </div>
            <div className="wrapper-2column">
              <InputText
                label="Nombre"
                name="client_name"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("client_name", value),
                }}
                defaultValue={defaultUser?.client_name}
              />

              <InputText
                label="Apellidos"
                name="client_surname"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("client_surname", value),
                }}
                defaultValue={defaultUser?.client_surname}
              />
            </div>
            <div className="wrapper-email-column">
              <InputText
                label="Email"
                name="client_email"
                placeholder="nombre@tucorreo.com"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("client_email", value),
                }}
                apiValidation={validateEmail}
                defaultValue={defaultUser?.client_email}
                setHasFormErros={setHasFormErros}
                hasFormErrors={hasFormErrors}
              />

              <InputText
                label="Teléfono"
                name="client_phone"
                placeholder="666 555 444"
                validation={{
                  required: true,
                  validate: async (value) =>
                    handleDataClient("client_phone", value),
                }}
                defaultValue={defaultUser?.client_phone}
              />
            </div>
          </div>
        )}
      </div>

      <div className="title-wrapper">
        <SCTextL color="black">Datos del pagador</SCTextL>
      </div>
      <div className="padding-left-wrapper">
        <ButtonCheck checked={isPayer} action={(value) => handleIsPayer(value)}>
          El pagador es distinto al titular del contrato
        </ButtonCheck>
      </div>
      {isPayer && (
        <>
          <div className="padding-left-wrapper">
            <ButtonRound
              checked={!isCompanyPayer}
              action={() => handleIsCompanyPayer(false)}
            >
              Particular
            </ButtonRound>
            <ButtonRound
              checked={isCompanyPayer}
              action={() => handleIsCompanyPayer(true)}
            >
              Empresa
            </ButtonRound>
          </div>
          {isCompanyPayer ? (
            <div>
              <div className="wrapper-1column">
                <InputText
                  label="CIF Empresa"
                  name="company_payer_cif"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("company_payer_cif", value),
                  }}
                  defaultValue={defaultPayer?.company_payer_cif}
                />
              </div>
              <div className="wrapper-2column">
                <InputText
                  label="Nombre empresa"
                  name="company_payer_name"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("company_payer_name", value),
                  }}
                  defaultValue={defaultPayer?.company_payer_name}
                />
              </div>
              <div className="wrapper-2column">
                <InputText
                  label="Email empresa"
                  name="company_payer_email"
                  apiValidation={validateEmail}
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("company_payer_email", value),
                  }}
                  defaultValue={defaultPayer?.company_payer_email}
                  setHasFormErros={setHasFormErros}
                  hasFormErrors={hasFormErrors}
                />
              </div>
              <div className="wrapper-2column">
                <InputText
                  label="Teléfono empresa"
                  name="company_payer_phone"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("company_payer_phone", value),
                  }}
                  defaultValue={defaultPayer?.company_payer_phone}
                />
              </div>
              <div className="wrapper-2column">
                <InputText
                  label="DNI / NIE Administrador"
                  name="company_payer_admin_dni"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("company_payer_admin_dni", value),
                  }}
                  apiValidation={validatePayerNIF}
                  defaultValue={defaultPayer?.company_payer_admin_dni}
                  setHasFormErros={setHasFormErros}
                  hasFormErrors={hasFormErrors}
                />
              </div>
              <div className="wrapper-2column">
                <InputText
                  label="Nombre Administrador"
                  name="company_payer_admin_name"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("company_payer_admin_name", value),
                  }}
                  defaultValue={defaultPayer?.company_payer_admin_name}
                />

                <InputText
                  label="Apellidos Administrador"
                  name="company_payer_admin_surname"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("company_payer_admin_surname", value),
                  }}
                  defaultValue={defaultPayer?.company_payer_admin_surname}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="wrapper-1column">
                <InputText
                  label="DNI / NIE del pagador del contrato"
                  name="client_payer_dni"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("client_payer_dni", value),
                  }}
                  apiValidation={validatePayerNIF}
                  defaultValue={defaultPayer?.client_payer_dni}
                  setHasFormErros={setHasFormErros}
                  hasFormErrors={hasFormErrors}
                />
              </div>
              <div className="wrapper-2column">
                <InputText
                  label="Nombre"
                  name="client_payer_name"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("client_payer_name", value),
                  }}
                  defaultValue={defaultPayer?.client_payer_name}
                />

                <InputText
                  label="Apellidos"
                  name="client_payer_surname"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("client_payer_surname", value),
                  }}
                  defaultValue={defaultPayer?.client_payer_surname}
                />
              </div>
              <div className="wrapper-email-column">
                <InputText
                  label="Email"
                  name="client_payer_email"
                  placeholder="nombre@tucorreo.com"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("client_payer_email", value),
                  }}
                  apiValidation={validateEmail}
                  defaultValue={defaultPayer?.client_payer_email}
                  setHasFormErros={setHasFormErros}
                  hasFormErrors={hasFormErrors}
                />
                <InputText
                  label="Teléfono"
                  name="client_payer_phone"
                  placeholder="666 555 444"
                  validation={{
                    required: true,
                    validate: async (value) =>
                      handleDataPayer("client_payer_phone", value),
                  }}
                  defaultValue={defaultPayer?.client_payer_phone}
                />
              </div>
            </div>
          )}
        </>
      )}

      <div className="title-wrapper">
        <SCTextL color="black">Dirección fiscal</SCTextL>
      </div>
      <div>
        <div className="padding-left-wrapper">
          <ButtonCheck
            checked={isFiscalAddress}
            action={(value) => handleIsFiscalAddress(value)}
          >
            ¿Es la dirección fiscal distinta que la dirección de suministro?
          </ButtonCheck>
        </div>
        {isFiscalAddress && (
          <AddressModule
            inputsId={{
              postal_code: "postal_code_fiscal",
              city: "city_fiscal",
              province: "province_fiscal",
              type_road: "type_road_fiscal",
              name_road: "name_road_fiscal",
              number_road: "number_road_fiscal",
              doorway: "doorway_fiscal",
              stair: "stair_fiscal",
              floor: "floor_fiscal",
              door: "door_fiscal",
            }}
            addressType="address_fiscal"
            summaryData={summaryData}
            setSummaryData={setSummaryData}
            extraDataRegister={extraDataRegister}
            setExtraDataRegister={setExtraDataRegister}
            defaultAddress={defaultAddress?.fiscal}
            setHasFormErros={setHasFormErros}
            hasFormErrors={hasFormErrors}
          />
        )}
      </div>

      <div className="title-wrapper">
        <SCTextL color="black">Dirección de contacto</SCTextL>
      </div>
      <div>
        <div className="padding-left-wrapper">
          <ButtonCheck
            checked={isContactAddress}
            action={(value) => handleIsContactAddress(value)}
          >
            ¿Es la dirección de envío distinta que la dirección fiscal?
          </ButtonCheck>
        </div>
        {isContactAddress && (
          <AddressModule
            inputsId={{
              postal_code: "postal_code_contact",
              city: "city_contact",
              province: "province_contact",
              type_road: "type_road_contact",
              name_road: "name_road_contact",
              number_road: "number_road_contact",
              doorway: "doorway_contact",
              stair: "stair_contact",
              floor: "floor_contact",
              door: "door_contact",
            }}
            addressType="address_contact"
            summaryData={summaryData}
            setSummaryData={setSummaryData}
            extraDataRegister={extraDataRegister}
            setExtraDataRegister={setExtraDataRegister}
            defaultAddress={defaultAddress?.delivery}
            setHasFormErros={setHasFormErros}
            hasFormErrors={hasFormErrors}
          />
        )}
      </div>

      <div className="title-wrapper">
        <SCTextL color="black">Cuenta bancaria</SCTextL>
      </div>
      <div className="padding-right-wrapper">
        <div className="padding-left-wrapper">
          <InputText
            label="IBAN o Número de cuenta bancaria (CCC)"
            name="iban"
            placeholder={PLACEHOLDER_FORM_CUP}
            validation={{
              required: true,
              validate: async (value) => handleDataIban(value),
            }}
            defaultValue={defaultInfoUpdateContract?.contract?.Payer?.IBAN}
          />
        </div>
      </div>

      <div className="friend-wrapper">
        <div className="title-wrapper">
          <SCTextL color="black">Plan amigo</SCTextL>
        </div>
        <div className="padding-right-wrapper">
          <div className="padding-left-wrapper">
            <ButtonCheck
              checked={hasCodeFriend}
              action={(value) => setHasCodeFriend(value)}
            >
              Tengo un código amigo que quiero aplicar
            </ButtonCheck>

            {hasCodeFriend && (
              <InputText
                label="Introduce tu código amigo"
                name="friend_code"
                apiValidation={validateFriendCode}
                defaultValue={
                  defaultInfoUpdateContract?.contract?.PromotionalCode != ""
                    ? defaultInfoUpdateContract?.contract?.PromotionalCode
                    : ""
                }
                setHasFormErros={setHasFormErros}
                hasFormErrors={hasFormErrors}
              />
            )}
          </div>
        </div>
      </div>
    </SCDataModule>
  );
};

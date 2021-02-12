import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { SCAddressModule } from "./AddressModule.styled";
import { SCTextXSLight } from "../../../atoms/Text/TextXS.styled";
import { InputText } from "../../../atoms/Input/Input.atom";
import { SingleDropdown } from "../../../molecules/Dropdown/Single/SingleDropdown.molecule";
import { validateAddress } from "../../../../lib/api/validators";
import { getAddressCode } from "../../../../lib/api/address";
import { isEmpty } from "lodash";
import { GENERAL_ERROR } from "../../../../utils/constants";
import roadsType from "../../../../utils/data/roadTypes";

import {
  getMunicipalitiesByPostalCode,
  getProvinceCode,
} from "../../../../lib/api/address";

export const AddressModule = ({
  inputsId = {
    postal_code: "postal_code_general",
    city: "city_general",
    province: "province_general",
    type_road: "type_road_general",
    name_road: "name_road_general",
    number_road: "number_road_general",
    doorway: "doorway_general",
    stair: "stair_general",
    floor: "floor_general",
    door: "door_general",
  },
  addressType = "address_general",
  summaryData,
  setSummaryData,
  extraDataRegister,
  setExtraDataRegister,
  defaultAddress = {},
  cups,
  updateRegistration = true,
}) => {
  const [addressError, setAddressError] = useState("");
  const [detectedAddress, setDetectedAddress] = useState({
    cities: [],
    province: null,
  });
  const [notRequiredAddress, setNotRequiredAddress] = useState({});
  const [defaultDataAddress, setDefaultDataAddress] = useState({});
  const [addressInfo, setAddressInfo] = useState();

  const { setValue } = useFormContext();

  const handleNotRequiredAddress = (name, value) => {
    const newNotRequiredAddress = { ...notRequiredAddress };
    newNotRequiredAddress[name] = value;

    const newExtraDataRegister = { ...extraDataRegister };
    newExtraDataRegister[addressType] = {
      ...newExtraDataRegister[addressType],
      ...newNotRequiredAddress,
    };

    setNotRequiredAddress(newNotRequiredAddress);
    setExtraDataRegister(newExtraDataRegister);
  };

  const handleValidationAddress = async (name, value) => {
    const newAddressInfo = { ...addressInfo };
    const newExtraDataRegister = { ...extraDataRegister };

    const requiredAddress = {};

    if (value && name == inputsId.postal_code) {
      if (value.length != 5 || value == "") {
        setDefaultDataAddress({});
        setAddressInfo();

        setValue(inputsId.name_road, "");
        setValue(inputsId.number_road, "");
        setValue(inputsId.door, "");
        setValue(inputsId.doorway, "");
        setValue(inputsId.stair, "");
        setValue(inputsId.floor, "");
        setValue(inputsId.type_road, "");

        return;
      }

      const {
        data: municipalitiesByPostalCode,
      } = await getMunicipalitiesByPostalCode(value);

      const { CountyCode, Municipalities } = municipalitiesByPostalCode;

      requiredAddress[inputsId.province] = CountyCode;

      const cities = Municipalities.map((element) => element.MunicipalityName);

      const { data: dataProvinceCode } = await getProvinceCode();

      if (dataProvinceCode) {
        const { Description: province } = dataProvinceCode.find((element) => {
          return Number(element.Code) == Number(CountyCode);
        });

        setDetectedAddress({ province, cities });

        newAddressInfo[inputsId.city] = cities[0];
        newAddressInfo[inputsId.province] = province;
      }
    }

    if (name == inputsId.type_road) {
      newExtraDataRegister[addressType] = {
        ...newExtraDataRegister[addressType],
      };

      newExtraDataRegister[addressType][inputsId.type_road] = value;
    } else {
      newAddressInfo[name] = value;

      setAddressInfo(newAddressInfo);
    }

    if (
      Object.keys(newAddressInfo).some((element) =>
        isEmpty(newAddressInfo[element])
      )
    )
      return;

    const dataAddress = {
      postal_code: newAddressInfo[inputsId.postal_code],
      city: newAddressInfo[inputsId.city],
      name_road: newAddressInfo[inputsId.name_road],
      number_road: newAddressInfo[inputsId.number_road],
    };

    const newSummaryData = { ...summaryData };
    newSummaryData["address"] = {
      ...dataAddress,
      province:
        newAddressInfo[inputsId.province] || newSummaryData["address"].province,
      type_road: newAddressInfo[inputsId.type_road] || "Calle",
    };

    setSummaryData(newSummaryData);

    if (updateRegistration) return;

    const { data } = await getAddressCode(dataAddress);

    const response = await validateAddress(data);

    let newAddressError = "";

    if (!response) newAddressError = GENERAL_ERROR;
    else if (response.error) newAddressError = response.error;
    else {
      requiredAddress[inputsId.postal_code] = dataAddress.postal_code;
      requiredAddress[inputsId.city] = data.municipalityINECode;
      requiredAddress[inputsId.name_road] = newAddressInfo[inputsId.name_road];
      requiredAddress[inputsId.number_road] = data.number;

      newExtraDataRegister[addressType] = {
        ...newExtraDataRegister[addressType],
        ...requiredAddress,
      };
    }

    setExtraDataRegister(newExtraDataRegister);

    return setAddressError(newAddressError);
  };

  useEffect(() => {
    if (cups) return;

    setAddressInfo();
  }, [cups]);

  useEffect(() => {
    if (addressInfo) return;

    const addressInfoObject = {};
    addressInfoObject[inputsId.postal_code] = "";
    addressInfoObject[inputsId.city] = "";
    addressInfoObject[inputsId.name_road] = "";
    addressInfoObject[inputsId.number_road] = "";

    const newSummaryData = { ...summaryData };
    newSummaryData["address"] = {};

    const newExtraDataRegister = { ...extraDataRegister };
    const addressTypeObject = {};
    addressTypeObject[inputsId.type_road] = "Calle";
    newExtraDataRegister[addressType] = addressTypeObject;
    setExtraDataRegister(newExtraDataRegister);

    setAddressInfo(addressInfoObject);
    setSummaryData(newSummaryData);
  }, [addressInfo]);

  useEffect(() => {
    if (isEmpty(defaultAddress)) {
      return setDefaultDataAddress({});
    }

    setDefaultDataAddress(defaultAddress);

    const newSummaryData = { ...summaryData };
    newSummaryData["address"] = {
      ...defaultAddress,
      type_road: defaultAddress?.type_road || "Calle",
    };

    const newExtraDataRegister = { ...extraDataRegister };
    const newAddressTypeInfo = {};
    newAddressTypeInfo[inputsId.postal_code] = defaultAddress?.postalCode;
    newAddressTypeInfo[inputsId.name_road] = defaultAddress?.name_road;
    newAddressTypeInfo[inputsId.number_road] = defaultAddress?.number_road;
    newAddressTypeInfo[inputsId.door] = defaultAddress?.door;
    newAddressTypeInfo[inputsId.doorway] = defaultAddress?.doorway;
    newAddressTypeInfo[inputsId.stair] = defaultAddress?.stair;
    newAddressTypeInfo[inputsId.floor] = defaultAddress?.floor;
    newAddressTypeInfo[inputsId.type_road] =
      defaultAddress?.type_road || "Calle";

    newExtraDataRegister[addressType] = newAddressTypeInfo;

    const addressInfoObject = {};
    if (defaultAddress?.postalCode) {
      addressInfoObject[inputsId.postal_code] = defaultAddress?.postalCode;
    }
    if (defaultAddress?.province) {
      addressInfoObject[inputsId.province] = defaultAddress?.province;
    }

    if (defaultAddress?.city) {
      addressInfoObject[inputsId.city] = defaultAddress?.city;
    }
    if (defaultAddress?.name_road) {
      addressInfoObject[inputsId.name_road] = defaultAddress?.name_road;
    }

    if (defaultAddress?.number_road) {
      addressInfoObject[inputsId.number_road] = defaultAddress?.number_road;
    }

    setExtraDataRegister(newExtraDataRegister);
    setSummaryData(newSummaryData);
    setAddressInfo({ ...addressInfo, ...addressInfoObject });
  }, [defaultAddress]);

  return (
    <SCAddressModule>
      <div className="row-1">
        <div className="row-2-mobile">
          <InputText
            label="Código Postal"
            name={inputsId.postal_code}
            validation={{
              required: true,
              validate: async (value) =>
                handleValidationAddress(inputsId.postal_code, value),
            }}
            additionalErrors={!isEmpty(addressError)}
            defaultValue={defaultDataAddress?.postalCode}
          />

          {detectedAddress.cities.length > 1 ? (
            <SingleDropdown
              label="Localidad"
              name={inputsId.city}
              options={detectedAddress.cities}
              placeholder={detectedAddress.cities[0]}
              validation={{
                required: true,
                validate: async (value) =>
                  handleValidationAddress(inputsId.city, value),
              }}
              additionalErrors={!isEmpty(addressError)}
            />
          ) : (
            <InputText
              label="Localidad"
              name={inputsId.city}
              validation={{
                required: true,
                validate: async (value) =>
                  handleValidationAddress(inputsId.city, value),
              }}
              additionalErrors={!isEmpty(addressError)}
              defaultValue={
                detectedAddress?.cities[0] || defaultDataAddress?.city
              }
            />
          )}
        </div>
        <div className="row-1-mobile">
          <InputText
            label="Provincia"
            name={inputsId.province}
            validation={{
              required: true,
              validate: async (value) =>
                handleValidationAddress(inputsId.province, value),
            }}
            additionalErrors={!isEmpty(addressError)}
            defaultValue={
              detectedAddress.province || defaultDataAddress?.province
            }
          />
        </div>
      </div>
      <div className="row-2">
        <SingleDropdown
          label="Tipo de vía"
          name={inputsId.type_road}
          options={roadsType}
          placeholder={defaultDataAddress?.type_road || "Calle"}
          validation={{
            required: true,
            validate: async (value) =>
              handleValidationAddress(inputsId.type_road, value),
          }}
          additionalErrors={!isEmpty(addressError)}
        />

        <div className="row-2-mobile">
          <InputText
            label="Nombre de via"
            name={inputsId.name_road}
            validation={{
              required: true,
              validate: async (value) => {
                handleValidationAddress(inputsId.name_road, value);
              },
            }}
            additionalErrors={!isEmpty(addressError)}
            defaultValue={
              defaultDataAddress.name_road ||
              (addressInfo && addressInfo[inputsId.name_road])
            }
          />
          <InputText
            label="Número"
            name={inputsId.number_road}
            validation={{
              required: true,
              validate: async (value) =>
                handleValidationAddress(inputsId.number_road, value),
            }}
            additionalErrors={!isEmpty(addressError)}
            defaultValue={
              defaultDataAddress?.number_road ||
              (addressInfo && addressInfo[inputsId.number_road])
            }
          />
        </div>
      </div>
      <div className="row-3">
        <InputText
          label="Portal"
          name={inputsId.doorway}
          validation={{
            validate: async (value) =>
              handleNotRequiredAddress(inputsId.doorway, value),
          }}
          additionalErrors={!isEmpty(addressError)}
          defaultValue={defaultDataAddress?.doorway}
        />
        <InputText
          label="Escalera"
          name={inputsId.stair}
          validation={{
            validate: async (value) =>
              handleNotRequiredAddress(inputsId.stair, value),
          }}
          additionalErrors={!isEmpty(addressError)}
          defaultValue={defaultDataAddress?.stair}
        />
        <InputText
          label="Piso"
          name={inputsId.floor}
          validation={{
            validate: async (value) =>
              handleNotRequiredAddress(inputsId.floor, value),
          }}
          additionalErrors={!isEmpty(addressError)}
          defaultValue={defaultDataAddress?.floor}
        />
        <InputText
          label="Puerta"
          name={inputsId.door}
          validation={{
            validate: async (value) =>
              handleNotRequiredAddress(inputsId.door, value),
          }}
          additionalErrors={!isEmpty(addressError)}
          defaultValue={defaultDataAddress?.door}
        />
      </div>

      <div className="address-error-wrapper">
        {isEmpty(addressError) || (
          <SCTextXSLight color="black" color="red">
            {addressError}
          </SCTextXSLight>
        )}
      </div>
    </SCAddressModule>
  );
};

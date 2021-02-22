import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { isEmpty } from "lodash";

import { SCAddressModule } from "./AddressModule.styled";
import { SCTextXSLight } from "../../../atoms/Text/TextXS.styled";
import { InputText } from "../../../atoms/Input/Input.atom";
import { SingleDropdown } from "../../../molecules/Dropdown/Single/SingleDropdown.molecule";

import {
  getMunicipalitiesByPostalCode,
  getProvinceCode,
} from "../../../../lib/api/address";
import { validateAddress } from "../../../../lib/api/validators";

import roadsType from "../../../../utils/data/roadTypes";

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
  setHasFormErros,
}) => {
  // General
  const [provinceData, setProvinceData] = useState();
  const [addressError, setAddressError] = useState("");
  const [defaultDataAddress, setDefaultDataAddress] = useState({});
  const [detectedAddress, setDetectedAddress] = useState({
    cities: [],
    province: null,
  });

  // Address
  const [addressInfo, setAddressInfo] = useState();
  const [municipalitiesCode, setMunicipalitiesCode] = useState();
  const [notRequiredAddress, setNotRequiredAddress] = useState({});

  const { getValues, clearErrors, setValue } = useFormContext();

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

  const handleMunicipalitiesList = (name, value) => {
    const newAddressInfo = { ...addressInfo };
    const newExtraDataRegister = { ...extraDataRegister };

    const { MunicipalityCode } = municipalitiesCode.find((element) => {
      return element.MunicipalityName == value;
    });

    newAddressInfo[name] = value;

    newExtraDataRegister[addressType]["cityId"] = MunicipalityCode;
    newExtraDataRegister[addressType] = {
      ...newExtraDataRegister[addressType],
      ...newAddressInfo,
    };

    setAddressInfo(newAddressInfo);
    setExtraDataRegister(newExtraDataRegister);
  };

  const handleValidationAddress = async (name, value) => {
    const newAddressInfo = { ...addressInfo };
    const newExtraDataRegister = { ...extraDataRegister };
    const newSummaryData = { ...summaryData };

    newAddressInfo[name] = value;

    if (name == inputsId.postal_code) {
      setAddressError("");
      setHasFormErros(false);

      // Se obtiene el CountyCode y las diferentes localidades que comprenden ese Código Postal.
      const {
        data: municipalitiesByPostalCodeData,
        error: municipalitiesByPostalCodeError,
      } = await getMunicipalitiesByPostalCode(value);

      // Si el código postal no existe -> error
      if (municipalitiesByPostalCodeError) {
        setAddressError(municipalitiesByPostalCodeError);
        setHasFormErros(true);
        return;
      }

      const { CountyCode, Municipalities } = municipalitiesByPostalCodeData;
      newExtraDataRegister[addressType]["countyId"] = CountyCode;

      // Se valida que el código postal está dentro de los limites de suministro.
      const { error: validateAddressError } = await validateAddress(CountyCode);

      // Si el código postal está fuera del límite de suministro -> error.
      if (validateAddressError) {
        setAddressError(validateAddressError);
        setHasFormErros(true);
        return;
      }

      // Se obtienen las diferentes localidades del código postal.
      const cities = Municipalities.map((element) => element.MunicipalityName);
      newExtraDataRegister[addressType]["cityId"] =
        Municipalities[0].MunicipalityCode;
      setMunicipalitiesCode(Municipalities);

      // Obetenemos el nombre de la provincia asociada al código postal
      if (provinceData) {
        const { Description: province } = provinceData.find(
          (element) => Number(element.Code) == Number(CountyCode)
        );

        clearErrors(inputsId.city);
        clearErrors(inputsId.province);

        newAddressInfo[inputsId.city] = cities[0];
        newAddressInfo[inputsId.province] = province;

        setDetectedAddress({ province, cities });
      }
    }

    // Se actualiza la información de la dirección
    setAddressInfo(newAddressInfo);

    // EXTRA DATA REGISTER
    newExtraDataRegister[addressType][name] = value;
    newExtraDataRegister[addressType] = {
      ...newAddressInfo,
      ...newExtraDataRegister[addressType],
    };
    setExtraDataRegister(newExtraDataRegister);

    // SUMMARY DATA
    newSummaryData["address"] = {
      postal_code: newAddressInfo[inputsId.postal_code],
      city: newAddressInfo[inputsId.city],
      name_road: newAddressInfo[inputsId.name_road],
      number_road: newAddressInfo[inputsId.number_road],
      province: newAddressInfo[inputsId.province],
      type_road: newAddressInfo[inputsId.type_road] || "Calle",
    };
    setSummaryData(newSummaryData);
  };

  useEffect(() => {
    async function getProvinceData() {
      const { data, error } = await getProvinceCode();

      if (error) return;

      setProvinceData(data);
    }

    if (!provinceData) {
      getProvinceData();
    }
  }, []);

  useEffect(() => {
    if (addressInfo) {
      const postalCodeAddressInfo = addressInfo[inputsId.postal_code];

      if (postalCodeAddressInfo) {
        const postalCode = getValues()[inputsId.postal_code];

        if (!postalCode || postalCode.length < 5) {
          setAddressInfo();
          setDetectedAddress({
            cities: [],
            province: null,
          });
        }
      }
    }
  }, [getValues()]);

  useEffect(() => {
    if (cups) return;

    setAddressInfo();
  }, [cups]);

  useEffect(() => {
    if (addressInfo) return;

    const newSummaryData = { ...summaryData };
    newSummaryData["address"] = {};

    const newExtraDataRegister = { ...extraDataRegister };
    const addressTypeObject = {};
    addressTypeObject[inputsId.type_road] = "Calle";
    newExtraDataRegister[addressType] = addressTypeObject;

    setSummaryData(newSummaryData);
    setExtraDataRegister(newExtraDataRegister);
  }, [addressInfo]);

  useEffect(() => {
    if (isEmpty(defaultAddress)) {
      return setDefaultDataAddress({});
    }

    const newSummaryData = { ...summaryData };
    const newExtraDataRegister = { ...extraDataRegister };

    const newAddressTypeInfo = {};
    const addressInfoObject = {};

    if (defaultAddress?.postalCode) {
      addressInfoObject[inputsId.postal_code] = defaultAddress?.postalCode;
      newAddressTypeInfo[inputsId.postal_code] = defaultAddress?.postalCode;
    }
    if (defaultAddress?.name_road) {
      addressInfoObject[inputsId.name_road] = defaultAddress?.name_road;
      newAddressTypeInfo[inputsId.name_road] = defaultAddress?.name_road;
    }
    if (defaultAddress?.number_road) {
      addressInfoObject[inputsId.number_road] = defaultAddress?.number_road;
      newAddressTypeInfo[inputsId.number_road] = defaultAddress?.number_road;
    }
    if (defaultAddress?.province) {
      addressInfoObject[inputsId.province] = defaultAddress?.province;
    }
    if (defaultAddress?.city) {
      addressInfoObject[inputsId.city] = defaultAddress?.city;
    }
    if (defaultAddress?.door) {
      newAddressTypeInfo[inputsId.door] = defaultAddress.door;
    }
    if (defaultAddress?.doorway) {
      newAddressTypeInfo[inputsId.doorway] = defaultAddress.doorway;
    }
    if (defaultAddress?.stair) {
      newAddressTypeInfo[inputsId.stair] = defaultAddress.stair;
    }
    if (defaultAddress?.floor) {
      newAddressTypeInfo[inputsId.floor] = defaultAddress.floor;
    }
    if (defaultAddress?.type_road) {
      newAddressTypeInfo[inputsId.type_road] = defaultAddress?.type_road;
    } else {
      newAddressTypeInfo[inputsId.type_road] = "Calle";
    }

    // EXTRA DATA REGISTER
    newExtraDataRegister[addressType] = newAddressTypeInfo;

    // SUMMARY DATA
    newSummaryData["address"] = {
      ...defaultAddress,
      type_road: defaultAddress?.type_road || "Calle",
    };

    setDefaultDataAddress(defaultAddress);
    setExtraDataRegister(newExtraDataRegister);
    setSummaryData(newSummaryData);
    setAddressInfo({ ...addressInfoObject });
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
                  handleMunicipalitiesList(inputsId.city, value),
              }}
              additionalErrors={!isEmpty(addressError)}
            />
          ) : (
            <InputText
              disabled
              label="Localidad"
              name={inputsId.city}
              validation={{
                required: true,
              }}
              additionalErrors={!isEmpty(addressError)}
              defaultValue={
                detectedAddress?.cities[0] || defaultDataAddress?.city || ""
              }
            />
          )}
        </div>
        <div className="row-1-mobile">
          <InputText
            disabled
            label="Provincia"
            name={inputsId.province}
            validation={{
              required: true,
            }}
            additionalErrors={!isEmpty(addressError)}
            defaultValue={
              detectedAddress.province || defaultDataAddress?.province || ""
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
              (addressInfo && addressInfo[inputsId.name_road]) ||
              ""
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
              (addressInfo && addressInfo[inputsId.number_road]) ||
              ""
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
          defaultValue={defaultDataAddress?.doorway || ""}
        />
        <InputText
          label="Escalera"
          name={inputsId.stair}
          validation={{
            validate: async (value) =>
              handleNotRequiredAddress(inputsId.stair, value),
          }}
          additionalErrors={!isEmpty(addressError)}
          defaultValue={defaultDataAddress?.stair || ""}
        />
        <InputText
          label="Piso"
          name={inputsId.floor}
          validation={{
            validate: async (value) =>
              handleNotRequiredAddress(inputsId.floor, value),
          }}
          additionalErrors={!isEmpty(addressError)}
          defaultValue={defaultDataAddress?.floor || ""}
        />
        <InputText
          label="Puerta"
          name={inputsId.door}
          validation={{
            validate: async (value) =>
              handleNotRequiredAddress(inputsId.door, value),
          }}
          additionalErrors={!isEmpty(addressError)}
          defaultValue={defaultDataAddress?.door || ""}
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

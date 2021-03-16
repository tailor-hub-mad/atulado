import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { find, isEmpty } from "lodash";

import { SCWhereModule } from "./WhereModule.styled";
import { InputText } from "../../../atoms/Input/Input.atom";
import { AddressModule } from "../../../organisms/FormModule/AddressModule/AddressModule.organism";
import { Helper } from "../../../atoms/Helper/Helper.atom";

import { validateCUPS } from "../../../../lib/api/validators";
import { getSIPSInformation } from "../../../../lib/api/offered";
import {
  getMunicipalitiesCode,
  getProvinceCode,
} from "../../../../lib/api/address";

import { PLACEHOLDER_FORM_CUP } from "../../../../utils/constants";

export const WhereModule = ({
  summaryData,
  setSummaryData,
  setCUPSValue,
  extraDataRegister,
  setExtraDataRegister,
  defaultAddressNewContract = {},
  defaultInfoUpdateContract = {},
  setHasFormErros,
  hasFormErrors,
}) => {
  const [cups, setCups] = useState();
  const [cupsValidated, setCupsValidated] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({});

  const { getValues } = useFormContext();

  const handleDefaultAddressNewContract = (address) => {
    const { CityId } = address;

    let province = "";
    let city = "";

    if (CityId) {
      const { CountyId, CityId } = address;

      province = CountyId;
      city = CityId;
    } else {
      const { County, City } = address;

      province = County;
      city = City;
    }

    const {
      PostalCode: postalCode,
      Street,
      Number: number_road,
      Portal: doorway,
      Stair: stair,
      Floor,
    } = address;

    const [floor, door] = Floor ? [...Floor.split(" ")] : [];
    const splitStreet = Street?.split(" ") || [];
    const type_road = "";
    const name_road = Street;

    const newDefaultAddressNewContract = {
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

    return newDefaultAddressNewContract;
  };

  useEffect(() => {
    async function sipsInformation(cupsInfo) {
      const { data: dataSipsInformation } = await getSIPSInformation(cupsInfo);

      if (dataSipsInformation) {
        const {
          INEPostalCode,
          INECountyCode,
          INECityCode,
        } = dataSipsInformation;

        const { data: dataProvinceCode } = await getProvinceCode();

        if (dataProvinceCode) {
          const { Description: province } = find(
            dataProvinceCode,
            (element) => {
              return element.Code == INEPostalCode.substring(0, 2);
            }
          );

          const { data: dataMunicipalityCode } = await getMunicipalitiesCode(
            INECountyCode
          );

          const { Description: city } = find(
            dataMunicipalityCode,
            (element) => {
              return element.Code == INECityCode.substring(2, 5);
            }
          );

          setDefaultAddress({ city, postalCode: INEPostalCode, province });
        }
      }
    }

    if (getValues()?.cups == "") {
      setCupsValidated(false);
      setCUPSValue();
      setCups();
      if (!isEmpty(defaultAddressNewContract)) {
        setDefaultAddress(
          handleDefaultAddressNewContract(defaultAddressNewContract)
        );
      } else {
        setDefaultAddress({});
      }
    } else {
      if (cupsValidated && getValues()?.cups.length >= 20) {
        setCUPSValue(cups);
        setCups(cups);
        sipsInformation(cups);

        const newSummaryData = { ...summaryData };
        summaryData["cups"] = cups;
        setSummaryData(newSummaryData);
      } else {
        setCUPSValue();
        if (!isEmpty(defaultAddressNewContract)) {
          setDefaultAddress(
            handleDefaultAddressNewContract(defaultAddressNewContract)
          );
        } else setDefaultAddress({});
      }
    }
  }, [cupsValidated, getValues()?.cups]);

  return (
    <SCWhereModule>
      <div className="helper">
        <Helper>
          <p>
            El CUPS es código que identifica el punto de suministro de energía
            de tu vivienda y con él podemos averiguar tu potencia, consumo y
            tarifa de acceso.
          </p>
          <p>
            Lo puedes encontrar en tu factura de luz, apartado{" "}
            <span>Datos de Contrato</span>.
          </p>
        </Helper>
      </div>

      <div className="row-1">
        <InputText
          label="CUPS"
          name="cups"
          placeholder={PLACEHOLDER_FORM_CUP}
          apiValidation={validateCUPS}
          validation={{
            required: true,
            validate: async (value) => {
              setCups(value);
            },
          }}
          setValidatedInput={(value) => {
            setCupsValidated(value);
          }}
          defaultValue={defaultInfoUpdateContract?.cups}
          disabled={!isEmpty(defaultInfoUpdateContract)}
        />
      </div>
      <AddressModule
        summaryData={summaryData}
        setSummaryData={setSummaryData}
        defaultAddress={defaultAddress}
        extraDataRegister={extraDataRegister}
        setExtraDataRegister={setExtraDataRegister}
        cups={cups}
        updateRegistration={!isEmpty(defaultInfoUpdateContract)}
        setHasFormErros={setHasFormErros}
        hasFormErrors={hasFormErrors}
      />
    </SCWhereModule>
  );
};

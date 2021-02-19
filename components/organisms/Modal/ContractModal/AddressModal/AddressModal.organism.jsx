import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { SCAddressModal } from "./AddressModal.styled";
import { SCTextXL } from "../../../../atoms/Text/TextXL.styled";
import { Modal } from "../../../../molecules/Modal/Modal.molecule";
import Button from "../../../../atoms/Button/Button.atom";
import { AddressModule } from "../../../FormModule/AddressModule/AddressModule.organism";

import { getMunicipalitiesByPostalCode } from "../../../../../lib/api/address";

export const AddressModal = ({ closeAction, action }) => {
  const methods = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (dataInputs) => {
    const {
      city_general,
      doorway_general,
      floor_general,
      name_road_general,
      number_road_general,
      postal_code_general,
      stair_general,
    } = dataInputs;

    const {
      data: municipalitiesByPostalCodeData,
    } = await getMunicipalitiesByPostalCode(postal_code_general);

    const { CountyCode, Municipalities } = municipalitiesByPostalCodeData;

    const address = {
      street: name_road_general,
      number: number_road_general,
      portal: doorway_general,
      postalCode: postal_code_general,
      floor: floor_general,
      stair: stair_general,
      cityId: Municipalities[0].MunicipalityCode,
      cityName: city_general,
      countyId: CountyCode,
    };

    action(address);
  };

  return (
    <Modal closeAction={closeAction} type="address">
      <SCAddressModal>
        <div className="title-modal-wrapper">
          <SCTextXL>Cambiar información de contacto</SCTextXL>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AddressModule
              summaryData={{}}
              setSummaryData={() => {}}
              defaultAddress={{}}
              extraDataRegister={{}}
              setExtraDataRegister={() => {}}
              cups={""}
            />
            <div className="button-modal-wrapper">
              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </FormProvider>
      </SCAddressModal>
    </Modal>
  );
};

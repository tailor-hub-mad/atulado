import { isEmpty, startsWith, flatten, pickBy, find } from "lodash";

import { getMunicipalitiesByPostalCode } from "../lib/api/address";

////////////////////////////////////////////////////
// Format data API
////////////////////////////////////////////////////

const handleDataHolder = (data) => {
  const holderData = {};

  if (data.isCompany) {
    const {
      company_cif,
      company_name,
      company_email,
      company_phone,
      company_admin_dni,
      company_admin_name,
      company_admin_surname,
    } = data;

    holderData["nif"] = company_cif;
    holderData["name"] = company_name;
    holderData["lastName"] = "";
    holderData["secondLastName"] = "";
    holderData["email"] = company_email;
    holderData["phoneNumber"] = company_phone;
    holderData["legalNIFCIF"] = company_admin_dni;
    holderData["legalName"] = company_admin_name;

    if (company_admin_surname) {
      const auxSurname = company_admin_surname.split(" ");
      holderData["legalLastName"] = auxSurname[0];
      if (auxSurname.length > 1) {
        holderData["legalSecondLastName"] = auxSurname[1];
      } else {
        holderData["legalSecondLastName"] = "";
      }
    } else {
      holderData["legalLastName"] = "";
      holderData["legalSecondLastName"] = "";
    }
  } else {
    const {
      client_dni,
      client_name,
      client_surname,
      client_email,
      client_phone,
    } = data;

    holderData["nif"] = client_dni;
    holderData["name"] = client_name;
    holderData["email"] = client_email;
    holderData["phoneNumber"] = client_phone;

    if (client_surname) {
      const auxSurname = client_surname.split(" ");
      holderData["lastName"] = auxSurname[0];
      if (auxSurname.length > 1) {
        holderData["secondLastName"] = auxSurname[1];
      } else {
        holderData["secondLastName"] = "";
      }
    } else {
      holderData["lastName"] = "";
      holderData["secondLastName"] = "";
    }
  }

  return holderData;
};

const handleDataPayer = (data) => {
  let payerData = {};

  if (data.isPayer) {
    if (data.isCompanyPayer) {
      const {
        company_payer_cif,
        company_payer_name,
        company_payer_email,
        company_payer_admin_dni,
        company_payer_admin_name,
        company_payer_admin_surname,
      } = data;

      payerData["nif"] = company_payer_cif;
      payerData["name"] = company_payer_name;
      payerData["lastName"] = "";
      payerData["secondLastName"] = "";
      payerData["email"] = company_payer_email;

      payerData["legalNIFCIF"] = company_payer_admin_dni;
      payerData["legalName"] = company_payer_admin_name;

      if (company_payer_admin_surname) {
        const auxSurname = company_payer_admin_surname.split(" ");
        payerData["legalLastName"] = auxSurname[0];
        if (auxSurname.length > 1) {
          payerData["legalSecondLastName"] = auxSurname[1];
        } else {
          payerData["legalSecondLastName"] = "";
        }
      } else {
        payerData["legalLastName"] = "";
        payerData["legalSecondLastName"] = "";
      }
    } else {
      const {
        client_payer_dni,
        client_payer_name,
        client_payer_surname,
        client_payer_phone,
        client_payer_email,
      } = data;

      payerData["nif"] = client_payer_dni;
      payerData["name"] = client_payer_name;
      payerData["phoneNumber"] = client_payer_phone;
      payerData["email"] = client_payer_email;

      if (client_payer_surname) {
        const auxSurname = client_payer_surname.split(" ");
        payerData["lastName"] = auxSurname[0];
        if (auxSurname.length > 1) {
          payerData["secondLastName"] = auxSurname[1];
        } else {
          payerData["secondLastName"] = "";
        }
      } else {
        payerData["secondLastName"] = "";
        payerData["lastName"] = "";
      }
    }
  } else {
    const {
      client_dni,
      client_name,
      client_surname,
      client_email,
      client_phone,
    } = data;

    payerData["nif"] = client_dni;
    payerData["name"] = client_name;
    payerData["email"] = client_email;
    payerData["phoneNumber"] = client_phone;

    if (client_surname) {
      const auxSurname = client_surname.split(" ");
      payerData["lastName"] = auxSurname[0];
      if (auxSurname.length > 1) {
        payerData["secondLastName"] = auxSurname[1];
      } else {
        payerData["secondLastName"] = "";
      }
    } else {
      payerData["lastName"] = "";
      payerData["secondLastName"] = "";
    }
  }

  payerData = { ...payerData, iban: data.iban };

  return payerData;
};

const handleAddress = async (data) => {
  let addressData = {};

  let street = "";
  let type_road = "";

  let postalCode = "";

  Object.keys(data).forEach((key) => {
    if (startsWith(key, "name_road")) {
      street = data[key];
    }
    if (startsWith(key, "type_road")) {
      type_road = data[key];
    }
    if (startsWith(key, "number_road")) {
      addressData["number"] = data[key];
    }
    if (startsWith(key, "doorway")) {
      addressData["portal"] = data[key];
    }
    if (startsWith(key, "postal_code")) {
      addressData["postalCode"] = data[key];
      postalCode = data[key];
    }
    if (startsWith(key, "floor")) {
      addressData["floor"] = data[key];
    }
    if (startsWith(key, "stair")) {
      addressData["stair"] = data[key];
    }
    if (startsWith(key, "city")) {
      addressData["cityId"] = data[key];
    }
    if (startsWith(key, "province")) {
      addressData["countyId"] = data[key];
    }
  });

  if (!addressData["countyId"]) {
    const {
      data: municipalitiesByPostalCode,
    } = await getMunicipalitiesByPostalCode(postalCode);

    const { CountyCode } = municipalitiesByPostalCode;

    addressData["countyId"] = CountyCode;
  }

  addressData["street"] = `${type_road} ${street}`;

  return addressData;
};

const handleSupply = (data) => {
  const supplyData = {};
  const { atrInformation, atrSIPSInformation } = data;

  if (atrSIPSInformation?.newSupplyContract) {
    supplyData["checkSips"] = false;

    supplyData["sipsCUPS"] = data.cups;
    supplyData["sipsATR"] = atrInformation.newATR.code;
    supplyData["sipsPowerP1"] = 0;
    supplyData["sipsPowerP2"] = 0;
    supplyData["sipsPowerP3"] = 0;
    supplyData["sipsPowerP4"] = 0;
    supplyData["sipsPowerP5"] = 0;
    supplyData["sipsPowerP6"] = 0;

    Object.keys(atrInformation.newPowerValues).forEach((element) => {
      supplyData[`sipsPowerP${Number(element) + 1}`] = Number(
        atrInformation.newPowerValues[element]
      );
    });

    supplyData["sipsPowerControlMode"] = atrInformation?.powerControlMode
      ? 2
      : 1;
  } else {
    if (atrSIPSInformation.checkSips) {
      supplyData["checkSips"] = true;
      supplyData["sipsCUPS"] = data.cups;
      supplyData["sipsATR"] = atrSIPSInformation.ATR?.Code;
      supplyData["sipsPowerP1"] = atrSIPSInformation.SipsPowerP1 || 0;
      supplyData["sipsPowerP2"] = atrSIPSInformation.SipsPowerP2 || 0;
      supplyData["sipsPowerP3"] = atrSIPSInformation.SipsPowerP3 || 0;
      supplyData["sipsPowerP4"] = atrSIPSInformation.SipsPowerP4 || 0;
      supplyData["sipsPowerP5"] = atrSIPSInformation.SipsPowerP5 || 0;
      supplyData["sipsPowerP6"] = atrSIPSInformation.SipsPowerP6 || 0;
      supplyData["sipsTensionLevel"] = atrSIPSInformation?.TensionLevel?.Code
        ? Number(atrSIPSInformation.TensionLevel?.Code)
        : 0;
      supplyData["sipsPowerControlMode"] = Number(
        atrSIPSInformation.PowerControlMode?.Code
      );
      supplyData["sipsMaxBIEPower"] = Number(
        atrSIPSInformation.SipsMaxBIEPower
      );
      supplyData["sipsExtensionRights"] = Number(
        atrSIPSInformation.ExtensionsRightsValue
      );
      supplyData["sipsAccessRights"] = Number(
        atrSIPSInformation.SipsAccessRights
      );
      supplyData["sipsDistributor"] =
        atrSIPSInformation.DistributionCompany?.Code;
      supplyData["sipsCNAE"] = atrSIPSInformation.CNAE.toString();
    } else {
      supplyData["checkSips"] = false;

      supplyData["sipsCUPS"] = data.cups;
      supplyData["sipsPowerP1"] = 0;
      supplyData["sipsPowerP2"] = 0;
      supplyData["sipsPowerP3"] = 0;
      supplyData["sipsPowerP4"] = 0;
      supplyData["sipsPowerP5"] = 0;
      supplyData["sipsPowerP6"] = 0;

      const { updateContract, updateRegistration } = atrSIPSInformation;

      if (updateContract) {
        supplyData["sipsATR"] = atrSIPSInformation.ATR;

        supplyData["sipsPowerP1"] = atrSIPSInformation.PowerP1 || 0;
        supplyData["sipsPowerP2"] = atrSIPSInformation.PowerP2 || 0;
        supplyData["sipsPowerP3"] = atrSIPSInformation.PowerP3 || 0;
        supplyData["sipsPowerP4"] = atrSIPSInformation.PowerP4 || 0;
        supplyData["sipsPowerP5"] = atrSIPSInformation.PowerP5 || 0;
        supplyData["sipsPowerP6"] = atrSIPSInformation.PowerP6 || 0;

        supplyData["sipsPowerControlMode"] =
          atrInformation?.PowerControlMode || 1;
      } else if (updateRegistration) {
        supplyData["sipsATR"] = atrSIPSInformation.ATR;

        supplyData["sipsPowerP1"] = atrSIPSInformation.PowerP1 || 0;
        supplyData["sipsPowerP2"] = atrSIPSInformation.PowerP2 || 0;
        supplyData["sipsPowerP3"] = atrSIPSInformation.PowerP3 || 0;
        supplyData["sipsPowerP4"] = atrSIPSInformation.PowerP4 || 0;
        supplyData["sipsPowerP5"] = atrSIPSInformation.PowerP5 || 0;
        supplyData["sipsPowerP6"] = atrSIPSInformation.PowerP6 || 0;

        const {
          SipsAccessRights,
          SipsCNAE,
          SipsDistributor,
          SipsExtensionRights,
          SipsMaxBIEPower,
          SipsPowerControlMode,
          SipsTensionLevel,
        } = atrSIPSInformation;

        supplyData["sipsTensionLevel"] = SipsTensionLevel;
        supplyData["sipsMaxBIEPower"] = SipsMaxBIEPower;
        supplyData["sipsExtensionRights"] = SipsExtensionRights;
        supplyData["sipsPowerControlMode"] = SipsPowerControlMode;
        supplyData["sipsAccessRights"] = SipsAccessRights;
        supplyData["sipsDistributor"] = SipsDistributor;
        supplyData["sipsCNAE"] = SipsCNAE;
      } else {
        supplyData["sipsATR"] = atrSIPSInformation?.currentATR?.code;

        Object.keys(atrSIPSInformation.newPowerValues).forEach((element) => {
          supplyData[`sipsPowerP${Number(element) + 1}`] = Number(
            atrSIPSInformation.newPowerValues[element]
          );
        });

        supplyData["sipsPowerControlMode"] = atrInformation?.powerControlMode
          ? 2
          : 1;
      }
    }
  }

  supplyData["cups"] = data.cups;

  if (atrInformation?.newATR?.code) {
    supplyData["atr"] = atrInformation.newATR?.code;
    supplyData["rateId"] = Number(atrInformation.RateId) || 1;
    supplyData["powerP1"] = 0;
    supplyData["powerP2"] = 0;
    supplyData["powerP3"] = 0;
    supplyData["powerP4"] = 0;
    supplyData["powerP5"] = 0;
    supplyData["powerP6"] = 0;

    Object.keys(atrInformation.newPowerValues).forEach((element) => {
      supplyData[`powerP${Number(element) + 1}`] = Number(
        atrInformation.newPowerValues[element]
      );
    });
    supplyData["tensionLevel"] = atrInformation?.TensionLevel
      ? Number(atrInformation.TensionLevel)
      : 0;
    supplyData["powerControlMode"] = atrInformation?.powerControlMode ? 2 : 1;
  } else {
    const { updateContract, updateRegistration } = atrSIPSInformation;

    if (updateContract || updateRegistration) {
      supplyData["atr"] = atrSIPSInformation.ATR;
      supplyData["rateId"] = Number(atrSIPSInformation.RateId) || 1;
      supplyData["powerP1"] = atrSIPSInformation.PowerP1 || 0;
      supplyData["powerP2"] = atrSIPSInformation.PowerP2 || 0;
      supplyData["powerP3"] = atrSIPSInformation.PowerP3 || 0;
      supplyData["powerP4"] = atrSIPSInformation.PowerP4 || 0;
      supplyData["powerP5"] = atrSIPSInformation.PowerP5 || 0;
      supplyData["powerP6"] = atrSIPSInformation.PowerP6 || 0;

      supplyData["tensionLevel"] = atrSIPSInformation.TensionLevel;

      supplyData["powerControlMode"] =
        Number(atrSIPSInformation?.PowerControlMode) || 1;
    } else {
      supplyData["atr"] = atrSIPSInformation.ATR?.Code;
      supplyData["rateId"] = Number(atrSIPSInformation.RateId) || 1;
      supplyData["powerP1"] = atrSIPSInformation.SipsPowerP1 || 0;
      supplyData["powerP2"] = atrSIPSInformation.SipsPowerP2 || 0;
      supplyData["powerP3"] = atrSIPSInformation.SipsPowerP3 || 0;
      supplyData["powerP4"] = atrSIPSInformation.SipsPowerP4 || 0;
      supplyData["powerP5"] = atrSIPSInformation.SipsPowerP5 || 0;
      supplyData["powerP6"] = atrSIPSInformation.SipsPowerP6 || 0;

      supplyData["tensionLevel"] = atrSIPSInformation.TensionLevel;

      supplyData["powerControlMode"] =
        Number(atrSIPSInformation?.PowerControlMode?.Code) || 1;
    }
  }

  if (data?.powerControlMode) {
    supplyData["powerControlMode"] = 2;
  }

  return supplyData;
};

const handleAttachmentData = (data) => {
  const attachmentData = {};
  const { bie, self_supply_bie, change_titularity_doc } = data;

  if (bie) {
    attachmentData["supplyBIEDocumentation"] = bie;
  }

  if (self_supply_bie) {
    attachmentData["selfSupplyBIEDocumentation"] = self_supply_bie;
  }

  if (change_titularity_doc) {
    attachmentData["changeDocumentation"] = change_titularity_doc;
  }

  return attachmentData;
};

export const handleDataRegistration = async (data) => {
  const holderData = handleDataHolder(data);
  const payerData = handleDataPayer(data);
  const supplyData = handleSupply(data);
  const attachmentData = handleAttachmentData(data);

  const address = await handleAddress(data.address_general);
  let fiscalAddress = {};
  let contactAddress = {};

  contactAddress = data.isContactAddress
    ? await handleAddress(data.address_contact)
    : address;

  fiscalAddress = data.isFiscalAddress
    ? await handleAddress(data.address_fiscal)
    : address;

  const dataRegister = {
    supply: supplyData,
    holder: holderData,
    payer: payerData,
    holderChange: data.change_titularity,
    holderChangeDocumentation: !isEmpty(attachmentData.changeDocumentation),
    filesHolderChangeDocumentation: attachmentData.changeDocumentation,
    supplyBIE: data?.powerControlMode || false,
    supplyBIEDocumentation: !isEmpty(attachmentData.supplyBIEDocumentation),
    filesSupplyBIEDocumentation: attachmentData.supplyBIEDocumentation,
    supplyBIEDocumentationReason: 0, // this value its default
    selfSupplyType: String(data?.selfSupplyReason || "00"),
    selfSupplyBIE: data?.selfSupplyReason ? data?.selfSupplyReason != "00" ? true : false : false,
    selfSupplyBIEDocumentation: !isEmpty(
      attachmentData.selfSupplyBIEDocumentation
    ),
    filesSelfSupplyBIEDocumentation: attachmentData.selfSupplyBIEDocumentation,
    newSupplyContract: data?.atrSIPSInformation?.newSupplyContract || false,
    newSupplyContractReason: data.newContractReason,
    fixedContractDate: data.date != "",
    contractDate: data.date != "" ? data.date : null,
    promotionalCode: data?.friend_code || "",
    subrogation: data.previous_contract,
    supplyAddress: address,
    fiscalAddress: fiscalAddress,
    deliveryAddress: contactAddress,
    eInvoice: data.electronic_invoice,
    holderEqualsCustomer: !data.isPayer,
  };

  if (data?.update?.RegistrationId) {
    dataRegister["supplyAddress"] = {
      ...dataRegister["supplyAddress"],
      addressId: data?.update?.SupplyAddress.AddressId,
    };
    dataRegister["fiscalAddress"] = {
      ...dataRegister["fiscalAddress"],
      addressId: data?.update?.FiscalAddress?.AddressId,
    };
    dataRegister["deliveryAddress"] = {
      ...dataRegister["deliveryAddress"],
      addressId: data?.update?.DeliveryAddress.AddressId,
    };

    dataRegister["holder"] = {
      ...dataRegister["holder"],
      customerId: data?.update?.Holder.CustomerId,
    };

    dataRegister["payer"] = {
      ...dataRegister["payer"],
      customerId: data?.update?.Payer?.CustomerId,
    };

    dataRegister["promotionalCode"] = data?.update?.PromotionalCode || "";

    dataRegister["subrogation"] = data?.update?.Subrogation || false;
    dataRegister["contractDate"] = data?.update?.ContractDate || null;
    dataRegister["fixedContractDate"] =
      data?.update?.FixedContractDate || false;

    dataRegister["documentationValidated"] =
      data?.update?.documentationValidated || false;
    dataRegister["withoutSignaturit"] =
      data?.update?.withoutSignaturit || false;
  }

  return dataRegister;
};

////////////////////////////////////////////////////
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// Format data Subsciption & Update form
////////////////////////////////////////////////////

export const getATRTypesByOfferedRates = (data) => {
  return flatten(
    data.map((offered) => {
      return {
        code: offered.Toll,
        name: offered.TollName,
      };
    })
  );
};

export const getPowersDataByObject = (data, typePower) => {
  return pickBy(data, (_, key) => {
    return startsWith(key, typePower);
  });
};

export const getFormatLimitPowers = (data) => {
  let maxPowerValue = 0;
  let minPowerValue = Number.POSITIVE_INFINITY;
  let stopService = false;

  const sipsPowerList = Object.keys(data)
    .map((element, index) => {
      if (Number(data[element]) > 15) {
        stopService = true;
      }

      maxPowerValue = Math.max(maxPowerValue, data[element]);
      minPowerValue = Math.min(minPowerValue, data[element]);

      if (data[element] != 0) {
        return `P${index + 1} ${data[element]}kW`;
      }
    })
    .filter((element) => element);

  const limitPowers = { maxPowerValue, minPowerValue };

  return { limitPowers, sipsPowerList, stopService };
};

export const getATRFullDataByName = (data, value) => {
  let atrData = null;

  data.find((offered) => {
    atrData = find(offered.Tolls, (element) => {
      return element.TollName == value;
    });

    return atrData;
  });

  return atrData;
};

export const getATRFullDataById = (data, value) => {
  let atrData = null;

  data.find((offered) => {
    atrData = find(offered.Tolls, (element) => {
      return element.TollId == value;
    });

    return atrData;
  });

  return atrData;
};

export const getContractPrice = (data, atrCode, maxValue, minValue) => {
  let contractTypes;

  data.forEach((element) => {
    return element.Tolls.forEach((toll) => {
      if (toll.TollId == atrCode) {
        contractTypes = toll.ContractTypes;
      }
    });
  });

  if (contractTypes.length > 1) {
    return contractTypes.find((element) => {
      return element.MaxPower >= maxValue && element.MinPower <= minValue;
    });
  } else {
    return contractTypes[0];
  }
};

export const getATRRateId = (data, atr) => {
  const { RateId } = data.find((element) => {
    return element.Tolls.find((toll) => toll.TollId == atr);
  });

  return RateId;
};

export const handleAdditionalErrors = (type, atrErrros) => {
  if (!atrErrros) return;

  if (type == "single") {
    const { PowerByTensionLevel } = atrErrros;

    if (!PowerByTensionLevel?.Status) {
      return { message: PowerByTensionLevel?.Description };
    }
  } else {
    const {
      MaxPowerAllowedBIE,
      NormalizedPowers,
      MaxPowerAllowed,
      CustomError,
    } = atrErrros;

    if (CustomError) {
      return { message: CustomError };
    }

    if (!MaxPowerAllowedBIE?.Status) {
      return { message: MaxPowerAllowedBIE?.Description };
    }

    if (!NormalizedPowers?.Status) {
      return { message: NormalizedPowers?.Description };
    }

    if (!MaxPowerAllowed?.Status) {
      return { message: MaxPowerAllowed?.Description };
    }
  }
};

import { VALIDATE_FORM_DEFAULT, VALIDATE_FORM_REQUIRED } from "./constants";
import { isEmpty, startsWith } from "lodash";

import { getMunicipalitiesByPostalCode } from "../lib/api/address";

export const hasError = (errors, name) => name in errors;

export const generateErrorMessage = (data) => {
  if (!data) return;

  switch (data.type) {
    case "required":
      return data.message || VALIDATE_FORM_REQUIRED;

    case "api_validation":
      return data.message;

    default:
      return VALIDATE_FORM_DEFAULT;
  }
};

const handleDataHolder = (data) => {
  const holderData = {};

  if (data.isCompany) {
    const {
      company_cif,
      company_name,
      company_email,
      company_admin_dni,
      company_admin_name,
      company_admin_surname,
    } = data;

    holderData["legalNIFCIF"] = company_cif;
    holderData["legalName"] = company_name;
    holderData["email"] = company_email;
    holderData["nif"] = company_admin_dni;
    holderData["name"] = company_admin_name;

    if (company_admin_surname) {
      const auxSurname = company_admin_surname.split(" ");
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

      payerData["legalNIFCIF"] = company_payer_cif;
      payerData["legalName"] = company_payer_name;
      payerData["email"] = company_payer_email;
      payerData["nif"] = company_payer_admin_dni;
      payerData["name"] = company_payer_admin_name;

      if (company_payer_admin_surname) {
        const auxSurname = company_payer_admin_surname.split(" ");
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
      supplyData["sipsATR"] = atrSIPSInformation.ATR.Code;
      supplyData["sipsPowerP1"] = atrSIPSInformation.SipsPowerP1 || 0;
      supplyData["sipsPowerP2"] = atrSIPSInformation.SipsPowerP2 || 0;
      supplyData["sipsPowerP3"] = atrSIPSInformation.SipsPowerP3 || 0;
      supplyData["sipsPowerP4"] = atrSIPSInformation.SipsPowerP4 || 0;
      supplyData["sipsPowerP5"] = atrSIPSInformation.SipsPowerP5 || 0;
      supplyData["sipsPowerP6"] = atrSIPSInformation.SipsPowerP6 || 0;
      supplyData["sipsTensionLevel"] = atrSIPSInformation?.TensionLevel?.Code
        ? Number(atrSIPSInformation.TensionLevel.Code)
        : 0;
      supplyData["sipsPowerControlMode"] = Number(
        atrSIPSInformation.PowerControlMode.Code
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
        atrSIPSInformation.DistributionCompany.Code;
      supplyData["sipsCNAE"] = atrSIPSInformation.CNAE.toString();
    } else {
      supplyData["checkSips"] = false;

      supplyData["sipsCUPS"] = data.cups;
      supplyData["sipsATR"] = atrSIPSInformation.currentATR.code;
      supplyData["sipsPowerP1"] = 0;
      supplyData["sipsPowerP2"] = 0;
      supplyData["sipsPowerP3"] = 0;
      supplyData["sipsPowerP4"] = 0;
      supplyData["sipsPowerP5"] = 0;
      supplyData["sipsPowerP6"] = 0;

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

  supplyData["cups"] = data.cups;

  if (atrInformation?.newATR.code) {
    supplyData["atr"] = atrInformation.newATR.code;
    supplyData["rateId"] = Number(atrInformation.RateId);
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
    supplyData["atr"] = atrSIPSInformation.ATR.Code;
    supplyData["rateId"] = Number(atrSIPSInformation.RateId);
    supplyData["powerP1"] = atrSIPSInformation.SipsPowerP1 || 0;
    supplyData["powerP2"] = atrSIPSInformation.SipsPowerP2 || 0;
    supplyData["powerP3"] = atrSIPSInformation.SipsPowerP3 || 0;
    supplyData["powerP4"] = atrSIPSInformation.SipsPowerP4 || 0;
    supplyData["powerP5"] = atrSIPSInformation.SipsPowerP5 || 0;
    supplyData["powerP6"] = atrSIPSInformation.SipsPowerP6 || 0;

    supplyData["tensionLevel"] = atrSIPSInformation.TensionLevel;

    supplyData["powerControlMode"] =
      Number(atrSIPSInformation?.PowerControlMode.Code) || 1;
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

export const handleDataRegistrstion = async (data) => {
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
    supplyBIE: !isEmpty(attachmentData.supplyBIEDocumentation),
    supplyBIEDocumentation: !isEmpty(attachmentData.supplyBIEDocumentation),
    filesSupplyBIEDocumentation: attachmentData.supplyBIEDocumentation,
    supplyBIEDocumentationReason: 0, // this value its default
    selfSupplyType: String(data?.selfSupplyReason || "00"),
    selfSupplyBIE: !isEmpty(attachmentData.selfSupplyBIEDocumentation),
    selfSupplyBIEDocumentation: !isEmpty(
      attachmentData.selfSupplyBIEDocumentation
    ),
    filesSelfSupplyBIEDocumentation: attachmentData.selfSupplyBIEDocumentation,
    newSupplyContract: data?.atrSIPSInformation?.newSupplyContract || false,
    newSupplyContractReason: data.newContractReason,
    fixedContractDate: data.date != "",
    contractDate: data.date != "" ? data.date : "01/01/1753",
    promotionalCode: data?.friend_code || "",
    subrogation: data.previous_contract,
    supplyAddress: address,
    fiscalAddress: fiscalAddress,
    deliveryAddress: contactAddress,
    eInvoice: data.paper_invoice,
    holderEqualsCustomer: !data.isPayer,
  };

  return dataRegister;
};

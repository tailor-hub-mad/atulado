import React, { useState, useEffect } from "react";
import { isEmpty, flatten, find, pickBy } from "lodash";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/router";

import { SCWhatModule } from "./WhatModule.styled";
import { SCTextXSLight } from "../../../atoms/Text/TextXS.styled";
import { SCTextM } from "../../../atoms/Text/TextM.styled";
import { SCTextL } from "../../../atoms/Text/TextL.styled";
import { SingleDropdown } from "../../../molecules/Dropdown/Single/SingleDropdown.molecule";
import { ButtonCheck } from "../../../atoms/ButtonCheck/ButtonCheck.atom";
import { ButtonFile } from "../../../atoms/ButtonFile/ButtonFile.atom";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { ButtonRound } from "../../../atoms/ButtonRound/ButtonRound.atom";
import { MultiDropdown } from "../../../molecules/Dropdown/Multi/MultiDropdown.molecule";
import { InfoCard } from "../../../molecules/InfoCard/InfoCard.molecule";
import { Tip } from "../../../atoms/Tip/Tip.atom";
import { Helper } from "../../../atoms/Helper/Helper.atom";

import {
  getOfferedRatesById,
  getNormalizePowers,
  getSIPSInformation,
  getOfferedRates,
  getSubscriptionReason,
  getOscumValues,
} from "../../../../lib/api/offered";
import { validateATRPower } from "../../../../lib/api/validators";

import {
  getATRTypesByOfferedRates,
  getPowersDataByObject,
  getFormatLimitPowers,
  getATRFullDataByName,
  getATRFullDataById,
  getContractPrice,
  getATRRateId,
  handleAdditionalErrors,
} from "../../../../utils/register";

export const WhatModule = ({
  cups,
  summaryData,
  setSummaryData,
  oppeners,
  setOppeners,
  attachmentFile,
  setAttachmentFile,
  extraDataRegister,
  setExtraDataRegister,
  defaultInfoUpdateContract,
  setHasFormErros,
  hasFormErrors,
  setRequiredData,
  requiredData,
  setOfferedName,
}) => {
  // Components states
  const [optionSelected, setOptionSelected] = useState(true);
  const [isAutoConsum, setIsAutoConsum] = useState(false);
  const [isSelfSupplyAttachment, setIsSelfSupplyAttachment] = useState(true);
  const [openInfoAttachment, setOpenInfoAttachment] = useState({
    self_supply_bie: true,
    bie: true,
  });

  // Data states
  //  General
  const [sipsInformation, setSipsInformation] = useState({});
  const [offeredRate, setOfferedRate] = useState();
  const [offeredRateById, setOfferedRateById] = useState();
  const [subscriptionReason, setSubscriptionReason] = useState([]);
  const [oscumValues, setOscumValues] = useState([]);
  const [ATRTypes, setATRTypes] = useState([]);
  const [installationType, setInstallationType] = useState("M");

  //   Specifics
  //// Current
  const [currentNormalizePowers, setCurrentNormalizePowers] = useState();
  const [ATRPowerCurrentErrors, setATRPowerCurrentErrors] = useState();
  const [currentPowersValues, setCurrentPowersValues] = useState({});
  const [currentATR, setCurrentATR] = useState();
  //// New
  const [newNormalizePowers, setNewNormalizePowers] = useState();
  const [SIPSPower, setSIPSPower] = useState([]);
  const [ATRPowerErrors, setATRPowerErrors] = useState();
  const [newATR, setNewATR] = useState();
  const [newPowersValues, setNewPowersValues] = useState({});

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  const { getValues } = useFormContext();
  const router = useRouter();

  ////////////////////////////////////////////////////
  // Buttons Actions
  ////////////////////////////////////////////////////

  const handleButtonCheck = (name, value) => {
    const newOppeners = { ...oppeners };
    newOppeners[name] = value;

    setOppeners(newOppeners);

    if (name == "stop_service") {
      const newExtraDataRegister = { ...extraDataRegister };

      newExtraDataRegister["atrInformation"] = {
        ...newExtraDataRegister["atrInformation"],
        powerControlMode: value,
      };

      setExtraDataRegister(newExtraDataRegister);

      if (!value) {
        const newOpenInfoAttachment = { ...openInfoAttachment };
        newOpenInfoAttachment["bie"] = true;
        setOpenInfoAttachment(newOpenInfoAttachment);

        const newAttachmentFile = { ...attachmentFile };
        newAttachmentFile["bie"] = undefined;

        setAttachmentFile(newAttachmentFile);
      }
    }
  };

  const handleButtonFile = (name, value) => {
    const newAttachmentFile = { ...attachmentFile };
    newAttachmentFile[name] = {
      fileName: value.name,
      content: value.content,
      mimeType: value.type,
    };

    setAttachmentFile(newAttachmentFile);

    const newOpenInfoAttachment = { ...openInfoAttachment };
    newOpenInfoAttachment[name] = false;
    setOpenInfoAttachment(newOpenInfoAttachment);
  };

  const handleOptionSelectedContractType = (value) => {
    const newExtraDataRegister = { ...extraDataRegister };

    newExtraDataRegister["newContractReason"] = subscriptionReason[0]?.Code;

    const newOppeners = { ...oppeners };
    if (!attachmentFile["bie"]) {
      if (value) {
        newOppeners["bie"] = {
          new_subscription: false,
          error_power: false,
          stop_service: true,
        };
      } else {
        newOppeners["bie"] = {
          new_subscription: true,
          error_power: false,
          stop_service: false,
        };
      }
    }

    newOppeners["power_value"] = false;
    newOppeners["atr_check"] = false;
    newOppeners["atr_value"] = false;

    setExtraDataRegister(newExtraDataRegister);
    setOptionSelected(value);
    setOppeners(newOppeners);
  };

  const handleOptionSelectedNewContractReason = (value) => {
    if (value == "") return;

    const { Code: subscriptionReasonCode } = subscriptionReason.find(
      (element) => element.Description == value
    );

    const newExtraDataRegister = { ...extraDataRegister };

    newExtraDataRegister["newContractReason"] = subscriptionReasonCode;

    setExtraDataRegister(newExtraDataRegister);
  };

  const handleOptionsSelectedSelfSupply = (value) => {
    if (value == "") return;

    const { Code: selfSupplyCode } = oscumValues.find(
      (element) => element.Description == value
    );

    const newExtraDataRegister = { ...extraDataRegister };

    newExtraDataRegister["selfSupplyReason"] = String(selfSupplyCode);

    setExtraDataRegister(newExtraDataRegister);
  };

  const handleButtonCheckSelfSupply = (selfSupply) => {
    const newSummaryData = { ...summaryData };
    const newExtraDataRegister = { ...extraDataRegister };

    newSummaryData["contract"] = {
      ...newSummaryData["contract"],
      selfSupply,
    };

    if (selfSupply) {
      newExtraDataRegister["selfSupplyReason"] = String(oscumValues[0].Code);
    }

    setSummaryData(newSummaryData);
    setExtraDataRegister(newExtraDataRegister);
    setIsAutoConsum(selfSupply);

    if (!selfSupply) {
      const newOpenInfoAttachment = { ...openInfoAttachment };
      newOpenInfoAttachment["self_supply_bie"] = true;
      setOpenInfoAttachment(newOpenInfoAttachment);

      const newAttachmentFile = { ...attachmentFile };
      newAttachmentFile["self_supply_bie"] = undefined;

      setAttachmentFile(newAttachmentFile);
    }
  };

  const handleOptionSelectedATRValue = (atr, checked = true, type) => {
    const measurementType = !isEmpty(sipsInformation)
      ? sipsInformation.MeasurementType
      : installationType;

    handleATRValue(atr, measurementType, type);

    const newSummaryData = { ...summaryData };
    newSummaryData["contract"] = {
      ...newSummaryData["contract"],
      atr,
    };

    setSummaryData(newSummaryData);

    if (checked) {
      const newOppeners = { ...oppeners };
      newOppeners["atr_value"] = true;
      setOppeners(newOppeners);
    }
  };

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  ////////////////////////////////////////////////////
  // ATR & Powers Logic
  ////////////////////////////////////////////////////

  const handlePowers = (atr, type) => {
    if (!atr) return [];

    let powers = [];

    if (type == "current") {
      powers = flatten(
        currentNormalizePowers.map((element) => {
          return element.Powers;
        })
      ).sort((a, b) => a - b);
    } else {
      powers = flatten(
        newNormalizePowers.map((element) => {
          return element.Powers;
        })
      ).sort((a, b) => a - b);
    }

    let atrData = null;

    atrData = find(
      offeredRateById.ContractTypes,
      (element) => element.TollName == atr
    );

    const nPowers = Object.keys(atrData?.Price).filter((element) => {
      return element.includes("PowerP") && atrData.Price[element] > 0;
    });

    return nPowers.map((_) => powers);
  };

  const handlePowerValues = async (index, value, atr, type) => {
    let atrData = null;

    const newSummaryData = { ...summaryData };

    atrData = find(
      offeredRateById.ContractTypes,
      (element) => element.TollName == atr
    );

    const nPowers = Object.keys(atrData.Price).filter((element) => {
      return element.includes("PowerP") && atrData.Price[element] > 0;
    });

    const newPowerValues =
      type == "current" ? { ...currentPowersValues } : { ...newPowersValues };
    newPowerValues[index] = value;

    if (type == "current") {
      setCurrentPowersValues(newPowerValues);
    } else {
      setNewPowersValues(newPowerValues);
    }

    if (Object.keys(newPowerValues).length === nPowers.length) {
      setRequiredData({ ...requiredData, inputs: true });

      const { Toll: atr } = atrData;

      const powersValue = Object.keys(newPowerValues).map((element) =>
        Number(newPowerValues[element])
      );

      const maxPowerValue = Math.max(...powersValue);
      const minPowerValue = Math.min(...powersValue);

      const validationValues = {
        atr,
        Powers: powersValue,
      };

      const validationSipsInformation = {};

      if (defaultInfoUpdateContract?.updateContract) {
        const { TensionLevel } = defaultInfoUpdateContract["contract"];

        validationSipsInformation["TensionLevel"] = String(TensionLevel);
        validationSipsInformation["MeasurementType"] = installationType;
        validationSipsInformation["SipsMaxBIEPower"] = 0;
        validationSipsInformation["SipsAccessRights"] = 0;
        validationSipsInformation["ExtensionsRightsValue"] = 0;
        validationSipsInformation["newSupplyContract"] = false;
        validationSipsInformation["infoSipsAvailable"] = false;
      } else if (defaultInfoUpdateContract?.updateRegistration) {
        const {
          TensionLevel,
          SipsMaxBIEPower,
          SipsAccessRights,
          SipsExtensionRights,
          NewSupplyContract,
        } = defaultInfoUpdateContract["contract"];

        validationSipsInformation["TensionLevel"] = String(TensionLevel);
        validationSipsInformation["MeasurementType"] = installationType;
        validationSipsInformation["SipsMaxBIEPower"] = SipsMaxBIEPower;
        validationSipsInformation["SipsAccessRights"] = SipsAccessRights;
        validationSipsInformation[
          "ExtensionsRightsValue"
        ] = SipsExtensionRights;
        validationSipsInformation["newSupplyContract"] = NewSupplyContract;
        validationSipsInformation["infoSipsAvailable"] = false;
      } else if (!isEmpty(sipsInformation)) {
        const {
          TensionLevel,
          MeasurementType,
          SipsMaxBIEPower,
          SipsAccessRights,
          ExtensionsRightsValue,
        } = sipsInformation;

        validationSipsInformation["TensionLevel"] = TensionLevel.Code;
        validationSipsInformation["MeasurementType"] = MeasurementType;
        validationSipsInformation["SipsMaxBIEPower"] =
          SipsMaxBIEPower && SipsMaxBIEPower > 0
            ? SipsMaxBIEPower
            : maxPowerValue;
        validationSipsInformation["SipsAccessRights"] =
          SipsAccessRights && SipsAccessRights > 0
            ? SipsAccessRights
            : maxPowerValue;
        validationSipsInformation["ExtensionsRightsValue"] =
          ExtensionsRightsValue && ExtensionsRightsValue > 0
            ? ExtensionsRightsValue
            : maxPowerValue;
      } else {
        validationSipsInformation["TensionLevel"] = "0";
        validationSipsInformation["MeasurementType"] = installationType;
        validationSipsInformation["SipsMaxBIEPower"] = 0;
        validationSipsInformation["SipsAccessRights"] = 0;
        validationSipsInformation["ExtensionsRightsValue"] = 0;
        validationSipsInformation["newSupplyContract"] = !optionSelected;
        validationSipsInformation["infoSipsAvailable"] = false;
      }

      validationValues["SIPSInformation"] = validationSipsInformation;

      setHasFormErros({ ...hasFormErrors, offred: false });
      const { data } = await validateATRPower(validationValues);

      if (data) {
        const {
          MaxPowerAllowed,
          MaxPowerAllowedBIE,
          NormalizedPowers,
          PowerByTensionLevel,
        } = data;

        if (
          !MaxPowerAllowed?.Status ||
          !MaxPowerAllowedBIE?.Status ||
          !NormalizedPowers?.Status ||
          !PowerByTensionLevel?.Status
        ) {
          setHasFormErros({ ...hasFormErrors, offred: true });
        }
      }

      if (type) {
        setATRPowerCurrentErrors(data);
      } else {
        setATRPowerErrors(data);
      }

      let contractTypes;

      const auxATR = type == "current" ? currentATR.code : newATR.code;

      const rate = offeredRate.find((element) => {
        return element.Tolls.find((toll) => {
          if (toll.TollId == auxATR) {
            contractTypes = toll.ContractTypes;
            return true;
          }
        });
      });

      const contractPrice = contractTypes.find((element) => {
        return (
          element.MaxPower >= maxPowerValue && element.MinPower <= minPowerValue
        );
      });

      newSummaryData["contract"] = {
        ...newSummaryData["contract"],
        powers: newPowerValues,
        fee: {
          supplyFee: newSummaryData["contract"]["fee"]["supplyFee"],
          selfSupplyFee: contractPrice?.SelfSupplyFee,
          paperFee: contractPrice?.PaperFee,
        },
      };

      const newExtraDataRegister = { ...extraDataRegister };

      if (type == "current") {
        newExtraDataRegister["atrSIPSInformation"] = {
          ...newExtraDataRegister["atrSIPSInformation"],
          currentATR,
          newPowerValues,
          checkSips: !isEmpty(sipsInformation),
        };
      } else {
        if (!isEmpty(sipsInformation)) {
          newExtraDataRegister["atrSIPSInformation"] = {
            ...newExtraDataRegister["atrSIPSInformation"],
            ...sipsInformation,
            checkSips: defaultInfoUpdateContract?.updateContract
              ? false
              : defaultInfoUpdateContract?.updateRegistration
                ? false
                : true,
          };
        } else if (isEmpty(newExtraDataRegister["atrSIPSInformation"])) {
          newExtraDataRegister[
            "atrSIPSInformation"
          ] = validationSipsInformation;
        }
        const { RateId } = rate;

        newExtraDataRegister["atrInformation"] = {
          ...newExtraDataRegister["atrInformation"],
          newATR,
          newPowerValues,
          RateId,
          TensionLevel: 0,
        };
      }

      setExtraDataRegister(newExtraDataRegister);
      setSummaryData(newSummaryData);
    }
  };

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  ////////////////////////////////////////////////////
  // API Consultans
  ////////////////////////////////////////////////////

  const handleATRValue = async (value, measurementType = "A", type) => {
    if (value !== "") {
      const atrData = getATRFullDataByName(offeredRate, value);

      const { data: dataNormalizePowers } = await getNormalizePowers(
        measurementType,
        atrData.MaxPower,
        atrData.MinPower
      );

      if (type == "current") {
        setCurrentNormalizePowers(dataNormalizePowers);
        setCurrentATR({ code: atrData.TollId, description: atrData.TollName });
      } else {
        setNewNormalizePowers(dataNormalizePowers);
        setNewATR({ code: atrData.TollId, description: atrData.TollName });
      }
    }
  };

  const getSIPS = async (cupsInfo) => {
    try {
      const { data: dataSipsInformation } = await getSIPSInformation(cupsInfo);
      setSipsInformation(dataSipsInformation);

      const newExtraDataRegister = { ...extraDataRegister };
      const newSummaryData = { ...summaryData };
      let selfSupply = false;

      if (dataSipsInformation.SelfSupply.Code != "00") {
        setIsAutoConsum(true);
        setIsSelfSupplyAttachment(false);
        selfSupply = true;
      }

      const sipsPower = getPowersDataByObject(dataSipsInformation, "SipsPower");

      const {
        limitPowers: { maxPowerValue, minPowerValue },
        sipsPowerList,
        stopService,
      } = getFormatLimitPowers(sipsPower);
      setSIPSPower(sipsPowerList);

      if (stopService) {
        const newOppeners = { ...oppeners };
        newOppeners["max_power_stop_service"] = false;
        setOppeners(newOppeners);
      }

      handleATRValue(
        dataSipsInformation.ATR.Description,
        dataSipsInformation.MeasurementType,
        "current"
      );

      const contractPrice = getContractPrice(
        offeredRate,
        dataSipsInformation.ATR.Code,
        maxPowerValue,
        minPowerValue
      );

      const rateId = getATRRateId(offeredRate, dataSipsInformation.ATR.Code);

      // REQUIRED DATA
      setRequiredData({ ...requiredData, inputs: true });


      // EXTRA DATA REGISTER
      newExtraDataRegister["selfSupplyReason"] = String(
        dataSipsInformation.SelfSupply.Code
      );
      newExtraDataRegister["atrSIPSInformation"] = {
        ...newExtraDataRegister["atrSIPSInformation"],
        ...dataSipsInformation,
        rateId,
        TensionLevel: 0,
        checkSips: true,
      };

      // SUMMARY DATA
      newSummaryData["contract"] = {
        ...newSummaryData["contract"],
        selfSupply,
        powers: sipsPowerList,
        atr: dataSipsInformation?.ATR?.Description,
        fee: {
          supplyFee: newSummaryData["contract"]["fee"]["supplyFee"],
          selfSupplyFee: contractPrice?.SelfSupplyFee,
          paperFee: contractPrice?.PaperFee,
        },
      };

      setExtraDataRegister(newExtraDataRegister);
      setSummaryData(newSummaryData);
    } catch (error) { }
  };

  const getOffereds = async (rateId) => {
    const newSummaryData = { ...summaryData };

    const { data: dataOfferedRateById } = await getOfferedRatesById(rateId);
    const { data: dataOfferedRate } = await getOfferedRates(3);
    const { data: dataSubscriptionReason } = await getSubscriptionReason();
    const { data: dataOscumValues } = await getOscumValues();

    const { Name, ContractTypes } = dataOfferedRateById;

    const { Price } = ContractTypes[0];

    const filterPrice = pickBy(Price, function (value) {
      return value > 0;
    });

    // SUMMARY DATA
    newSummaryData["contract"] = {
      ...newSummaryData["contract"],
      fee: {
        supplyFee: filterPrice,
      },
    };

    setSummaryData(newSummaryData);
    setOfferedName(Name);
    setATRTypes(getATRTypesByOfferedRates(ContractTypes));
    setOfferedRate(dataOfferedRate);
    setOfferedRateById(dataOfferedRateById);
    setSubscriptionReason(dataSubscriptionReason);
    setOscumValues(dataOscumValues);
  };

  useEffect(() => {
    const { query } = router;
    getOffereds(query?.rateId);
  }, []);

  useEffect(() => {
    if (!optionSelected) return;

    const newOpenInfoAttachment = { ...openInfoAttachment };
    newOpenInfoAttachment["bie"] = true;
    setOpenInfoAttachment(newOpenInfoAttachment);

    const newAttachmentFile = { ...attachmentFile };
    newAttachmentFile["bie"] = undefined;

    setAttachmentFile(newAttachmentFile);
  }, [optionSelected]);

  useEffect(() => {
    if (getValues()?.cups == "") {
      setSipsInformation({});
      setOptionSelected(true);
      setIsAutoConsum(false);
      setIsSelfSupplyAttachment(true);
    }
  }, [getValues()?.cups]);

  useEffect(() => {
    if (!cups) {
      return setSipsInformation({});
    }
    if (!offeredRate) return;

    const newExtraDataRegister = { ...extraDataRegister };

    setOptionSelected(true);
    setIsAutoConsum(false);
    setExtraDataRegister(newExtraDataRegister);

    getSIPS(cups);
  }, [cups, offeredRate]);

  useEffect(() => {
    if (!defaultInfoUpdateContract || !offeredRate) return;

    const newExtraDataRegister = { ...extraDataRegister };
    const newSummaryData = { ...summaryData };

    const { updateContract, updateRegistration } = defaultInfoUpdateContract;

    if (updateContract) {
      const {
        ATR,
        SelfSupplyCode,
        TensionLevel,
        eInvoice,
      } = defaultInfoUpdateContract["contract"];

      const newAtr = getATRFullDataById(offeredRate, ATR);
      const newPowers = getPowersDataByObject(
        defaultInfoUpdateContract["contract"],
        "PowerP"
      );
      handleATRValue(newAtr.TollName, "A", "current");
      handleATRValue(newAtr.TollName);

      const {
        limitPowers: { maxPowerValue, minPowerValue },
        sipsPowerList,
        stopService,
      } = getFormatLimitPowers(newPowers);

      setSIPSPower(sipsPowerList);

      if (stopService) {
        const newOppeners = { ...oppeners };
        newOppeners["max_power_stop_service"] = false;
        setOppeners(newOppeners);
      }

      const contractPrice = getContractPrice(
        offeredRate,
        newAtr.TollId,
        maxPowerValue,
        minPowerValue
      );

      const rateId = getATRRateId(offeredRate, newAtr.TollId);

      // EXTRA DATA REGISTER
      if (SelfSupplyCode) {
        newExtraDataRegister["selfSupplyReason"] = String(SelfSupplyCode);
        setIsAutoConsum(true);
      }

      newExtraDataRegister["atrSIPSInformation"] = {
        ...newExtraDataRegister["atrSIPSInformation"],
        ...defaultInfoUpdateContract["contract"],
        updateContract,
        rateId,
        TensionLevel,
        checkSips: false,
      };

      // SUMMARY DATA
      newSummaryData["contract"] = {
        ...newSummaryData["contract"],
        selfSupply: SelfSupplyCode ? true : false,
        powers: sipsPowerList,
        atr: newAtr.TollName,
        fee: {
          supplyFee: newSummaryData["contract"]["fee"]["supplyFee"],
          selfSupplyFee: contractPrice?.SelfSupplyFee,
          paperFee: eInvoice || contractPrice?.PaperFee,
        },
      };

      setSipsInformation({ sips: {} });
    } else if (updateRegistration) {
      const {
        SipsATR,
        ATR,
        SelfSupplyType,
        EInvoice,
        TensionLevel,
        NewSupplyContract,
      } = defaultInfoUpdateContract["contract"];

      const sipsPower = getPowersDataByObject(
        defaultInfoUpdateContract["contract"],
        "SipsPower"
      );
      const newPowers = getPowersDataByObject(
        defaultInfoUpdateContract["contract"],
        "PowerP"
      );
      const currentATR = getATRFullDataById(offeredRate, SipsATR);
      const newAtr = getATRFullDataById(offeredRate, ATR);

      handleATRValue(currentATR.TollName, "A", "current");
      handleATRValue(newAtr.TollName);

      const {
        limitPowers: { maxPowerValue, minPowerValue },
        sipsPowerList,
        stopService,
      } = getFormatLimitPowers(newPowers);

      setSIPSPower(sipsPowerList);

      if (stopService) {
        const newOppeners = { ...oppeners };
        newOppeners["max_power_stop_service"] = false;
        setOppeners(newOppeners);
      }

      const contractPrice = getContractPrice(
        offeredRate,
        newAtr.TollId,
        maxPowerValue,
        minPowerValue
      );

      const rateId = getATRRateId(offeredRate, newAtr.TollId);

      // EXTRA DATA REGISTER
      if (SelfSupplyType != "00") {
        newExtraDataRegister["selfSupplyReason"] = String(SelfSupplyType);
        setIsAutoConsum(true);
      }

      newExtraDataRegister["atrSIPSInformation"] = {
        ...newExtraDataRegister["atrSIPSInformation"],
        ...defaultInfoUpdateContract["contract"],
        updateRegistration,
        rateId,
        TensionLevel,
        checkSips: false,
      };

      // SUMMARY DATA
      newSummaryData["contract"] = {
        ...newSummaryData["contract"],
        selfSupply: SelfSupplyType != "00" ? true : false,
        powers: sipsPowerList,
        atr: newAtr.TollName,
        fee: {
          supplyFee: newSummaryData["contract"]["fee"]["supplyFee"],
          selfSupplyFee: contractPrice?.SelfSupplyFee,
          paperFee: EInvoice || contractPrice?.PaperFee,
        },
      };

      setOptionSelected(!NewSupplyContract);
      setSipsInformation({ sips: {} });
    }

    setExtraDataRegister(newExtraDataRegister);
    setSummaryData(newSummaryData);
  }, [defaultInfoUpdateContract, offeredRate]);

  return (
    <SCWhatModule>
      <ButtonRound
        action={() => handleOptionSelectedContractType(true)}
        checked={optionSelected}
      >
        Ya tengo luz, quiero cambiar de compañía
      </ButtonRound>
      <ButtonRound
        action={() => {
          handleOptionSelectedContractType(false);
        }}
        checked={!optionSelected}
      >
        No tengo luz actualmente
      </ButtonRound>

      {isEmpty(sipsInformation) && (
        <ButtonCheck
          options={{
            option_1: { type: "M", name: "Monofásica" },
            option_2: { type: "T", name: "Trifásica" },
          }}
          action={(value) => setInstallationType(value)}
        >
          ¿Qué tipo de instalación tienes en casa?
        </ButtonCheck>
      )}

      <div className="options-wrapper">
        {optionSelected && (
          <>
            {isEmpty(sipsInformation) ? (
              <>
                <ATRPowerWithoutSipsInformation
                  oppeners={oppeners}
                  handleButtonCheck={handleButtonCheck}
                  handleAdditionalErrors={handleAdditionalErrors}
                  ATRPowerErrors={ATRPowerErrors}
                  ATRPowerCurrentErrors={ATRPowerCurrentErrors}
                  handleOptionSelectedATRValue={handleOptionSelectedATRValue}
                  handlePowers={handlePowers}
                  ATRTypes={ATRTypes}
                  handlePowerValues={handlePowerValues}
                  currentNormalizePowers={currentNormalizePowers}
                  newNormalizePowers={newNormalizePowers}
                />
              </>
            ) : (
              <>
                <ATRPowerWithSipsInformation
                  oppeners={oppeners}
                  handleButtonCheck={handleButtonCheck}
                  handleAdditionalErrors={handleAdditionalErrors}
                  ATRPowerErrors={ATRPowerErrors}
                  handleOptionSelectedATRValue={handleOptionSelectedATRValue}
                  handlePowers={handlePowers}
                  ATRTypes={ATRTypes}
                  handlePowerValues={handlePowerValues}
                  ATR={
                    sipsInformation?.ATR?.Description || currentATR?.description
                  }
                  SIPSPower={SIPSPower}
                />
              </>
            )}
            {/* ///////// */}
            {/* Aun no está implementada la lógica que hace posible el funcinamiento correcto de este adjunto */}
            {/* ///////// */}
            <div className="bie-wrapper">
              {oppeners?.bie["error_power"] && (
                <>
                  <BIEAttachment
                    attachmentFile={attachmentFile} ////
                    handleButtonFile={handleButtonFile}
                  />
                  {openInfoAttachment["bie"] && (
                    <div className="tip-wrapper">
                      <Tip type="warning">
                        <p>
                          ¿No tienes la documentación a mano? no te preocupes,
                          puedes completar el regsistro y adjuntarnos la
                          documentación más adelante desde la sección Gestiones
                          de tu área cliente.
                        </p>
                      </Tip>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
        {optionSelected || (
          <>
            <div className="new-subscription-wrapper">
              <div>
                <SingleDropdown
                  label="Indica el motivo del alta nueva"
                  name="type_road"
                  placeholder={subscriptionReason[0]?.Description}
                  options={subscriptionReason.map(
                    (element) => element.Description
                  )}
                  validation={{
                    validate: async (value) => {
                      handleOptionSelectedNewContractReason(value);
                    },
                  }}
                />
                {oppeners?.bie["new_subscription"] && (
                  <>
                    <BIEAttachment
                      attachmentFile={attachmentFile}
                      handleButtonFile={handleButtonFile}
                    />
                    {openInfoAttachment["bie"] && (
                      <div className="tip-wrapper">
                        <Tip type="warning">
                          <p>
                            ¿No tienes la documentación a mano? no te preocupes,
                            puedes completar el regsistro y adjuntarnos la
                            documentación más adelante desde la sección
                            Gestiones de tu área cliente.
                          </p>
                        </Tip>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <ATRPowerNewSubscription
              oppeners={oppeners}
              handleButtonCheck={handleButtonCheck}
              handleAdditionalErrors={handleAdditionalErrors}
              ATRPowerErrors={ATRPowerErrors}
              handleOptionSelectedATRValue={handleOptionSelectedATRValue}
              handlePowers={handlePowers}
              ATRTypes={ATRTypes}
              handlePowerValues={handlePowerValues}
            />
          </>
        )}
      </div>

      {oppeners["max_power_stop_service"] && (
        <>
          <div className="helper">
            <SelectHelper value={oppeners["stop_service"]} />
          </div>
          <ButtonCheck
            checked={sipsInformation?.PowerControlMode?.Code == "2"}
            action={(value) => handleButtonCheck("stop_service", value)}
          >
            ¿Tienes un servicio no interrumpible en casa?
          </ButtonCheck>

          {oppeners["stop_service"] &&
            oppeners?.bie["stop_service"] &&
            sipsInformation.PowerControlMode?.Code != "2" && (
              <>
                <BIEAttachment
                  attachmentFile={attachmentFile}
                  handleButtonFile={handleButtonFile}
                />
                {openInfoAttachment["bie"] && (
                  <div className="tip-wrapper">
                    <Tip type="warning">
                      <p>
                        ¿No tienes la documentación a mano? no te preocupes,
                        puedes completar el regsistro y adjuntarnos la
                        documentación más adelante desde la sección Gestiones de
                        tu área cliente.
                      </p>
                    </Tip>
                  </div>
                )}
              </>
            )}
        </>
      )}

      <ButtonCheck
        checked={isAutoConsum}
        action={(value) => handleButtonCheckSelfSupply(value)}
      >
        ¿Tienes una instalación de autoconsumo en casa?
      </ButtonCheck>

      {isAutoConsum && isSelfSupplyAttachment && (
        <>
          <BIEAttachment
            attachmentFile={attachmentFile}
            handleButtonFile={handleButtonFile}
            typeBIE="self_supply_bie"
          />
          {openInfoAttachment["self_supply_bie"] && (
            <div className="tip-wrapper">
              <Tip type="warning">
                <p>
                  ¿No tienes la documentación a mano? no te preocupes, puedes
                  completar el regsistro y adjuntarnos la documentación más
                  adelante desde la sección Gestiones de tu área cliente.
                </p>
              </Tip>
            </div>
          )}
        </>
      )}

      {isAutoConsum && (
        <div className="dropdown-wrapper">
          <SingleDropdown
            label="Seleciona la modalidad de autoconsumo"
            name="type_road"
            placeholder={
              sipsInformation?.SelfSupply?.Description ||
              oscumValues[0]?.Description
            }
            options={oscumValues.map((element) => element.Description)}
            validation={{
              validate: async (value) => {
                handleOptionsSelectedSelfSupply(value);
              },
            }}
          />
        </div>
      )}
    </SCWhatModule>
  );
};

const BIEAttachment = ({ handleButtonFile, typeBIE = "bie" }) => {
  return (
    <div className="file-wrapper">
      <SCTextXSLight color="black">
        {typeBIE == "self_supply_bie"
          ? "Necesitamos que añadas Boletín de instalación eléctrica de autoconsumo (BIE)"
          : "Necesitamos que añadas Boletín de instalación eléctrica (BIE)"}
      </SCTextXSLight>
      <ButtonFile action={(value) => handleButtonFile(typeBIE, value)}>
        Adjuntar archivo
      </ButtonFile>
    </div>
  );
};

const SelectHelper = ({ value }) => {
  return value ? (
    <Helper>
      <p>
        Necesitamos que nos adjuntes el BIE para completar tu alta. Es
        importante que en el boletín se especifique la potencia interrumpible.
      </p>
      <p>
        Si no tienes BIE, o en el que tienes no aparece este dato, puedes
        completar ahora tu alta, y solicitar este cambio más adelante desde tu
        área cliente.
      </p>
    </Helper>
  ) : (
    <Helper>
      <p>
        Si dispones de un servicio cuyo suministro eléctrico no puede ser
        interrumpido, tal como un ascensor o un respirador mecánico, y cuya
        potencia máxima puedas acreditar con un boletín de instalador, puedes
        ahorrar mucho dinero ajustando tu potencia contratada a dicha potencia
        no interrumpible.
      </p>
    </Helper>
  );
};

const ATRPowerWithoutSipsInformation = ({
  oppeners,
  handleButtonCheck,
  handleAdditionalErrors,
  ATRPowerErrors,
  ATRPowerCurrentErrors,
  handleOptionSelectedATRValue,
  handlePowerValues,
  handlePowers,
  ATRTypes,
  newNormalizePowers,
  currentNormalizePowers,
}) => {
  const [atrValue, setAtrValue] = useState("");
  const [currentATRValue, setCurrentATRValue] = useState("");
  const [powerValues, setPowerValues] = useState([]);
  const [currentPowerValues, setCurrentPowerValues] = useState([]);

  const handleCheckValueATRIsSelected = (value, type) => {
    const checked =
      (type == "current" && atrValue != "") ||
      (type != "current" && currentATRValue != "");

    handleOptionSelectedATRValue(value, checked, type);
  };

  useEffect(() => {
    if (newNormalizePowers) {
      const newPowerValues = handlePowers(atrValue);
      setPowerValues(newPowerValues);
    }
  }, [atrValue, newNormalizePowers]);

  useEffect(() => {
    if (currentNormalizePowers) {
      const newPowerValues = handlePowers(currentATRValue, "current");
      setCurrentPowerValues(newPowerValues);
    }
  }, [currentATRValue, currentNormalizePowers]);

  return (
    <>
      <InfoCard withOutCheck>
        <div className="info-card">
          <SCTextXSLight color="black">Selecciona la tarifa</SCTextXSLight>
          {oppeners["atr_check"] ? (
            <>
              <div className="options-container">
                <SingleDropdown
                  label="Tu tarifa actual"
                  name="invoice_type"
                  options={ATRTypes.map((element) => `${element.name}`)}
                  validation={{
                    validate: async (value) => {
                      setCurrentATRValue(value);
                      handleCheckValueATRIsSelected(value, "current");
                    },
                  }}
                  additionalErrors={handleAdditionalErrors(
                    "single",
                    ATRPowerCurrentErrors
                  )}
                />
              </div>
              <div className="options-container">
                <SingleDropdown
                  label="Tu tarifa ideal"
                  name="invoice_type"
                  options={ATRTypes.map((element) => `${element.name}`)}
                  validation={{
                    validate: async (value) => {
                      setAtrValue(value);
                      handleCheckValueATRIsSelected(value);
                    },
                  }}
                  additionalErrors={handleAdditionalErrors(
                    "single",
                    ATRPowerErrors
                  )}
                />
              </div>
            </>
          ) : (
            <ButtonSelect action={() => handleButtonCheck("atr_check", true)}>
              Seleccionar tarifa
            </ButtonSelect>
          )}
        </div>
      </InfoCard>
      {oppeners["atr_value"] && (
        <InfoCard withOutCheck>
          <div className="info-card">
            <SCTextXSLight color="black">
              Selecciona tu potencia ideal
            </SCTextXSLight>

            {oppeners["power_check"] ? (
              <>
                <div className="options-container">
                  <MultiDropdown
                    label="Elige tu potencia actual"
                    options={currentPowerValues.map((element, index) => {
                      return {
                        name: `power_${index}`,
                        values: element,
                      };
                    })}
                    validation={{
                      required: true,
                    }}
                    additionalErrors={handleAdditionalErrors(
                      "multi",
                      ATRPowerCurrentErrors
                    )}
                    setValue={(index, value) =>
                      handlePowerValues(
                        index,
                        value,
                        currentATRValue,
                        "current"
                      )
                    }
                  />
                </div>
                <div className="options-container">
                  <MultiDropdown
                    label="Elige tu potencia ideal"
                    options={powerValues.map((element, index) => {
                      return {
                        name: `power_${index}`,
                        values: element,
                      };
                    })}
                    validation={{
                      required: true,
                    }}
                    additionalErrors={handleAdditionalErrors(
                      "multi",
                      ATRPowerErrors
                    )}
                    setValue={(index, value) =>
                      handlePowerValues(index, value, atrValue)
                    }
                  />
                </div>
              </>
            ) : (
              <ButtonSelect
                action={() => handleButtonCheck("power_check", true)}
              >
                Seleccionar potencia
              </ButtonSelect>
            )}
          </div>
        </InfoCard>
      )}
    </>
  );
};

const ATRPowerWithSipsInformation = ({
  handlePowerValues,
  handleButtonCheck,
  handleAdditionalErrors,
  ATRPowerErrors,
  handleOptionSelectedATRValue,
  oppeners,
  ATRTypes,
  handlePowers,
  SIPSPower,
  ATR,
}) => {
  const [atrValue, setAtrValue] = useState("");

  useEffect(() => {
    setAtrValue(ATR);
  }, [ATR]);

  return (
    <>
      <InfoCard
        checked={!oppeners["atr_check"]}
        action={(value) => handleButtonCheck("atr_check", false)}
      >
        <div className="info-card">
          <SCTextM color={oppeners["atr_check"] ? "gray" : "primary"}>
            Tu tarifa actual
          </SCTextM>
          <div className="data-container">
            <SCTextL color={oppeners["atr_check"] ? "gray" : "primary"}>
              {ATR}
            </SCTextL>
          </div>
          <SCTextXSLight color={oppeners["atr_check"] ? "gray" : "black"}>
            Mantener mis tramos horarios actuales sin cambios.
          </SCTextXSLight>
          {oppeners["atr_check"] ? (
            <SingleDropdown
              label="Tarifa de acceso"
              name="invoice_type"
              options={ATRTypes.map((element) => `${element.name}`)}
              validation={{
                validate: async (value) => {
                  handleOptionSelectedATRValue(value);
                  setAtrValue(value);
                },
              }}
              additionalErrors={handleAdditionalErrors(
                "single",
                ATRPowerErrors
              )}
            />
          ) : (
            <ButtonSelect action={() => handleButtonCheck("atr_check", true)}>
              Quiero cambiar mi tarifa
            </ButtonSelect>
          )}
        </div>
      </InfoCard>
      <InfoCard
        checked={!oppeners["power_value"]}
        action={() => handleButtonCheck("power_value", false)}
      >
        <div className="info-card">
          <SCTextM color={oppeners["power_value"] ? "gray" : "primary"}>
            Tu potencia actual
          </SCTextM>

          <div className="power-wrapper">
            {SIPSPower.map((element, index) => {
              return (
                <SCTextL
                  key={index}
                  color={oppeners["power_value"] ? "gray" : "primary"}
                >
                  {element}
                </SCTextL>
              );
            })}
          </div>

          <SCTextXSLight color={oppeners["power_value"] ? "gray" : "black"}>
            Mantener la potencia actual sin cambios.
          </SCTextXSLight>

          {oppeners["power_value"] ? (
            <div className="options-container">
              <MultiDropdown
                label="Elige tus potencias"
                options={handlePowers(
                  atrValue,
                  atrValue == ATR ? "current" : ""
                ).map((element, index) => {
                  return {
                    name: `power_${index}`,
                    values: element,
                  };
                })}
                validation={{ required: true }}
                additionalErrors={handleAdditionalErrors(
                  "multi",
                  ATRPowerErrors
                )}
                setValue={(index, value) =>
                  handlePowerValues(index, value, atrValue)
                }
              />
            </div>
          ) : (
            <ButtonSelect action={() => handleButtonCheck("power_value", true)}>
              Quiero cambiar mi potencia
            </ButtonSelect>
          )}
        </div>
      </InfoCard>
    </>
  );
};

const ATRPowerNewSubscription = ({
  oppeners,
  handleButtonCheck,
  handleAdditionalErrors,
  ATRPowerErrors,
  handleOptionSelectedATRValue,
  handlePowerValues,
  handlePowers,
  ATRTypes,
}) => {
  const [atrValue, setAtrValue] = useState("");

  return (
    <>
      <InfoCard withOutCheck>
        <div className="info-card">
          <SCTextXSLight color="black">
            Selecciona tu tarifa ideal
          </SCTextXSLight>
          {oppeners["atr_check"] ? (
            <div className="options-container">
              <SingleDropdown
                label="Tarifa de acceso"
                name="invoice_type"
                options={ATRTypes.map((element) => `${element.name}`)}
                validation={{
                  validate: async (value) => {
                    handleOptionSelectedATRValue(value);
                    setAtrValue(value);
                  },
                }}
                additionalErrors={handleAdditionalErrors(
                  "single",
                  ATRPowerErrors
                )}
              />
            </div>
          ) : (
            <ButtonSelect action={() => handleButtonCheck("atr_check", true)}>
              Seleccionar tarifa
            </ButtonSelect>
          )}
        </div>
      </InfoCard>
      {oppeners["atr_value"] && (
        <InfoCard withOutCheck>
          <div className="info-card">
            <SCTextXSLight color="black">
              Selecciona tu potencia ideal
            </SCTextXSLight>

            {oppeners["power_check"] ? (
              <div className="options-container">
                <MultiDropdown
                  label="Elige tus potencias"
                  options={handlePowers(atrValue).map((element, index) => {
                    return {
                      name: `power_${index}`,
                      values: element,
                    };
                  })}
                  validation={{
                    required: true,
                  }}
                  additionalErrors={handleAdditionalErrors(
                    "multi",
                    ATRPowerErrors
                  )}
                  setValue={(index, value) =>
                    handlePowerValues(index, value, atrValue)
                  }
                />
              </div>
            ) : (
              <ButtonSelect
                action={() => handleButtonCheck("power_check", true)}
              >
                Seleccionar potencia
              </ButtonSelect>
            )}
          </div>
        </InfoCard>
      )}
    </>
  );
};

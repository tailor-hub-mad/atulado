import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { isEmpty } from "lodash";
import Scrollspy from "react-scrollspy";

import { SCSubscription } from "./Subscription.styled";
import { Navbar } from "../../molecules/Navbar/Navbar.molecule";
import { SCTextM } from "../../atoms/Text/TextM.styled";
import { SCTextL } from "../../atoms/Text/TextL.styled";
import { SCTextXL } from "../../atoms/Text/TextXL.styled";
import { SCTextSLight } from "../../atoms/Text/TextS.styled";
import { ButtonCheck } from "../../atoms/ButtonCheck/ButtonCheck.atom";
import Button from "../../atoms/Button/Button.atom";
import { WhereModule } from "../../organisms/FormModule/WhereModule/WhereModule.organism";
import { WhenModule } from "../../organisms/FormModule/WhenModule/WhenModule.organism";
import { WhatModule } from "../../organisms/FormModule/WhatModule/WhatModule.organism";
import { HowModule } from "../../organisms/FormModule/HowModule/HowModule.organism";
import { DataModule } from "../../organisms/FormModule/DataModule/DataModule.organism";
import LoadingScreen from "../../molecules/LoadingScreen/LoadingScreen.molecule";
import { Modal } from "../../molecules/Modal/Modal.molecule";

import {
  createRegistration,
  createContract,
  updateRegistration,
  updateRegistrationContract,
  readRegistration,
  readTechnicalRegistration,
} from "../../../lib/api/register";
import { getContractById } from "../../../lib/api/contract";
import { handleDataRegistration } from "../../../utils/register";

import { EXTERNAL_LINK_PROXIMA_WEB } from "../../../utils/constants";

import { useAuth } from "../../../context";

export default function SubscriptionTemplate() {
  const router = useRouter();
  const {
    newContract,
    updateContract,
    updateProcess,
    proccessId,
    refWindow,
    contractCode: modifyContractCode,
    proccessCode
  } = router.query;

  const { user } = useAuth();

  const [refs] = useState(
    new Array(5).fill(0).reduce((acc, _, i) => {
      acc[i] = React.createRef();
      return acc;
    }, {})
  );

  const [offeredName, setOfferedName] = useState("");
  const [hasFormErrors, setHasFormErros] = useState({
    dni: false,
    address: false,
    email: false,
    offered: false,
    general: false,
  });
  const [defaultAddressNewContract, setDefaultAddressNewContract] = useState();
  const [defaultInfoUpdateContract, setDefaultInfoUpdateContract] = useState();
  const [defaultUserNewContract, setDefaultUserNewContract] = useState();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [oppeners, setOppeners] = useState({
    bie: {
      new_subscription: false,
      error_power: false,
      stop_service: true,
    },
    stop_service: false,
    max_power_stop_service: true,
    atr_check: false,
    power_check: false,
    atr_value: false,
  });
  const [requiredData, setRequiredData] = useState({
    conditions: null,
    inputs: null,
  });

  const [summaryData, setSummaryData] = useState({
    client: {},
    client_payer: {},
    address: {},
    contract: {},
  });
  const [CUPSValue, setCUPSValue] = useState();
  const [attachmentFile, setAttachmentFile] = useState({
    bie: undefined,
    self_supply_bie: undefined,
    change_titularity_doc: undefined,
  });
  const [extraDataRegister, setExtraDataRegister] = useState({
    isCompany: false,
    isCompanyPayer: false,
    isFiscalAddress: false,
    isContactAddress: false,
    isPayer: false,
    electronic_invoice: true,
    previous_contract: false,
    change_titularity: false,
    newContractReason: 0,
  });
  const [disactiveNav, setDisactiveNav] = useState(false);
  const [changeTitulary, setChangeTitulary] = useState(false);

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const onSubmit = async (dataInputs) => {
    const data = {
      ...extraDataRegister,
      ...dataInputs,
      ...attachmentFile,
      update: defaultInfoUpdateContract?.contract,
    };

    const dataRegister = await handleDataRegistration(data);

    let response = null;

    if (updateContract) {
      response = await updateRegistrationContract(
        user.roleCode,
        user.UserId,
        modifyContractCode,
        dataRegister
      );
    } else if (updateProcess) {
      if (proccessId > 0) {
        response = await updateRegistration(
          user.roleCode,
          defaultInfoUpdateContract.contract.RegistrationId,
          dataRegister
        );
      } else {
        response = await updateRegistrationContract(
          user.roleCode,
          user.UserId,
          modifyContractCode,
          dataRegister
        );
      }
    } else {
      response = user
        ? await createContract(user.roleCode, user.UserId, dataRegister)
        : await createRegistration(dataRegister);
    }

    if (response?.error || response == null) {
      setHasFormErros({ ...hasFormErrors, general: true });
    } else {
      setOpenModal(true);
    }

    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
  };

  const handleRequiredDataForm = (key, value) => {
    const newRequiredData = { ...requiredData };
    newRequiredData[key] = value;
    setRequiredData(newRequiredData);
  };

  const handleClick = (id) => {
    refs[id].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (offeredName != "") {
      setLoading(false);
    }
  }, [offeredName]);

  useEffect(() => {
    if (!updateContract && !newContract) return;

    if (user) {
      setDefaultUserNewContract(user);

      if (newContract) {
        setDisactiveNav(true);
        setDefaultAddressNewContract(user.FiscalAddress);
      }
    }
  }, [newContract, updateContract]);

  useEffect(() => {
    if (!refWindow || !refs) return;

    if (refWindow == 3) {
      console.log('Change titularity!')
      setChangeTitulary(true);
    }

    refs[refWindow].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [refWindow, refs]);

  useEffect(() => {
    if (!updateContract) return;

    async function getInfo() {
      const { data: dataContract } = await getContractById(
        user.roleCode,
        user.UserId,
        modifyContractCode
      );

      const newDefaultInfoUpdateContract = { ...defaultInfoUpdateContract };
      newDefaultInfoUpdateContract["updateContract"] = true;
      newDefaultInfoUpdateContract["cups"] = dataContract.CUPS;
      newDefaultInfoUpdateContract["contract"] = dataContract;

      setCUPSValue(dataContract.CUPS);
      setDefaultAddressNewContract(dataContract.SupplyAddress);
      setDefaultInfoUpdateContract(newDefaultInfoUpdateContract);
    }

    getInfo();
  }, [updateContract]);

  useEffect(() => {
    if (!updateProcess) return;

    async function getInfoRegistration(proccessId) {
      const { data: dataResgistration } = proccessId > 0 ? await readRegistration(
        user.roleCode,
        proccessId
      ) : await readTechnicalRegistration(
        user.roleCode,
        user.UserId,
        modifyContractCode,
        proccessCode
      )

      const newDefaultInfoUpdateContract = { ...defaultInfoUpdateContract };
      newDefaultInfoUpdateContract["updateRegistration"] = true;
      newDefaultInfoUpdateContract["cups"] = dataResgistration.Supply.CUPS;
      newDefaultInfoUpdateContract["contract"] = {
        ...dataResgistration,
        ...dataResgistration.Supply,
      };

      setCUPSValue(dataResgistration.Supply.CUPS);
      setDefaultAddressNewContract(dataResgistration.SupplyAddress);
      setDefaultInfoUpdateContract(newDefaultInfoUpdateContract);
    }

    getInfoRegistration(proccessId);
  }, [updateProcess]);

  return (
    <>
      {loading && <LoadingScreen />}

      <SCSubscription>
        <>
          {openModal && (
            <ModalForm
              updateContract={updateContract || updateProcess}
              user={user}
            />
          )}
          <Navbar
            optionList={[
              { option: "Home", link: "/global" },
              { option: "Contratos", link: "/" },
              { option: "Facturas", link: "/" },
              { option: "Mis datos", link: "/" },
            ]}
            action={(link) => router.push(link)}
            withoutMenu
          />

          <div className="title" ref={refs[0]}>
            <SCTextXL>
              {`Contrata nuestra tarifa ${offeredName} y disfruta del mejor
              precio del mercado`}
            </SCTextXL>
          </div>

          <div className="main-wrapper">
            <aside className="breadcrumbs-wrapper">
              <Scrollspy
                items={[
                  "section-1",
                  "section-2",
                  "section-3",
                  "section-4",
                  "section-5",
                ]}
                currentClassName="is-current"
              >
                <SCTextM onClick={() => handleClick(0)} color="black">
                  ¿Dónde te suministramos?
                </SCTextM>

                <SCTextM onClick={() => handleClick(1)} color="black">
                  ¿Qué necesitas?
                </SCTextM>

                <SCTextM onClick={() => handleClick(2)} color="black">
                  ¿Cuándo empezamos?
                </SCTextM>

                <SCTextM onClick={() => handleClick(3)} color="black">
                  ¿Cómo te facturamos?
                </SCTextM>

                <SCTextM onClick={() => handleClick(4)} color="black">
                  Resumen
                </SCTextM>
              </Scrollspy>
            </aside>

            <FormProvider {...methods}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  methods.handleSubmit(onSubmit, onError)();
                }}
                className="form-wrapper"
              >
                <div className="section-wrapper" id="section-1">
                  <SCTextXL color="black">¿Dónde te suministramos?</SCTextXL>
                  <div className="content-wrapper">
                    <WhereModule
                      summaryData={summaryData}
                      setSummaryData={setSummaryData}
                      setCUPSValue={setCUPSValue}
                      extraDataRegister={extraDataRegister}
                      setExtraDataRegister={setExtraDataRegister}
                      defaultAddressNewContract={defaultAddressNewContract}
                      defaultInfoUpdateContract={defaultInfoUpdateContract}
                      setHasFormErros={setHasFormErros}
                      hasFormErrors={hasFormErrors}
                    />
                  </div>
                </div>
                <div className="section-wrapper" ref={refs[1]} id="section-2">
                  <SCTextXL color="black">¿Qué necesitas?</SCTextXL>
                  <div className="content-wrapper">
                    <WhatModule
                      cups={CUPSValue}
                      summaryData={summaryData}
                      setSummaryData={setSummaryData}
                      oppeners={oppeners}
                      setOppeners={setOppeners}
                      attachmentFile={attachmentFile}
                      setAttachmentFile={setAttachmentFile}
                      extraDataRegister={extraDataRegister}
                      setExtraDataRegister={setExtraDataRegister}
                      defaultInfoUpdateContract={defaultInfoUpdateContract}
                      setRequiredData={setRequiredData}
                      requiredData={requiredData}
                      setHasFormErros={setHasFormErros}
                      setOfferedName={setOfferedName}
                      hasFormErrors={hasFormErrors}
                    />
                  </div>
                </div>
                <div className="section-wrapper" ref={refs[2]} id="section-3">
                  <SCTextXL color="black">¿Cuándo empezamos?</SCTextXL>
                  <div className="content-wrapper">
                    <WhenModule
                      defaultInfoUpdateContract={defaultInfoUpdateContract}
                    />
                  </div>
                </div>
                <div className="section-wrapper" id="section-4" ref={refs[3]}>
                  <SCTextXL color="black">¿Cómo te facturamos?</SCTextXL>
                  <div className="content-wrapper">
                    <HowModule
                      summaryData={summaryData}
                      setSummaryData={setSummaryData}
                      extraDataRegister={extraDataRegister}
                      setExtraDataRegister={setExtraDataRegister}
                      defaultInfoUpdateContract={defaultInfoUpdateContract}
                      attachmentFile={attachmentFile}
                      setAttachmentFile={setAttachmentFile}
                      changeTitularyProp={changeTitulary}
                    />
                  </div>
                </div>

                <div className="data-wrapper">
                  <DataModule
                    handleRequiredDataForm={handleRequiredDataForm}
                    summaryData={summaryData}
                    setSummaryData={setSummaryData}
                    extraDataRegister={extraDataRegister}
                    setExtraDataRegister={setExtraDataRegister}
                    defaultUserNewContract={defaultUserNewContract}
                    defaultInfoUpdateContract={defaultInfoUpdateContract}
                    setHasFormErros={setHasFormErros}
                    hasFormErrors={hasFormErrors}
                    disactiveNav={disactiveNav}
                  />
                </div>

                <div className="section-wrapper" ref={refs[4]} id="section-5">
                  <SCTextXL color="black">Resumen</SCTextXL>
                  <div className="content-wrapper">
                    <div className="summary-wrapper">
                      <div>
                        <div className="summary-title">
                          <SCTextL>Tus datos</SCTextL>
                        </div>

                        {!isEmpty(summaryData["client"]) && (
                          <SummaryClientData
                            dataClient={summaryData["client"]}
                          />
                        )}
                      </div>
                      <div>
                        <div className="summary-title">
                          <SCTextL>Datos de suministro</SCTextL>
                        </div>

                        {!isEmpty(summaryData["address"]) && (
                          <SummaryAddressData
                            addressData={summaryData["address"]}
                          />
                        )}
                        {CUPSValue ||
                          (defaultInfoUpdateContract?.cups && (
                            <SCTextSLight color="black">
                              CUPS:{" "}
                              {CUPSValue || defaultInfoUpdateContract?.cups}
                            </SCTextSLight>
                          ))}
                      </div>
                      <div>
                        <div className="summary-title">
                          <SCTextL>Datos de pagador</SCTextL>
                        </div>

                        {!isEmpty(summaryData["client_payer"]) ? (
                          <SummaryPayerData
                            dataPayer={summaryData["client_payer"]}
                          />
                        ) : !isEmpty(summaryData["company_payer"]) ? (
                          <SummaryClientData
                            dataPayer={summaryData["company_payer"]}
                          />
                        ) : !isEmpty(summaryData["client"]) ? (
                          <SummaryClientData
                            dataClient={summaryData["client"]}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        <div className="summary-title">
                          <SCTextL>Tu contrato</SCTextL>
                        </div>

                        {!isEmpty(summaryData["contract"]) && (
                          <SummaryContractData
                            dataContract={summaryData["contract"]}
                          />
                        )}
                      </div>
                    </div>
                    <PolicyRequirements
                      handleRequiredDataForm={handleRequiredDataForm}
                    />
                  </div>
                </div>
                <div className="submit-wrapper">
                  <Button
                    disabled={
                      Object.keys(requiredData).some(
                        (element) => !requiredData[element]
                      ) ||
                      Object.keys(hasFormErrors).some(
                        (element) => hasFormErrors[element]
                      )
                    }
                    type="submit"
                  >
                    {updateContract ? "Actualizar" : "Terminar"}
                  </Button>
                </div>

                <div className="error-form-wrapper">
                  {Object.keys(requiredData).every(
                    (element) => requiredData[element]
                  ) &&
                    Object.keys(hasFormErrors).some(
                      (element) => hasFormErrors[element]
                    ) && (
                      <SCTextSLight color="red">
                        No se puede terminar{" "}
                        {updateContract ? "la actualización" : "el alta"} del
                        formulario porque ha ocurrido un error. Póngase en
                        contacto con nosotros.
                      </SCTextSLight>
                    )}
                  {requiredData.conditions && !requiredData.inputs && (
                    <SCTextSLight color="red">
                      No se puede terminar{" "}
                      {updateContract ? "la actualización" : "el alta"} del
                      formulario porque hay datos sin completar.
                    </SCTextSLight>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </>
        )
      </SCSubscription>
    </>
  );
}

const PolicyRequirements = ({ handleRequiredDataForm }) => {
  return (
    <div className="contract-terms">
      <ButtonCheck
        withOutOptions
        action={(value) => handleRequiredDataForm("conditions", value)}
      ></ButtonCheck>
      <SCTextSLight color="black">
        He leído y acepto la
        <span>
          {" "}
          <a href="" target="_blank">
            política de privacidad
          </a>{" "}
        </span>
        y
        <span>
          {" "}
          <a href="" target="_blank">
            condiciones generales
          </a>
        </span>
        .
      </SCTextSLight>
    </div>
  );
};

const SummaryClientData = ({ dataClient }) => {
  if (dataClient.type == "client") {
    return (
      <>
        <SCTextSLight color="black">
          <span>{dataClient?.client_name}</span>
          <span> {dataClient?.client_surname}</span>
        </SCTextSLight>
        <SCTextSLight color="black">{dataClient?.client_dni}</SCTextSLight>
        <SCTextSLight color="black">{dataClient?.client_phone}</SCTextSLight>
        <SCTextSLight color="black">{dataClient?.client_email}</SCTextSLight>
      </>
    );
  }

  return (
    <>
      <SCTextSLight color="black">{dataClient?.company_cif}</SCTextSLight>
      <SCTextSLight color="black">{dataClient?.company_name}</SCTextSLight>
      <SCTextSLight color="black">{dataClient?.company_email}</SCTextSLight>
      <SCTextSLight color="black">{dataClient?.company_phone}</SCTextSLight>

      <div className="separator" />

      <SCTextSLight color="black">
        <span>{dataClient?.company_admin_name}</span>
        <span> {dataClient?.company_admin_surname}</span>
      </SCTextSLight>
      <SCTextSLight color="black">{dataClient?.company_admin_dni}</SCTextSLight>
    </>
  );
};

const SummaryAddressData = ({ addressData }) => {
  return (
    <>
      {addressData?.name_road && addressData?.number_road && (
        <SCTextSLight color="black">
          <span>{addressData?.type_road}</span>
          <span> {addressData?.name_road}</span>
          <span>, {addressData?.number_road}</span>
        </SCTextSLight>
      )}

      {addressData?.postal_code && (
        <>
          <SCTextSLight color="black">{addressData?.postal_code}</SCTextSLight>
          <SCTextSLight color="black">
            <span>{addressData?.city}</span>
            <span>, {addressData?.province}</span>
          </SCTextSLight>
        </>
      )}

      <div className="separator" />
    </>
  );
};

const SummaryPayerData = ({ dataPayer }) => {
  if (dataPayer.type == "client") {
    return (
      <>
        <SCTextSLight color="black">
          <span>{dataPayer?.client_payer_name}</span>
          <span> {dataPayer?.client_payer_surname}</span>
        </SCTextSLight>
        <SCTextSLight color="black">{dataPayer?.client_payer_dni}</SCTextSLight>
        <SCTextSLight color="black">
          {dataPayer?.client_payer_phone}
        </SCTextSLight>
        <SCTextSLight color="black">
          {dataPayer?.client_payer_email}
        </SCTextSLight>
      </>
    );
  }

  return (
    <>
      <SCTextSLight color="black">{dataPayer?.company_payer_cif}</SCTextSLight>
      <SCTextSLight color="black">{dataPayer?.company_payer_name}</SCTextSLight>
      <SCTextSLight color="black">
        {dataPayer?.company_payer_email}
      </SCTextSLight>
      <SCTextSLight color="black">
        {dataPayer?.company_payer_phone}
      </SCTextSLight>

      <div className="separator" />

      <SCTextSLight color="black">
        <span>{dataPayer?.company_payer_admin_name}</span>
        <span> {dataPayer?.company_payer_admin_surname}</span>
      </SCTextSLight>
      <SCTextSLight color="black">
        {dataPayer?.company_payer_admin_dni}
      </SCTextSLight>
    </>
  );
};

const SummaryContractData = ({ dataContract }) => {
  return (
    <>
      {dataContract?.atr && (
        <SCTextSLight color="black">Tarifa: {dataContract?.atr}</SCTextSLight>
      )}

      <SCTextSLight color="black">
        {dataContract?.powers &&
          Object.keys(dataContract?.powers).reduce((acc, value, index) => {
            acc += `${dataContract.powers[value].includes("P") ? "" : `P${index + 1}:`
              } ${dataContract.powers[value]} ${dataContract.powers[value].includes("kW") ? "" : "kW"
              }, `;
            return acc;
          }, "")}
      </SCTextSLight>
      <div className="separator" />
      <SCTextSLight color="black">{dataContract?.price}</SCTextSLight>
      {dataContract?.fee && (
        <>
          {dataContract.fee?.supplyFee && (
            <>
              {dataContract.fee.supplyFee?.EnergyP1 && (
                <SCTextSLight color="black">{`Consumo punta: ${dataContract.fee.supplyFee.EnergyP1} €/kWh`}</SCTextSLight>
              )}
              {dataContract.fee.supplyFee?.EnergyP2 && (
                <SCTextSLight color="black">{`Consumo valle: ${dataContract.fee.supplyFee.EnergyP2} €/kWh`}</SCTextSLight>
              )}
              {dataContract.fee.supplyFee?.EnergyP3 && (
                <SCTextSLight color="black">{`Consumo super valle: ${dataContract.fee.supplyFee.EnergyP3} €/kWh`}</SCTextSLight>
              )}
              <div className="separator" />
              {dataContract.fee.supplyFee?.PowerP1 && (
                <SCTextSLight color="black">{`Potencia punta: ${(+dataContract.fee.supplyFee.PowerP1 / 365).toFixed(8)} €/kW día`}</SCTextSLight>
              )}
              {dataContract.fee.supplyFee?.PowerP2 && (
                <SCTextSLight color="black">{`Potencia valle: ${(+dataContract.fee.supplyFee.PowerP2 / 365).toFixed(8)} €/kW día`}</SCTextSLight>
              )}
              {dataContract.fee.supplyFee.PowerP3 && (
                <SCTextSLight color="black">{`Potencia super valle: ${(+dataContract.fee.supplyFee.PowerP3 / 365).toFixed(8)} €/kW día`}</SCTextSLight>
              )}
            </>
          )}

          {dataContract?.selfSupply && (
            <SCTextSLight color="black">
              Comisión de autoconsumo: {dataContract.fee?.selfSupplyFee}{" "}
              {dataContract.fee?.feeType == "Fixed" ? "€/mes" : "€/kWh"}
            </SCTextSLight>
          )}
          {dataContract?.paperInvoice && (
            <SCTextSLight color="black">
              Comisión de factura papel: {dataContract.fee?.paperFee}{" "}
              {dataContract.fee?.feeType == "Fixed" ? "€/mes" : "€/kWh"}
            </SCTextSLight>
          )}
        </>
      )}
    </>
  );
};

const ModalForm = ({ updateContract, user }) => {
  const [openFriend, setOpenFriend] = useState(false);

  const router = useRouter();
  // const [additionalErrors, setAdditionalErrors] = useState();

  // const methods = useForm({
  //   mode: "onBlur",
  //   shouldFocusError: true,
  // });

  // const onSubmit = async (dataInputs) => {
  //   const { code_friend } = dataInputs;

  //   const { error } = await validateFriendCode(code_friend);

  //   if (error) {
  //     setAdditionalErrors(error);
  //   } else {
  //     setAdditionalErrors();
  //   }
  // };

  return (
    <Modal
      closeAction={() => {
        user ? router.push("/") : (window.location = EXTERNAL_LINK_PROXIMA_WEB);
      }}
    >
      <div className="modal-form-wrapper">
        {openFriend ? (
          <>
            {/* <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <InputText
                  label="Código Plan amigo"
                  name={"code_friend"}
                  validation={{
                    required: true,
                  }}
                />
                <div className="button-wrapper">
                  <Button type="submit">Aplicar código amigo</Button>
                </div>
              </form>
            </FormProvider> */}
          </>
        ) : (
          <>
            <SCTextL color="black" className="important-text">
              ¡Enhorabuena,
            </SCTextL>
            <SCTextM color="black">
              {updateContract
                ? " la actualización se ha realizado con exito!."
                : " ya eres parte de nuestra gran familia!."}
            </SCTextM>
            <SCTextM color="black">
              {updateContract
                ? " Puedes entrar en tu área privada para adjuntar documentación o gestionar tus contratos."
                : " Puedes entrar en tu área privada para adjuntar documentación o revisar la tramitación de tu alta."}
            </SCTextM>
          </>
        )}

        <div className="button-wrapper">
          {user ? (
            <Button onClick={() => router.push("/")}>Aceptar</Button>
          ) : (
            <a href={EXTERNAL_LINK_PROXIMA_WEB}>
              <Button>Aceptar</Button>
            </a>
          )}
        </div>

        {/* <div className="button-wrapper">
          {openFriend || (
            <Button onClick={() => setOpenFriend(true)}>
              Añadir código amigo
            </Button>
          )}
        </div> */}
      </div>
    </Modal>
  );
};

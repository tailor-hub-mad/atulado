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
} from "../../../lib/api/register";
import { getContractById } from "../../../lib/api/contract";
import { handleDataRegistrstion } from "../../../utils/register";

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
  } = router.query;

  const { user } = useAuth();

  const [refs] = useState(
    new Array(5).fill(0).reduce((acc, _, i) => {
      acc[i] = React.createRef();
      return acc;
    }, {})
  );

  const [errorMessage, setErrorMessage] = useState({
    open: false,
    message: "",
  });
  const [defaultAddressNewContract, setDefaultAddressNewContract] = useState();
  const [defaultInfoUpdateContract, setDefaultInfoUpdateContract] = useState();
  const [defaultUserNewContract, setDefaultUserNewContract] = useState();
  const [loading, setLoading] = useState(false);
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
    paper_invoice: false,
    previous_contract: false,
    change_titularity: false,
    newContractReason: 0,
  });

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (dataInputs) => {
    const data = {
      ...extraDataRegister,
      ...dataInputs,
      ...attachmentFile,
      update: defaultInfoUpdateContract?.contract,
    };

    const dataRegister = await handleDataRegistrstion(data);

    let response = null;

    if (updateContract) {
      response = await updateRegistrationContract(
        user.roleCode,
        user.UserId,
        modifyContractCode,
        dataRegister
      );
    } else if (updateProcess) {
      response = await updateRegistration(
        user.roleCode,
        defaultInfoUpdateContract.contract.RegistrationId,
        dataRegister
      );
    } else {
      response = user
        ? await createContract(user.roleCode, user.UserId, dataRegister)
        : await createRegistration(dataRegister);
    }

    setOpenModal(true);

    if (response?.error) {
      setErrorMessage({
        open: true,
        message: response.error,
      });

      setTimeout(() => {
        setErrorMessage({
          open: false,
          message: "",
        });
      }, 7000);
      form;
    }

    setLoading(false);
  };

  const onError = (errors, e) => {
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
    if (!updateContract && !newContract) return;

    if (user) {
      setDefaultUserNewContract(user);

      if (newContract) {
        setDefaultAddressNewContract(user.FiscalAddress);
      }
    }
  }, [newContract, updateContract]);

  useEffect(() => {
    if (!refWindow || !refs) return;

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
      const { data: dataResgistration } = await readRegistration(
        user.roleCode,
        proccessId
      );

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
            <ModalForm updateContract={updateContract || updateProcess} />
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
            <SCTextXL>Vamos a dar de alta tu mejor energía</SCTextXL>
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
                <div className="section-wrapper" id="section-4">
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
                    />
                  </div>
                </div>

                <div className="data-wrapper" ref={refs[3]}>
                  <DataModule
                    handleRequiredDataForm={handleRequiredDataForm}
                    summaryData={summaryData}
                    setSummaryData={setSummaryData}
                    extraDataRegister={extraDataRegister}
                    setExtraDataRegister={setExtraDataRegister}
                    defaultUserNewContract={defaultUserNewContract}
                    defaultInfoUpdateContract={defaultInfoUpdateContract}
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
                    disabled={Object.keys(requiredData).some(
                      (element) => !requiredData[element]
                    )}
                    type="submit"
                  >
                    {updateContract ? "Actualizar" : "Terminar"}
                  </Button>
                </div>

                <div className="error-form-wrapper">
                  {errorMessage.open && (
                    <SCTextSLight color="red">
                      {errorMessage.message}
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
      <SCTextSLight color="black">{dataClient?.company_emails}</SCTextSLight>

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
      <SCTextSLight color="black">
        <span>{addressData?.type_road}</span>
        <span> {addressData?.name_road}</span>
        <span>, {addressData?.number_road}</span>
      </SCTextSLight>
      <SCTextSLight color="black">{addressData?.postal_code}</SCTextSLight>
      <SCTextSLight color="black">
        <span>{addressData?.city}</span>
        <span>, {addressData?.province}</span>
      </SCTextSLight>
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
            acc += `P${index + 1}: ${dataContract.powers[value]} ${
              dataContract.powers[value].includes("kw") ? "" : "kw"
            }, `;
            return acc;
          }, "")}
      </SCTextSLight>
      <SCTextSLight color="black">{dataContract?.price}</SCTextSLight>
      {dataContract?.fee && (
        <>
          <SCTextSLight color="black">
            Comisión de suministro: {dataContract.fee?.supplyFee} €/mes
          </SCTextSLight>
          {dataContract?.selfSupply && (
            <SCTextSLight color="black">
              Comisión de autoconsumo: {dataContract.fee?.selfSupplyFee} €/mes
            </SCTextSLight>
          )}
          {dataContract?.paperInvoice && (
            <SCTextSLight color="black">
              Comisión de factura papel: {dataContract.fee?.paperFee} €/mes
            </SCTextSLight>
          )}
        </>
      )}
    </>
  );
};

const ModalForm = ({ updateContract }) => {
  const [openFriend, setOpenFriend] = useState(false);

  const router = useRouter();
  // const [additionalErrors, setAdditionalErrors] = useState();

  // const methods = useForm({
  //   mode: "onBlur",
  //   reValidateMode: "onSubmit",
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
    <Modal closeAction={() => (window.location = EXTERNAL_LINK_PROXIMA_WEB)}>
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
          <a href={EXTERNAL_LINK_PROXIMA_WEB}>
            <Button>Aceptar</Button>
          </a>
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

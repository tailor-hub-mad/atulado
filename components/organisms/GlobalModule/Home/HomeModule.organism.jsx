import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { flatten, uniqBy } from "lodash";

import { Search } from "../../../atoms/Search/Search.atom";
import { BarChart } from "../../../molecules/BarChart/BarChart.molecule";
import { SCHomeModule } from "./HomeModule.styled";
import { SCTextXL } from "../../../atoms/Text/TextXL.styled";
import { SCTextM } from "../../../atoms/Text/TextM.styled";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";
import { SCTextXSLight } from "../../../atoms/Text/TextXS.styled";
import { CardFriend } from "../../../molecules/CardFriend/CardFriend.atom";
import { ItemManagement } from "../../../molecules/ItemManagement/ItemManagement.molecule";
import { Modal } from "../../../molecules/Modal/Modal.molecule";
import Button from "../../../atoms/Button/Button.atom";
import { InputText } from "../../../atoms/Input/Input.atom";
import { SingleDropdown } from "../../../molecules/Dropdown/Single/SingleDropdown.molecule";
import { SCSpinner } from "../../../atoms/Spinner/Spinner.styled";
import { SingleDropdownFilterManagement } from "../../../molecules/Dropdown/Single/SingleDropdown.molecule";
import { ButtonSelect } from "../../../atoms/ButtonSelect/ButtonSelect.atom";
import { ProcessModal } from "../../Modal/ProcessModal/ProcessModal.organism";

import { getInvoicesByContract } from "../../../../lib/api/invoice";
import {
  getProcess,
  deleteProcessById,
  validateDocumentation,
} from "../../../../lib/api/process";

import { chartTemplate, dataYearTemplate } from "../../../../utils/contract";

import { getFriendBalance } from "../../../../lib/api/friend";
import { validateEmail } from "../../../../lib/api/validators";
import {
  getPositionMonthByCode,
  getCodeMonthByPosition,
} from "../../../../utils/date";
import { getAverage } from "../../../../utils/number";
import colorChart from "../../../../utils/data/colors.json";
import {
  findProcessByAddress,
  findProcessByStatus,
  findProcessByType,
  findProcessByContract,
  findProcessByCups,
} from "../../../../utils/process";

import FacesImage from "../../../../public/image/faces_image.svg";

const filterOptionButtons = [
  "Sin Documentación",
  "Sin firma",
  "Sin validar Documentación",
  "Contratación fecha fija",
];

const filterOptionStatus = ["Pendiente", "En proceso", "Cancelado", "Error"];

export const HomeModule = ({ contracts, user, optionsList }) => {
  const [dataInvoices, setDataInvoices] = useState();
  const [dataManagement, setDataManagement] = useState([]);
  const [fullDataManagement, setFullDataManagement] = useState([]);
  const [friendOptions, setFriendOptions] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [filterManagementParameters, setFilterManagementParameters] = useState({
    search: null,
    type: [],
    state: null,
  });
  const [closeManagementModal, setCloseManagementModal] = useState({
    open: false,
    index: null,
  });
  const [openFriendModal, setOpenFriendModal] = useState(false);
  const [friendCodeModal, setFriendCodeModal] = useState(false);

  const handleFilterManagement = () => {
    const { search, type, state } = filterManagementParameters;
    let newManagementFilterData = fullDataManagement;

    if (search != null) {
      const newManagementFilterDataAddress = findProcessByAddress(
        newManagementFilterData,
        search
      );

      const newManagementFilterDataContract = findProcessByContract(
        newManagementFilterData,
        search
      );

      const newManagementFilterDataCups = findProcessByCups(
        newManagementFilterData,
        search
      );

      const uniqueNewManagementFilter = uniqBy(
        flatten([
          newManagementFilterDataAddress,
          newManagementFilterDataContract,
          newManagementFilterDataCups,
        ]),
        "ProcessId"
      );

      newManagementFilterData = uniqueNewManagementFilter;
    }
    if (state != null) {
      newManagementFilterData = findProcessByStatus(
        newManagementFilterData,
        state
      );
    }
    if (type.length > 0) {
      newManagementFilterData = findProcessByType(
        newManagementFilterData,
        type
      );
    }

    return newManagementFilterData;
  };

  const handleSearchManagement = (value) => {
    const newDataFilterInvoicesParameters = { ...filterManagementParameters };

    newDataFilterInvoicesParameters["search"] = value == "" ? null : value;

    setFilterManagementParameters(newDataFilterInvoicesParameters);
  };

  const handleFilterButtonManagement = (index, value) => {
    const newDataFilterInvoicesParameters = { ...filterManagementParameters };

    if (value) {
      newDataFilterInvoicesParameters["type"].push(index);
    } else {
      const indexValue = newDataFilterInvoicesParameters["type"].indexOf(index);

      newDataFilterInvoicesParameters["type"].splice(indexValue, 1);
    }

    setFilterManagementParameters(newDataFilterInvoicesParameters);
  };

  const handleFilterStatusManagement = (selected) => {
    const newDataFilterInvoicesParameters = { ...filterManagementParameters };

    newDataFilterInvoicesParameters["state"] = selected == "" ? null : selected;

    setFilterManagementParameters(newDataFilterInvoicesParameters);
  };

  const handleDeleteManagement = async (index) => {
    const process = dataManagement[index];

    const { ContractCode, RegistrationId, ProcessId } = process;

    await deleteProcessById(
      user.roleCode,
      user.UserId,
      ContractCode,
      RegistrationId,
      ProcessId
    );

    setCloseManagementModal({
      open: false,
      index: null,
    });
  };

  const handleClickManagementItem = (index) => {
    optionsList("home", dataManagement[index]);
  };

  const handleValidateProcess = (index) => {
    const process = dataManagement[index];

    const { RegistrationId, ProcessId } = process;

    validateDocumentation(
      user.roleCode,
      user.UserId,
      ProcessId,
      RegistrationId
    );
  };

  const getInvoicePriceByMonth = (invoices) => {
    const dataYear = { ...dataYearTemplate };

    invoices.forEach((element) => {
      const date = new Date(element.StartDate);
      const month = date.getMonth();

      const codeMonth = getCodeMonthByPosition(month);
      dataYear[codeMonth].push(element.Amount);
    });

    Object.keys(dataYear).forEach((element) => {
      dataYear[element] =
        dataYear[element].length > 0
          ? `${getAverage(dataYear[element]).toFixed(2)} €`
          : "-";
    });

    return dataYear;
  };

  const buildData = () => {
    if (!dataInvoices || dataInvoices.length == 0) return [];

    const chart = [...chartTemplate];

    const info = [];
    let setKeys = new Set();

    const invoicePlace = [dataInvoices[0]?.Address?.Street];

    invoicePlace.forEach((element, index) => {
      const placeData = {};

      placeData["place"] = element;
      placeData["info"] = getInvoicePriceByMonth(dataInvoices);
      placeData["color"] = colorChart[index];

      info.push(placeData);
    });

    info.forEach((element, index) => {
      const months = element.info;

      Object.keys(months).forEach((month) => {
        const position = getPositionMonthByCode(month);
        const value = months[month].replace(" €", "");

        const formatValue = Number(value == "-" ? "0" : value);

        const auxMonth = chart[position];

        auxMonth[`data_${index}`] = formatValue;
        auxMonth[`data_${index}_color`] = element.color;
        setKeys.add(`data_${index}`);
      });
    });

    return { info, chart, key: [...setKeys] };
  };

  useEffect(() => {
    if (!contracts || !user) return;

    if (user?.roleCode == "3") {
      Promise.all(
        contracts.map((element) => {
          return getInvoicesByContract(
            user.roleCode,
            user.UserId,
            element.ContractCode
          ).then((response) => response.data);
        })
      ).then((response) => {
        const newInvoices = response
          .filter(
            (element) => element.Succeeded && element.InvoicesCrMemos.length > 0
          )
          .map((element) => element.InvoicesCrMemos);

        setDataInvoices(flatten(newInvoices));
      });
    }

    getProcess(user.roleCode).then(({ data }) => {
      setDataManagement(
        data.filter((element) => element["Status"] != "Procesado")
      );
      setFullDataManagement(data);
      setLoadingSpinner(false);
    });

    getFriendBalance(user.roleCode, user.UserId).then(({ data }) => {
      setFriendOptions(data);
    });
  }, [contracts, user]);

  useEffect(() => {
    const newFilterManagement = handleFilterManagement();

    setDataManagement(newFilterManagement);
  }, [filterManagementParameters]);

  return (
    <SCHomeModule>
      {openFriendModal && (
        <FriendInfoModal
          setOpenFriendModal={setOpenFriendModal}
          setFriendCodeModal={setFriendCodeModal}
        />
      )}
      {closeManagementModal.open && (
        <ProcessModal
          handleDeleteManagement={handleDeleteManagement}
          setCloseManagementModal={setCloseManagementModal}
          index={closeManagementModal.index}
        />
      )}
      {friendCodeModal && (
        <FriendCodeModal
          setFriendCodeModal={setFriendCodeModal}
          contracts={contracts}
          user={user}
        />
      )}

      <div className="title-wrapper">
        <SCTextXL color="primary">Gestiones pendientes:</SCTextXL>
        {user?.roleCode != 3 && (
          <div className="icons-wrapper">
            <Search action={handleSearchManagement} />
          </div>
        )}
      </div>

      <div className="management-section">
        {user?.roleCode == "2" && (
          <div className="filter-management-wrapper">
            <SingleDropdownFilterManagement
              disabled={loadingSpinner}
              options={filterOptionStatus}
              action={(selected) => {
                handleFilterStatusManagement(selected);
              }}
            />
            {filterOptionButtons.map((element, index) => {
              return (
                <ButtonSelect
                  key={index}
                  disabled={loadingSpinner}
                  action={(value) => handleFilterButtonManagement(index, value)}
                >
                  {element}
                </ButtonSelect>
              );
            })}
          </div>
        )}

        <div
          className={
            user.roleCode == 3
              ? "title-table-management-check"
              : "title-table-management"
          }
        >
          <SCTextSLight color="black">Gestiones</SCTextSLight>
          <SCTextSLight color="black">Estado</SCTextSLight>
          <SCTextSLight color="black">Contrato/CUPS</SCTextSLight>
          <SCTextSLight color="black">Dirección</SCTextSLight>
          <SCTextSLight color="black">Fecha Inicio</SCTextSLight>
          <SCTextSLight color="black">Última modificación</SCTextSLight>
        </div>

        <div className="option-table-management">
          {loadingSpinner ? (
            <div className="spinner-wrapper">
              <SCSpinner />
            </div>
          ) : (
            <>
              {dataManagement.length > 0 ? (
                dataManagement.map((element, index) => (
                  <ItemManagement
                    key={index}
                    closeAction={() =>
                      setCloseManagementModal({
                        open: true,
                        index,
                      })
                    }
                    action={() => handleClickManagementItem(index)}
                    data={element}
                    validateAction={() => handleValidateProcess(index)}
                    user={user}
                  />
                ))
              ) : (
                <div className="empty-management">
                  <SCTextSLight color="black">
                    No hay gestiones pendientes
                  </SCTextSLight>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {user?.roleCode == "3" && (
        <div className="info-section">
          <div className="invoices-wrapper">
            <SCTextXL color="primary" className="title">
              Facturas:
            </SCTextXL>

            <div className="barchart-wrapper">
              <BarChart
                indexBy="month"
                keys={buildData().key}
                action={() => { }}
                dataInfo={buildData().info}
                dataChart={buildData().chart}
              />
            </div>
          </div>
          <div className="friend-wrapper">
            <CardFriend
              options={friendOptions}
              helperAction={() => setOpenFriendModal(true)}
              cardAction={() => setFriendCodeModal(true)}
            />
          </div>
        </div>
      )}
    </SCHomeModule>
  );
};

const FriendCodeModal = ({ setFriendCodeModal, contracts = [], user }) => {
  const [option, setOption] = useState();

  const methods = useForm({
    mode: "onSubmit",
    shouldFocusError: true,
  });

  const handleOption = (value) => {
    setOption(value.split(" ")[0]);
  };

  const onSubmit = async (dataInputs) => {
    if (!option) return;

    const friendInfo = {
      contractCode: option,
      friendEmail: dataInputs.email,
    };

    setFriendCodeModal(user.roleCode, user.UserId, friendInfo);
  };

  return (
    <Modal closeAction={() => setFriendCodeModal(false)} type="claim">
      <div className="friend-code-modal-wrapper">
        <div className="image-modal-wrapper">
          <FacesImage />
        </div>
        <div className="form-modal-wrapper">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <SingleDropdown
                label="Seleciona tu contrato"
                name="admin_email"
                options={contracts.map((element) => {
                  return `${element.ContractCode} - ${element.Address}`;
                })}
                validation={{
                  required: true,
                  validate: async (value) => {
                    handleOption(value);
                  },
                }}
              />
              <InputText
                label="Escribe el email de tu amigo"
                name="email"
                placeholder="nombre@correoamigo.com"
                validation={{
                  required: true,
                }}
                apiValidation={validateEmail}
              />
              <div className="btn-modal-wrapper">
                <Button type="submit">Invitar a mi amigo</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Modal>
  );
};

const FriendInfoModal = ({ setOpenFriendModal, setFriendCodeModal }) => {
  return (
    <Modal closeAction={() => setOpenFriendModal(false)} type="claim">
      <div className="friend-modal-wrapper">
        <div className="image-modal-wrapper">
          <FacesImage />
        </div>

        <div>
          <SCTextM color="black">
            Únete a nuestro PLAN AMIGO y sigue ahorrando en la factura de la
            luz. Es muy fácil, sólo tienes que seguir estos pasos:
          </SCTextM>
          <SCTextM color="black">
            1. Invita a tus amigos a unirse a Próxima Energía.
          </SCTextM>
          <SCTextM color="black">
            2. Cuando den de alta su contrato, recuérdales que deberán
            introducir el Código Amigo que te hemos asignado.
          </SCTextM>
          <SCTextM color="black">
            3. Tú y tus amigos recibiréis directamente vuestro descuento de 5€
            en vuestra próxima factura. Cuantos más amigos, más ahorro.
          </SCTextM>
          <SCTextM color="black">
            Encuentra tu código amigo accediendo a tu área de cliente con tu
            usuario y contraseña bajo la pestaña PLAN AMIGO.
          </SCTextM>
          <SCTextM color="black"></SCTextM>
          <SCTextM color="black"></SCTextM>
        </div>

        <div className="btn-modal-wrapper">
          <Button
            onClick={() => {
              setOpenFriendModal(false);
              setFriendCodeModal(true);
            }}
          >
            Invitar a mi amigo
          </Button>
        </div>

        <div>
          <SCTextXSLight color="black">
            La empresa GEOATLANTER S.L. con domicilio social AVDA EUROPA 34B,
            Localidad POZUELO DE ALARCÓN, Provincia: MADRID y provista de CIF
            B85021426 , realizará esta promoción a través de su marca registrada
            “PRÓXIMA ENERGÍA” que se llevará a cabo desde el día 20 de Mayo de
            2019, dirigido a todos aquellos clientes actuales de PRÓXIMA ENERGÍA
            (en adelante “Participante” o “Participantes”, indistintamente),
            residentes en territorio español, que inviten a sus familiares y
            amigos (en adelante “Invitado” o “Invitados”, indistintamente) a
            contratar un nuevo alta con PRÓXIMA ENERGÍA. La presente promoción
            se llevará a cabo entre aquellas contrataciones realizadas de
            conformidad con lo establecido en las presentes bases legales de la
            siguiente manera:{" "}
          </SCTextXSLight>
          <SCTextXSLight color="black">
            Participarán todas las contrataciones que se hayan realizado a
            partir del 20 de mayo de 2019 (GEOATLANTER S.L. se reserva el
            derecho a establecer la fecha de fin de campaña cuando lo considere
            oportuno) Cada participante tendrá un código promocional por cada
            uno de sus contratos en vigor pudiendo disponer de diferentes saldos
            promocionales no acumulables entre ellos. Los participantes podrán
            invitar a un número ilimitado de familiares o amigos Por cada
            invitado que complete su contratación con “Próxima Energía” el
            participante y el invitado recibirán 5€ de descuento cada uno que se
            añadirán al saldo promocional de sus respectivos contratos. El saldo
            promocional será descontado de las facturas que se emitan para el
            contrato asociado hasta agotar saldo o fin de la promoción.En caso
            de que el saldo a descontar de una factura fuera superior a la base
            imponible del IVA de ésta, se limitará el saldo a descontar al valor
            de la base imponible y el saldo a descontar restante pasará a
            descontarse en las siguientes facturas. Los códigos promocionales y
            el saldo pendiente podrán ser consultados a través de la web de
            “´Próxima Energía” en el área cliente del participante e invitado.
            Los Invitados podrán participar un número ilimitado de veces en la
            Promoción siempre y cuando la tramitación del nuevo contrato con
            Próxima Energia se haya completado. No se aplicará la promoción en
            nuevas altas de invitados que tengan contratos en estado de
            tramitación.
          </SCTextXSLight>

          <SCTextXSLight color="black">
            En el caso de que se detectasen duplicidades, identidades falsas o
            anomalías en la participación, el Participante y el Invitado serán
            eliminados de la promoción.
          </SCTextXSLight>
        </div>
      </div>
    </Modal>
  );
};

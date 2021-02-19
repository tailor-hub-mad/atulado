import React, { useState, useEffect } from "react";
import { findIndex, find, isEmpty } from "lodash";

import { SCGlobal } from "./Global.styled";
import { Navbar } from "../../molecules/Navbar/Navbar.molecule";
import { TabBar } from "../../molecules/TabBar/TabBar.molecule";
import { InvoiceModule } from "../../organisms/GlobalModule/Invoice/InvoiceModule.organism";
import { HomeModule } from "../../organisms/GlobalModule/Home/HomeModule.organism";
import { ContractModule } from "../../organisms/GlobalModule/Contract/ContractModule.organism";
import { ManagementModule } from "../../organisms/GlobalModule/Management/ManagementModule.organism";
import { ProfileModule } from "../../organisms/GlobalModule/Profile/ProfileModule.organism";
import { ClientModule } from "../../organisms/GlobalModule/Client/ClientModule.organism";
import { FriendModule } from "../../organisms/GlobalModule/Friend/FriendModule.organism";
import { InvoiceDetailModule } from "../../organisms/GlobalModule/InvoiceDetail/InvoiceDetailModule.organism";
import { AddUserModule } from "../../organisms/GlobalModule/AddUser/AddUserModule.organism";
import { ContractDetailModule } from "../../organisms/GlobalModule/ContractDetail/ContractDetailModule.organism";
import { ClientDetailModule } from "../../organisms/GlobalModule/ClientDetail/ClientDetailModule.organism";
import DownloadScreen from "../../molecules/DownloadScreen/DownloadScreen.molecule";
import { ClaimInvoceModal } from "../../organisms/Modal/ClaimInvoiceModal/ClaimInvoiceModal.organasim";
import { InfoModal } from "../../organisms/Modal/InfoModal/InfoModal.organism";

import { WHATSAPP_PHONE } from "../../../utils/constants";

import WhatsAppImage from "../../../public/image/whatsapp.svg";

import { getContractsByAccount } from "../../../lib/api/contract";
import { useAuth } from "../../../context";

export default function GlobalTemplate() {
  const [optionList, setOptionList] = useState();
  const [contractData, setContractData] = useState();
  const [optionsModule, setOptionsModule] = useState({});
  const [openDownloadScreen, setOpenDownloadScreen] = useState({
    error: false,
    open: false,
  });
  const [openInfoModal, setOpenInfoModal] = useState({
    open: false,
    message: "",
  });
  const [openClaimInvoiceModal, setOpenClaimInvoiceModal] = useState({
    open: false,
    info: {
      contract: null,
      invoice: null,
    },
  });

  const { user } = useAuth();

  const handleModule = () => {
    const module = find(optionList, (element) => element.active);

    if (!module)
      return (
        <HomeModule
          user={user}
          contracts={contractData}
          optionsList={handleActionOptionList}
        />
      );

    switch (module.name) {
      case "profile":
        return (
          <ProfileModule
            user={user}
            setOpenInfoModal={setOpenInfoModal}
            openInfoModal={openInfoModal}
          />
        );
      case "client":
        if (isEmpty(optionsModule)) {
          return (
            <ClientModule user={user} optionsList={handleActionOptionList} />
          );
        } else {
          const { addUser, clientDetail, clientData } = optionsModule;

          if (addUser) {
            return (
              <AddUserModule
                clientData={clientData}
                user={user}
                optionsList={handleActionOptionList}
              />
            );
          }
          if (clientDetail) {
            return (
              <ClientDetailModule
                user={user}
                optionsList={handleActionOptionList}
                clientDetail={clientDetail}
                clientData={clientData}
                setOpenDownloadScreen={setOpenDownloadScreen}
                setOpenClaimInvoiceModal={setOpenClaimInvoiceModal}
                openClaimInvoiceModal={openClaimInvoiceModal}
              />
            );
          }
        }

      case "friend":
        return <FriendModule />;
      case "contract":
        if (isEmpty(optionsModule)) {
          return (
            <ContractModule
              user={user}
              contracts={contractData}
              optionsList={handleActionOptionList}
              setOpenDownloadScreen={setOpenDownloadScreen}
            />
          );
        } else {
          return (
            <ContractDetailModule
              user={user}
              options={optionsModule}
              optionsList={handleActionOptionList}
              setOpenDownloadScreen={setOpenDownloadScreen}
              setOpenInfoModal={setOpenInfoModal}
              openInfoModal={openInfoModal}
              setOpenClaimInvoiceModal={setOpenClaimInvoiceModal}
              openClaimInvoiceModal={openClaimInvoiceModal}
            />
          );
        }

      case "invoice":
        if (isEmpty(optionsModule)) {
          return (
            <InvoiceModule
              user={user}
              contracts={contractData}
              optionsList={handleActionOptionList}
              setOpenDownloadScreen={setOpenDownloadScreen}
              setOpenClaimInvoiceModal={setOpenClaimInvoiceModal}
              openClaimInvoiceModal={openClaimInvoiceModal}
            />
          );
        } else {
          return (
            <InvoiceDetailModule
              user={user}
              options={optionsModule}
              optionsList={handleActionOptionList}
              setOpenDownloadScreen={setOpenDownloadScreen}
              setOpenClaimInvoiceModal={setOpenClaimInvoiceModal}
              openClaimInvoiceModal={openClaimInvoiceModal}
            />
          );
        }

      case "home":
        console.log(optionsModule);
        if (isEmpty(optionsModule)) {
          return (
            <HomeModule
              user={user}
              contracts={contractData}
              optionsList={handleActionOptionList}
            />
          );
        } else {
          return (
            <ManagementModule
              user={user}
              optionsList={handleActionOptionList}
              options={optionsModule}
              setOpenInfoModal={setOpenInfoModal}
            />
          );
        }

      default:
        return (
          <HomeModule
            user={user}
            contracts={contractData}
            optionsList={handleActionOptionList}
          />
        );
    }
  };

  const handleActionOptionList = (name, options) => {
    const newOptionList = Object.keys(optionList).map((element) => {
      optionList[element].active = false;

      return optionList[element];
    });

    const index = findIndex(newOptionList, { name });
    const module = find(optionList, (element) => element.name == name);
    module.active = true;

    newOptionList.splice(index, 1, module);

    setOptionList(newOptionList);

    if (options) {
      setOptionsModule(options);
    } else {
      setOptionsModule({});
    }
  };

  const generateOptionList = () => {
    switch (user.roleCode) {
      case 1:
        return [
          { name: "client", value: "Clientes", active: true, visible: true },
          {
            name: "friend",
            value: "Campaña amigo",
            active: false,
            visible: true,
          },
          { name: "profile", value: "Mis datos", active: false, visible: true },
          { name: "contract", visible: false },
          { name: "invoice", visible: false },
          { name: "home", visible: false },
        ];

      case 2:
        return [
          { name: "home", value: "Gestiones", active: true, visible: true },
          {
            name: "contract",
            value: "Contratos",
            active: false,
            visible: true,
          },
          { name: "invoice", value: "Facturas", active: false, visible: true },
          { name: "profile", value: "Mis datos", active: false, visible: true },
        ];
      default:
        return [
          { name: "home", value: "Home", active: true, visible: true },
          {
            name: "contract",
            value: "Contratos",
            active: false,
            visible: true,
          },
          { name: "invoice", value: "Facturas", active: false, visible: true },
          { name: "profile", value: "Mis datos", active: false, visible: true },
        ];
    }
  };

  const getContracts = async () => {
    const { data } = await getContractsByAccount(user.roleCode, user.UserId);
    setContractData(data.Contracts);
  };

  useEffect(() => {
    if (!user) return;

    setOptionList(generateOptionList());

    if (user.roleCode == 1) return;

    getContracts();
  }, [user]);

  useEffect(() => {
    if (openDownloadScreen.error) {
      setTimeout(() => {
        setOpenDownloadScreen({
          error: false,
          open: false,
        });
      }, 5000);
    }
  }, [openDownloadScreen.error]);
  return (
    <>
      {openClaimInvoiceModal.open && (
        <ClaimInvoceModal
          setOpenClaimInvoiceModal={setOpenClaimInvoiceModal}
          openClaimInvoiceModal={openClaimInvoiceModal}
          setOpenInfoModal={setOpenInfoModal}
          openInfoModal={openInfoModal}
        />
      )}
      {openInfoModal.open && (
        <InfoModal
          setOpenInfoModal={setOpenInfoModal}
          openInfoModal={openInfoModal}
        />
      )}
      {openDownloadScreen.open && (
        <DownloadScreen error={openDownloadScreen.error} />
      )}
      <SCGlobal>
        <div className="whatsapp-image">
          <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank">
            <WhatsAppImage />
          </a>
        </div>
        <Navbar optionList={optionList} action={handleActionOptionList} />

        <div className="tabbar-wrapper">
          <TabBar
            optionList={optionList}
            action={handleActionOptionList}
            user={user}
          />
        </div>
        <div className="main-wrapper">{handleModule()}</div>
      </SCGlobal>
    </>
  );
}

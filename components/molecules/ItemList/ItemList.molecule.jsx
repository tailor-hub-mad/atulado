import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import FileDownload from "js-file-download";

import { SCItemContractList, SCItemInvoiceList } from "./ItemList.styled";
import MenuIcon from "../../../public/icon/menu_icon.svg";
import { ButtonIcon } from "../../atoms/ButtonIcon/ButtonIcon.atom";
import { SCTextSLight } from "../../atoms/Text/TextS.styled";
import { OptionList } from "../../atoms/OptionList/OptionList.atom";
import useClickOutside from "../../../hooks/useClickOutside";

import { downloadContractById } from "../../../lib/api/contract";
import {
  downloadInvoiceById,
  downloadInvoiceDetailById,
} from "../../../lib/api/invoice";

import { useAuth } from "../../../context";

const withItemList = (Component) => ({
  data = {},
  action,
  actionCheck,
  withOutCheck,
  optionsMenu,
  setOpenDownloadScreen,
  checked = false,
  disabled = false,
  type = "contract",
  setOpenClaimInvoiceModal,
  openClaimInvoiceModal,
  setOpenIbanModal,
  setOpenAddressModal,
  setOpenUnsubscriptionModal,
  admin = false
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const [state, setState] = useState(checked);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOnClickAction = () => {
    if (action) {
      action();
    }
  };

  const handleOnClickActionCheck = () => {
    const newState = !state;
    setState(newState);

    if (actionCheck) {
      actionCheck(newState);
    }
  };

  const handleActionMenu = () => {
    const newOpenMenu = !openMenu;
    setOpenMenu(newOpenMenu);
  };

  const handleOnClickClaimInvoice = (contractID, invoiceID) => {
    const newOpenClaimInvoiceModal = { ...openClaimInvoiceModal };
    newOpenClaimInvoiceModal["open"] = true;
    newOpenClaimInvoiceModal["info"] = {
      contract: contractID,
      invoice: invoiceID,
    };
    setOpenClaimInvoiceModal(newOpenClaimInvoiceModal);
  };

  const downloadContract = async (contractID, invoiceID) => {
    setOpenDownloadScreen({
      error: false,
      open: true,
    });
    await downloadContractById(
      user.roleCode,
      user.UserId,
      contractID,
      invoiceID
    ).then((response) => {
      if (response.data) {
        const buf = Buffer.from(response.data.Content, "base64");
        FileDownload(buf, response.data.FileName);

        setOpenDownloadScreen({
          error: false,
          open: false,
        });
      }
      if (response?.error) {
        setOpenDownloadScreen({
          error: true,
          open: true,
        });
      }
    });
  };

  const downloadInvoice = async (contractID, invoiceID) => {
    setOpenDownloadScreen({
      error: false,
      open: true,
    });
    await downloadInvoiceById(
      user.roleCode,
      user.UserId,
      contractID,
      invoiceID
    ).then((response) => {
      if (response.data) {
        const buf = Buffer.from(response.data.Content, "base64");
        FileDownload(buf, response.data.FileName);

        setOpenDownloadScreen({
          error: false,
          open: false,
        });
      }
      if (response?.error) {
        setOpenDownloadScreen({
          error: true,
          open: true,
        });
      }
    });
  };

  const downloadDeatilInvoice = async (contractID, invoiceID) => {
    setOpenDownloadScreen({
      error: false,
      open: true,
    });
    await downloadInvoiceDetailById(
      user.roleCode,
      user.UserId,
      contractID,
      invoiceID
    ).then((response) => {
      if (response.data) {
        const buf = Buffer.from(response.data.Content, "base64");
        FileDownload(buf, response.data.FileName);

        setOpenDownloadScreen({
          error: false,
          open: false,
        });
      }
      if (response?.error) {
        setOpenDownloadScreen({
          error: true,
          open: true,
        });
      }
    });
  };

  const handleSelectedOption = (_, index) => {
    const { ContractCode: contractID, Id: invoiceID, RateId } = data;
    switch (index) {
      case 0:
        if (type == "contract") {
          setOpenMenu(false);
          setOpenIbanModal({ open: true, contractId: contractID });
          break;
        } else {
          setOpenMenu(false);
          handleOnClickClaimInvoice(contractID, invoiceID);
          break;
        }
      case 1:
        if (type == "contract") {
          setOpenMenu(false);
          setOpenAddressModal({ open: true, contractId: contractID });
          break;
        } else {
          setOpenMenu(false);
          downloadDeatilInvoice(contractID, invoiceID);
          break;
        }
      case 2:
        if (type == "contract" && !admin) {
          setOpenMenu(false);
          setOpenUnsubscriptionModal({ open: true, contractId: contractID });
          break;
        } else {
          // setOpenMenu(false);
          // downloadInvoice(contractID, invoiceID);
          break;
        }
      case 3:
        return router.push(
          `/alta?rateId=${RateId}&refWindow=3&updateContract=true&contractCode=${contractID}`
        );
      case 4:
        return router.push(
          `/alta?rateId=${RateId}&refWindow=1&updateContract=true&contractCode=${contractID}`
        );

      case 5:
        setOpenMenu(false);
        downloadContract(contractID);
        break;

      default:
        return;
    }
  };

  const iconRef = useRef();

  useClickOutside(iconRef, () => setOpenMenu(false));

  useEffect(() => {
    if (state !== checked) {
      const newState = !state;
      setState(newState);
    }
  }, [checked]);

  return (
    <Component checked={state} disabled={disabled}>
      {withOutCheck || (
        <div className="round-wrapper" onClick={handleOnClickActionCheck}>
          <div className="checked" />
        </div>
      )}

      <div className="content-wrapper">
        {Object.keys(data).map((element, index) => {
          if (element != "RateId") {
            return (
              <div
                key={index}
                className="item-content-wrapper"
                onClick={handleOnClickAction}
              >
                <SCTextSLight color="black">
                  {data[element] || "-"}
                </SCTextSLight>
              </div>
            );
          }
        })}
        <div className="menu-wrapper" ref={iconRef}>
          <ButtonIcon withoutTag action={handleActionMenu} icon={<MenuIcon />}>
            Opciones
          </ButtonIcon>
          <div className="option-list-wrapper">
            {openMenu && (
              <OptionList options={optionsMenu} action={handleSelectedOption} />
            )}
          </div>
        </div>
      </div>
    </Component>
  );
};

export const ItemContractList = withItemList(SCItemContractList);

export const ItmeInvoiceList = withItemList(SCItemInvoiceList);

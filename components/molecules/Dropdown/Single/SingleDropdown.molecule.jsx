import React, { useRef, useState } from "react";
import {
  SCSingleDropdown,
  SCSingleDropdownFilterManagement,
} from "./SingleDropdown.styled";
import { useForm } from "react-hook-form";
import { OptionList } from "../../../atoms/OptionList/OptionList.atom";
import { hasError, generateErrorMessage } from "../../../../utils/forms";
import useClickOutside from "../../../../hooks/useClickOutside";
import DropdownIcon from "../../../../public/icon/dropdown_icon.svg";
import { isEmpty } from "lodash";
import { SCTextSLight } from "../../../atoms/Text/TextS.styled";

export const SingleDropdown = ({
  label,
  name,
  options = [],
  apiValidation,
  additionalErrors,
  placeholder = "Selecciona una opción",
  validation = {},
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  const { register, errors, getValues, setError, setValue } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const handleOpenOptionList = () => {
    setOpen(!open);
  };

  const handleSelectedOption = (selected) => {
    setValue(name, selected, { shouldValidate: true });
    setOpen(false);
  };

  const handleOnBlur = async () => {
    if (!apiValidation) return;

    const response = await apiValidation(getValues(name));

    if (response?.error) {
      setError(name, {
        type: response.error.type,
      });
    }
  };

  const inputRef = useRef();

  useClickOutside(inputRef, () => setOpen(false));

  return (
    <div ref={inputRef}>
      <SCSingleDropdown
        disabled={disabled}
        error={additionalErrors?.message || hasError(errors, name)}
        open={open}
        onClick={() => handleOpenOptionList()}
      >
        <label htmlFor={name}>{label}</label>

        <div className="selector-wrapper">
          <DropdownIcon />
        </div>

        <input
          name={name}
          readOnly="readonly"
          placeholder={placeholder}
          ref={register(validation)}
          onBlur={() => handleOnBlur()}
        />

        {additionalErrors?.message && (
          <div className="error-wrapper">{additionalErrors.message}</div>
        )}

        {(!additionalErrors?.message && isEmpty(errors)) || open || (
          <div className="error-wrapper">
            {generateErrorMessage(errors[name]?.type)}
          </div>
        )}

        {open && <OptionList options={options} action={handleSelectedOption} />}
      </SCSingleDropdown>
    </div>
  );
};

export const SingleDropdownFilterManagement = ({
  options = [],
  disabled = false,
  action,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Estado");

  const handleOpenOptionList = () => {
    setOpen(!open);
  };

  const handleSelectedOption = (selected) => {
    setValue(selected);
    action(selected);
    setOpen(false);
  };

  const inputRef = useRef();

  useClickOutside(inputRef, () => setOpen(false));

  return (
    <div ref={inputRef}>
      <SCSingleDropdownFilterManagement
        disabled={disabled}
        active={value != "Estado"}
        open={open}
        onClick={() => handleOpenOptionList()}
      >
        <div className="selector-wrapper">
          <DropdownIcon />
        </div>

        <div className="text-wrapper ">
          <SCTextSLight>{value}</SCTextSLight>
        </div>

        {open && <OptionList options={options} action={handleSelectedOption} />}
      </SCSingleDropdownFilterManagement>
    </div>
  );
};

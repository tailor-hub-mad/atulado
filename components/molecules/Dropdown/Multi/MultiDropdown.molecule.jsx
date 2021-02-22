import React, { useRef, useState, useEffect } from "react";
import { SCMultiDropdown, SCInputMultiDropdown } from "./MultiDropdown.styled";
import { useForm } from "react-hook-form";
import { OptionList } from "../../../atoms/OptionList/OptionList.atom";
import { hasError, generateErrorMessage } from "../../../../utils/forms";
import useClickOutside from "../../../../hooks/useClickOutside";
import DropdownIcon from "../../../../public/icon/dropdown_icon.svg";
import { isEmpty } from "lodash";

export const MultiDropdown = ({
  label,
  options = [],
  apiValidation,
  additionalErrors,
  placeholder = "---",
  validation = {},
  disabled = false,
  ...props
}) => {
  const [openState, setOpenState] = useState({});
  // const [refs] = useState(
  //   new Array(options.length).fill(0).reduce((acc, _, i) => {
  //     acc[i] = React.createRef();
  //     return acc;
  //   }, {})
  // );

  useEffect(() => {
    const newOpenState = { ...openState };
    options.map((element) => (newOpenState[element.name] = false));
    setOpenState(newOpenState);
  }, []);

  const { register, errors, getValues, setError, setValue } = useForm({
    mode: "onChange",
    shouldFocusError: true,
  });

  const handleEventOpenedOptionList = (name) => {
    const newOpenState = { ...openState };
    newOpenState[name] = !openState[name];
    setOpenState(newOpenState);
  };

  const handleCloseOptionList = (name) => {
    const newOpenState = { ...openState };
    newOpenState[name] = false;
    setOpenState(newOpenState);
  };

  const handleSelectedOption = (name, selected) => {
    setValue(name, selected, { shouldValidate: true });
  };

  const handleOnBlur = async (name) => {
    if (!apiValidation) return;

    const response = await apiValidation(getValues(name));

    if (response?.error) {
      setError(name, {
        type: response.error.type,
      });
    }
  };

  const inputRef = useRef();

  useClickOutside(inputRef, () => {
    const newOpenState = { ...openState };
    options.map((element) => (newOpenState[element.name] = false));
    setOpenState(newOpenState);
  });

  return (
    <div ref={inputRef}>
      <SCMultiDropdown
        disabled={disabled}
        error={
          additionalErrors?.message ||
          options.some((element) => hasError(errors, element.name))
        }
      >
        <div className="input-wrapper">
          {options.map((element, index) => {
            return (
              <SCInputMultiDropdown
                key={index}
                open={openState[element.name]}
                disabled={disabled}
                active={getValues(element.name)}
                error={
                  additionalErrors?.message ||
                  options.some((element) => hasError(errors, element.name))
                }
                onClick={() => handleEventOpenedOptionList(element.name)}
              >
                <div className="selector-wrapper">
                  <DropdownIcon />
                </div>
                <input
                  name={element.name}
                  placeholder={placeholder}
                  ref={register({
                    ...validation,
                    validate: async (value) => {
                      const { setValue } = props;
                      if (setValue) {
                        setValue(index, value);
                      }
                    },
                  })}
                  onBlur={() => handleOnBlur(element.name)}
                  onChange={() => handleCloseOptionList(element.name)}
                />

                {openState[element.name] && (
                  <div className="option-list-wrapper">
                    <OptionList
                      options={element.values}
                      action={(selected) =>
                        handleSelectedOption(element.name, selected)
                      }
                    />
                  </div>
                )}
              </SCInputMultiDropdown>
            );
          })}
        </div>

        {additionalErrors?.message && (
          <div className="error-wrapper">{additionalErrors.message}</div>
        )}

        {!additionalErrors?.message && !isEmpty(errors) && (
          <div className="error-wrapper">
            {generateErrorMessage({
              ...errors[Object.keys(errors)[0]],
              message:
                options.length > 1
                  ? "Se deben seleccionar todas las opciones"
                  : "",
            })}
          </div>
        )}
        <label htmlFor={name}>{label}</label>
      </SCMultiDropdown>
    </div>
  );
};

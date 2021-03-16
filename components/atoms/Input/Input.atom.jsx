import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SCInputText, SCInputPassword } from "./Input.styled";
import { hasError, generateErrorMessage } from "../../../utils/forms";
import { isEmpty } from "lodash";
import { validateNIF } from "../../../lib/api/validators";

export const InputText = React.forwardRef(
  (
    {
      label = "",
      name,
      apiValidation,
      additionalErrors,
      setValidatedInput,
      setHasFormErros,
      hasFormErrors,
      type = "text",
      defaultValue = "",
      placeholder = "",
      validation = {},
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { register, errors, getValues, setError } = useFormContext();

    const handleOnBlur = async () => {
      const inputValue = getValues(name);

      if (!apiValidation || isEmpty(inputValue)) return;

      const { error } = await apiValidation(getValues(name));
      if (error) {
        if (setValidatedInput) setValidatedInput(false);
        if (setHasFormErros) {
          if (apiValidation.name == "validateNIF") {
            setHasFormErros({ ...hasFormErrors, dni: true });
          } else if (apiValidation.name == "validateEmail") {
            setHasFormErros({ ...hasFormErrors, email: true });
          }
        }

        return setError(name, {
          type: "api_validation",
          message: error,
        });
      }
      if (setValidatedInput) setValidatedInput(true);
      if (setHasFormErros) {
        if (apiValidation.name == "validateNIF") {
          setHasFormErros({ ...hasFormErrors, dni: false });
        } else if (apiValidation.name == "validateEmail") {
          setHasFormErros({ ...hasFormErrors, email: false });
        }
      }
    };

    return (
      <SCInputText
        disabled={disabled}
        error={additionalErrors || hasError(errors, name)}
        {...props}
      >
        <label htmlFor={name}>{label}</label>

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onBlur={() => handleOnBlur()}
          ref={register(validation)}
        />

        {additionalErrors?.message ||
          (errors[name]?.type && (
            <div className="error-wrapper">
              {generateErrorMessage(errors[name])}
            </div>
          ))}
      </SCInputText>
    );
  }
);

export const InputPassword = React.forwardRef(
  (
    {
      label,
      name,
      apiValidation,
      defaultValue = "",
      validation = {},
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { register, errors, getValues, setError } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);

    const handleOnBlur = async () => {
      if (!apiValidation) return;

      const inputValue = getValues(name);

      if (!isEmpty(inputValue)) {
        const { error } = await apiValidation(getValues(name));

        if (error) {
          setError(name, {
            type: "api_validation",
            message: error,
          });
        }
      }
    };

    return (
      <SCInputPassword
        disabled={disabled}
        error={hasError(errors, name)}
        {...props}
      >
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          defaultValue={defaultValue}
          ref={register(validation)}
          onBlur={() => handleOnBlur()}
        />
        <div
          className="show-password-wrapper"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Ocultar" : "Ver"}
        </div>
        {isEmpty(errors) || (
          <div className="error-wrapper">
            {generateErrorMessage(errors[name])}
          </div>
        )}
      </SCInputPassword>
    );
  }
);

export const InputTextArea = React.forwardRef(
  ({ label = "", name, disabled = false, validation, ...props }, ref) => {
    const { register, errors } = useFormContext();

    return (
      <SCInputText
        disabled={disabled}
        error={hasError(errors, name)}
        {...props}
      >
        <label htmlFor={name}>{label}</label>

        <textarea name={name} ref={register(validation)} />

        {errors[name]?.type && (
          <div className="error-wrapper">
            {generateErrorMessage(errors[name])}
          </div>
        )}
      </SCInputText>
    );
  }
);

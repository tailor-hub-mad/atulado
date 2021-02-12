import React, { useState, useRef } from "react";
import { SCButtonFile } from "./ButtonFile.styled";
import { SCTextXSLight } from "../Text/TextXS.styled";
import { SCTextSLight } from "../Text/TextS.styled";

export const ButtonFile = ({
  children,
  action,
  color,
  disabled = false,
  checked = false,
}) => {
  const [state, setState] = useState(checked);
  const [filename, setFilename] = useState();

  const fileInput = React.useRef(null);

  const handleOnClickButton = () => {
    if (!state) {
      fileInput.current.click();
    }
  };

  const handleOnClickRemoveFile = () => {
    setFilename();
    setState(false);
  };

  const handleOnChange = (event) => {
    if (event?.target?.files) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.readAsBinaryString(file);

      reader.onload = function () {
        action({
          name: file.name,
          type: file.type,
          content: btoa(reader.result),
        });
      };

      setState(true);
      setFilename(file.name);
    }
  };

  return (
    <>
      <SCButtonFile
        color={color}
        disabled={disabled}
        checked={state}
        onClick={() => handleOnClickButton()}
        type="button"
      >
        <div className="button-wrapper">
          <input
            type="file"
            className="inputfile"
            ref={fileInput}
            onChange={(e) => handleOnChange(e)}
          />
          {filename ? (
            <SCTextSLight>
              <span>Archivo adjuntado</span>{" "}
              <span
                className="close-span"
                color="white"
                onClick={() => handleOnClickRemoveFile()}
              >
                X
              </span>
            </SCTextSLight>
          ) : (
            children
          )}
        </div>
        <div className="attach-name-wrapper">
          {filename && <SCTextXSLight color={color}>{filename}</SCTextXSLight>}
        </div>
      </SCButtonFile>
    </>
  );
};

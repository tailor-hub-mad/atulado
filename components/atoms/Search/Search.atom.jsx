import React, { useState, useRef, useLayoutEffect } from "react";
import { SCTag } from "../Tag/Tag.styled";
import { SCSearch } from "./Search.styled";
import useClickOutside from "../../../hooks/useClickOutside";

import SearchIcon from "../../../public/icon/search_icon.svg";

export const Search = ({ action, defaultValue, disabled = false }) => {
  const [state, setState] = useState(defaultValue ? true : false);
  const [value, setValue] = useState("");

  const inputRef = useRef();

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [state]);

  useClickOutside(inputRef, () => {
    if (value == "") {
      setState(false);
    }
  });

  const handleOnClick = () => {
    if (!state) {
      setState(true);
    }
  };

  const handleOnChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    action(newValue);
  };

  return (
    <SCSearch
      checked={state}
      disabled={disabled}
      onClick={() => handleOnClick()}
    >
      {state && (
        <input
          name="search"
          type="text"
          defaultValue={defaultValue}
          ref={inputRef}
          onChange={(event) => handleOnChange(event)}
        />
      )}
      <SearchIcon />
      {state || <SCTag className="tag-wrapper">Buscar</SCTag>}
    </SCSearch>
  );
};

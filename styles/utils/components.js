import styled, { css } from "styled-components";
import { hiddenInput } from "./mixins";

export const SCHiddenInput = styled.input`
  ${hiddenInput}
  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}
`;

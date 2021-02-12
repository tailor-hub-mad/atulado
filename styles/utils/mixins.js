import { css } from 'styled-components';

// UTILIDADES DE STYLED-COMPONENTS
export const centered = (direction="row") => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: center;
  align-items: center;
`;

export const separate = direction => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: space-between;
  align-items: center;
`;

export const hiddenInput = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
`;

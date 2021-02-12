import styled from "styled-components";

export const SCSpinner = styled.div`
  border: ${({ theme }) => `3px solid ${theme.color.primary}`};
  border-top: ${({ theme }) => `3px solid ${theme.color.white}`};
  border-radius: 50%;
  width: ${({ theme }) => theme.spaces.s.desktopSize};
  height: ${({ theme }) => theme.spaces.s.desktopSize};
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

import styled from "styled-components";

export const SCOptionList = styled.div`
  position: absolute;
  left: 0;

  width: 100%;
  max-height: 40vh;

  overflow: hidden;
  overflow-y: auto;

  border-radius: 4px;

  z-index: 5;

  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);

  text-align: start;

  div {
    cursor: pointer;

    padding: 12px 20px;

    &:first-child {
      margin-top: 4px;
    }

    &:hover {
      p {
        color: ${({ theme }) => theme.color.white};
      }

      background: ${({ theme }) => theme.color.primary};
    }
  }
`;

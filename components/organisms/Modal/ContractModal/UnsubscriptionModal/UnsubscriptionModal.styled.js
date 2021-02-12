import styled from "styled-components";

export const SCUnsubscriptionModal = styled.div`
  .title-modal-wrapper {
    text-align: center;

    margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};
  }

  .button-modal-wrapper {
    display: grid;
    column-gap: ${({ theme }) => theme.spaces.s.desktopSize};
    grid-template-columns: 1fr 1fr;

    margin-top: ${({ theme }) => theme.spaces.m.desktopSize};

    .button-white {
      background-color: ${({ theme }) => theme.color.white};
      color: ${({ theme }) => theme.color.primary};
      border: ${({ theme }) => `1px solid ${theme.color.primary}`};
    }
  }
`;

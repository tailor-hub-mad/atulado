import styled from "styled-components";

export const SCAddressModal = styled.div`
  .title-modal-wrapper {
    text-align: center;

    margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};
  }

  .button-modal-wrapper {
    display: felx;
    justify-content: center;

    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
  }
`;

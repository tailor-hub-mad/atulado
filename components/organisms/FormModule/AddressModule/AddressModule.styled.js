import styled from "styled-components";

export const SCAddressModule = styled.div`
  .row-1 {
    & > * {
      margin-top: ${({ theme }) => theme.spaces.xs.mobileSize};
    }
    .row-1-mobile {
      display: grid;
      grid-template-columns: 1fr;
    }

    .row-2-mobile {
      display: grid;
      column-gap: ${({ theme }) => theme.spaces.xs.mobileSize};
      grid-template-columns: 1fr 1fr;
    }
  }

  .row-2 {
    & > * {
      margin-top: ${({ theme }) => theme.spaces.xs.mobileSize};
    }
    .row-2-mobile {
      display: grid;
      column-gap: ${({ theme }) => theme.spaces.xs.mobileSize};
      grid-template-columns: 2fr 1fr;
    }
  }

  .row-3 {
    margin-top: ${({ theme }) => theme.spaces.xs.mobileSize};

    display: grid;
    column-gap: ${({ theme }) => theme.spaces.xs.mobileSize};
    grid-template-columns: repeat(4, 1fr);
  }

  .address-error-wrapper {
    height: 10px;
    position: relative;
    bottom: 20px;
  }

  @media only screen and (min-width: 769px) {
    & > * {
      display: grid;
      column-gap: ${({ theme }) => theme.spaces.xs.mobileSize};

      &:not(:first-child) {
        margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
      }
    }

    .row-1 {
      & > * {
        margin-top: 0;
      }

      grid-template-columns: 3fr 1fr;

      .row-2-mobile {
        grid-template-columns: 1fr 2fr;
      }
    }

    .row-2 {
      & > * {
        margin-top: 0;
      }

      grid-template-columns: 1.6fr 5fr;
    }
  }
`;

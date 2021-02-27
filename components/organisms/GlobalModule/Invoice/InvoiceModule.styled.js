import styled from "styled-components";

export const SCInvoiceModule = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};

    .icons-wrapper {
      display: flex;
      align-items: center;

      & > * {
        &:not(:first-child) {
          margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }
    }
  }

  .invoice-wrapper {
    .select-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      margin: ${({ theme }) => `${theme.spaces.xs.desktopSize} 0`};

      & > * {
        margin: ${({ theme }) => `8px ${theme.spaces.xs.desktopSize}`};
      }
    }
  }

  .type-data-wrapper {
    display: none;
  }

  .contract-empty-wrapper {
    padding-top: ${({ theme }) => theme.spaces.s.desktopSize};
    text-align: center;
  }

  .list-contract-wrapper {
    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};

    & > * {
      &:not(:first-child) {
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
      }
    }

    .spinner-wrapper {
      display: flex;
      justify-content: center;

      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }
  }

  @media only screen and (min-width: 769px) {
    .type-data-wrapper {
      display: grid;
      grid-template-columns: 0.4fr 0.5fr 1fr 0.5fr 0.5fr 1fr 0.5fr 0.5fr 0.4fr;

      padding-left: 46px;
      padding-right: 16px;
      column-gap: ${({ theme }) => theme.spaces.s.desktopSize};

      text-align: center;

      margin-top: ${({ theme }) => theme.spaces.l.desktopSize};
      margin-bottom: ${({ theme }) => theme.spaces.xs.desktopSize};
    }

    .list-contract-wrapper {
      margin-top: 0;
    }
  }
`;

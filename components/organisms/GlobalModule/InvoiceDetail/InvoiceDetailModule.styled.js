import styled from "styled-components";

export const SCInvoiceDetailModule = styled.div`
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

    .link {
      cursor: pointer;
    }

    .menu-wrapper {
      position: relative;

      .option-list-wrapper {
        width: 220px;
        position: absolute;
        top: 15px;
        left: -205px;
      }
    }
  }

  .error-message {
    text-align: center;
    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
  }

  .detail-wrapper {
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
    column-gap: ${({ theme }) => theme.spaces.m.desktopSize};
    align-self: stretch;

    margin-top: ${({ theme }) => theme.spaces.m.desktopSize};
    margin-bottom: ${({ theme }) => theme.spaces.l.desktopSize};
  }

  .claim-wrapper {
    margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
  }

  .download-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    margin-bottom: ${({ theme }) => theme.spaces.xs.desktopSize};

    & > * {
      &:not(:first-child) {
        margin-left: ${({ theme }) => theme.spaces.s.desktopSize};
      }
    }
  }
`;

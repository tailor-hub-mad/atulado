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
    display: block;

    & > * {
      margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
    }

    margin-bottom: ${({ theme }) => theme.spaces.l.mobileSize};
  }

  .claim-wrapper {
    display: flex;
    justify-content: center;

    margin-top: ${({ theme }) => theme.spaces.m.mobileSize};
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

  @media only screen and (min-width: 769px) {
    .detail-wrapper {
      display: grid;
      grid-template-rows: repeat(3, auto);
      grid-template-columns: repeat(3, auto);
      row-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      column-gap: ${({ theme }) => theme.spaces.m.desktopSize};
      align-self: stretch;

      margin-bottom: ${({ theme }) => theme.spaces.l.desktopSize};
      margin-top: ${({ theme }) => theme.spaces.m.desktopSize};
    }

    .claim-wrapper {
      display: block;
    }
  }
`;

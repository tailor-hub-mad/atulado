import styled from "styled-components";

export const SCProfileModule = styled.div`
  .data-wrapper {
    margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};

    .manager-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, auto);
      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      row-gap: ${({ theme }) => theme.spaces.s.desktopSize};

      width: 30vw;
    }

    .admin-wrapper {
      width: 30vw;

      & > * {
        display: grid;
        column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
        row-gap: ${({ theme }) => theme.spaces.s.desktopSize};
      }

      .admin-data-wrapper {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, auto);
      }

      .admin-email-wrapper {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, auto);

        & > * {
          &:first-child {
            margin-top: ${({ theme }) => theme.spaces.l.desktopSize};
            margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
          }
        }

        .button-wrapper {
          width: 120px;
        }
      }
    }

    .company-wrapper {
      display: grid;
      grid-template-columns: 2fr 2fr;
      grid-template-rows: repeat(5, auto);
      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      row-gap: ${({ theme }) => theme.spaces.s.desktopSize};

      width: 80%;
    }

    .client-wrapper {
      display: grid;
      grid-template-columns: 2fr 2fr;
      grid-template-rows: repeat(3, auto);
      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      row-gap: ${({ theme }) => theme.spaces.s.desktopSize};

      width: 80%;
    }

    .action-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};

      .info-message {
        width: 100%;
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
      }

      .selected-wrapper {
        & > * {
          &:not(:first-child) {
            margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};
          }
        }
      }
    }

    .title-contract-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

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

    .contract-wrapper {
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};

      .contract-empty-wrapper {
        padding-top: ${({ theme }) => theme.spaces.s.desktopSize};
        text-align: center;
      }

      .list-contract-wrapper {
        & > * {
          &:not(:first-child) {
            margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
          }
        }
      }
    }
  }
`;

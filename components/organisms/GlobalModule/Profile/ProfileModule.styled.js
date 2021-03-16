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
      grid-template-columns: 1fr;

      row-gap: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .client-wrapper {
      display: grid;
      grid-template-columns: 1fr;

      row-gap: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .action-wrapper {
      display: block;
      text-align: center;

      margin-top: ${({ theme }) => theme.spaces.l.mobileSize};
      margin-bottom: ${({ theme }) => theme.spaces.s.mobileSize};

      .info-message {
        width: 100%;
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
      }

      .selected-wrapper {
        display: flex;
        flex-direction: column;

        & > * {
          margin: ${({ theme }) => `0 ${theme.spaces.l.mobileSize}`};
          margin-top: ${({ theme }) => theme.spaces.s.mobileSize};

          &:first-child {
            margin-top: ${({ theme }) => theme.spaces.m.desktopSize};
          }
        }
      }
    }
  }

  @media only screen and (min-width: 769px) {
    .company-wrapper {
      display: grid;
      grid-template-columns: 2fr 2fr;

      width: 80%;
    }

    .client-wrapper {
      display: grid;
      grid-template-columns: 2fr 2fr;

      width: 80%;
    }

    .data-wrapper {
      .action-wrapper {
        /* display: flex; */
        justify-content: space-between;
        text-align: left;
        align-items: flex-start;
        margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
        .selected-wrapper {
          align-items: flex-start;
          & > * {
            margin-left: 0;
            &:not(:first-child) {
              /* margin-left: ${({ theme }) => theme.spaces.xs.desktopSize}; */
            }
          }
        }
      }
    }
  }
`;

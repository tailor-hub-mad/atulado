import styled from "styled-components";

export const SCHomeModule = styled.div`
  .pending-docs {
    text-align: center;
    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    margin-bottom: ${({ theme }) => theme.spaces.xl.desktopSize};
    button {
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }
  }

  .title-wrapper {
    display: block;
  }

  .management-section {
    display: block;

    margin-top: ${({ theme }) => theme.spaces.s.mobileSize};
    margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};

    .filter-management-wrapper {
      display: none;
    }

    .title-table-management {
      display: none;
    }

    .title-table-management-check {
      display: none;
    }

    .option-table-management {
      & > * {
        &:not(:first-child) {
          margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }

      .spinner-wrapper {
        display: flex;
        justify-content: center;
      }
    }

    .empty-management {
      text-align: center;
    }
  }

  .info-section {
    .invoices-wrapper {
      .title {
        margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
      }

      margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};
    }

    .barchart-wrapper {
      padding: ${({ theme }) => `0 ${theme.spaces.xs.desktopSize}`};
    }
  }

  .friend-modal-wrapper {
    .image-modal-wrapper {
      display: flex;
      justify-content: center;

      margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};
    }

    .btn-modal-wrapper {
      display: flex;
      justify-content: center;

      margin: ${({ theme }) => `${theme.spaces.m.desktopSize} 0`};
    }
  }

  .friend-code-modal-wrapper {
    .image-modal-wrapper {
      display: flex;
      justify-content: center;

      svg {
        width: 20%;
        height: 20%;
      }
    }

    .form-modal-wrapper {
      padding: ${({ theme }) => `0 ${theme.spaces.m.desktopSize}`};

      form {
        margin: ${({ theme }) => `${theme.spaces.s.desktopSize} 0`};

        & > * {
          :not(:first-child) {
            margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
          }
        }
      }
    }

    .btn-modal-wrapper {
      display: flex;
      justify-content: center;
      margin: 0;
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }
  }

  @media only screen and (min-width: 769px) {
    .management-section {
      display: block;

      margin: ${({ theme }) => `${theme.spaces.l.desktopSize} 0`};

      .filter-management-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        column-gap: ${({ theme }) => theme.spaces.s.desktopSize};
        align-items: end;

        margin: ${({ theme }) => `0 ${theme.spaces.s.desktopSize}`};
        margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};

        button {
          height: 30px;
        }
      }

      .title-table-management {
        display: grid;
        grid-template-columns: 1fr 0.8fr 0.5fr 1.7fr 0.4fr 0.4fr;
        column-gap: ${({ theme }) => theme.spaces.s.desktopSize};
        padding-right: 140px;
        padding-left: 32px;

        text-align: center;
        margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
      }

      .title-table-management-check {
        display: grid;
        grid-template-columns: 1fr 0.6fr 0.5fr 1.7fr 0.4fr 0.4fr;
        column-gap: ${({ theme }) => theme.spaces.s.desktopSize};
        padding-right: 76px;
        padding-left: 32px;

        text-align: center;
        margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
      }

      .option-table-management {
        & > * {
          &:not(:first-child) {
            margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
          }
        }

        .spinner-wrapper {
          display: flex;
          justify-content: center;
        }
      }

      .empty-management {
        text-align: center;
      }
    }

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

    .info-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      column-gap: ${({ theme }) => theme.spaces.s.desktopSize};
      padding-right: ${({ theme }) => theme.spaces.m.desktopSize};

      .invoices-wrapper {
        .title {
          margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
        }
      }
    }
  }
`;

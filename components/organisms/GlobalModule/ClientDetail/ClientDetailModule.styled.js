import styled from "styled-components";

export const SCClientDetailModule = styled.div`
  .title-wrapper {
    position: relative;

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
  }

  .spinner-wrapper {
    display: flex;
    justify-content: center;

    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
  }

  .data-wrapper {
    margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};

    form {
      margin-top: ${({ theme }) => theme.spaces.m.desktopSize};
    }

    .client-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(3, auto);
      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      row-gap: ${({ theme }) => theme.spaces.s.desktopSize};

      .single-wrapper {
        position: relative;

        .icon-wrapper {
          position: absolute;
          top: 38px;
          right: -30px;

          stroke: ${({ theme }) => theme.color.black};
          cursor: pointer;
        }
      }
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
  }

  .management-section {
    margin: ${({ theme }) => `${theme.spaces.m.desktopSize} 0`};

    .title-table-management {
      display: grid;
      grid-template-columns: 1.2fr 0.5fr 0.5fr 1.5fr 0.4fr 0.4fr;
      column-gap: ${({ theme }) => theme.spaces.s.desktopSize};
      padding-right: 140px;

      text-align: center;

      margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .option-table-management {
      max-height: 280px;
      overflow: hidden;
      overflow-y: auto;

      & > * {
        &:not(:first-child) {
          margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }
    }

    .empty-management {
      padding-top: ${({ theme }) => theme.spaces.s.desktopSize};
      text-align: center;
    }
  }

  .contract-client-wrapper {
    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};

    .type-data-wrapper {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr 0.5fr 1fr 1fr 0.5fr 0.5fr;
      column-gap: 32px;

      padding-left: 46px;
      padding-right: 16px;

      text-align: center;

      margin-bottom: ${({ theme }) => theme.spaces.xs.desktopSize};
    }

    .contract-empty-wrapper {
      padding-top: ${({ theme }) => theme.spaces.s.desktopSize};
      text-align: center;
    }
    .see-more-button {
      display: block;
      margin: 0 auto;
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .list-contract-wrapper {
      /* max-height: 280px;
      overflow: hidden;
      overflow-y: auto; */

      & > * {
        &:not(:first-child) {
          margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }
    }
  }

  .invoice-client-wrapper {
    margin-top: ${({ theme }) => theme.spaces.l.desktopSize};
    margin-bottom: ${({ theme }) => theme.spaces.l.desktopSize};

    .type-data-wrapper {
      display: grid;
      grid-template-columns: 0.5fr 0.5fr 1fr 0.5fr 0.5fr 1fr 0.5fr 0.5fr 0.4fr;

      padding-left: 46px;
      padding-right: 16px;
      column-gap: ${({ theme }) => theme.spaces.s.desktopSize};

      text-align: center;

      margin-bottom: ${({ theme }) => theme.spaces.xs.desktopSize};
    }
    .see-more-button {
      display: block;
      margin: 0 auto;
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .contract-empty-wrapper {
      padding-top: ${({ theme }) => theme.spaces.s.desktopSize};
      text-align: center;
    }

    .list-contract-wrapper {
      /* max-height: 280px;
      overflow: hidden;
      overflow-y: auto; */

      & > * {
        &:not(:first-child) {
          margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }
    }
  }
`;

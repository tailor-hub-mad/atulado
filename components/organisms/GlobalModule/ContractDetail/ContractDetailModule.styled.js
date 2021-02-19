import styled from "styled-components";

export const SCContractDetailModule = styled.div`
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

  .management-section {
    margin: ${({ theme }) =>
      `${theme.spaces.m.desktopSize} ${theme.spaces.s.desktopSize}`};

    .title-table-management {
      display: grid;
      grid-template-columns: 1fr 0.5fr 1fr 1fr 0.5fr 0.5fr;
      column-gap: ${({ theme }) => theme.spaces.s.desktopSize};
      padding-right: 60px;

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

  .contract-wrapper {
    .action-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .select-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        margin: ${({ theme }) => `${theme.spaces.xs.desktopSize} 0`};
        margin-right: 60px;

        & > * {
          margin: ${({ theme }) => `8px ${theme.spaces.xs.desktopSize}`};
        }
      }

      .icons-invoice-container {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        & > * {
          &:not(:first-child) {
            margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};
          }
        }
      }
    }
  }

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

  .type-data-wrapper {
    display: grid;
    grid-template-columns: 0.4fr 0.5fr 1fr 0.5fr 0.5fr 1fr 0.5fr 0.5fr 0.4fr;
    padding-left: 46px;
    padding-right: 16px;
    column-gap: 32px;

    text-align: center;

    margin-top: ${({ theme }) => theme.spaces.l.desktopSize};
    margin-bottom: ${({ theme }) => theme.spaces.xs.desktopSize};
  }

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

  .conditions-wrapper {
    margin: ${({ theme }) => `${theme.spaces.l.desktopSize} 0`};

    .separator {
      margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
    }
  }
`;

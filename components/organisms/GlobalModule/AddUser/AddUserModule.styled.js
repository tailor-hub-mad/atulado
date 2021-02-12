import styled from "styled-components";

export const SCAddUserModule = styled.div`
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

  .client-wrapper {
    margin-top: ${({ theme }) => theme.spaces.m.desktopSize};

    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: ${({ theme }) => theme.spaces.l.desktopSize};

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

    .table-client-wraper {
      .title-table-wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: ${({ theme }) => theme.spaces.s.desktopSize};

        & > * {
          &:first-child {
            text-align: start;
          }

          &:last-child {
            text-align: end;
          }
        }

        padding-left: ${({ theme }) => theme.spaces.m.desktopSize};
        padding-right: ${({ theme }) => theme.spaces.s.desktopSize};
      }

      & > * {
        &:not(:first-child) {
          margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }
    }

    .empty-list {
      display: flex;
      justify-content: center;
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }
  }
`;

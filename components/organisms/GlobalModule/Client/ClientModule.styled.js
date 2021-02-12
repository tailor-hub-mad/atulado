import styled from "styled-components";

export const SCClientModule = styled.div`
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
  .spinner-wrapper {
    display: flex;
    justify-content: center;

    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
  }

  .table-client-wraper {
    .title-table-wrapper {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      column-gap: ${({ theme }) => theme.spaces.s.desktopSize};
      text-align: start;

      padding-left: 48px;
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
`;

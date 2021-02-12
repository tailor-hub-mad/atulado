import styled from "styled-components";

export const SCContractModule = styled.div`
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

  .spinner-wrapper {
    display: flex;
    justify-content: center;

    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
  }

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

  .list-contract-wrapper {
    & > * {
      &:not(:first-child) {
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
      }
    }
  }
`;

import styled from "styled-components";

export const SCManagementModule = styled.div`
  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};

    .link {
      cursor: pointer;
    }
  }

  .empty-alerts-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;

    margin-top: ${({ theme }) => theme.spaces.m.desktopSize};
  }

  .info-wrapper {
    display: grid;
    column-gap: ${({ theme }) => theme.spaces.m.desktopSize};
    row-gap: ${({ theme }) => theme.spaces.s.desktopSize};
    grid-template-columns: 352px 352px;
    justify-items: stretch;
  }
`;

import styled from "styled-components";

export const SCFriendModule = styled.div`
  .data-wrapper {
    margin-bottom: ${({ theme }) => theme.spaces.m.desktopSize};

    .friend-wrapper {
      display: grid;
      grid-template-columns: 1fr 2fr;

      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      row-gap: ${({ theme }) => theme.spaces.s.desktopSize};
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
    }
  }
`;

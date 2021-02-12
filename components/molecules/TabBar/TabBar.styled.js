import styled from "styled-components";

export const SCTabBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 1;

  width: 0;
  min-width: 224px;
  height: 0;
  min-height: 100vh;

  display: grid;
  grid-auto-rows: auto max-content;

  padding: ${({ theme }) =>
    `${theme.spaces.l.desktopSize} ${theme.spaces.s.desktopSize} 40px`};

  background-color: ${({ theme }) => theme.color.primary};

  transition: 0.5s all ease;

  .options-wrapper {
    display: flex;
    align-items: center;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: ${({ theme }) => theme.spaces.xl.desktopSize};

      .item-disabled {
        pointer-events: none;
      }

      .item-active {
        p {
          font-family: ${({ theme }) => theme.typography.poppinsBold};
          color: ${({ theme }) => theme.color.white};
          text-decoration: underline;
        }
      }

      li {
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};

        &:last-child {
          margin-top: ${({ theme }) => theme.spaces.m.desktopSize};
        }
      }
    }
  }

  .actions-wrapper {
    margin-top: ${({ theme }) => theme.spaces.xl.desktopSize};

    .action-button {
      margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};

      color: ${({ theme }) => theme.color.primary};
      background-color: ${({ theme }) => theme.color.white};
    }
  }

  p {
    cursor: pointer;
  }

  .policy-wrapper {
    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
  }
`;

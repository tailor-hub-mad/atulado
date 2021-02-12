import styled from "styled-components";

export const SCMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background: linear-gradient(
    0deg,
    rgba(10, 117, 208, 0.7),
    rgba(10, 117, 208, 0.7)
  );

  overflow: hidden;

  z-index: 5;

  nav {
    position: absolute;
    top: 0;
    right: 0;

    width: 0;
    min-width: 80vw;
    height: 0;
    min-height: 70vh;

    display: grid;
    grid-gap: 10%;
    grid-auto-rows: 80% 10%;

    padding: ${({ theme }) => `23px ${theme.spaces.s.desktopSize}`};

    background-color: ${({ theme }) => theme.color.white};

    box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);

    transition: 0.5s all ease;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      padding: ${({ theme }) => `${theme.spaces.l.desktopSize} 0`};

      p {
        font-family: ${({ theme }) => theme.typography.poppinsBold};
      }

      .item-disabled {
        pointer-events: none;
      }

      .item-active {
        p {
          color: ${({ theme }) => theme.color.primary};
          text-decoration: underline;
        }
      }
    }

    .actions-wrapper {
    }

    p {
      cursor: pointer;
    }
  }
`;

import styled from "styled-components";

export const SCDownloadScreen = styled.section`
  height: 100vh;
  width: 100%;

  position: fixed;
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  background: linear-gradient(
    0deg,
    rgba(10, 117, 208, 0.7),
    rgba(10, 117, 208, 0.7)
  );

  .modal {
    height: 50vh;
    width: 40vw;

    padding: ${({ theme }) =>
      `${theme.spaces.l.desktopSize} ${theme.spaces.l.desktopSize}`};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.color.white};
    border-radius: 4px;

    text-align: center;

    p {
      margin-bottom: ${({ theme }) => theme.spaces.xs.desktopSize};
    }
  }

  .logo {
    animation-name: bounce-7;
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @-webkit-keyframes bounce-7 {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(1.1, 0.9) translateY(0);
    }
    30% {
      transform: scale(0.9, 1.1) translateY(-100px);
    }
    50% {
      transform: scale(1.05, 0.95) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(-7px);
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes bounce-7 {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(1.1, 0.9) translateY(0);
    }
    30% {
      transform: scale(0.9, 1.1) translateY(-100px);
    }
    50% {
      transform: scale(1.05, 0.95) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(-7px);
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }
`;
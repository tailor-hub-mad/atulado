import styled from "styled-components";

const SCLogin = styled.section`
  background-image: url("/../../image/atulado-background_image.svg");
  background-repeat: no-repeat;
  background-size: cover;

  nav {
    background-color: transparent;
  }

  .nav-desktop-wrapper {
    display: none;
  }

  .page-title {
    text-align: center;
    font-size: 30px;
    line-height: 32px;
  }
  .login-wrapper {
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;

    .login-card {
      padding: ${({ theme }) =>
        `${theme.spaces.m.mobileSize} ${theme.spaces.s.mobileSize}`};
      border-radius: 4px;
      background: ${({ theme }) => theme.color.white};
    }

    form {
      margin-top: ${({ theme }) => theme.spaces.xl.mobileSize};

      .login-input {
        min-width: 280px;
        &:first-child {
          margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
        }
      }

      .button-wrapper {
        margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
        text-align: center;
      }
    }

    .forgot-password,
    .error-message {
      margin-top: ${({ theme }) => theme.spaces.xs.mobileSize};
      text-align: center;
    }

    .error-message  {
      color: ${({ theme }) => theme.color.red};
    }
  }
  .change-login {
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    text-align: center;
    a {
      color: white;
    }
    span {
      text-decoration: underline;
      color: white;
    }
  }

  @media only screen and (min-width: 769px) {
    .nav-mobile-wrapper {
      display: none;
    }

    .nav-desktop-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: ${({ theme }) =>
        `${theme.spaces.s.desktopSize} ${theme.spaces.l.desktopSize}`};
      padding-bottom: 0;

      .options-wrapper {
        display: flex;

        a {
          color: ${({ theme }) => theme.color.primary};
        }

        & > * {
          cursor: pointer;
          margin-right: ${({ theme }) => theme.spaces.m.desktopSize};
        }
      }
    }

    .login-wrapper {
      .login-card {
        padding: ${({ theme }) => `${theme.spaces.m.desktopSize} 109px`};
        border-radius: 4px;
        background: ${({ theme }) => theme.color.white};
      }

      form {
        margin-top: ${({ theme }) => theme.spaces.m.desktopSize};
        .login-input {
          min-width: 331px;
          &:first-child {
            margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
          }
        }
        .button-wrapper {
          button {
            min-width: 245px;
          }
        }
      }

      .forgot-password,
      .error-message {
        margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
      }
    }
  }
`;

export { SCLogin };

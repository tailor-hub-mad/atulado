import styled from 'styled-components';

const SCPoliticaPrivacidad = styled.section`
  nav {
    background-color: transparent;
  }

  .nav-desktop-wrapper {
    display: none;
  }

  .content {
    padding: 0 16px 100px;
  }

  h2 {
    text-align: center;
    margin-bottom: 24px;
  }

  .text {
    margin: 64px 0 0px 0;
  }

  h1 {
    text-align: center;
    margin-bottom: 32px;
  }

  .wrapper {
    padding: 0 16px;
  }
  .text-item {
    margin-top: 32px;
    p:not(:nth-child(2)) {
      margin-top: 12px;
    }
  }

  @media only screen and (min-width: 769px) {
    max-width: 1440px;
    margin: 0 auto;
    .content{
      padding: 0;
      max-width: 678px;
      margin: 0 auto;
      padding-bottom: 200px;
    }
    .nav-mobile-wrapper {
      display: none;
    }
    h2 {
      text-align: center;
      margin-bottom: 32px;
    }

    h1 {
      font-size: 52px;
      margin-bottom: 56px;
      line-height: 64px;
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
    .text {
      margin: 96px 0 0px 0;
    }

    .text-item {
      margin-top: 48px;
      p:not(:nth-child(2)) {
        margin-top: 16px;
      }
    }
  
  }
`;

export default SCPoliticaPrivacidad;
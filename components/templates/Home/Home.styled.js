import styled from 'styled-components';

const SCHome = styled.section`
  img {
    width: 100%;
  }
  nav {
    background-color: transparent;
  }

  .nav-desktop-wrapper {
    display: none;
  }

  h1 {
    font-size: 44px;
    line-height: 52px;
  }

  .select-buttons {
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
  }

  .link-container {
    cursor: pointer;
    a {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      svg {
        margin-left: 16px;
      }
    }
  }

  .home-third-section {
    

    .right-section {
      .info-item:not(:last-child) {
        margin-bottom: 32px;
      }
    }
  }

  background-image: url("/image/landing-background.png");
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 100% auto;

  .images-section {

    img:nth-child(1) {
      grid-area: img1;
    } 

    img:nth-child(2) {
      grid-area: img2;
    } 

    img:nth-child(3) {
      grid-area: img3;
    } 
    img {
      width: 100%;
    }

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 
    "img1 img2"
    "img3 img3";
  }

  .images-section {
    padding: 0px;
    padding-bottom: 100px;
  }
  .links-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 16px;
    text-align: center;
    margin-top: 46px;
    margin-bottom: 100px;
  }

  .legal-links {
    margin-top: 16px;
    a p {
      display: inline-block;
      .special {
        margin-left: 4px;
      }
    }
  }
  .legal {
    padding-bottom: 16px;
  }

  @media only screen and (min-width: 769px) {
    .home-wrapper {
      max-width: 1440px;
      margin: 0 auto;
    }
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
  
    h1 {
      font-size: 52px;
      line-height: 64px;

      margin: 46px 0;
    }

    h2 {
      margin-bottom: 46px;
    }

    .home-first-section {
      padding: ${({ theme }) =>
    `0 ${theme.spaces.l.desktopSize}`};
      display: flex;
      align-items: flex-start;

      .left-section, .right-section {
        width: 50%;
      }

      .left-section {
        padding-right: 160px;
      }
    }

    .select-buttons {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      row-gap: 8px;
    }
    
    .home-second-section {
      margin: 200px auto;
      max-width: 672px;

      h3 {
        margin-bottom: 46px;
      }

      p:nth-child(3) {
        margin-top: 24px;
        margin-bottom: 40px;
      }
    }

    .home-third-section {
      display: flex;
      align-items: center;
      .left-section, .right-section {
        width: 50%;
      }

      .left-section {
        padding-right: 105px;
      }

      .right-section {
        .info-item:not(:last-child) {
          margin-bottom: 48px;
        }
        padding-right: 80px;
      }
    }

    .home-fourth-section {
      margin: 200px auto;
      max-width: 672px;

      .logo-wrapper {
        text-align: center;

        svg {
          width: 32px;
          height: 62px;
        }
      }

      .section-titles {
        p:nth-child(1) {
          margin-bottom: 24px;
          font-family: ${({ theme }) => theme.typography.poppinsBold};
        }
        text-align: center;
        margin: 46px 0;
      }

      p:nth-child(3) {
        margin-bottom: 24px;
      }
    }

    .images-section {
      padding: 0 80px;
      padding-bottom: 200px;
    }
    .images-section {
      column-gap: 16px;
      row-gap: 16px;
    }

    .links-container {
      margin: 0 auto;
      margin-top: 46px;
      max-width: 672px;
      text-align: center;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 64px;
      margin-bottom: 128px;
    }

    .legal {
      padding-bottom: 46px;
      display: flex;
      align-items: center;
      align-items: center;
      justify-content: space-between;
    }

    .legal-links {
      margin-top: 0px;
    }
  }
  
`;

export default SCHome;
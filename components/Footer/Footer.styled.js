import styled from 'styled-components';

const SCFooter = styled.footer`
  .logo-wrapper {
    text-align: center;
    svg {
      width: 122px;
      height: 60px;
    }
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
    padding: 0 80px !important;
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

export default SCFooter;
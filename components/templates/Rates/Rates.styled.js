import styled from "styled-components";

export const SCRates = styled.section`
  background-image: url("/../../image/atulado-background-subscription_image.svg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;


  .rates-wrapper {
    padding: 0px 24px 96px;
  }

  .select-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    margin: 55px auto;
    max-width: 694px;
  }

  width: 100%;
  .rates-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 18px;

  }
  .title {
    display: block;
    padding: 0 24px;
    padding-top: 32px;   
    margin-bottom: 0;
  }

  @media only screen and (min-width: 769px) {
    .rates-wrapper {
      padding: 0px;
      max-width: 1025px;
      margin: 0 auto;
      padding-bottom: 96px;
    }

    .select-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 10px;
      margin: 0px auto 55px;
      max-width: 746px;
    }
    
    .title {
      display: block;
      text-align: center;
      padding: ${({ theme }) => `${theme.spaces.m.desktopSize} 362px`};
      margin-bottom: 0;
    }

    .rates-grid {
      display: grid;
      grid-template-columns: ${({ tab }) => {
    if (tab === 1) return `repeat(3, 1fr)`;
    if (tab === 2) return `repeat(3, 1fr)`;
    return `repeat(3, 1fr)`;
  }};
      row-gap: 0px;
      column-gap: 18px;
    }
  }
`;
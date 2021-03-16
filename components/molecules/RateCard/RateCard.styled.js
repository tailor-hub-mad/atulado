import styled from 'styled-components';

export const SCRateCard = styled.div`
  filter: drop-shadow(0px 4px 24px rgba(0, 152, 69, 0.2));
  padding: 20px 16px;
  background-color: white;
  align-self: baseline;
  .card-header{
    text-align: center;
    p {
      text-transform: uppercase;
      margin-top: 12px;
    }
    margin-bottom: 24px;
  }

  p {
    color: ${({ theme }) => theme.color.primary};
  }

  .rate-description {
    margin-bottom: 28px;
  }
  .hours {
    margin-bottom: 35px;
    display: grid;
    grid-template-columns: ${({ hours }) => {
    return `repeat(${hours}, 1fr)`;
  }};
      row-gap: 0px;
      column-gap: 16px;
      div:first-child {
        justify-self: ${({ hours }) => hours === 1 ? 'center' : 'flex-end'};
      }
  }

  .rate-green-card {
    border-radius: 2px;
    background-color: ${({ theme }) => theme.color.ligthPrimary};
    padding: 20px 12px;
  }

  .center-text{
    text-align: center;
  }

  .data {
    margin: 28px auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 16px;

    .data-item {
      display: flex;
      align-items: center;
      svg {
        margin-right: 8px;
      }
    }
  }

  .rates-cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 16px;
  }

  .potencia-item {
    margin-top: 28px;
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

  .info {
    margin-bottom: 28px;
    .info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 6px;
      }
    }   
  }

  .terms {
    margin-top: 28px;
  }

  @media only screen and (min-width: 769px) {
    .green-card-wrapper {
      max-width: 266px;
      margin: 0 auto;
    }
  }
`;
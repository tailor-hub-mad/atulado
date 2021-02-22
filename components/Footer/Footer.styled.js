import styled from 'styled-components';

const SCFooter = styled.footer`
  .logo-wrapper {
    text-align: center;
    svg {
      width: 122px;
      height: 60px;
    }
  }

  @media only screen and (min-width: 769px) {
    padding: 0 80px;
  }
`;

export default SCFooter;
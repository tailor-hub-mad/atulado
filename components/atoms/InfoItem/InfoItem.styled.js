import styled from 'styled-components';

const SCInfoItem = styled.div`
  p {
    max-width: 497px;
  }
  p:nth-child(2) {
    margin-top: 16px;
    font-family: ${({ theme }) => theme.typography.poppinsBold};
  }
`;

export default SCInfoItem;
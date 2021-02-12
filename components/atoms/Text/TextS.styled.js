import styled from "styled-components";

export const SCTextSMedium = styled.p`
  font-family: ${({ theme }) => theme.typography.poppinsBold};
  font-size: ${({ theme }) => theme.typographySizes.s.mobileSize};
  line-height: ${({ theme }) => theme.typographySizes.s.mobileLine};
  color: ${({ theme, color = "primary" }) => theme.color[color]};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
  span {
    font-family: ${({ theme }) => theme.typography.poppinsBold};
    color: ${({ theme, color = "primary" }) => theme.color[color]};
  }
  @media only screen and (min-width: 415px) {
    font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
    line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};
  }
`;

export const SCTextSLight = styled(SCTextSMedium)`
  font-family: ${({ theme }) => theme.typography.poppinsRegular};
  span {
    font-family: ${({ theme }) => theme.typography.poppinsRegular};
  }
`;

import styled from "styled-components";

export const SCTextXSMedium = styled.p`
  font-family: ${({ theme }) => theme.typography.poppinsBold};
  font-size: ${({ theme }) => theme.typographySizes.xs.mobileSize};
  line-height: ${({ theme }) => theme.typographySizes.xs.mobileLine};
  color: ${({ theme, color = "primary" }) => theme.color[color]};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
  @media only screen and (min-width: 415px) {
    font-size: ${({ theme }) => theme.typographySizes.xs.desktopSize};
    line-height: ${({ theme }) => theme.typographySizes.xs.desktopLine};
  }
`;

export const SCTextXSLight = styled(SCTextXSMedium)`
  font-family: ${({ theme }) => theme.typography.poppinsRegular};
`;

import styled from "styled-components";

export const SCTextXL = styled.p`
  font-family: ${({ theme }) => theme.typography.poppinsBold};
  font-size: ${({ theme }) => theme.typographySizes.xl.mobileSize};
  line-height: ${({ theme }) => theme.typographySizes.xl.mobileLine};
  color: ${({ theme, color = "primary" }) => theme.color[color]};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
  span {
    font-family: ${({ theme }) => theme.typography.poppinsBold};
    color: ${({ theme, color = "primary" }) => theme.color[color]};
  }
  @media only screen and (min-width: 415px) {
    font-size: ${({ theme }) => theme.typographySizes.xl.desktopSize};
    line-height: ${({ theme }) => theme.typographySizes.xl.desktopLine};
  }
`;

import styled from "styled-components";

export const SCTextL = styled.p`
  font-family: ${({ theme }) => theme.typography.poppinsBold};
  font-size: ${({ theme }) => theme.typographySizes.l.mobileSize};
  line-height: ${({ theme }) => theme.typographySizes.l.mobileLine};
  color: ${({ theme, color = "primary" }) => theme.color[color]};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
  @media only screen and (min-width: 415px) {
    font-size: ${({ theme }) => theme.typographySizes.l.desktopSize};
    line-height: ${({ theme }) => theme.typographySizes.l.desktopLine};
  }
`;

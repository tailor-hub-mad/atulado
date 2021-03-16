import styled from "styled-components";

export const SCTextM = styled.p`
  font-family: ${({ theme }) => theme.typography.poppinsRegular};
  font-size: ${({ theme }) => theme.typographySizes.m.mobileSize};
  line-height: ${({ theme }) => theme.typographySizes.m.mobileLine};
  color: ${({ theme, color = "primary" }) => theme.color[color]};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};

  @media only screen and (min-width: 415px) {
    font-size: ${({ theme }) => theme.typographySizes.m.desktopSize};
    line-height: ${({ theme }) => theme.typographySizes.m.desktopLine};
  }
`;
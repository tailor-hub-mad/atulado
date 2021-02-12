import styled from "styled-components";

export const SCGlobal = styled.section`
  .tabbar-wrapper {
    display: none;
  }

  .whatsapp-image {
    display: none;
  }

  .main-wrapper {
    position: relative;
    left: 0;
    padding: ${({ theme }) =>
      `${theme.spaces.s.mobileSize} ${theme.spaces.m.mobileSize}`};
  }

  @media only screen and (min-width: 769px) {
    .tabbar-wrapper {
      display: block;
    }

    .whatsapp-image {
      svg {
        width: 61px;
        height: 61px;
      }

      display: block;
      position: fixed;
      bottom: ${({ theme }) => theme.spaces.xs.desktopSize};
      right: ${({ theme }) => theme.spaces.xs.desktopSize};

      filter: drop-shadow(0px 0px 16px rgba(10, 117, 208, 0.2));

      z-index: 5;
      cursor: pointer;
    }

    .main-wrapper {
      left: 224px;
      width: calc(100% - 224px);
      height: ${({ theme }) => `calc(100% - ${theme.spaces.m.desktopSize})`};

      padding: ${({ theme }) =>
        `${theme.spaces.s.desktopSize} ${theme.spaces.m.desktopSize}`};
      padding-bottom: ${({ theme }) => theme.spaces.l.desktopSize};
    }
  }
`;

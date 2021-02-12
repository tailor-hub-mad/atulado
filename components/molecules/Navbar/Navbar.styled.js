import styled from "styled-components";

export const SCNavbar = styled.nav`
  width: 100%;
  height: ${({ theme }) => theme.spaces.m.desktopSize};

  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;

  z-index: 7;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${({ theme }) => theme.color.primary};

  padding: ${({ theme }) =>
    `${theme.spaces.xs.mobileSize} ${theme.spaces.s.mobileSize}`};

  .info-wrapper {
    display: none;
  }

  .menu-wrapper {
    display: inline-block;
  }

  @media only screen and (min-width: 769px) {
    min-width: 220px;
    min-height: 40px;

    padding: ${({ theme }) =>
      `${theme.spaces.xs.desktopSize} ${theme.spaces.s.desktopSize}`};

    .info-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      & > * {
        margin-left: 13px;
      }
    }

    .menu-wrapper {
      display: none;
    }
  }
`;

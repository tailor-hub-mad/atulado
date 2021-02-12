import styled from "styled-components";

export const SCHelper = styled.div`
  z-index: 2;
  position: relative;

  .icon-wrapper {
    cursor: pointer;
  }

  .helper-wrapper {
    position: absolute;
    top: 11px;
    left: 15px;

    display: inline-block;

    width: calc(100vw - 15px);

    padding: 14px;
    margin: 0;

    p {
      font-family: ${({ theme }) => theme.typography.poppinsRegular};
      font-size: ${({ theme }) => theme.typographySizes.s.mobileSize};
      line-height: ${({ theme }) => theme.typographySizes.s.mobileSize};
      color: ${({ theme }) => theme.color.black};
    }

    background: ${({ theme }) => theme.color.white};

    box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
    border-radius: 4px;

    p:nth-child(n + 2) {
      margin-top: 14px;
    }

    span {
      font-family: ${({ theme }) => theme.typography.poppinsBold};
      font-size: ${({ theme }) => theme.typographySizes.s.mobileSize};
      line-height: ${({ theme }) => theme.typographySizes.s.mobileSize};
      color: ${({ theme }) => theme.color.primary};
    }
  }

  @media only screen and (min-width: 769px) {
    .helper-wrapper {
      position: absolute;
      top: 11px;
      left: 15px !important;

      width: 482px;

      padding: 7px 14px 14px 14px;

      p {
        font-family: ${({ theme }) => theme.typography.poppinsRegular};
        font-size: ${({ theme }) => theme.typographySizes.xs.desktopSize};
        line-height: ${({ theme }) => theme.typographySizes.xs.desktopLine};
        color: ${({ theme }) => theme.color.black};
      }

      span {
        font-family: ${({ theme }) => theme.typography.poppinsBold};
        font-size: ${({ theme }) => theme.typographySizes.xs.desktopSize};
        line-height: ${({ theme }) => theme.typographySizes.xs.desktopLine};
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

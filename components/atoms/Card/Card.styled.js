import styled from "styled-components";

export const SCCard = styled.div`
  width: 352px;

  display: flex;
  justify-content: space-between;

  padding: ${({ theme }) => theme.spaces.xs.desktopSize};

  box-sizing: border-box;

  border-width: 4px 1px 1px 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.color.primary};
  border-radius: 4px;

  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);

  .card-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .text-wrapper {
      font-family: ${({ theme }) => theme.typography.poppinsRegular};
      font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
      line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};
      color: ${({ theme }) => theme.color.black};

      .title {
        font-family: ${({ theme }) => theme.typography.poppinsBold};
        font-size: ${({ theme }) => theme.typographySizes.m.desktopSize};
        line-height: ${({ theme }) => theme.typographySizes.m.desktopLine};
        color: ${({ theme }) => theme.color.primary};
      }

      .subtitle {
        display: block;
        font-size: ${({ theme }) => theme.typographySizes.xs.desktopSize};
        line-height: ${({ theme }) => theme.typographySizes.xs.desktopLine};
      }

      .important {
        font-family: ${({ theme }) => theme.typography.poppinsBold};
        color: ${({ theme }) => theme.color.primary};
      }

      .uppercase {
        text-transform: uppercase;
      }
    }

    button {
      width: 0;
      min-width: 142px;
      height: 40px;

      padding: 8px 16px 6px 16px;

      text-align: center;

      border-width: 1px;
      border-style: solid;
      border-radius: 4px;

      font-family: ${({ theme }) => theme.typography.poppinsBold};
    }

    .cancel-button {
      background: ${({ theme }) => theme.color.white};

      border-color: ${({ theme }) => theme.color.black};

      color: ${({ theme }) => theme.color.black};
    }

    .action-button {
      background: ${({ theme }) => theme.color.primary};

      border-color: ${({ theme }) => theme.color.primary};

      color: ${({ theme }) => theme.color.white};
    }

    .image-wrapper {
    }
  }

  svg {
    width: 61px;
    height: 61px;

    stroke: ${({ theme }) => theme.color.black};
    margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};
  }

  @media only screen and (min-width: 769px) {
    width: 352px;

    .card-wrapper {
      .text-wrapper {
        p {
          .title {
            font-size: ${({ theme }) => theme.typographySizes.l.desktopSize};
            line-height: ${({ theme }) => theme.typographySizes.l.desktopLine};
          }
        }
      }

      button {
        height: 24px;

        padding: 2px 5px 0 5px;

        font-size: ${({ theme }) => theme.typographySizes.xs.desktopSize};
        line-height: ${({ theme }) => theme.typographySizes.xs.desktopLine};

        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
      }

      .cancel-button {
        min-width: 64px;
        padding: 0;
        padding-top: 2px;
      }

      .action-button {
        min-width: 142px;
      }
    }
  }
`;

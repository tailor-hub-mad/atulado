import styled from "styled-components";

export const SCSubscription = styled.section`
  background-image: url("/../../image/atulado-background-subscription_image.svg");
  background-repeat: no-repeat;

  .title {
    display: none;
  }

  .main-wrapper {
    .breadcrumbs-wrapper {
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: ${({ theme }) => theme.spaces.m.desktopSize};

      width: 100%;
      max-width: 100%;
      overflow-x: scroll;
      align-items: center;
      display: flex;

      z-index: 1;

      padding: ${({ theme }) => `0 ${theme.spaces.xs.desktopSize}`};

      &::-webkit-scrollbar {
        display: none;
      }

      p {
        cursor: pointer;
        white-space: nowrap;
        margin: 0 auto;
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};

        &:last-child {
          padding-right: ${({ theme }) => theme.spaces.s.desktopSize};
        }

        &:not(:last-child) {
          margin-right: ${({ theme }) => theme.spaces.s.desktopSize};
        }

        &:hover,
        &.is-current {
          font-family: ${({ theme }) => theme.typography.poppinsBold};
          color: ${({ theme }) => theme.color.primary};
          text-decoration: underline;
        }
      }
    }

    .form-wrapper {
      position: relative;
      width: 100%;

      padding: ${({ theme }) =>
        `${theme.spaces.m.mobileSize} ${theme.spaces.xs.mobileSize}`};

      .section-wrapper {
        padding-top: ${({ theme }) => theme.spaces.l.mobileSize};
      }

      .data-wrapper {
        padding-top: ${({ theme }) => theme.spaces.s.desktopSize};
      }
    }

    .summary-wrapper {
      display: grid;
      column-gap: ${({ theme }) => theme.spaces.m.desktopSize};
      row-gap: ${({ theme }) => theme.spaces.s.desktopSize};
      grid-template-columns: 1fr 1fr;
      margin-top: ${({ theme }) => theme.spaces.m.mobileSize};

      .summary-title {
        margin-bottom: ${({ theme }) => theme.spaces.xs.mobileSize};
      }
    }

    .contract-terms {
      display: flex;
      align-items: flex-end;
      justify-content: center;

      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
      margin-bottom: ${({ theme }) => theme.spaces.xl.mobileSize};

      a {
        font-family: ${({ theme }) => theme.typography.poppinsBold};
        text-decoration: underline;
      }
    }

    .submit-wrapper {
      display: flex;
      justify-content: center;
    }

    .error-form-wrapper {
      text-align: center;
      margin-bottom: 279px;
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }
  }

  .modal-form-wrapper {
    width: 100%;
    .important-text {
      line-height: 0;
    }

    .button-wrapper {
      display: flex;
      justify-content: center;

      button {
        width: 50%;
      }

      a {
        text-decoration: none;
        color: ${({ theme }) => theme.color.white};
      }

      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }
  }

  @media only screen and (min-width: 769px) {
    .title {
      display: block;

      text-align: center;

      margin: ${({ theme }) => `${theme.spaces.m.desktopSize} 362px`};

      margin-bottom: 0;
    }

    .main-wrapper {
      display: flex;
      align-items: flex-start;
      max-width: 1025px;
      margin-left: auto;
      margin-right: auto;
      padding: 0 0 0 0vw;

      .breadcrumbs-wrapper {
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 238px;

        min-height: 100vh;
        width: 20vw;
        min-width: 166px;
        max-width: 166px;
        display: block;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;

        p {
          white-space: normal;

          &:not(:last-child)  {
            margin-right: 0px;
          }
        }
      }

      .form-wrapper {
        padding: ${({ theme }) => `0 ${theme.spaces.m.desktopSize}`};
      }

      .file-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > * {
          &:first-child {
            width: 70%;
          }
        }

        button {
          margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }
    }
  }

  .separator {
    margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
  }
`;

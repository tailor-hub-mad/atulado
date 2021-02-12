import styled from "styled-components";

export const SCDataModule = styled.div`
  & > * {
    &:not(:first-child) {
      margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
    }
  }

  .title-wrapper {
    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
  }

  .friend-wrapper {
    margin-top: ${({ theme }) => theme.spaces.l.desktopSize};

    .title-wrapper {
      margin-bottom: ${({ theme }) => theme.spaces.xs.desktopSize};
    }
  }

  .padding-left-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > * {
      &:not(:first-child) {
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
      }
    }
  }

  .wrapper-1column {
    display: grid;

    grid-template-columns: 1fr;

    & > * {
      margin-top: ${({ theme }) => theme.spaces.m.mobileSize};
    }
  }

  .wrapper-2column {
    display: grid;

    grid-template-columns: 1fr;

    & > * {
      margin-top: ${({ theme }) => theme.spaces.m.mobileSize};
    }
  }

  .wrapper-email-column {
    display: grid;
    grid-template-columns: 1fr;

    & > * {
      margin-top: ${({ theme }) => theme.spaces.m.mobileSize};
    }
  }

  .wrapper-phone-column {
    display: grid;
    grid-template-columns: 1fr;

    & > * {
      margin-top: ${({ theme }) => theme.spaces.m.mobileSize};
    }
  }

  .separator {
    margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
  }

  @media only screen and (min-width: 769px) {
    .padding-left-wrapper {
      margin-left: ${({ theme }) => theme.spaces.l.desktopSize};
      margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .wrapper-1column {
      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      grid-template-columns: 1fr 2fr;

      & > * {
        margin-top: 0;
      }

      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .wrapper-2column {
      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      grid-template-columns: 1fr 1fr;

      & > * {
        margin-top: 0;
      }

      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .wrapper-email-column {
      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      grid-template-columns: 2fr 1fr;

      & > * {
        margin-top: 0;
      }

      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .wrapper-phone-column {
      display: grid;
      column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
      grid-template-columns: 1fr 2fr;

      & > * {
        margin-top: 0;
      }

      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .padding-right-wrapper {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
    }
  }
`;

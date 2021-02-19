import styled from "styled-components";

export const SCWhatModule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-top: ${({ theme }) => theme.spaces.s.mobileSize};

  & > * {
    &:not(:first-child) {
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }
  }

  .options-wrapper {
    width: 100%;

    & > * {
      &:not(:first-child) {
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
      }

      &:first-child {
        .file-wrapper {
          margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }
    }

    .bie-wrapper {
      width: 408px;
    }

    .new-subscription-wrapper {
      display: grid;
      grid-template-columns: 2fr 1fr;
      margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    .info-card {
      & > * {
        &:not(:first-child) {
          margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }

      .power-wrapper {
        display: grid;
        grid-template-columns: auto auto;
        column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
        row-gap: ${({ theme }) => theme.spaces.s.desktopSize};
      }

      .data-container {
        margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .options-container {
        margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
      }
    }
  }

  .tip-wrapper {
    margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
  }

  .helper {
    position: relative;
    top: 58px;
    left: 315px;
    margin: 0;

    .helper-wrapper {
      left: -323px;
    }
  }

  @media only screen and (min-width: 769px) {
    padding-left: ${({ theme }) => theme.spaces.l.desktopSize};
    padding-right: ${({ theme }) => theme.spaces.l.desktopSize};

    .options-wrapper {
      width: 65vh;
    }
  }
`;

import styled from "styled-components";

export const SCWhenModule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-top: ${({ theme }) => theme.spaces.s.mobileSize};

  & > * {
    &:not(:first-child) {
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }

    &:last-child {
      margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
    }
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    padding: 0;
    cursor: pointer;
  }

  @media only screen and (min-width: 769px) {
    padding-left: ${({ theme }) => theme.spaces.l.desktopSize};
    padding-right: ${({ theme }) => theme.spaces.xxl.desktopSize};

    .calendar-wrapper {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
`;

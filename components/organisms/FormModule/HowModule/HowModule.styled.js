import styled from "styled-components";

export const SCHowModule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-top: ${({ theme }) => theme.spaces.s.mobileSize};

  & > * {
    &:not(:first-child) {
      margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
    }
  }

  .tip-wrapper {
    margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
  }

  @media only screen and (min-width: 769px) {
    padding-left: ${({ theme }) => theme.spaces.l.desktopSize};
    padding-right: ${({ theme }) => theme.spaces.xxl.desktopSize};
  }
`;

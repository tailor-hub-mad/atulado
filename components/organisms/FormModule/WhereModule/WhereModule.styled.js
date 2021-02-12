import styled from "styled-components";

export const SCWhereModule = styled.div`
  & > * {
    display: grid;
    column-gap: ${({ theme }) => theme.spaces.xs.desktopSize};
  }

  .helper {
    position: relative;
    display: inline-block;
    top: 30px;
    left: 45px;

    .helper-wrapper {
      left: -52px;
    }
  }

  .row-1 {
    grid-template-columns: 1fr;
    margin: 0;
  }

  @media only screen and (min-width: 769px) {
    & > * {
      &:not(:first-child) {
        margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
      }
    }

    .row-1 {
      grid-template-columns: 5fr 3fr;
      margin: 0;
    }
  }
`;

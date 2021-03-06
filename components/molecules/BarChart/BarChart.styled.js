import styled from "styled-components";

export const SCBarChart = styled.div`
  width: 100%;

  height: 0;
  min-height: 300px;

  padding: 19px 5px;

  background: ${({ theme }) => theme.color.white};
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  border-radius: 4px;
  box-sizing: border-box;

  & > * {
    &:nth-child(1) {
      display: none;
    }

    &:nth-child(2) {
      display: none;
    }
  }

  .bar-wrapper {
    display: block;
    overflow-x: auto;

    width: 100%;

    .legend-bar-wrapper {
      position: relative;
      width: 600px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      margin: ${({ theme }) => `0 ${theme.spaces.m.mobileSize}`};

      & > * {
        margin: ${({ theme }) => `0 ${theme.spaces.xs.mobileSize}`};
      }
    }
  }

  div:has(div.tooltip-wrapper) {
    display: none;
  }

  svg g rect {
    cursor: pointer;
  }

  @media only screen and (min-width: 769px) {
    padding: 19px 0;

    & > * {
      &:nth-child(1) {
        position: block;
      }

      &:nth-child(2) {
        display: block;
      }
    }

    .legend-bar-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;

      margin: ${({ theme }) => `0 ${theme.spaces.m.desktopSize}`};
    }

    .responsive-bar-wrapper {
      display: block;
    }

    .bar-wrapper {
      display: none;
    }
  }
`;

export const SCItemLegend = styled.div`
  .place-wrapper {
    display: flex;
    align-items: center;

    .wrapper-color {
      width: 16px;
      height: 16px;

      margin-right: 6px;
      margin-bottom: 4px;

      border: none;
      border-radius: 50%;

      background: ${({ color, theme }) => color || theme.color.gray};
    }
  }

  .info-wrapper {
    height: ${({ theme }) => theme.spaces.xs.desktopSize};

    text-align: center;
    margin-top: 8px;
  }
`;

import styled from "styled-components";

export const SCBarChart = styled.div`
  width: 100%;

  min-width: 344px;
  height: 0;
  min-height: 300px;

  padding: 19px 0;

  background: ${({ theme }) => theme.color.white};
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  border-radius: 4px;
  box-sizing: border-box;

  .legend-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    margin: ${({ theme }) => `0 ${theme.spaces.m.desktopSize}`};
  }

  div:has(div.tooltip-wrapper) {
    display: none;
  }

  svg g rect {
    cursor: pointer;
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

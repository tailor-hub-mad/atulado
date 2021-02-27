import styled from "styled-components";

export const SCButtonIcon = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  svg {
    stroke: ${({ theme, active, disabled }) => {
      if (active) return theme.color.primary;
      if (disabled) return theme.color.gray;
      return theme.color.black;
    }};
  }
  .tag-wrapper {
    display: none;
  }
  &:hover {
    svg {
      stroke: ${({ theme }) => theme.color.primary};
    }
    .tag-wrapper {
      display: none;
    }
  }
  @media only screen and (min-width: 769px) {
    .tag-wrapper {
      display: inline-flex;
    }
  }
`;

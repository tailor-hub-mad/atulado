import styled from "styled-components";

export const SCChooseButton = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  svg {
    stroke: ${({ theme, active, disabled }) => {
    if (active) return theme.color.white;
    if (disabled) return theme.color.gray;
    return theme.color.primary;
  }};
  }
  width: 100%;


  background-color: ${({ theme, active, disabled }) => {
    if (active) return theme.color.primary;
    if (disabled) return theme.color.gray;
    return theme.color.white;
  }};

  color: ${({ theme, active, disabled }) => {
    if (active) return theme.color.white;
    if (disabled) return theme.color.gray;
    return theme.color.primary;
  }};

  p {
    color: ${({ theme, active, disabled }) => {
    if (active) return theme.color.white;
    if (disabled) return theme.color.gray;
    return theme.color.primary;
  }};
  }
  padding: 16px 8px;
  border: 1px solid #009845;
  border-radius: 2px;

  .tag-wrapper {
    display: none;
  }

  display: flex;
  align-items: center;
  flex-direction: column;

  .text {
    p:not(:last-child){
      margin-bottom: 8px;
      margin-top: 28px;
      text-align: center;
    }
  }

  &:hover {
    svg {
      stroke: ${({ theme }) => theme.color.white};
    }

    .tag-wrapper {
      display: inline-flex;
    }
  }

  @media only screen and (min-width: 769px) {
    flex-direction: row;
    align-items: center;

    .text {
      margin-left: 28px;
      p:not(:last-child){
        margin-bottom: 8px;
        margin-top: 0px;
        text-align: left;
      }
    }
    padding: 18px 34px;
  }
`;

import styled from "styled-components";

export const SCButtonRound = styled.div`
  position: ${({ position }) => position || "relative"};

  display: inline-flex;
  align-items: center;

  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  .round-wrapper {
    width: 16px;
    height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme, disabled }) =>
      disabled ? theme.color.gray : theme.color.primary};

    .checked {
      display: ${({ checked }) => (checked ? "block" : "none")};

      width: 10px;
      height: 10px;

      border-radius: 50%;

      background-color: ${({ theme, checked }) =>
        checked ? theme.color.primary : theme.color.white};
    }
  }

  .text-wrapper {
    position: relative;
    left: 16px;
    top: 3px;

    p {
      font-family: ${({ theme, checked }) =>
        checked
          ? theme.typography.poppinsBold
          : theme.typography.poppinsRegular};
      font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
      line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};

      color: ${({ theme, disabled, checked }) => {
        if (disabled) return theme.color.gray;
        if (checked) return theme.color.primary;
        return theme.color.black;
      }};
    }
  }

  &:hover p {
    font-family: ${({ theme }) => theme.typography.poppinsBold};
  }

  &:active p {
    color: ${({ theme }) => theme.color.primary};
  }
`;

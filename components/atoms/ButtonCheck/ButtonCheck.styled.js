import styled from "styled-components";

export const SCButtonCheck = styled.div`
  cursor: pointer;

  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  .action-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};

    p {
      display: inline;

      font-family: ${({ theme }) => theme.typography.poppinsRegular};
      font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
      line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};
      color: ${({ theme, disabled }) =>
    disabled ? theme.color.gray : theme.color.black};
    }

    .checked {
      font-family: ${({ theme, textCheck }) =>
    textCheck
      ? theme.typography.poppinsRegular
      : theme.typography.poppinsBold};
      font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
      line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};
      color: ${({ theme, textCheck }) =>
    textCheck ? theme.color.black : theme.color.primary};
    }

    .checked-button-wrapper {
      position: relative;

      width: 51px;
      height: 28px;

      margin: ${({ theme }) => `0 ${theme.spaces.xs.desktopSize}`};

      border-radius: 20px;
      border: 1.5px solid #e5e5e5;
      box-sizing: border-box;

      cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

      background: ${({ theme, checked, options }) => {
    //if (options) return theme.color.white;
    if (checked) return theme.color.primary;
    return theme.color.white;
  }};

      transition: 250ms ease-in-out;

      .selector {
        position: absolute;
        top: -2px;
        left: ${({ checked, disabled }) => {
    if (disabled) return "10.5px";
    if (checked) return "21px";
    return "-2px";
  }};

        width: 28px;
        height: 28px;

        border-radius: 50%;
        border: 0.5px solid rgba(0, 0, 0, 0.101987);
        box-sizing: border-box;

        background: ${({ theme }) => theme.color.white};

        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15),
          0px 1px 1px rgba(0, 0, 0, 0.16), 0px 3px 1px rgba(0, 0, 0, 0.1);

        transition: 250ms ease-in-out;
      }
    }

    &:hover {
      filter: drop-shadow(0px 0px 16px rgba(10, 117, 208, 0.2));
    }
  }
`;

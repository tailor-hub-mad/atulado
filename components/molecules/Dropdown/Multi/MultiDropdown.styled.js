import styled from "styled-components";

export const SCMultiDropdown = styled.div`
  position: relative;

  width: ${({ width }) => width || "100%"};

  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  label {
    position: absolute;
    pointer-events: none;
    top: 10px;

    font-family: ${({ theme }) => theme.typography.poppinsRegular};
    font-size: 15px;
    line-height: 18px;
    color: ${({ theme, disabled }) =>
      disabled ? theme.color.gray : theme.color.black};

    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .input-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: ${({ theme }) => theme.typographySizes.xs.desktopSize};

    box-sizing: content-box;
  }

  .error-wrapper {
    position: relative;
    pointer-events: none;
    top: 5px;

    font-family: ${({ theme }) => theme.typography.poppinsRegular};
    font-size: ${({ theme }) => theme.typographySizes.xs.mobileSize};
    line-height: ${({ theme }) => theme.typographySizes.xs.mobileLine};

    color: ${({ theme }) => theme.color.red};
  }
`;

export const SCInputMultiDropdown = styled.div`
  input {
    width: ${({ width }) => width || "100%"};

    padding: 8px;
    padding-bottom: 6px;
    box-sizing: border-box;

    text-decoration: none;
    font-family: ${({ theme }) => theme.typography.poppinsBold};
    font-size: ${({ theme }) => theme.typographySizes.s.mobileSize};
    line-height: ${({ theme }) => theme.typographySizes.s.mobileLine};
    color: ${({ theme, error, disabled }) => {
      if (disabled) return theme.color.gray;
      if (error) return theme.color.red;
      return theme.color.primary;
    }};

    background: ${({ theme, error, active }) => {
      if (error) return theme.color.lightRed;
      if (active) return theme.color.white;
      return theme.color.ligthPrimary;
    }};

    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme, error, disabled }) => {
      if (disabled) return theme.color.gray;
      if (error) return theme.color.red;
      return theme.color.primary;
    }};

    &::placeholder {
      color: ${({ theme, error, disabled }) => {
        if (disabled) return theme.color.gray;
        if (error) return theme.color.red;
        return theme.color.primary;
      }};
    }

    &:hover {
      box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
    }

    &:focus {
      outline: none;
    }
  }

  .option-list-wrapper {
    position: relative;
    z-index: 4;
  }

  .selector-wrapper {
    float: right;
    position: relative;
    top: 35px;
    right: 10px;

    cursor: pointer;

    svg {
      transform: ${({ open }) => (open ? "rotate(-180deg)" : "none")};
      transition: 0.2s ease all;

      stroke: ${({ theme, error, disabled }) => {
        if (disabled) return theme.color.gray;
        if (error) return theme.color.red;
        return theme.color.primary;
      }};
    }
  }
`;

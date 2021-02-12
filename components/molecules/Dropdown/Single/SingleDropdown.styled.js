import styled from "styled-components";

export const SCSingleDropdown = styled.div`
  position: relative;
  width: ${({ width }) => width || "100%"};
  min-width: 72px;

  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  input {
    width: ${({ width }) => width || "100%"};
    height: 40px;

    display: flex;
    align-items: center;

    padding: 8px;
    padding-bottom: 6px;
    padding-right: 48px;
    box-sizing: border-box;
    margin-top: 11px;

    cursor: pointer;

    text-decoration: none;
    font-family: ${({ theme }) => theme.typography.poppinsBold};
    font-size: ${({ theme }) => theme.typographySizes.s.mobileSize};
    line-height: ${({ theme }) => theme.typographySizes.s.mobileLine};
    color: ${({ theme, error, disabled }) => {
      if (disabled) return theme.color.gray;
      if (error) return theme.color.red;
      return theme.color.primary;
    }};

    background: ${({ theme, error }) =>
      error ? theme.color.lightRed : theme.color.ligthPrimary};

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

  label {
    position: relative;
    top: 11px;

    pointer-events: none;

    font-family: ${({ theme }) => theme.typography.poppinsRegular};
    font-size: 15px;
    line-height: 18px;
    color: ${({ theme, disabled }) =>
      disabled ? theme.color.gray : theme.color.black};

    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
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

  .selector-wrapper {
    position: absolute;
    right: 12px;
    top: 37.5px;

    float: right;

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

  @media only screen and (min-width: 769px) {
    input {
      margin-top: 11px;
    }

    .selector-wrapper {
      position: relative;
      right: 16px;
      top: 37.5px;
    }
  }
`;

export const SCSingleDropdownFilterManagement = styled.div`
  position: relative;
  width: ${({ width }) => width || "100%"};

  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  .text-wrapper {
    width: ${({ width }) => width || "100%"};
    height: 40px;

    display: flex;
    align-items: center;

    padding: 8px;
    padding-bottom: 6px;
    padding-right: 48px;
    box-sizing: border-box;
    margin-top: 11px;

    cursor: pointer;

    p {
      text-decoration: none;
      font-family: ${({ theme }) => theme.typography.poppinsRegular};
      font-size: ${({ theme }) => theme.typographySizes.s.mobileSize};
      line-height: ${({ theme }) => theme.typographySizes.s.mobileLine};
      color: ${({ theme, disabled, active }) => {
        if (disabled) return theme.color.gray;
        if (active) return theme.color.primary;
        return theme.color.black;
      }};
    }
  }

  .selector-wrapper {
    position: absolute;
    left: 80px;
    top: 10px;

    float: right;

    cursor: pointer;

    svg {
      transform: ${({ open }) => (open ? "rotate(-180deg)" : "none")};
      transition: 0.2s ease all;
      stroke: ${({ theme, disabled }) => {
        if (disabled) return theme.color.gray;
        return theme.color.black;
      }};
    }
  }
`;

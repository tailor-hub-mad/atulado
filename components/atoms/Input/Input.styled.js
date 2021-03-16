import styled from "styled-components";

export const SCInputText = styled.div`
  position: relative;
  width: ${({ width }) => width || "100%"};
  min-width: 72px;

  margin-top: 10px;

  input,
  textarea {
    width: ${({ width }) => width || "100%"};
    height: 40px;

    display: flex;
    align-items: center;

    padding: 8px;
    box-sizing: border-box;

    pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
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
      color: ${({ theme }) => theme.color.gray};
    }

    &:hover {
      box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    max-width: 100%;
    min-width: 100%;
    height: 100px;
    min-height: 40px;
    max-height: 150px;
  }

  input {
    max-width: 100%;
  }

  label {
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

    width: 100%;

    pointer-events: none;

    font-family: ${({ theme }) => theme.typography.poppinsRegular};
    font-size: ${({ theme }) => theme.typographySizes.xs.mobileSize};
    line-height: ${({ theme }) => theme.typographySizes.xs.mobileLine};

    color: ${({ theme }) => theme.color.red};
  }
`;

export const SCInputPassword = styled(SCInputText)`
  input {
    background: ${({ theme, error, disabled }) => {
    if (disabled) return theme.color.white;
    if (error) return theme.color.lightRed;
    return theme.color.ligthPrimary;
  }};
  }

  .show-password-wrapper {
    position: absolute;
    right: 16px;
    top: 31px;

    font-family: ${({ theme }) => theme.typography.poppinsBold};
    font-size: ${({ theme }) => theme.typographySizes.s.mobileSize};
    color: ${({ theme, disabled }) =>
    disabled ? theme.color.gray : theme.color.black};

    cursor: pointer;

    pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  }
`;

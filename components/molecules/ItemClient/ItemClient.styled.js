import styled from "styled-components";

export const SCItemClient = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spaces.s.desktopSize};

  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ theme }) => `0 ${theme.spaces.xs.desktopSize}`};

  background: ${({ theme, disabled }) =>
    disabled ? theme.color.gray : theme.color.ligthPrimary};

  border-radius: 34px;

  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  p {
    color: ${({ theme, disabled }) =>
      disabled ? theme.color.white : theme.color.black};
  }

  &:hover {
    box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
    p {
      font-family: ${({ theme }) => theme.typography.poppinsBold};
    }
  }

  .content-wrapper {
    width: 100%;
    display: grid;
    text-align: start;
    grid-template-columns: 1fr;
    column-gap: ${({ theme }) => theme.spaces.s.desktopSize};

    padding-left: ${({ theme }) => theme.spaces.s.desktopSize};
    padding-right: ${({ theme }) => theme.spaces.s.desktopSize};
  }

  .round-wrapper {
    width: 16px;
    height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    cursor: pointer;

    background: ${({ theme }) => theme.color.white};

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

      background-color: ${({ theme, checked, disabled }) => {
        if (disabled) return theme.color.white;
        if (checked) return theme.color.primary;
        return theme.color.white;
      }};
    }
  }
`;

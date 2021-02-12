import styled from "styled-components";

export const SCInfoCard = styled.div`
  width: 100%;
  max-width: 408px;
  min-height: 103px;

  padding: ${({ theme }) => theme.spaces.xs.desktopSize};

  background: ${({ theme, disabled }) =>
    disabled ? theme.color.ligthGray : theme.color.ligthPrimary};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, disabled }) =>
    disabled ? theme.color.gray : theme.color.primary};
  border-radius: 4px;
  box-sizing: border-box;

  .round-wrapper {
    position: relative;
    float: right;
    top: ${({ theme }) => theme.spaces.xs.desktopSize};

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

      background-color: ${({ theme, checked }) =>
        checked ? theme.color.primary : theme.color.white};
    }
  }
`;

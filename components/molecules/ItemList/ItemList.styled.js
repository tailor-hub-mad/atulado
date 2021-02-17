import styled from "styled-components";

export const SCItemContractList = styled.div`
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

  svg {
    margin-top: 5px;
    margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};

    fill: ${({ theme, disabled }) =>
      disabled ? theme.color.white : theme.color.black};
  }

  &:hover {
    box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
    .item-content-wrapper {
      p {
        font-family: ${({ theme }) => theme.typography.poppinsBold};
      }
    }
  }

  .content-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr 0.5fr 1fr 1fr 0.5fr 0.5fr;
    column-gap: ${({ theme }) => theme.spaces.s.desktopSize};

    padding-left: ${({ theme }) => theme.spaces.xs.desktopSize};

    & > * {
      text-align: center;
      &:not(:first-child) {
        text-align: center;
      }

      &:last-child {
        /* text-align: end; */
        text-align: center;
      }
    }

    .item-content-wrapper {
      white-space: nowrap;
      overflow: hidden;
      align-self: center;
    }

    .menu-wrapper {
      position: relative;

      .option-list-wrapper {
        width: 220px;
        position: absolute;
        top: 25px;
        left: -150px;
      }
    }
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

export const SCItemInvoiceList = styled(SCItemContractList)`
  .content-wrapper {
    grid-template-columns: 0.5fr 0.5fr 1fr 0.5fr 0.5fr 1fr 0.5fr 0.5fr 0.4fr;
  }
`;

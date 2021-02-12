import styled from "styled-components";

export const SCItemManagement = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spaces.s.desktopSize};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ theme }) => `0 ${theme.spaces.xs.desktopSize}`};

  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  p {
    color: ${({ theme, disabled }) =>
      disabled ? theme.color.white : theme.color.black};
  }

  .content-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 0.6fr 0.5fr 1.7fr 0.4fr 0.4fr;
    column-gap: ${({ theme }) => theme.spaces.s.desktopSize};

    padding: 3px 16px;

    & > * {
      text-overflow: ellipsis;

      white-space: nowrap;
      overflow: hidden;
    }

    background: ${({ theme, disabled }) =>
      disabled ? theme.color.gray : theme.color.ligthPrimary};

    border-radius: 34px;

    &:hover {
      box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
      p {
        font-family: ${({ theme }) => theme.typography.poppinsBold};
      }
    }
  }

  .button-check-wrapper {
    position: relative;
    top: -10px;
  }

  .icon-wrapper {
    padding-left: ${({ theme }) => theme.spaces.xs.desktopSize};

    svg {
      stroke: ${({ theme }) => theme.color.black};
    }
  }
`;

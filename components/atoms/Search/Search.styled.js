import styled from "styled-components";

export const SCSearch = styled.div`
  position: relative;
  display: ${({ checked }) => (checked ? "flex" : "inline-block")};
  justify-content: space-between;
  align-items: center;

  width: ${({ checked }) => (checked ? "142px" : "auto")};

  padding: 2px 5px 0 10px;

  cursor: ${({ checked }) => (checked ? "text" : "pointer")};

  box-sizing: border-box;
  border-radius: 50px;
  border: ${({ theme, checked }) =>
    checked ? `1px solid ${theme.color.primary}` : "auto"};

  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  .tag-wrapper {
    display: none;
  }

  input {
    width: 90%;
    outline: none;
    border: none;
  }

  svg {
    stroke: ${({ theme, disabled, checked }) => {
      if (disabled) return theme.color.gray;
      if (checked) return theme.color.primary;
      return theme.color.black;
    }};

    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }

  &:hover {
    svg {
      stroke: ${({ theme }) => theme.color.primary};
    }

    .tag-wrapper {
      display: inline-flex;
    }
  }
`;

import styled from "styled-components";

export const SCButtonSelect = styled.button`
  min-height: 24px;

  padding: 2px 10px 0 10px;

  font-family: ${({ theme }) => theme.typography.poppinsRegular};
  font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
  line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};
  text-align: center;
  color: ${({ theme, checked, color }) => {
    if (checked) return theme.color.white;
    return theme.color[color] || theme.color.black;
  }};
  white-space: nowrap;

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, checked, color }) => {
    if (checked) return theme.color[color] || theme.color.primary;
    return color || theme.color.black;
  }};
  border-radius: 4px;

  background: ${({ theme, checked, color }) => {
    if (checked) return theme.color[color] || theme.color.primary;
    return theme.color.white;
  }};

  &:hover {
    box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
    background: ${({ theme, checked, color }) => {
      if (checked) return theme.color[color] || theme.color.primary;
      return theme.color.white;
    }};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.gray};
    border-color: ${({ theme }) => theme.color.gray};
    background: ${({ theme }) => theme.color.white};
    cursor: not-allowed;
  }
`;

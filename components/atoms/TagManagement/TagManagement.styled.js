import styled from "styled-components";

export const SCTagManagement = styled.div`
  white-space: nowrap;

  height: 16px;

  background: ${({ color }) => color};

  border-radius: 40px;

  font-family: ${({ theme }) => theme.typography.poppinsRegular};
  font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
  line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};
  color: ${({ theme }) => theme.color.white};

  span {
    font-family: ${({ theme }) => theme.typography.poppinsRegular};
    color: ${({ theme }) => theme.color.white};
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 10px;
`;

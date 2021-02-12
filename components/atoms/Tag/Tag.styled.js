import styled from "styled-components";

export const SCTag = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(50% - 12px);
  left: calc(100% + 5px);
  white-space: nowrap;

  height: 16px;

  background: linear-gradient(0deg, #0a75d0, #0a75d0), #c4c4c4;

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
  padding: 5px 8px;
`;

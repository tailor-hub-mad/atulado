import styled from "styled-components";

export const SCTagManagement = styled.div`
  white-space: nowrap;

  width: 24px;

  background: ${({ color }) => color};

  border-radius: 40px;

  font-family: ${({ theme }) => theme.typography.poppinsRegular};
  font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
  line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};
  color: ${({ theme }) => theme.color.white};
  text-transform: capitalize;

  span {
    font-family: ${({ theme }) => theme.typography.poppinsRegular};
    color: ${({ theme }) => theme.color.white};
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 10px;

  @media only screen and (min-width: 769px) {
    width: auto;
  }
`;

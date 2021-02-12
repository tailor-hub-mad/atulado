import styled from "styled-components";

export const SCTip = styled.div`
  display: inline-block;
  max-width: 292px;

  padding: 7px 14px 14px 14px;

  p {
    font-family: ${({ theme }) => theme.typography.poppinsBold};
    font-size: ${({ theme }) => theme.typographySizes.xs.desktopSize};
    line-height: ${({ theme }) => theme.typographySizes.xs.desktopLine};
    color: ${({ theme, type }) => {
      if (type == "warning") return "#F7941E";

      return theme.color.primary;
    }};
  }

  background: ${({ type }) => {
    if (type == "warning") return "rgba(247, 148, 30, 0.2)";

    return "rgba(10, 117, 208, 0.2)";
  }};

  box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
  border-radius: 4px;

  border: ${({ theme, type }) => {
    if (type == "warning") return `1px solid #F7941E`;

    return `1px solid ${theme.color.primary}`;
  }};

  p:nth-child(n + 2) {
    margin-top: 14px;
  }

  span {
    font-family: ${({ theme }) => theme.typography.poppinsBold};
    font-size: ${({ theme }) => theme.typographySizes.xs.desktopSize};
    line-height: ${({ theme }) => theme.typographySizes.xs.desktopLine};
    color: ${({ theme }) => theme.color.primary};
  }
`;

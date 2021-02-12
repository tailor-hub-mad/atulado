import styled from "styled-components";

export const SCButtonFile = styled.button`
  display: inline;
  min-width: 175px;

  min-height: 24px;

  .button-wrapper {
    padding: 2px 10px 0 10px;
    margin-bottom: 5px;

    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme, checked, color }) => {
      if (checked) return theme.color[color] || theme.color.primary;
      return theme.color[color] || theme.color.black;
    }};
    border-radius: 4px;

    background: ${({ theme, checked, color }) => {
      if (checked) return theme.color[color] || theme.color.primary;
      return theme.color.white;
    }};

    font-family: ${({ theme }) => theme.typography.poppinsRegular};
    font-size: ${({ theme }) => theme.typographySizes.s.desktopSize};
    line-height: ${({ theme }) => theme.typographySizes.s.desktopLine};
    text-align: center;
    color: ${({ theme, checked, color }) => {
      if (checked) return theme.color.white;
      return theme.color[color] || theme.color.black;
    }};

    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: pre;

      span {
        color: ${({ theme, checked, color }) => {
          if (checked) return theme.color.white;
          return theme.color[color] || theme.color.black;
        }};
      }
    }

    &:hover {
      box-shadow: 0px 0px 16px rgba(10, 117, 208, 0.2);
      background: ${({ theme, checked, color }) => {
        if (checked) return theme.color[color] || theme.color.primary;
        return theme.color.white;
      }};
    }

    &:disabled {
      color: ${({ theme }) => theme.color.black};

      border-color: ${({ theme }) => theme.color.gray};
      background: "transparent";
      cursor: not-allowed;
      box-shadow: none;
    }

    .inputfile {
      display: none;
    }
  }

  .attach-name-wrapper {
    position: relative;
    width: 100%;

    p {
      text-align: start;
    }
  }
`;

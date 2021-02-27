import styled from "styled-components";

export const SCCardFriend = styled.section`
  background: ${({ theme }) => theme.color.white};
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  box-sizing: border-box;
  border-radius: 4px;

  padding: ${({ theme }) => theme.spaces.xs.desktopSize};

  .title-wrapper-friend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spaces.s.desktopSize};
    .icons-wrapper {
      display: flex;
      align-items: center;
      & > * {
        &:not(:first-child) {
          margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }
    }
  }

  .img-faces-wrapper {
    display: flex;
    justify-content: center;
  }

  .btn-wrapper {
    display: flex;
    justify-content: center;

    margin: ${({ theme }) => `${theme.spaces.s.desktopSize} 0`};
  }

  .options-wrapper {
    & > * {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:not(:first-child) {
        margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
      }

      .price-text {
        margin-left: ${({ theme }) => theme.spaces.xs.desktopSize};
      }
    }
  }
`;

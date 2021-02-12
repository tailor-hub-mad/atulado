import styled from "styled-components";

export const SCModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  z-index: 8;

  background: linear-gradient(
    0deg,
    rgba(10, 117, 208, 0.7),
    rgba(10, 117, 208, 0.7)
  );

  .modal-wrapper {
    max-height: ${({ type }) => {
      if (type == "claim") return "90vh";
      if (type == "address") return "60vh";
      return "50vh";
    }};

    overflow-y: auto;

    padding: ${({ theme }) => theme.spaces.xs.desktopSize};

    border-radius: 4px;

    background: ${({ theme }) => theme.color.white};

    .icon-wrapper {
      position: relative;
      float: right;

      cursor: pointer;

      svg {
        stroke: ${({ theme }) => theme.color.black};
      }
    }

    .info-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      padding: ${({ theme }) => theme.spaces.m.mobileSize};

      & > * {
        &:not(:first-child) {
          margin-top: ${({ theme }) => theme.spaces.m.desktopSize};
        }
      }

      p {
        &:not(:first-child) {
          margin-top: ${({ theme }) => theme.spaces.xs.desktopSize};
        }
      }

      a {
        font-family: ${({ theme }) => theme.typography.poppinsBold};
        text-decoration: underline;
      }

      .proxima {
        font-weight: bold;
        .green {
          color: green;
        }
        .blue {
          color: ${({ theme }) => theme.color.primary};
        }
      }

      .modal {
        text-align: center;
      }

      .claim-modal {
        form {
          & > * {
            &:not(:first-child) {
              margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
            }
          }
        }

        .claim-modal-title {
          text-align: center;
          margin-bottom: ${({ theme }) => theme.spaces.xl.mobileSize};
        }

        .submit {
          display: flex;
          justify-content: center;

          margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
          margin-bottom: ${({ theme }) => theme.spaces.xl.mobileSize};
        }

        .policy-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;

          margin-top: ${({ theme }) => theme.spaces.s.desktopSize};
        }
      }
    }
  }

  @media only screen and (min-width: 769px) {
    .modal-wrapper {
      width: ${({ type }) => {
        if (type == "address") return "60vw";
        return "40vw";
      }};

      .info-wrapper {
        padding: ${({ theme }) => theme.spaces.m.desktopSize};
      }
    }
  }
`;

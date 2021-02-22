import { pxToRem } from "./utils/functions";

const theme = {
  color: {
    primary: "#009845",
    ligthPrimary: "#F6FFFA",
    yellow: "#FBB040",
    white: "white",
    black: "black",
    red: "#9B0505",
    lightRed: "#EBCDCD",
    gray: "#C4C4C4",
    lightGray: "#DADADA",
  },
  typography: {
    poppinsRegular: "Poppins-Regular",
    poppinsBold: "Poppins-Bold",
  },
  typographySizes: {
    xl: {
      desktopSize: pxToRem(32),
      desktopLine: pxToRem(39),
      mobileSize: pxToRem(20),
      mobileLine: pxToRem(28),
    },
    l: {
      desktopSize: pxToRem(24),
      desktopLine: pxToRem(26.4),
      mobileSize: pxToRem(20),
      mobileLine: pxToRem(28),
    },
    m: {
      desktopSize: pxToRem(18),
      desktopLine: pxToRem(28),
      mobileSize: pxToRem(20),
      mobileLine: pxToRem(28),
    },
    s: {
      desktopSize: pxToRem(14),
      desktopLine: pxToRem(22),
      mobileSize: pxToRem(14),
      mobileLine: pxToRem(22),
    },
    xs: {
      desktopSize: pxToRem(10),
      desktopLine: pxToRem(15),
      mobileSize: pxToRem(10),
      mobileLine: pxToRem(15),
    },
  },
  spaces: {
    xxl: {
      desktopSize: "202px",
      mobileSize: "100px",
    },
    xl: {
      desktopSize: "160px",
      mobileSize: "55px",
    },
    l: {
      desktopSize: "80px",
      mobileSize: "42px",
    },
    m: {
      desktopSize: "64px",
      mobileSize: "32px",
    },
    s: {
      desktopSize: "32px",
      mobileSize: "24px",
    },
    xs: {
      desktopSize: "16px",
      mobileSize: "16px",
    },
  },
};
export default theme;

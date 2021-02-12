import React from "react";
import { Logo } from "../../atoms/Logo/Logo.atom";
import { SCLoadingScreen } from "./LoadingScreen.styled";

export default function LoadingScreen() {
  return (
    <SCLoadingScreen>
      <Logo type="logo" className="logo" />
    </SCLoadingScreen>
  );
}

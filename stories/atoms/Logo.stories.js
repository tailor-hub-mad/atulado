import React from "react";
import { Logo } from "../../components/atoms/Logo/Logo.atom";

export default {
  title: "Atoms/Logo",
};

export const DefaultLogo = () => <Logo />;

export const DefaultLogoWhite = () => <Logo mode="white" />;

export const LogoText = () => <Logo type="text" />;

export const LogoIcon = () => <Logo type="logo" />;

export const LogoTextWhite = () => <Logo mode="white" type="text" />;

export const LogoIconWhite = () => <Logo mode="white" type="icon" />;

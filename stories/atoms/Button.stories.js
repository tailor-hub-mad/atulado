import React from "react";
import Button from "../../components/atoms/Button/Button.atom";

export default {
  title: "Atoms/Button",
};

export const Primary = () => <Button>Button</Button>;
export const Large = () => (
  <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Button>
);
export const Disabled = () => <Button disabled>Disabled</Button>;

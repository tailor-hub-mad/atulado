import React from "react";
import { ButtonRound } from "../../components/atoms/ButtonRound/ButtonRound.atom";

export default {
  title: "Atoms/ButtonRound",
};

export const Deafult = () => <ButtonRound>This is a round button</ButtonRound>;
export const Disabled = () => (
  <ButtonRound disabled>This is a round button</ButtonRound>
);

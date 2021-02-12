import React from "react";
import { Modal } from "../../components/molecules/Modal/Modal.molecule";

export default {
  title: "Molecules/Modal",
};

export const Default = () => (
  <Modal closeAction={() => console.log("Close action")}></Modal>
);

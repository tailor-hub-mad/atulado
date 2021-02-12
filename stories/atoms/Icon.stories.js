import React from "react";
import { ButtonIcon } from "../../components/atoms/ButtonIcon/ButtonIcon.atom";

import CloseIcon from "../../public/icon/close_icon.svg";
import AddUserIcon from "../../public/icon/add-user_icon.svg";

export default {
  title: "Atoms/Icon",
};

export const Default = () => (
  <ButtonIcon icon={<CloseIcon />}>Close</ButtonIcon>
);
export const Active = () => (
  <ButtonIcon icon={<AddUserIcon />} active>
    Large text add user icon
  </ButtonIcon>
);
export const Disabled = () => (
  <ButtonIcon icon={<CloseIcon />} disabled>
    Close
  </ButtonIcon>
);

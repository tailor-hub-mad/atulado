export const getRoleCode = (role) => {
  switch (role) {
    case "Administrator":
      return 1;
    case "Manager":
      return 2;
    default:
      return 3;
  }
};

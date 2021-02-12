export const pxToRem = px => {
  const base = 10;
  const rem = `${((1 / base) * px).toFixed(2)}rem`;
  return `${px}px`;
};

export const getColor = bgColor => {
  switch (bgColor) {
    case 'red':
      return 'white';
    case 'yellow':
      return 'green';
    case 'green':
      return 'white';
    case 'white':
      return 'black';
    default:
      return 'white'
  }
}
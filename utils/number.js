export const getAverage = (numbers) => {
  if (!Array.isArray(numbers)) return null;

  const sumNumbers = numbers.reduce((acc, val) => {
    acc += val;
    return acc;
  }, 0);

  return sumNumbers / numbers.length;
};

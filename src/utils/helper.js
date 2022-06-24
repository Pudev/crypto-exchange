export const roundPrice = (price, precision = 4) => {
  return parseFloat(price).toFixed(precision);
};

export const formatAmountSmall = (value: number, toFixedDigit: number) => {
  if (isNaN(value)) return "0";
  if (value < 0.01) {
    return "< 0.01";
  }
  return Number(value).toFixed(toFixedDigit).toString();
};

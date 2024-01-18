export function formatAmountSmall(
  value: number | string,
  toFixedDigit: number,
): string {
  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    return "0.00";
  }

  // Check if the value is less than 0.01
  if (numericValue < 0.01) {
    return "< 0.01";
  }

  // Format the number and return it as a string
  return numericValue.toFixed(toFixedDigit);
}

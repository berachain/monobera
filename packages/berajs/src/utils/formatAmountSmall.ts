export function formatAmountSmall(
  value: number | string,
  toFixedDigit: number,
): string {
  const numericValue = Number(value);

  // Check if the value is not a number or is less than 0.01
  if (isNaN(numericValue) || numericValue < 0.01) {
    return numericValue < 0.01 ? "< 0.01" : "0";
  }

  // Format the number and return it as a string
  return numericValue.toFixed(toFixedDigit);
}

import BigNumber from "bignumber.js";

export function calculatePercentDifference(
  originalValue: string,
  newValue: string,
): BigNumber {
  if (originalValue === "0") {
    // Avoid division by zero
    return BigNumber(0);
  }

  const newValueBN = BigNumber(newValue);
  const originalValueBN = BigNumber(originalValue);
  // Calculate the percent difference
  const diff = newValueBN.minus(originalValue);
  return diff.div(originalValueBN).times(100);
}

export function calculatePercentDifference(
  originalValue: number,
  newValue: number,
): number {
  if (originalValue === 0) {
    // Avoid division by zero
    return 0;
  }

  // Calculate the percent difference
  const difference = newValue - originalValue;
  const percentDifference = (difference / Math.abs(originalValue)) * 100;

  return percentDifference;
}

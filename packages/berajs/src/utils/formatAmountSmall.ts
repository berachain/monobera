export function formatAmountSmall(value: number | string): {
  isSmall: boolean;
  numericValue: number;
} {
  const numericValue = Number(value);

  if (isNaN(numericValue) || numericValue === 0) {
    return { isSmall: false, numericValue: 0 };
  }

  // Check if the value is less than 0.01
  if (numericValue < 0.01) {
    return { isSmall: false, numericValue: 0.01 };
  }

  // return the if number if small and the numericValue
  return { isSmall: true, numericValue };
}

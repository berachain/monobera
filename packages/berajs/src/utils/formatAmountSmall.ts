export function formatAmountSmall(value: number | string): {
  isSmall: boolean;
  numericValue: number;
} {
  const numericValue = Number(value);
  let isSmall = false;

  if (isNaN(numericValue)) {
    return { isSmall, numericValue: 0 };
  }

  // Check if the value is less than 0.01
  if (numericValue < 0.01) {
    isSmall = true;
    return { isSmall, numericValue: 0.01 };
  }

  // return the number
  return { isSmall, numericValue };
}

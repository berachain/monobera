export const getScientificNotationToBigInt = (value: string) => {
  // Check if the value is in scientific notation
  if (!value.includes("e")) {
    return value;
  }

  const num = Number(value);
  if (Number.isNaN(num)) {
    return "0";
  }
  // Handle large numbers
  if (num > Number.MAX_SAFE_INTEGER) {
    const [base, exponent] = value.split("e").map((item) => Number(item));
    if (base && exponent) {
      const zeros = "0".repeat(
        Math.max(0, exponent - (base.toString().split(".")[1]?.length || 0)),
      );
      return base.toString().replace(".", "") + zeros;
    }
  }

  return num.toString();
};

export function formatAmountBig(input: string | number): string {
  const isNumber = (value: any): value is number => typeof value === "number";
  const isString = (value: any): value is string => typeof value === "string";

  if (!isNumber(input) && !isString(input)) {
    throw new Error("Invalid input: input must be a string or a number.");
  }

  let num: number;

  if (isString(input)) {
    num = parseFloat(input);
    if (Number.isNaN(num)) {
      throw new Error(
        "Invalid input: string input must be convertible to a number.",
      );
    }
  } else {
    num = input;
  }

  const config = { maximumFractionDigits: 2 };
  if (num >= 1000000000000) {
    return `${new Intl.NumberFormat("en-US", config).format(
      num / 1000000000000,
    )}T`;
  }
  if (num >= 1000000000) {
    return `${new Intl.NumberFormat("en-US", config).format(
      num / 1000000000,
    )}B`;
  }
  if (num >= 1000000) {
    return `${new Intl.NumberFormat("en-US", config).format(num / 1000000)}M`;
  }
  if (num >= 1000) {
    return `${new Intl.NumberFormat("en-US", config).format(num / 1000)}K`;
  }
  return new Intl.NumberFormat("en-US", config).format(num);
}

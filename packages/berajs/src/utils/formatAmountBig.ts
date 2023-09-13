export function formatAmountBig(input: string | number): string {
  const isNumber = (value: any): value is number => typeof value === "number";
  const isString = (value: any): value is string => typeof value === "string";

  if (!isNumber(input) && !isString(input)) {
    throw new Error("Invalid input: input must be a string or a number.");
  }

  let num: number;

  if (isString(input)) {
    num = parseFloat(input);
    if (isNaN(num)) {
      throw new Error(
        "Invalid input: string input must be convertible to a number.",
      );
    }
  } else {
    num = input;
  }

  if (num >= 1000000000000) {
    return (
      new Intl.NumberFormat("en-US", { maximumSignificantDigits: 5 }).format(
        num / 1000000000000,
      ) + "T"
    );
  } else if (num >= 1000000000) {
    return (
      new Intl.NumberFormat("en-US", { maximumSignificantDigits: 5 }).format(
        num / 1000000000,
      ) + "B"
    );
  } else if (num >= 1000000) {
    return (
      new Intl.NumberFormat("en-US", { maximumSignificantDigits: 5 }).format(
        num / 1000000,
      ) + "M"
    );
  } else if (num >= 1000) {
    return (
      new Intl.NumberFormat("en-US", { maximumSignificantDigits: 5 }).format(
        num / 1000,
      ) + "K"
    );
  } else {
    return new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 5,
    }).format(num);
  }
}

export function formatUsd(input: string | number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  try {
    const isNumber = (value: any): value is number => typeof value === "number";
    const isString = (value: any): value is string => typeof value === "string";

    if (!isNumber(input) && !isString(input)) {
      return formatter.format(0);
    }

    let num: number;

    if (isString(input)) {
      num = parseFloat(input);
      // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
      if (isNaN(num)) {
        num = 0;
      }
    } else {
      num = input;
      // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
      if (isNaN(num)) {
        num = 0;
      }
    }
    return formatter.format(num);
  } catch (e) {
    console.log(e);
    return formatter.format(0);
  }
}

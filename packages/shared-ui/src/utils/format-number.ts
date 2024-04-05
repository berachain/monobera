/**
 * takes a @num and discards any numbers to the right side of the decimal past the @maxDecimalPlaces number of decimal places.
 * ex: number 1.1234 with max 3 will give 1.123 1.1 with max 3 will give 1.1
 * @param num
 * @param maxDecimalPlaces
 */
export const truncateFloat = (
  num: string | number | undefined | null,
  maxDecimalPlaces: number,
) => {
  if (!num) return;
  const [left, right] =
    typeof num === "number" ? num.toString().split(".") : num.split(".");
  return parseFloat(`${left}.${right?.slice(0, maxDecimalPlaces + 1)}`);
};

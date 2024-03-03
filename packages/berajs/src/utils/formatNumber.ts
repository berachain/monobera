export function formatNumber(num: number) {
  // Convert to string with up to 8 decimal places
  let formatted = num.toFixed(8);
  // Remove trailing zeros and decimal point if not needed
  formatted = formatted.replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
  return formatted;
}

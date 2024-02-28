export function formatNumber(num: number) {
  // Convert to string with up to 6 decimal places
  let formatted = num.toFixed(6);
  // Remove trailing zeros and decimal point if not needed
  formatted = formatted.replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
  return formatted;
}

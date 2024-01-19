export const formatInputTokenValue = (inputValue: string) => {
  // Remove all non-numeric characters except for the decimal point, and remove leading zeros
  let filteredValue = inputValue.replace(/^0+/, "").replace(/[^0-9.eE]/g, "");

  // Keep the 0
  if (filteredValue.startsWith(".")) {
    filteredValue = "0" + filteredValue;
  }

  return filteredValue;
};

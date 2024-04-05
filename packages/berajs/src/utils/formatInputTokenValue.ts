export const formatInputTokenValue = (inputValue: string) => {
  if (inputValue === "0") return inputValue;
  // Remove all non-numeric characters except for the decimal point, and remove leading zeros
  let filteredValue = inputValue.replace(/^0+/, "").replaceAll(/[^0-9.]/g, "");

  // Keep the 0
  if (filteredValue.startsWith(".")) {
    filteredValue = `0${filteredValue}`;
  }

  return filteredValue;
};

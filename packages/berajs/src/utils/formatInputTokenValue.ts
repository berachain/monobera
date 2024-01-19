export const formatInputTokenValue = (inputValue: string) => {
  // Remove all non-numeric characters except for the decimal point, and remove leading zeros
  let filteredValue = inputValue.replace(/[^0-9.]/g, "").replace(/^0+/, "");

  // Keep the 0
  if (filteredValue.startsWith(".")) {
    filteredValue = "0" + filteredValue;
  }

  // If the input becomes empty, reset it to '0'
  if (filteredValue === "") {
    filteredValue = "0";
  }
  return filteredValue;
};

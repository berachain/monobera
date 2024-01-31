export const getSafeNumber = (value: string | undefined): string => {
  // Check if value is a valid number
  if (!value || Number.isNaN(Number(value))) return "0";

  return Number(value) > Number.MAX_SAFE_INTEGER
    ? Number.MAX_SAFE_INTEGER.toString()
    : value;
};

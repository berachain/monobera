/**
 * Truncate a transaction or address hash
 */
export const truncateHash = (
  address: `0x${string}`,
  startLength = 4,
  endLength = 4,
) => {
  if (!address) return "";

  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength,
  )}`;
};

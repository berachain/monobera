import { formatUnits } from "viem";

export const formatCommission = (commission: bigint) => {
  return (Number(formatUnits(commission, 18)) * 100).toFixed(2);
};

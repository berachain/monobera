import { blockTime } from "@bera/config";
import { formatUnits } from "viem";

import { type Validator } from "./usePollActiveValidators";

export const getPercentageGlobalVotingPower = (
  validator: Validator | undefined,
  total: number | undefined,
) => {
  if (total && validator) {
    return (Number(formatUnits(BigInt(validator.tokens), 18)) / total) * 100;
  }
  return undefined;
};

export const getEstimatedBlocksPerYear = (
  percentageGlobalVotingPower: number | undefined,
) => {
  const blocksPerYear = (365 * 24 * 60 * 60) / blockTime;
  return percentageGlobalVotingPower
    ? (percentageGlobalVotingPower * blocksPerYear) / 100
    : 0;
};

export const getValidatorTotalDelegated = (
  validator: Validator | undefined,
): number => {
  if (!validator) return 0;
  return Number(formatUnits(BigInt(validator?.tokens), 18));
};

import { useCallback, useMemo } from "react";
import { usePollValidatorInfo, type Validator } from "@bera/berajs";
import { blockTime } from "@bera/config";

export const useValidatorEstimatedBgtPerYear = (
  validator: Validator,
): number => {
  const { validatorCounts } = usePollValidatorInfo();

  return useMemo(() => {
    if (!validatorCounts || !validator) return 0;
    const estimatedBlocksPerYear = (365 * 24 * 60 * 60) / blockTime;
    const estimatedValidatorBlocksPerYear =
      estimatedBlocksPerYear / validatorCounts;
    return estimatedValidatorBlocksPerYear * parseFloat(validator.rewardRate);
  }, [validatorCounts, validator]);
};

export const getValidatorEstimatedBgtPerYear = (
  validator: Validator,
  validatorCounts: number,
): number => {
  if (!validatorCounts || !validator) return 0;
  const estimatedBlocksPerYear = (365 * 24 * 60 * 60) / blockTime; // Ensure blockTime is defined somewhere in your code
  const estimatedValidatorBlocksPerYear =
    estimatedBlocksPerYear / validatorCounts;
  return estimatedValidatorBlocksPerYear * parseFloat(validator.rewardRate);
};

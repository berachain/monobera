import { useMemo } from "react";
import {
  useBlockTime,
  usePollValidatorInfo,
  type Validator,
} from "@bera/berajs";

export const useValidatorEstimatedBgtPerYear = (
  validator: Validator,
): number => {
  const { validatorCounts } = usePollValidatorInfo();
  const blockTime = useBlockTime();
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
  const blockTime = useBlockTime();
  if (!validatorCounts || !validator) return 0;
  const estimatedBlocksPerYear = (365 * 24 * 60 * 60) / blockTime; // Ensure blockTime is defined somewhere in your code
  const estimatedValidatorBlocksPerYear =
    estimatedBlocksPerYear / validatorCounts;
  return estimatedValidatorBlocksPerYear * parseFloat(validator.rewardRate);
};

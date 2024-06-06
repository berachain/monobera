import { usePollValidatorInfo, type Validator } from "@bera/berajs";
import { blockTime } from "@bera/config";
import { useMemo } from "react";

export const useValidatorEstimatedBgtPerYear = (
  validator: Validator,
): number => {
  const { validatorCounts } = usePollValidatorInfo();

  console.log(validator);
  return useMemo(() => {
    if (!validatorCounts || !validator) return 0;
    const estimatedBlocksPerYear = (365 * 24 * 60 * 60) / blockTime;
    console.log(estimatedBlocksPerYear);
    const estimatedValidatorBlocksPerYear =
      estimatedBlocksPerYear / validatorCounts;
    console.log(
      estimatedValidatorBlocksPerYear,
      parseFloat(validator.rewardRate),
    );
    return estimatedValidatorBlocksPerYear * parseFloat(validator.rewardRate);
  }, [validatorCounts, validator]);
};

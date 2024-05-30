import useSWR, { mutate } from "swr";
import { Address } from "viem";

import { GetValidatorData, getValidators } from "~/actions/bgt/getValidators";
import { useBeraJs } from "~/contexts";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  ValidatorData,
} from "~/types";

export interface UsePollValidatorsResponse
  extends DefaultHookReturnType<GetValidatorData> {
  validatorList: ValidatorData[];
  validatorDictionary: { [key: Address]: ValidatorData };
}

export const usePollValidators = (
  // filter?: ValidatorFilter,
  options?: DefaultHookOptions,
): UsePollValidatorsResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollValidatorData"];
  const swrResponse = useSWR<GetValidatorData, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getValidators(config),
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    validatorList: swrResponse.data?.validatorList ?? [],
    validatorDictionary: swrResponse.data?.validatorDictionary ?? {},
    refresh: () => mutate(QUERY_KEY),
  };
};

import useSWR, { mutate } from "swr";
import { Address } from "viem";

import {
  GetValidatorsInfo,
  ValidatorFilter,
  getValidatorsInfo,
} from "~/actions/bgt/getValidatorsInfo";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType, Validator } from "~/types";

export interface UsePollValidatorInfoResponse
  extends DefaultHookReturnType<GetValidatorsInfo> {
  validatorInfoList: Validator[];
  validatorInfoDictionary: { [key: Address]: Validator };
  validatorCounts: number;
}

export const usePollValidatorInfo = (
  filter?: ValidatorFilter,
  options?: DefaultHookOptions,
): UsePollValidatorInfoResponse => {
  const { config: beraConfig, account } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollValidatorInfo", config, account, filter];
  const swrResponse = useSWR<GetValidatorsInfo, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      return await getValidatorsInfo(config, filter);
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    validatorInfoList: swrResponse.data?.validatorInfoList ?? [],
    validatorInfoDictionary: swrResponse.data?.validatorInfoDictionary ?? {},
    validatorCounts: swrResponse.data?.counts ?? 0,
    refresh: () => mutate(QUERY_KEY),
  };
};

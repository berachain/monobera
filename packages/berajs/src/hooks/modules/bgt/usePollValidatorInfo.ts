import useSWR, { mutate } from "swr";
import { Address } from "viem";

import {
  GetValidatorsInfo,
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
  options?: DefaultHookOptions,
): UsePollValidatorInfoResponse => {
  const { config: beraConfig, account } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollValidatorInfo", config, account];
  const swrResponse = useSWR<GetValidatorsInfo, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      return await getValidatorsInfo(config);
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    validatorInfoList: swrResponse.data?.validatorInfoList ?? [],
    validatorInfoDictionary: swrResponse.data?.validatorInfoDictionary ?? {},
    validatorCounts: swrResponse.data?.validatorInfoList.length ?? 0,
    refresh: () => mutate(QUERY_KEY),
  };
};

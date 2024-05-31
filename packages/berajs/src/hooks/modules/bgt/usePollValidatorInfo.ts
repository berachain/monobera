import useSWR, { mutate } from "swr";
import { Address } from "viem";

import {
  GetValidatorsInfo,
  getValidatorsInfo,
} from "~/actions/bgt/getValidatorsInfo";
import { useBeraJs } from "~/contexts";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  ValidatorInfo,
} from "~/types";

export interface UsePollValidatorInfoResponse
  extends DefaultHookReturnType<GetValidatorsInfo> {
  validatorInfoList: ValidatorInfo[];
  validatorInfoDictionary: { [key: Address]: ValidatorInfo };
  validatorCounts: number;
}

export const usePollValidatorInfo = (
  options?: DefaultHookOptions,
): UsePollValidatorInfoResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollValidatorInfo"];
  const swrResponse = useSWR<GetValidatorsInfo, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getValidatorsInfo(config),
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

import useSWR, { mutate } from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  BoostedQueueInfo,
  getUserBoostedQueue,
} from "~/actions/bgt/getUserQueueInfo";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";
import { usePollValidators } from "./usePollValidators";

export interface UsePollValidatorInfoResponse
  extends DefaultHookReturnType<{
    [key: Address]: BoostedQueueInfo;
  }> {}

export const usePollUserQueuedBoost = (
  options?: DefaultHookOptions,
): UsePollValidatorInfoResponse => {
  const publicClient = usePublicClient();
  const { account, isConnected, config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const { validatorList } = usePollValidators();
  const validatorAddressList = validatorList.map((validator) => validator.id);
  const QUERY_KEY = [
    account,
    isConnected,
    validatorAddressList,
    "usePollUserQueuedBoost",
  ];

  const swrResponse = useSWR<any>(
    QUERY_KEY,
    async () =>
      await getUserBoostedQueue({
        account,
        validatorAddressList,
        config,
        publicClient,
      }),
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: () => mutate(QUERY_KEY),
  };
};

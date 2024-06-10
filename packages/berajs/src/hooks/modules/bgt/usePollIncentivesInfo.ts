import useSWR from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  IncentiveInfo,
  getIncentivesInfo,
} from "~/actions/bgt/getIncentivesInfo";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export interface IUsePollIcentivesInfo
  extends DefaultHookReturnType<IncentiveInfo | undefined> {}

export const usePollIcentivesInfo = (
  token: Address,
  vault: Address,
  options?: DefaultHookOptions,
): IUsePollIcentivesInfo => {
  const publicClient = usePublicClient();
  const QUERY_KEY = "usePollIcentivesInfo";
  const swrResponse = useSWR<IncentiveInfo | undefined, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getIncentivesInfo(publicClient, token, vault),
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: swrResponse.mutate,
  };
};

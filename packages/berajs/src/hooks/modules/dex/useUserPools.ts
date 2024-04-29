import useSWR from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { getUserPools } from "~/actions";
import { useBeraJs } from "~/contexts";
import { IUserPool } from "~/types";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";

type UseUserPoolsDataArgs = {
  account: Address;
};
export const useUserPools = (
  { account }: UseUserPoolsDataArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<IUserPool[] | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const publicClient = usePublicClient();
  const QUERY_KEY = ["UseUserPools", account];
  const swrResponse = useSWR<IUserPool[] | undefined, any, any>(
    QUERY_KEY,
    async () => {
      if (!account || !publicClient) return;
      return await getUserPools({
        args: { account },
        config,
        publicClient,
      });
    },
  );

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};

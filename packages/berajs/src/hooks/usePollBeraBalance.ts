import useSWR from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { getBeraBalance } from "~/actions/dex/getBeraBalance";
import POLLING from "~/enum/polling";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  TokenBalance,
} from "~/types/global";

export type UsePollBeraBalanceArgs = {
  address: Address | undefined;
};

export const usePollBeraBalance = (
  args: UsePollBeraBalanceArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<TokenBalance | undefined> => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [args.address, "beraBalance"];
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      return await getBeraBalance({ account: args.address, publicClient });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );
  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};

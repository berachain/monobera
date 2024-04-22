import useSWR, { mutate } from "swr";
import { usePublicClient } from "wagmi";

import { getBeraBalance } from "~/actions/dex/getBeraBalance";
import POLLING from "~/enum/polling";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  TokenBalance,
} from "~/types/global";
import { useBeraJs } from "../contexts";
import { Address } from "viem";

export type UsePollBeraBalanceArgs = {
  address: Address | undefined;
};
export interface UsePollBeraBalancesResponse
  extends DefaultHookReturnType<TokenBalance | undefined> {
  refetch: () => void;
}

export const usePollBeraBalance = (
  args: UsePollBeraBalanceArgs,
  options?: DefaultHookOptions,
): UsePollBeraBalancesResponse => {
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
    refetch: () => void mutate(QUERY_KEY),
  };
};

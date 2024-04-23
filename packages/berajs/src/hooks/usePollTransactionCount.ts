import useSWR, { mutate } from "swr";
import { usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";
import { getTransactionCount } from "../actions/dex";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { Address } from "viem";

export interface UserPollTransactionCountArgs {
  address: Address | undefined;
}

export interface UserPollTransactionCountResponse
  extends DefaultHookReturnType<number | undefined> {
  refresh: () => void;
}

export const usePollTransactionCount = (
  args: UserPollTransactionCountArgs,
  options?: DefaultHookOptions,
): UserPollTransactionCountResponse => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [args.address, "txnCount"];
  const swrResponse = useSWR<number | undefined>(
    QUERY_KEY,
    async () => {
      return getTransactionCount({ address: args.address, publicClient });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );

  return {
    ...swrResponse,
    refresh: () => mutate(QUERY_KEY),
  };
};

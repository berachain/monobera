import useSWR, { mutate } from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { getTransactionCount } from "../actions/dex";

export interface UserPollTransactionCountArgs {
  address: Address | undefined;
}

export const usePollTransactionCount = (
  args: UserPollTransactionCountArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<number | undefined> => {
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
    refresh: () => swrResponse?.mutate?.(),
  };
};

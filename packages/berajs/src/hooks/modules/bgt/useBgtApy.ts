import useSWR from "swr";
import { Address } from "viem";

import { getBgtApy } from "~/actions/bgt/getBgtApy";
import { useBeraJs, useBlockTime } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";

/**
 *
 * @returns the current honey price of a given token
 */

export type UseBgtApyArgs = {
  receiptTokenAddress: Address | undefined;
  tvlInHoney: number | undefined;
};

export const useBgtApy = (
  args: UseBgtApyArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<string | undefined> => {
  const QUERY_KEY = ["bgtApy", args.receiptTokenAddress, args.tvlInHoney];
  const { config: beraConfig } = useBeraJs();
  const blockTime = useBlockTime();
  const swrResponse = useSWR<string | undefined>(
    QUERY_KEY,
    async () => {
      return getBgtApy({
        blockTime,
        receiptTokenAddress: args.receiptTokenAddress,
        tvlInHoney: args.tvlInHoney,
        config: options?.beraConfigOverride ?? beraConfig,
      });
    },
    {
      ...options,
      ...(options?.opts ?? {}),
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );
  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};

import useSWR, { mutate } from "swr";

import { getTokenHoneyPrice } from "~/actions/honey";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { useBeraJs } from "..";

/**
 *
 * @returns the current honey price of a given token
 */

export type UseTokenHoneyPriceArgs = {
  tokenAddress: `0x${string}` | undefined;
};

export interface UseTokenHoneyPriceResponse
  extends DefaultHookReturnType<string | undefined> {
  refetch: () => void;
}

export const useTokenHoneyPrice = (
  { tokenAddress = undefined }: UseTokenHoneyPriceArgs,
  options?: DefaultHookOptions,
): UseTokenHoneyPriceResponse => {
  const method = "tokenHoneyPrice";
  const QUERY_KEY = [tokenAddress, method];
  const { config: beraConfig } = useBeraJs();
  const swrResponse = useSWR<string | undefined>(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrice({
        tokenAddress,
        config: options?.beraConfigOverride ?? beraConfig,
      });
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST,
    },
  );
  return {
    ...swrResponse,
    refetch: () => void mutate(QUERY_KEY),
  };
};

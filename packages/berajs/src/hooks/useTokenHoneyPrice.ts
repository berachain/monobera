import useSWR from "swr";

import { getTokenHoneyPrice } from "~/actions/honey";
import { DefaultHookOptions } from "~/types/global";
import { useBeraJs } from "..";

/**
 *
 * @returns the current honey price of a given token
 */

export type UseTokenHoneyPriceArgs = {
  tokenAddress: `0x${string}` | undefined;
};

export interface UseTokenHoneyPriceResponse {
  isLoading: boolean;
  isValidating: boolean;
  data: string | undefined;
}

export const useTokenHoneyPrice = (
  { tokenAddress = undefined }: UseTokenHoneyPriceArgs,
  options?: DefaultHookOptions,
) => {
  const method = "tokenHoneyPrice";
  const QUERY_KEY = [tokenAddress, method];
  const { config: beraConfig } = useBeraJs();
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrice({
        tokenAddress,
        config: options?.beraConfigOverride ?? beraConfig,
      });
    },
    {
      ...options?.opts,
    },
  );
  return {
    isLoading,
    isValidating,
    data,
  };
};

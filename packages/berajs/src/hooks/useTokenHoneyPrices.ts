import useSWR from "swr";

import { getTokenHoneyPrices } from "~/actions/honey";
import POLLING from "~/enum/polling";
import { DefaultHookOptions } from "~/types/global";
import { useBeraJs } from "..";

/**
 *
 * @returns the current honey price of a series of tokens
 */
export type UseTokenHoneyPricesArgs = {
  tokenAddresses: string[] | undefined;
};

export interface UseTokenHoneyPricesResponse {
  isLoading: boolean;
  isValidating: boolean;
  data: { [key: string]: string } | undefined;
}

export const useTokenHoneyPrices = (
  { tokenAddresses = undefined }: UseTokenHoneyPricesArgs,
  options?: DefaultHookOptions,
): UseTokenHoneyPricesResponse => {
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  const { config: beraConfig } = useBeraJs();
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrices({
        tokenAddresses,
        config: options?.beraConfigOverride ?? beraConfig,
      });
    },
    {
      ...options?.opts,
      refreshInterval:
        options?.opts?.refreshInterval ?? POLLING.REFRESH_BLOCK_INTERVAL,
    },
  );

  return {
    isLoading,
    isValidating,
    data,
  };
};

import useSWR, { mutate } from "swr";

import { TokenHoneyPrices, getTokenHoneyPrices } from "~/actions/honey";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { useBeraJs } from "../..";

/**
 *
 * @returns the current honey price of a series of tokens
 */
export type UseTokenHoneyPricesArgs = {
  tokenAddresses: string[] | undefined;
};

export const useTokenHoneyPrices = (
  { tokenAddresses = undefined }: UseTokenHoneyPricesArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<TokenHoneyPrices | undefined> => {
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  const { config: beraConfig } = useBeraJs();
  const swrResponse = useSWR(
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
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};

import useSWR from "swr";

import { TokenHoneyPrices, getTokenHoneyPrices } from "~/actions/honey";
import POLLING from "~/enum/polling";
import { DefaultHookProps, DefaultHookReturnType } from "~/types/global";

/**
 *
 * @returns the current honey price of a series of tokens
 */
export type UseTokenHoneyPricesRequest = DefaultHookProps<{
  tokenAddresses: string[] | undefined;
}>;

export interface UseTokenHoneyPricesResponse {
  isLoading: boolean;
  isValidating: boolean;
  data: { [key: string]: string } | undefined;
}

export const useTokenHoneyPrices = ({
  config,
  args: { tokenAddresses } = { tokenAddresses: undefined },
  opts,
}: UseTokenHoneyPricesRequest): DefaultHookReturnType<
  TokenHoneyPrices | undefined
> => {
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrices({ tokenAddresses, config });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.NORMAL },
  );

  return {
    ...swrResponse,
  };
};

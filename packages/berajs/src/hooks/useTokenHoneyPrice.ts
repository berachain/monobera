import useSWR from "swr";

import { getTokenHoneyPrice } from "~/actions/honey";
import POLLING from "~/enum/polling";
import { DefaultHookProps, DefaultHookReturnType } from "~/types/global";

/**
 *
 * @returns the current honey price of a given token
 */

export type UseTokenHoneyPriceRequest = DefaultHookProps<{
  tokenAddress: `0x${string}` | undefined;
}>;

export interface UseTokenHoneyPriceResponse {
  isLoading: boolean;
  isValidating: boolean;
  data: string | undefined;
}

export const useTokenHoneyPrice = ({
  config,
  args: { tokenAddress } = { tokenAddress: undefined },
  opts,
}: UseTokenHoneyPriceRequest): DefaultHookReturnType<string | undefined> => {
  const method = "tokenHoneyPrice";
  const QUERY_KEY = [tokenAddress, method];
  const swrResponse = useSWR<string | undefined>(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrice({ tokenAddress, config });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.FAST },
  );
  return {
    ...swrResponse,
  };
};

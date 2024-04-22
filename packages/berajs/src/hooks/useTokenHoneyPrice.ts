import useSWR, { mutate } from "swr";

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

export interface UseTokenHoneyPriceResponse
  extends DefaultHookReturnType<string | undefined> {
  refetch: () => void;
}

export const useTokenHoneyPrice = ({
  config,
  args: { tokenAddress } = { tokenAddress: undefined },
  opts,
}: UseTokenHoneyPriceRequest): UseTokenHoneyPriceResponse => {
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
    refetch: () => void mutate(QUERY_KEY),
  };
};

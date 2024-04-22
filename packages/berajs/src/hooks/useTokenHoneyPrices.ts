import useSWR, { mutate } from "swr";

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

export interface UseTokenHoneyPricesResponse
  extends DefaultHookReturnType<TokenHoneyPrices | undefined> {
  refetch: () => void;
}

export const useTokenHoneyPrices = ({
  config,
  args,
  opts,
}: UseTokenHoneyPricesRequest): UseTokenHoneyPricesResponse => {
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [args.tokenAddresses, method];
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrices({
        tokenAddresses: args.tokenAddresses,
        config,
      });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.NORMAL },
  );

  return {
    ...swrResponse,
    refetch: () => void mutate(QUERY_KEY),
  };
};

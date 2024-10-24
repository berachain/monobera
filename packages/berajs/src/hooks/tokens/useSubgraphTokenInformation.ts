import useSWR, { mutate } from "swr";

import { getTokenHoneyPrice } from "~/actions/honey";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { Token, useBeraJs } from "../..";
import { getSubgraphTokenInformation } from "~/actions/shared/getSubgraphTokenInformation";

/**
 *
 * @returns the current honey price of a given token
 */

export type UseSubgraphTokenInformationArgs = {
  tokenAddress: `0x${string}` | undefined;
};

export const useSubgraphTokenInformation = (
  args: UseSubgraphTokenInformationArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<Token | undefined> => {
  const method = "subgraphTokenInformation";
  const QUERY_KEY = [args.tokenAddress, method];
  const { config: beraConfig } = useBeraJs();
  const swrResponse = useSWR<Token | undefined>(
    QUERY_KEY,
    async () => {
      return getSubgraphTokenInformation({
        tokenAddress: args.tokenAddress,
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
    refresh: () => swrResponse?.mutate?.(),
  };
};

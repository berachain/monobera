import useSWR, { mutate } from "swr";

import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { useBeraJs } from "../..";
import {
  getSubgraphTokenInformations,
  SubgraphTokenInformations,
} from "~/actions/shared/getSubgraphTokenInformations";

/**
 *
 * @returns the current honey price of a series of tokens
 */
export type UseSubgraphTokenInformationsArgs = {
  tokenAddresses: string[] | undefined;
};

export const useSubgraphTokenInformations = (
  { tokenAddresses = undefined }: UseSubgraphTokenInformationsArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<SubgraphTokenInformations | undefined> => {
  const method = "subgraphTokenInformations";
  const QUERY_KEY = [tokenAddresses, method];
  const { config: beraConfig } = useBeraJs();
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      return getSubgraphTokenInformations({
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

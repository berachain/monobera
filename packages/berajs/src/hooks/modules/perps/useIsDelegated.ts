import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { getIsDelegated } from "~/actions/perps/getIsDelegated";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

/**
 * Hook to check if the user has delegated their positions.
 *
 * @see {@link getIsDelegated}
 */
export const useIsDelegated = (
  options?: DefaultHookOptions,
): DefaultHookReturnType => {
  const publicClient = usePublicClient();
  const method = "delegations";
  const { account, config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = [account, method];
  const swrResponse = useSWRImmutable(
    QUERY_KEY,
    async () => {
      try {
        if (!publicClient) throw new Error("Public client not found");
        if (!account) throw new Error("Account not found");
        return await getIsDelegated({
          args: { account },
          config,
          client: publicClient,
        });
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};

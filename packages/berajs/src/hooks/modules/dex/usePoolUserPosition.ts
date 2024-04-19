import useSWR from "swr";
import { useAccount, usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";
import { PoolV2, useBeraJs, type IUserPosition } from "../../..";
import { getPoolUserPosition } from "../../../actions";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
} from "../../../types/global";

type IUsePoolUserPositionArgs = {
  pool: PoolV2;
};

/**
 * Given a pool and used within an initialized viem context, returns the user's position
 */
export const usePoolUserPosition = (
  { pool }: IUsePoolUserPositionArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<IUserPosition | undefined> => {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePoolUserPosition", account, pool.poolIdx];
  const swrResponse = useSWR<IUserPosition | undefined, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      if (!account || !publicClient) return;
      return await getPoolUserPosition({
        args: {
          pool,
          account,
        },
        config,
        publicClient,
      });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST,
    },
  );

  return swrResponse;
};

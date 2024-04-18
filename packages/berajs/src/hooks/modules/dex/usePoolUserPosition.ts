import useSWR from "swr";
import { useAccount, usePublicClient } from "wagmi";

import { PoolV2, type IUserPosition } from "../../..";
import { getPoolUserPosition } from "../../../actions";
import { DefaultHookProps, DefaultHookReturnType } from "../../../types/global";

/**
 * Given a pool and used within an initialized viem context, returns the user's position
 */
export const usePoolUserPosition = ({
  args: { pool },
  config,
  opts,
}: DefaultHookProps<
  {
    pool: PoolV2;
  },
  false
>): DefaultHookReturnType<IUserPosition | undefined> => {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
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
    opts,
  );

  return swrResponse;
};

import { useState } from "react";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import { useAnalytics } from "@bera/shared-ui/src/utils/analytics";
import useSWR from "swr";

import { PoolV2 } from "~/app/pools/fetchPools";

export const usePoolHistory = ({ pool }: { pool: PoolV2 }) => {
  const { captureException } = useAnalytics();
  const [poolHistory, setPoolHistory] = useState<any | null>(null);

  const { isLoading, isValidating } = useSWR(
    [pool?.base, pool?.quote, pool?.poolIdx, chainId.toString(16)],
    () => {
      if (!pool) return;
      return fetch(
        `${crocIndexerEndpoint}/v2/pool_history?chainId=0x${chainId.toString(
          16,
        )}&base=${pool.base}&quote=${pool.quote}&poolIdx=${
          pool.poolIdx
        }&days=7`,
      )
        .then((data) => data.json())
        .then((data) => {
          setPoolHistory(data?.data);
        })
        .catch((e) => {
          captureException(e);
        });
    },
    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );

  return { poolHistory, isLoading, isValidating };
};

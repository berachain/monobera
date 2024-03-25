import { chainId, crocIndexerEndpoint } from "@bera/config";
import { type PoolDayDataV2 } from "@bera/graphql";
import { useAnalytics } from "@bera/shared-ui/src/utils/analytics";
import useSWRImmutable from "swr/immutable";

import { PoolV2 } from "~/app/pools/fetchPools";

export const usePoolHistory = ({ pool }: { pool: PoolV2 }) => {
  const { captureException } = useAnalytics();

  const QUERY_KEY = [
    pool?.base,
    pool?.quote,
    pool?.poolIdx,
    chainId.toString(16),
  ];
  const { isLoading, isValidating, mutate } = useSWRImmutable<
    PoolDayDataV2[],
    any,
    any
  >(QUERY_KEY, () => {
    if (!pool) return;
    return fetch(
      `${crocIndexerEndpoint}/v2/pool_history?chainId=0x${chainId.toString(
        16,
      )}&base=${pool.base}&quote=${pool.quote}&poolIdx=${pool.poolIdx}&days=90`,
    )
      .then((data) => data.json())
      .then((data) => {
        return data?.data;
      })
      .catch((e) => {
        captureException(e);
      });
  });

  const usePoolHistoryData = () => {
    return useSWRImmutable<PoolDayDataV2[], any, any>(QUERY_KEY);
  };

  return {
    refetch: () => void mutate(),
    isLoading,
    isValidating,
    usePoolHistoryData,
  };
};

import { type PoolV2 } from "@bera/berajs";
import { POLLING } from "@bera/shared-ui";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import { useCrocPool } from "./useCrocPool";

export const useCrocPoolPrice = (pool: PoolV2 | undefined) => {
  const crocPool = useCrocPool(pool);
  const QUERY_KEY = [crocPool, pool];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!crocPool || !pool) {
        return undefined;
      }

      return await crocPool.displayPricePoolIdx(pool.poolIdx);
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const usePoolPrice = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePoolPrice,
  };
};

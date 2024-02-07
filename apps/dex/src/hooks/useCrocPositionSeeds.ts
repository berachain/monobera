import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import { useCrocPosition } from "./useCrocPosition";
import useSWRImmutable from "swr/immutable";
import { type BigNumber } from "ethers";
export const useCrocPositionSeeds = (pool: PoolV2 | undefined) => {
  const crocPool = useCrocPosition(pool);
  const QUERY_KEY = [crocPool, pool];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!crocPool || !pool) {
        return undefined;
      }
      try {
        const ambientPos = await crocPool.queryAmbient();
        return ambientPos.seeds as BigNumber;
      } catch (e) {
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const usePositionSeeds = () => {
    const { data = undefined } = useSWRImmutable<BigNumber | undefined>(
      QUERY_KEY,
    );
    return data;
  };
  return {
    usePositionSeeds,
    isLoading,
  };
};

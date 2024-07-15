import { PoolV2, mapPoolToPoolV2 } from "@bera/berajs";
import { dexClient, getSelectedPool } from "@bera/graphql";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

export const useSelectedPool = (shareAddress: Address) => {
  const QUERY_KEY = ["selectedPool", shareAddress];
  return useSWRImmutable<PoolV2 | undefined>(
    QUERY_KEY,
    async () => {
      const selectedPool = await dexClient.query({
        query: getSelectedPool,
        variables: {
          shareAddress: shareAddress.toLowerCase(),
        },
      });

      try {
        return mapPoolToPoolV2(selectedPool.data.pools[0]);
      } catch (e) {
        return undefined;
      }
    },
    {
      refreshInterval: 0,
    },
  );
};

import { GetPoolCount, dexClient } from "@bera/graphql";
import useSWRImmutable from "swr/immutable";

export const useTotalPoolCount = () => {
  const QUERY_KEY = ["totalPools"];
  return useSWRImmutable<string | undefined>(
    QUERY_KEY,
    async () => {
      const globaldata = await dexClient.query({
        query: GetPoolCount,
      });
      try {
        return globaldata.data.bexGlobalUsages[0].poolCount;
      } catch (e) {
        return undefined;
      }
    },
    {
      refreshInterval: 0,
    },
  );
};

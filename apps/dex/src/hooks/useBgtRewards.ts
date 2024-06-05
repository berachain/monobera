import { GetTotalBgtDistributed, bgtClient } from "@bera/graphql";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export const useBgtRewards = () => {
  const QUERY_KEY = ["bgtRewards"];
  return useSWR(QUERY_KEY, async () => {
    const globalInfo = await bgtClient.query({
      query: GetTotalBgtDistributed,
    });
    if (!globalInfo?.data?.globalInfo?.totalBGTDistributed) {
      return 0;
    }
    return globalInfo.data.globalInfo.totalBGTDistributed;
  });
};

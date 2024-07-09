import { beraTokenAddress } from "@bera/config";
import { GetHomepageData, dexClient } from "@bera/graphql";
import useSWRImmutable from "swr/immutable";

export interface HomepageData {
  tvlUsd: string;
  volumeUsd: string;
  totalBGTDistributed: string;
  beraUsdValue: string;
}
export const useHomePageData = () => {
  const QUERY_KEY = ["homepageData"];
  return useSWRImmutable(QUERY_KEY, async () => {
    const globalInfo = await dexClient.query({
      query: GetHomepageData,
      variables: {
        beraAddress: beraTokenAddress.toLowerCase(),
      },
    });

    return {
      tvlUsd: globalInfo.data.bexGlobalData.tvlUsd,
      volumeUsd: globalInfo.data.bexGlobalDayDatas[0].volumeUsd,
      totalBGTDistributed: globalInfo.data.globalInfo.totalBGTDistributed,
      beraUsdValue: globalInfo.data.tokenInformations[0].usdValue,
    };
  });
};

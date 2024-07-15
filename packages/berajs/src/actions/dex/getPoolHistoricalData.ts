import { GetPoolDayDatas, dexClient } from "@bera/graphql";
import { BeraConfig } from "~/types";

export type PoolDayData = {
  date: number;
  tvlUsd: string;
  volumeUsd: string;
  feesUsd: string;
};

interface getPoolHistoricalDataProps {
  poolId: string;
  config: BeraConfig;
}

export const getPoolHistoricalData = async ({
  poolId,
  config,
}: getPoolHistoricalDataProps): Promise<PoolDayData[] | undefined> => {
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error(
      "getPoolHistoricalData: one or more required values missing from config prop: config.endpoints.dexSubgraph",
    );
  }
  if (!poolId) return undefined;

  const res = await dexClient.query({
    query: GetPoolDayDatas,
    variables: {
      poolId: poolId.toLowerCase(),
    },
  });

  return res.data.poolDayDatas;
};

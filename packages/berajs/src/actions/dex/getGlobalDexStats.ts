import { chainId, crocIndexerEndpoint } from "@bera/config";

import { BeraConfig } from "~/types";

export type GetGlobalDexStatsResponse = {
  lastUpdated: number;
  tvl: number;
  volume24H: number;
  formattedTVL: string;
  formattedVolume24H: string;
};

export const getGlobalDexStats = (
  config?: BeraConfig,
): Promise<GetGlobalDexStatsResponse> => {
  if (config && !config.endpoints?.dexIndexer) {
    throw new Error(
      "getGlobalDexStats: one or more required values missing from config prop: config.endpoints.dexIndexer",
    );
  }
  return new Promise((res, rej) =>
    fetch(
      `${
        config?.endpoints?.dexIndexer ?? crocIndexerEndpoint
      }/v2/global_stats?chainId=0x${chainId.toString(16)}`,
    )
      .then((response) => response.json())
      .then((data) => {
        res({
          ...data?.data,
        });
      })
      .catch((e) => {
        rej(e);
      }),
  );
};

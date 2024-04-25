import { type PoolDayDataV2 } from "@bera/graphql";

import { BeraConfig } from "~/types";

interface PoolHistoryResponse_Info {
  id?: string;
  poolIdx?: string;
  base?: string;
  quote?: string;
  timeCreate?: string;
  baseInfo?: {
    id?: string;
    address?: string;
    symbol?: string;
    name?: string;
    decimals?: number;
  };
  quoteInfo?: {
    id?: string;
    address?: string;
    symbol?: string;
    name?: string;
    decimals?: number;
  };
  template?: {
    feeRate?: number;
  };
  shareAddress?: {
    address?: string;
  };
}

export interface PoolHistoryResponse {
  info: PoolHistoryResponse_Info;
  history: PoolDayDataV2[];
}

interface getPoolHistoricalDataProps {
  shareAddress: string;
  config: BeraConfig;
}

export const getPoolHistoricalData = ({
  shareAddress,
  config,
}: getPoolHistoricalDataProps): Promise<PoolHistoryResponse> | undefined => {
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error(
      "getPoolHistoricalData: one or more required values missing from config prop: config.subgraphs.dexSubgraph",
    );
  }
  if (!shareAddress) return undefined;
  return fetch(
    `${config.subgraphs.dexSubgraph}/v2/pool_history/${shareAddress}?days=90`,
  )
    .then((data) => data.json())
    .then((data) => {
      return data?.data;
    })
    .catch((e) => {
      console.error("error occurred in getPoolHistoricalData:", e);
      return undefined;
    });
};

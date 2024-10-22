import { Address } from "viem";

import { BeraConfig, Gauge } from "~/types";

export interface GetGaugeData {
  gaugeCounts: number;
  gaugeList: Gauge[];
  gaugeDictionary: { [key: Address]: Gauge };
}

export interface GaugeFilter {
  validatorId?: Address;
  filterByProduct?: string[];
  coinbase?: Address;
  sortBy?: "activeIncentivesInHoney" | "amountstaked" | "bgtInflationCapture";
  sortOrder?: "asc" | "desc";
  query?: string;
  page?: number;
  pageSize?: number;
}

export const getGauges = async (
  config: BeraConfig,
  filter?: GaugeFilter,
): Promise<GetGaugeData> => {
  if (!config.endpoints?.bgtEndpoint) {
    throw new Error("Missing backend endpoint in config");
  }
  try {
    const url = new URL(`${config.endpoints.bgtEndpoint}/vaults`);
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        const filterKey = key as keyof typeof filter;
        url.searchParams.set(filterKey, value);
      });
    }
    const res = await fetch(url);

    const gauges = await res.json();
    return {
      gaugeCounts: gauges.total,
      gaugeList: gauges.vaults,
      gaugeDictionary: gauges.vaults.reduce(
        (acc: { [key: Address]: Gauge }, item: Gauge) => {
          acc[item.id] = item;
          return acc;
        },
        {},
      ),
    };
  } catch (error) {
    console.error(error);
    return {
      gaugeCounts: 0,
      gaugeList: [],
      gaugeDictionary: {},
    };
  }
};

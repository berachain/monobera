import { useMemo } from "react";
import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import { type OpenTrade } from "@bera/proto/src";
import useSWR, { mutate } from "swr";

import { POLLING } from "~/utils/constants";
import type { IMarket } from "~/types/market";
import type { IOpenTrade } from "~/types/order-history";
import type { TableStateProps } from "~/types/table";
import { usePollPrices } from "~/hooks/usePollPrices";
import { getPnl } from "./useCalculatePnl";
import BigNumber from "bignumber.js";

export const usePollOpenPositions = (props: TableStateProps) => {
  const { account } = useBeraJs();
  const queryString =
    Object.entries(props ?? {})
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&") ?? "";
  const QUERY_KEY = ["openPositions", account, queryString];
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (account && queryString) {
        const res = await fetch(
          `${perpsEndpoint}/opentrades/traders/${account}${
            queryString ? `?${queryString}` : ""
          }`,
        );
        const data = await res.json();
        return data ?? {};
      }
      return {};
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useMarketOpenPositions = (markets: IMarket[]): IOpenTrade[] => {
    return data?.result?.map((position: OpenTrade) => {
      return {
        ...position,
        market: markets.find(
          (market) => market.pair_index === position.pair_index,
        ),
      };
    });
  };

  const calculateUnrealizedPnl = () => {
    const openPositions = data?.result;
    const totalPositions = data?.pagination?.total_items ?? 0;
    if (totalPositions > 10) {
      return undefined;
    }
    const { marketPrices } = usePollPrices();

    if (!Array.isArray(openPositions) || openPositions.length === 0) {
      return "0";
    }

    const totalUnrealizedPnl = openPositions?.reduce(
      (acc: BigNumber, position: IOpenTrade) => {
        const currentPrice = marketPrices[position?.pair_index ?? ""] ?? "0";
        if (currentPrice === "0") {
          return acc; // Skip this position if the current price is not available
        }

        const pnl = getPnl({
          currentPrice,
          openPosition: position,
          positionSize: position.position_size,
        });

        return acc.plus(pnl ?? 0);
      },
      BigNumber(0),
    );

    return totalUnrealizedPnl.isNaN() ? "0" : totalUnrealizedPnl.toString(10);
  };

  return {
    isLoading,
    isValidating,
    openPositionsPagination: data?.pagination ?? {},
    refresh: () => void mutate(QUERY_KEY),
    useMarketOpenPositions,
    calculateUnrealizedPnl,
  };
};

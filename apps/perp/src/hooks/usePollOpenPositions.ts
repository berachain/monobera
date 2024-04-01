import { useMemo } from "react";
import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import { type OpenTrade } from "@bera/proto/src";
import BigNumber from "bignumber.js";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";
import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import type { IMarket } from "~/types/market";
import type { IMarketOrder } from "~/types/order-history";
import { getPnl } from "./useCalculatePnl";
import { usePricesSocket } from "./usePricesSocket";

export const usePollOpenPositions = () => {
  const { account } = useBeraJs();
  const { mutate } = useSWRConfig();
  const QUERY_KEY = ["openPositions", account];

  const refreshData = async () => {
    {
      if (account) {
        const res = await fetch(`${perpsEndpoint}/opentrades/${account}`);
        const data = await res.json();
        return data.open_trades;
      }
      return [];
    }
  };

  const { isLoading } = useSWR(QUERY_KEY, refreshData, {
    refreshInterval: POLLING.FAST,
  });

  const useOpenPositions = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useMarketOpenPositions = (markets: IMarket[]): IMarketOrder[] => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data?.map((position: OpenTrade) => {
      return {
        ...position,
        market: markets.find(
          (market) => market.pair_index === position.pair_index,
        ),
      };
    });
  };

  const useTotalUnrealizedPnl = (markets: IMarket[]) => {
    const openPositions = useMarketOpenPositions(markets);
    const { usePriceFeed } = usePricesSocket();
    const prices = usePriceFeed();

    return useMemo(() => {
      if (!Array.isArray(openPositions) || openPositions.length === 0) {
        return "0";
      }

      let parsedPrices: any;
      try {
        parsedPrices = JSON.parse(prices);
      } catch (error) {
        console.error("Failed to parse prices:", error);
        return "0"; // Return 0 if the prices are not available
      }

      if (!parsedPrices) {
        return "0";
      }

      const totalUnrealizedPnl = openPositions?.reduce(
        (acc: BigNumber, position: IMarketOrder) => {
          const currentPrice = parsedPrices[position.market.pair_index];
          if (currentPrice == null) {
            console.warn(
              `No price available for pair_index ${position.market.pair_index}`,
            );
            return acc; // Skip this position if the current price is not available
          }

          const pnl = getPnl({
            currentPrice,
            openPosition: position,
          });

          return acc.plus(pnl ?? 0);
        },
        BigNumber(0),
      );

      return totalUnrealizedPnl.isNaN() ? "0" : totalUnrealizedPnl.toString(10);
    }, [openPositions, prices]);
  };

  const useTotalPositionSize = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    const totalPositionSize = useMemo(() => {
      return data?.reduce((acc: BigNumber, position: OpenTrade) => {
        return acc.plus(
          BigNumber(position.position_size).times(BigNumber(position.leverage)),
        );
      }, BigNumber(0));
    }, [data]);
    const formattedTotalPositionSize = formatFromBaseUnit(
      totalPositionSize,
      18,
    );
    return formattedTotalPositionSize.isNaN()
      ? "0"
      : formattedTotalPositionSize.toString(10);
  };

  return {
    isLoading,
    QUERY_KEY,
    refetch: () =>
      setTimeout(() => {
        void mutate(QUERY_KEY);
      }, 3000),
    useOpenPositions,
    useMarketOpenPositions,
    useTotalUnrealizedPnl,
    useTotalPositionSize,
  };
};

import { useMemo } from "react";
import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import { type ClosedTrade } from "@bera/proto/src";
import BigNumber from "bignumber.js";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";
import type { IMarket } from "~/types/market";
import type { IClosedTrade } from "~/types/order-history";

export const usePollTradingHistory = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["closedTrades", account];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (account) {
        const res = await fetch(`${perpsEndpoint}/closedtrades/${account}`);
        const data = await res.json();
        return data.closed_trades;
      }
      return [];
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useOpenPositions = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useMarketClosedPositions = (markets: IMarket[]): IClosedTrade[] => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data?.map((position: ClosedTrade) => {
      return {
        ...position,
        market: markets.find(
          (market) => market.pair_index === position.pair_index,
        ),
      };
    });
  };

  const useRealizedPnl = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      const realizedPnl = data?.reduce(
        (acc: BigNumber, curr: IClosedTrade) => acc.plus(curr.pnl),
        BigNumber(0),
      );
      return !realizedPnl || realizedPnl.isNaN()
        ? "0"
        : realizedPnl.toString(10);
    }, [data]);
  };

  return {
    isLoading,
    useOpenPositions,
    useMarketClosedPositions,
    useRealizedPnl,
  };
};

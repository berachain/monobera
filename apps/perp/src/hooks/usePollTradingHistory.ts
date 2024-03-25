import { useMemo } from "react";
import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import { type ClosedTrade } from "@bera/proto/src";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";
import { type IClosedTrade } from "~/app/berpetuals/components/order-history";
import { type IMarket } from "~/app/berpetuals/page";

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
      return (
        data?.reduce(
          (acc: any, curr: IClosedTrade) => acc + Number(curr.pnl),
          0,
        ) ?? 0
      );
    }, [data]);
  };

  return {
    isLoading,
    useOpenPositions,
    useMarketClosedPositions,
    useRealizedPnl,
  };
};

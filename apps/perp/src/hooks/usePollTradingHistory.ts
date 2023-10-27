import { useBeraJs } from "@bera/berajs";
import { perpsEndpoints } from "@bera/config";
import { ClosedTrade } from "@bera/proto/src";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";
import { IClosedTrade } from "~/app/berpetuals/components/order-history";
import { IMarket } from "~/app/berpetuals/page";

export const usePollTradingHistory = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["closedTrades", account];
  const { mutate } = useSWRConfig();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (account) {
        const res = await fetch(`${perpsEndpoints}/closedtrades/${account}`);
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

  const useTotalPnl = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useTotalPositionSize = () => {
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
  return {
    isLoading,
    useOpenPositions,
    useMarketClosedPositions,
  };
};

import { useMemo } from "react";
import { useBeraJs } from "@bera/berajs";
import { perpsEndpoints } from "@bera/config";
import { type OpenTrade } from "@bera/proto/src";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";

import { POLLING } from "~/utils/constants";
import { type IMarketOrder } from "~/app/berpetuals/components/order-history";
import { type IMarket } from "~/app/berpetuals/page";
import { calculateNetPnL } from "./useCalculatePnl";
import { usePricesSocket } from "./usePricesSocket";

export const usePollOpenPositions = () => {
  const { account } = useBeraJs();
  const { mutate } = useSWRConfig();
  const QUERY_KEY = ["openPositions", account];

  const refreshData = async () => {
    {
      if (account) {
        const res = await fetch(`${perpsEndpoints}/opentrades/${account}`);
        const data = await res.json();
        return data.open_trades;
      }
      return [];
    }
  };

  const { isLoading } = useSWR(QUERY_KEY, refreshData, {
    refreshInterval: POLLING.NORMAL,
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
    const openPositons = useMarketOpenPositions(markets);
    const { usePriceFeed } = usePricesSocket();
    const prices = usePriceFeed();
    return useMemo(() => {
      if (!prices) {
        return 0;
      }

      return openPositons?.reduce((acc: number, position: IMarketOrder) => {
        const price = JSON.parse(prices)[position.market.pair_index];

        const pnl = calculateNetPnL({
          buy: position.buy,
          currentPrice: price,
          openPrice: BigInt(position.open_price),
          leverage: BigInt(position.leverage),
          levPosSize:
            BigInt(position.position_size) * BigInt(position.leverage),
          borrowingFee: BigInt(position.borrowing_fee),
          rolloverFee: BigInt(position.rollover_fee),
          fundingFee: BigInt(position.funding_rate),
          closingFee: BigInt(position.closing_fee),
        });
        return acc + (pnl ?? 0);
      }, 0);
    }, [openPositons, prices]);
  };

  const useTotalPositionSize = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      return data?.reduce((acc: number, position: OpenTrade) => {
        return (
          acc +
          Number(formatUnits(BigInt(position.position_size), 18)) *
            Number(position.leverage)
        );
      }, 0);
    }, [data]);
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

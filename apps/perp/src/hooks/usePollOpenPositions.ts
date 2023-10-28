import { useBeraJs } from "@bera/berajs";
import { perpsEndpoints } from "@bera/config";
import { type OpenTrade } from "@bera/proto/src";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";

import { POLLING } from "~/utils/constants";
import { type IMarketOrder } from "~/app/berpetuals/components/order-history";
import { type IMarket } from "~/app/berpetuals/page";

export const usePollOpenPositions = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["openPositions", account];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (account) {
        const res = await fetch(`${perpsEndpoints}/opentrades/${account}`);
        const data = await res.json();
        return data.open_trades;
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

  const useOpenPositionSize = () => {
    const { data } = useSWRImmutable<OpenTrade[]>(QUERY_KEY);
    return data?.reduce((acc: number, position: OpenTrade) => {
      return acc + Number(formatUnits(BigInt(position.position_size), 18));
    }, 0);
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
  return {
    isLoading,
    QUERY_KEY,
    useOpenPositions,
    useMarketOpenPositions,
    useOpenPositionSize,
  };
};

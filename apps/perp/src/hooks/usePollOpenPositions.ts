import { useBeraJs } from "@bera/berajs";
import { perpsEndpoints } from "@bera/config";
import { OpenTrade } from "@bera/proto/src";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";
import { IMarketOrder } from "~/app/berpetuals/components/order-history";
import { IMarket } from "~/app/berpetuals/page";

export const usePollOpenPositions = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["openPositions", account];
  const { mutate } = useSWRConfig();
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
  };
};

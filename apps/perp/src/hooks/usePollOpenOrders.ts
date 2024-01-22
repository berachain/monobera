import { useBeraJs } from "@bera/berajs";
import { perpsEndpoints } from "@bera/config";
import { type OpenLimitOrder } from "@bera/proto/src";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";
import { type ILimitOrder } from "~/app/berpetuals/components/order-history";
import { type IMarket } from "~/app/berpetuals/page";

export const usePollOpenOrders = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["openOrders", account];
  const { mutate } = useSWRConfig();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (account) {
        const res = await fetch(`${perpsEndpoints}/openlimitorders/${account}`);
        const data = await res.json();
        return data.open_limit_orders;
      }
      return [];
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useOpenPositions = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useMarketOpenOrders = (markets: IMarket[]): ILimitOrder[] => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data?.map((position: OpenLimitOrder) => {
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
    refetch: () => void mutate(QUERY_KEY),
    useOpenPositions,
    useMarketOpenOrders,
  };
};

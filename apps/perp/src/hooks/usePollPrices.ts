import { type Price } from "@pythnetwork/pyth-evm-js";
import useSWR, { useSWRConfig } from "swr";

import { PYTH_IDS, USDC_USD_KEY } from "~/utils/constants";
import { PricesMap } from "~/types/prices";
import { usePriceData, useIsPythConnected } from "../context/price-context";
import { formatUsdcPythPrice } from "~/utils/formatPythPrice";

export const usePollPrices = () => {
  const prices = usePriceData();
  const isPythConnected = useIsPythConnected();
  const QUERY_KEY = ["marketPrices", isPythConnected];
  const { mutate } = useSWRConfig();
  const { data } = useSWR(
    QUERY_KEY,
    () => {
      const keys = PYTH_IDS.map((pythPrice) => pythPrice.name);
      return keys.reduce((acc: PricesMap, key) => {
        const price =
          prices.current?.[key] ??
          ({
            conf: "0",
            expo: 0,
            price: "0",
            publishTime: Date.now(),
          } as Price);
        acc[key] = price as Price;
        return acc;
      }, {});
    },
    {
      refreshInterval: 2000,
      dedupingInterval: 2000,
    },
  );

  // formatted strings in USDC prices
  const marketPrices =
    (data &&
      Object.keys(data).reduce((acc: Record<string, string>, key) => {
        if (key === USDC_USD_KEY || data[USDC_USD_KEY] === undefined)
          return acc;
        acc[key] = formatUsdcPythPrice(
          data[key] as Price,
          data[USDC_USD_KEY] as Price,
        );
        return acc;
      }, {})) ??
    {};

  return {
    refetch: () => void mutate(QUERY_KEY),
    prices: data,
    marketPrices,
  };
};

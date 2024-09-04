import useSWR, { useSWRConfig } from "swr";

import { PYTH_IDS, USDC_USD_INDEX } from "~/utils/constants";
import { usePriceData, useIsPythConnected } from "~/context/price-context";
import { formatUsdcPythPrice } from "~/utils/formatPyth";
import { HermesPrice } from "~/types/prices";

export const usePollPrices = () => {
  const prices = usePriceData();
  const isPythConnected = useIsPythConnected();
  const QUERY_KEY = ["marketPrices", isPythConnected];
  const { mutate } = useSWRConfig();
  const { data } = useSWR(
    QUERY_KEY,
    () => {
      const keys = PYTH_IDS.map((pythPrice) => pythPrice.pairIndex);
      return keys.reduce<Record<string, HermesPrice>>((acc, key) => {
        const priceFeed = prices.current?.[key];
        acc[key] = priceFeed;
        return acc;
      }, {});
    },
    {
      refreshInterval: 1000,
      dedupingInterval: 1000,
    },
  );

  // formatted strings in USDC prices
  const marketPrices =
    (data &&
      Object.keys(data).reduce((acc: Record<string, string>, key) => {
        if (key === USDC_USD_INDEX || data[USDC_USD_INDEX] === undefined)
          return acc;
        acc[key] = formatUsdcPythPrice(
          data[key as "string"].price,
          data[USDC_USD_INDEX].price,
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

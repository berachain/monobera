import { type Price, type PriceFeed } from "@pythnetwork/pyth-evm-js";
import useSWR, { useSWRConfig } from "swr";

import { PYTH_IDS, USDC_USD_INDEX } from "~/utils/constants";
import { usePriceData, useIsPythConnected } from "~/context/price-context";
import { formatUsdcPythPrice } from "~/utils/formatPyth";

export const usePollPrices = () => {
  const prices = usePriceData();
  const isPythConnected = useIsPythConnected();
  const QUERY_KEY = ["marketPrices", isPythConnected];
  const { mutate } = useSWRConfig();
  const { data } = useSWR(
    QUERY_KEY,
    () => {
      const keys = PYTH_IDS.map((pythPrice) => pythPrice.pairIndex);
      return keys.reduce((acc: Record<string, Price>, key) => {
        const priceFeed = prices.current?.[key];
        acc[key] = priceFeed.getPriceUnchecked() as Price;
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
        if (key === USDC_USD_INDEX || data[USDC_USD_INDEX] === undefined)
          return acc;
        acc[key] = formatUsdcPythPrice(
          data[key as "string"] as Price,
          data[USDC_USD_INDEX] as Price,
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

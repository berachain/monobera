import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import useSWR, { mutate } from "swr";

import { POLLING, PYTH_IDS, USDC_USD_INDEX } from "~/utils/constants";
import { formatUsdcPythPrice } from "~/utils/formatPyth";
import { useIsPythConnected, usePriceData } from "~/context/price-context";
import { PricesMap } from "~/types/prices";

const formatPythPrices = (prices: PricesMap) => {
  const keys = PYTH_IDS.map((pythPrice) => pythPrice.pairIndex);
  const usdcUsdPrice = prices[USDC_USD_INDEX];
  return keys.reduce((acc: Record<string, string>, key) => {
    if (key === USDC_USD_INDEX || prices[USDC_USD_INDEX] === undefined)
      return acc;
    const priceFeed = prices[key];
    const result = formatUsdcPythPrice(
      priceFeed.price,
      usdcUsdPrice.price,
      10,
      0,
    );
    acc[key] = result;
    return acc;
  }, {});
};

export const usePollOpenPositionsSummary = () => {
  const { account } = useBeraJs();
  const prices = usePriceData();
  const isPythConnected = useIsPythConnected();
  const QUERY_KEY = ["openTrades", account, isPythConnected];
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (account && isPythConnected) {
        const url = `${perpsEndpoint}/opentrades/summary/${account}`;
        const headers = {
          "Content-Type": "application/json",
        };
        const formattedPrices = formatPythPrices(prices.current);

        const body = JSON.stringify({
          prices: formattedPrices,
        });
        const res = await fetch(url, {
          method: "POST",
          headers: headers,
          body: body,
        });
        return await res.json();
      }
      return {};
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  return {
    openPositionSize: data?.position_size ?? "0",
    totalUnrealizedPnl: data?.open_pnl ?? "0",
    isLoading,
    isValidating,
    mutate,
  };
};

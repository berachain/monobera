import { PYTH_IDS } from "~/utils/constants";
import { normalizePythId } from "../utils/normalize-pyth-id";
import { HermesClient } from "@pythnetwork/hermes-client";
import { perpsPricesEndpoint } from "@bera/config";
import { Address } from "viem";
import { PricesMap } from "~/types/prices";

export const getOffChainPrices = async () => {
  const hermesClient = new HermesClient(perpsPricesEndpoint);
  const pythPrices = await hermesClient.getLatestPriceUpdates(
    PYTH_IDS.map((pythPrice) => pythPrice.id),
  );

  return {
    vaa:
      pythPrices?.binary.data.map((vaa) => `0x${vaa}` satisfies Address) ?? [],

    prices: pythPrices?.parsed?.reduce<PricesMap>((acc, priceFeed) => {
      const id = normalizePythId(priceFeed.id);
      const pairIndex = PYTH_IDS.find((price) => id === price.id)?.pairIndex;
      if (pairIndex) {
        return {
          ...acc,
          [pairIndex]: priceFeed,
        };
      }
      return acc;
    }, {}),
  };
};

import { PYTH_IDS } from "~/utils/constants";
import { normalizePythId } from "./utils";
import { HermesClient } from "@pythnetwork/hermes-client";
import { perpsPricesEndpoint } from "@bera/config";

export const getOffChainPrices = async () => {
  const hermesClient = new HermesClient(perpsPricesEndpoint);
  const pythPrices = await hermesClient.getLatestPriceUpdates(
    PYTH_IDS.map((pythPrice) => pythPrice.id),
  );

  return {
    vaa: pythPrices?.binary.data.map((vaa) => `0x${vaa}`) ?? [],
    prices: pythPrices?.parsed?.reduce((acc, priceFeed) => {
      const id = normalizePythId(priceFeed.id);
      const pairIndex = PYTH_IDS.find((price) => id === price.id)?.pairIndex;
      if (pairIndex) {
        return {
          ...acc,
          // @ts-ignore
          [pairIndex]: new PriceFeed({
            ...priceFeed,
            vaa: `0x${pythPrices.binary.data[0]}`,
          }),
        };
      }
      return acc;
    }, {}),
  };
};

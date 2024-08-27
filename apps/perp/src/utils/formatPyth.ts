import { perpsPythPricesMocked } from "@bera/config";
import type { Price, PriceFeed } from "@pythnetwork/pyth-evm-js";
import BigNumber from "bignumber.js";
import { encodeAbiParameters } from "viem";

import { type PricesMap } from "~/types/prices";
import { PYTH_ABI, USDC_USD_INDEX } from "./constants";

export const formatPythPrice = (price: Price) => {
  return BigNumber(price.price)
    .times(10 ** price.expo)
    .toString(10);
};

export const formatUsdcPythPrice = (
  price: Price,
  usdcPrice: Price,
  expo?: number,
  decimals?: number,
) => {
  const priceBN = BigNumber(price.price).times(10 ** price.expo);
  const usdcPriceBN = BigNumber(usdcPrice.price).times(10 ** usdcPrice.expo);
  let result = priceBN.div(usdcPriceBN);
  if (!result.isFinite()) {
    return "0";
  }
  if (expo !== undefined) {
    result = result.times(10 ** expo);
  }
  if (decimals !== undefined) {
    result = result.dp(decimals);
  }
  return result.toString(10);
};

const formatPythPriceFeed = (priceFeed: PriceFeed) => {
  const emaPrice = priceFeed.getEmaPriceUnchecked();
  const price = priceFeed.getPriceUnchecked();
  return {
    id: priceFeed.id,
    price: {
      price: BigInt(price.price),
      conf: BigInt(price.conf),
      expo: Number(price.expo),
      publishTime: BigInt(price.publishTime),
    },
    emaPrice: {
      price: BigInt(emaPrice.price),
      conf: BigInt(emaPrice.conf),
      expo: Number(emaPrice.expo),
      publishTime: BigInt(emaPrice.publishTime),
    },
  };
};

/**
 *
 * @deprecated use useVaa instead
 */
export const generateEncodedPythPrices = (
  prices: { current: PricesMap },
  pairIndex: string,
) => {
  const priceMarketData = prices.current?.[pairIndex] as PriceFeed;
  const priceUSDUSDC = prices.current?.[USDC_USD_INDEX] as PriceFeed;

  if (!priceMarketData || !priceUSDUSDC) {
    return ["", ""];
  }
  let encodedMarketData = priceMarketData.vaa;
  let encodedUsdUsdcData = priceUSDUSDC.vaa;
  if (perpsPythPricesMocked === "true") {
    const priceUpdateData = formatPythPriceFeed(priceMarketData);
    const usdusdcPrice = formatPythPriceFeed(priceUSDUSDC);
    encodedMarketData = encodeAbiParameters(PYTH_ABI, [
      `0x${priceUpdateData.id}`,
      priceUpdateData.price,
      priceUpdateData.emaPrice,
    ]);
    encodedUsdUsdcData = encodeAbiParameters(PYTH_ABI, [
      `0x${usdusdcPrice.id}`,
      usdusdcPrice.price,
      usdusdcPrice.emaPrice,
    ]);
  } else {
    encodedMarketData =
      encodedMarketData &&
      `0x${Buffer.from(encodedMarketData, "base64").toString("hex")}`;
    encodedUsdUsdcData =
      encodedUsdUsdcData &&
      `0x${Buffer.from(encodedUsdUsdcData, "base64").toString("hex")}`;
  }
  return [encodedMarketData ?? "", encodedUsdUsdcData ?? ""];
};

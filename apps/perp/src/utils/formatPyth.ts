import BigNumber from "bignumber.js";
import { HermesPrice } from "~/types/prices";

export const formatPythPrice = (price: HermesPrice["price"]) => {
  return BigNumber(price.price)
    .times(10 ** price.expo)
    .toString(10);
};

export const formatUsdcPythPrice = (
  price: HermesPrice["price"],
  usdcPrice: HermesPrice["price"],
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

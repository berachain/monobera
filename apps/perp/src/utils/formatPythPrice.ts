import BigNumber from "bignumber.js";
import { type Price } from "@pythnetwork/pyth-evm-js";

export const formatPythPrice = (price: Price) => {
  return BigNumber(price.price)
    .times(10 ** price.expo)
    .toString(10);
};

export const formatUsdcPythPrice = (price: Price, usdcPrice: Price) => {
  const priceBN = BigNumber(price.price).times(10 ** price.expo);
  const usdcPriceBN = BigNumber(usdcPrice.price).times(10 ** usdcPrice.expo);
  return priceBN.div(usdcPriceBN).isFinite()
    ? priceBN.div(usdcPriceBN).toString(10)
    : "0";
};

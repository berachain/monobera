import BigNumber from "bignumber.js";

export const getPriceFromPercent = (
  long: boolean,
  percentage: string,
  safeLeverage: string,
  formattedPrice: string,
) => {
  const percentageBN = BigNumber(percentage ?? "0");
  const safeLeverageBN = BigNumber(safeLeverage);
  const formattedPriceBN = BigNumber(formattedPrice);
  const oneBN = BigNumber(1);
  const hundredBN = BigNumber(100);

  if (long) {
    return oneBN
      .plus(percentageBN.div(hundredBN.times(safeLeverageBN)))
      .times(formattedPriceBN);
  }
  return oneBN
    .minus(percentageBN.div(hundredBN.times(safeLeverageBN)))
    .times(formattedPriceBN);
};

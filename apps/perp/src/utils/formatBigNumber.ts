import BigNumber from "bignumber.js";

export const formatFromBaseUnit = (amount: any, decimals: any) =>
  (BigNumber.isBigNumber(amount) ? amount : new BigNumber(amount)).div(
    new BigNumber(10).pow(decimals),
  );

export const formatToBaseUnit = (amount: any, decimals: any) =>
  (BigNumber.isBigNumber(amount) ? amount : new BigNumber(amount)).multipliedBy(
    new BigNumber(10).pow(decimals),
  );

import BigNumber from "bignumber.js";

export const calculateApy = (wtv: string, bgtInflation: number): number => {
  if (wtv === "0" || bgtInflation === 0) return 0;
  const biWtv = new BigNumber(wtv);
  const biBgtInflation = new BigNumber(bgtInflation);
  return biWtv.times(biBgtInflation).toNumber();
};

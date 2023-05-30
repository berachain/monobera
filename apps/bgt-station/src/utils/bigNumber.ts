import BigNumber from "bignumber.js";
import { type ethers } from "ethers";

export const BIG_ZERO = new BigNumber(0);
export const BIG_ONE = new BigNumber(1);
export const BIG_NINE = new BigNumber(9);
export const BIG_TEN = new BigNumber(10);

export const ethersToBigNumber = (ethersBn: ethers.BigNumber): BigNumber =>
  new BigNumber(ethersBn.toString());

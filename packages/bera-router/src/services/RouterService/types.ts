import { parseUnits, type Address } from "viem";

import { type Token } from "../PoolService/types";

export enum SwapTypes {
  SwapExactIn,
  SwapExactOut,
}

export enum PoolTypes {
  Weighted,
  Stable,
  Element,
  MetaStable,
  Linear,
  Gyro2,
  Gyro3,
  GyroE,
  Fx,
}

export interface Swap {
  pool: string;
  tokenInObj: Token | undefined;
  tokenOutObj: Token | undefined;
  tokenIn: string;
  tokenOut: string;
  swapAmount?: bigint;
  limitReturnAmount?: string;
  maxPrice?: string;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  returnAmount?: string;
}

export interface SwapV2 {
  poolId: string;
  assetInIndex: number;
  assetOutIndex: number;
  amount: bigint;
  userData: string;
  returnAmount?: bigint;
}

export interface SwapInfo {
  swaps: Swap[];
  pools: PoolBase[];
  returnAmount: bigint;
  batchSwapSteps: BatchSwapStep[];
  swapAmount: bigint;
  tokenIn: Address;
  tokenInObj: Token | undefined;
  tokenOutObj: Token | undefined;
  tokenOut: Address;
  formattedSwapAmount: string;
  formattedReturnAmount: string;
}

export interface SwapOptions {
  gasPrice: bigint;
  swapGas: bigint;
  timestamp: number;
  maxPools: number;
}

export interface NewPath {
  id: string; // pool address if direct path, contactenation of pool addresses if multihop
  swaps: Swap[];
  poolPairData: PoolPairBase[];
  limitAmount: bigint;
  pools: PoolBase[];
}

export interface BatchSwapStep {
  poolId: Address;
  assetIn: Address;
  amountIn: bigint;
  assetOut: Address;
  amountOut: bigint;
  userData: string;
}

export interface ResultPath extends NewPath {
  returnAmount: bigint;
  batchSwapSteps: BatchSwapStep[];
}

export type PoolPairBase = {
  id: string;
  address: string;
  poolType: PoolTypes;
  swapFee: bigint;
  tokenIn: string;
  tokenOut: string;
  decimalsIn: number;
  decimalsOut: number;
  balanceIn: bigint;
  balanceOut: bigint;
};

export interface PoolDictionary {
  [poolId: string]: PoolBase;
}

export interface SubgraphPoolBase {
  id: string;
  address: string;
  poolType: string;
  poolTypeVersion?: number;
  swapFee: string;
  swapEnabled: boolean;
  totalShares: string;
  tokens: SubgraphToken[];
  tokensList: string[];

  // Weighted & Element field
  totalWeight?: string;
}

export type SubgraphToken = {
  address: string;
  balance: bigint;
  decimals: number;
  priceRate: string;
  // WeightedPool field
  weight: string | null;
  token?: SubgraphTokenData;
};

export type SubgraphTokenData = {
  latestFXPrice?: string;
};

export interface PoolBase<D extends PoolPairBase = PoolPairBase> {
  id: string;
  address: string;
  tokensList: string[];
  tokens: Token[];
  totalShares: bigint;
  mainIndex?: number;
  isLBP?: boolean;
  parsePoolPairData: (tokenIn: string, tokenOut: string) => D;
  getNormalizedLiquidity: (poolPairData: D | undefined) => bigint;
  getLimitAmountSwap: (
    poolPairData: D | undefined,
    swapType: SwapTypes,
  ) => bigint;
  /**
   * @param {string} token - Address of token.
   * @param {BigNumber} newBalance - New balance of token. EVM scaled.
   */
  updateTokenBalanceForPool: (token: string, newBalance: bigint) => void;
  updateTotalShares: (newTotalShares: bigint) => void;
  _exactTokenInForTokenOut: (poolPairData: D, amount: bigint) => bigint;
  _tokenInForExactTokenOut: (poolPairData: D, amount: bigint) => bigint;
  _calcTokensOutGivenExactBptIn(bptAmountIn: bigint): bigint[];
  _calcBptOutGivenExactTokensIn(amountsIn: bigint[]): bigint;
  _spotPriceAfterSwapExactTokenInForTokenOut: (
    poolPairData: D,
    amount: bigint,
  ) => bigint;
  _spotPriceAfterSwapTokenInForExactTokenOut: (
    poolPairData: D,
    amount: bigint,
  ) => bigint;
  _derivativeSpotPriceAfterSwapExactTokenInForTokenOut: (
    poolPairData: D,
    amount: bigint,
  ) => bigint;
  _derivativeSpotPriceAfterSwapTokenInForExactTokenOut: (
    poolPairData: D,
    amount: bigint,
  ) => bigint;
}

export const INFINITY = BigInt(Number.MAX_SAFE_INTEGER);
const priceErrorTolerance = "0.00001";
export const PRICE_ERROR_TOLERANCE = parseUnits(
  `${Number(priceErrorTolerance)}`,
  18,
);

export enum PoolFilter {
  All = "All",
  Weighted = "Weighted",
}

export interface hopDictionary {
  [hopToken: string]: Set<string>; // the set of pool ids
}

// infinitesimal is an amount that's used to initialize swap amounts so they are
// not zero or the path's limit.
// It's also used in the calculation of derivatives in pool maths
// const infinitesimal: string = process.env.INFINITESIMAL || '0.000001';
const infinitesimal = 10000000000000000n; // Increasing INFINITESIMAL to '0.01' to test derivative sensitivity
export const INFINITESIMAL = parseUnits(`${Number(infinitesimal)}`, 18);

export const MINIMUM_VALUE = 1n;

import BigNumber from "bignumber.js";
import { Address } from "viem";

export type Token = {
  logoURI?: string;
  default?: boolean; // TODO: deprecate this
  tags?: string[];
  address: Address;
  decimals: number;
  symbol: string;
  name: string;
  usdValue?: string;
  beraValue?: string;
};

export interface BalanceToken extends Token {
  balance: bigint;
  formattedBalance: string;
}

export interface SwapRequest {
  tokenIn: Address;
  tokenOut: Address;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  amount: string;
}

export interface AddLiquidityRequest {
  slippage: number;
  poolPrice: number;
  baseToken: Token;
  quoteToken: Token;
  isAmountBaseDenominated: boolean;
  baseAmount: bigint;
  quoteAmount: bigint;
  poolIdx: number;
}

export interface WithdrawLiquidityRequest {
  slippage: number;
  poolPrice: number;
  baseToken: Token | undefined;
  quoteToken: Token | undefined;
  poolIdx: number | undefined;
  percentRemoval: number;
  seeds: string;
}

export interface PoolV2 {
  id: string;
  base: Address;
  quote: Address;
  baseInfo: Token;
  quoteInfo: Token;
  timeCreate: number;
  poolIdx: number;
  poolName: string;
  tokens: Token[];
  tvlUsd: number;
  feeRate: number;
  baseTokens: string;
  quoteTokens: string;
  volume24h: number;
  fees24h: number;
  totalApy: number;
  bgtApy: string;
  shareAddress: string;
  vaultAddress?: string;
  isDeposited?: boolean;
}

export interface IUserPosition {
  baseAmount: BigNumber;
  quoteAmount: BigNumber;
  formattedBaseAmount: string;
  formattedQuoteAmount: string;
  baseHoneyValue?: string;
  quoteHoneyValue?: string;
  estimatedHoneyValue: number;
  seeds: bigint;
}

export interface ISwaps {
  user: string;
  baseFlow: string;
  quoteFlow: string;
  swapIn: Token;
  swapOut: Token;
  swapInAmount: number;
  swapOutAmount: number;
  transactionHash: string;
  time: number;
  estimatedUsdValue?: number;
  baseAssetUsdPrice: string;
  quoteAssetUsdPrice: string;
}

export interface IProvision {
  user: string;
  baseFlow: number;
  quoteFlow: number;
  changeType: "mint" | "burn";
  transactionHash: string;
  time: number;
  estimatedUsdValue?: number;
  baseAssetUsdPrice: string;
  quoteAssetUsdPrice: string;
}

export interface IUserPool extends PoolV2 {
  userPosition: IUserPosition | undefined;
}

import { type PoolDayData } from "@bera/graphql";
import { type Address } from "viem";

export type TokenData = {
  [address: string]: Token;
};

export interface PoolRecord {
  metadata: {
    blockNum: string;
    txHash: string;
    blockHash: string;
    blockTime: string;
    txIndex: string;
  };
  pool: Address;
  poolName: string;
  shareAddress: string;
  tokens: TokenData;
  swapFee: string;
  totalSupply: bigint;
  totalWeight: number;
}

export interface Token {
  address: Address;
  decimals: number;
  name: string;
  symbol: string;
  weight: string;
  normalizedWeight: number;
  balance: bigint;
  latestPriceUsd: string;
}
export interface Pool {
  metadata: {
    blockNum: string;
    txHash: string;
    blockHash: string;
    blockTime: string;
    txIndex: string;
  };
  pool: Address;
  poolName: string;
  shareAddress: string;
  tokens: Token[];
  swapFee: string;
  formattedSwapFee?: string;
  totalSupply: bigint | string;
  totalWeight: number;
  totalValue?: number;
  dailyVolume?: number;
  weeklyTvl?: number[];
  weeklyVolume?: number[];
  weeklyVolumeTotal?: number;
  weeklyFeesTotal?: number;
  monthlyTvl?: number[];
  monthlyVolume?: number[];
  monthlyVolumeTotal?: number;
  monthlyFeesTotal?: number;
  monthlyFees?: number[];
  quarterlyTvl?: number[];
  quarterlyVolume?: number[];
  quarterlyFees?: number[];
  quarterlyVolumeTotal?: number;
  quarterlyFeesTotal?: number;
  weeklyFees?: number[];
  dailyFees?: number;
  tags?: string[];
  poolShareDenomHex?: string;
  liquidity?: [Address[], string[]];
  bgtApy?: number;
  totalApy?: number;
  feeApy?: number;
  fees?: number;
  bgtPerYear?: number;
  userDepositedShares?: number;
  tvlUsd?: number;
  volumeUsd?: number;
  historicalData?: PoolDayData[];
  createdTimeStamp?: number;
}

export interface LatestPriceUsd {
  id: string;
  price: string;
}
export interface SubGraphPool {
  createdTimeStamp: any;
  feesUsd: string;
  id: string;
  pool: string;
  poolName: string;
  tokens: {
    denomWeight: number;
    amount: number;
    denom: string;
    address: string;
    symbol: string;
    decimals: number;
    latestPriceUsd: LatestPriceUsd;
  }[];
  swapFee: number;
  sharesDenom: string;
  sharesAddress: string;
  totalShares: number;
  tvlUsd: string;
  historicalData: PoolDayData[];
}

export type PoolRecords = Record<string, PoolRecord>;

export interface PoolData extends RawPool {
  totalSupply?: bigint;
  liquidity?: [Address[], bigint[]];
  tokens?: TokenData;
}

export type WeightEntry = {
  denom: Address;
  weight: string;
};

export interface RawPool {
  metadata: {
    blockNum: string;
    txHash: string;
    blockHash: string;
    blockTime: string;
    txIndex: string;
  };
  pool: Address;
  poolName: string;
  poolShareDenom: Address;
  poolOptions: {
    weights: {
      denom: Address;
      weight: string;
    }[];
    swapFee: string;
  };
}

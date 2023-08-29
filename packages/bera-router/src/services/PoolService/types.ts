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
  weeklyVolume?: number[];
  weeklyVolumeTotal?: number;
  weeklyFeesTotal?: number;
  monthlyVolume?: number[];
  monthlyVolumeTotal?: number;
  monthlyFeesTotal?: number;
  monthlyFees?: number[];
  quarterlyVolume?: number[];
  quarterlyFees?: number[];
  quarterlyVolumeTotal?: number;
  quarterlyFeesTotal?: number;
  weeklyFees?: number[];
  dailyFees?: number;
  tags?: string[];
  poolShareDenomHex?: string;
  bgtApy?: number;
  totalApy?: number;
  feeApy?: number;
  fees?: number;
  bgtPerYear?: number;
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

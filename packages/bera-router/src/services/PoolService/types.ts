import { type Address } from "viem";

export type TokenData = {
  [address: string]: {
    address: Address;
    decimals: number;
    name: string;
    symbol: string;
    normalizedWeight: number;
    liquidity: bigint;
  };
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
  shareAddress: Address;
  tokens: TokenData;
  swapFee: string;
  totalSupply: bigint;
}

export interface Token {
  address: Address;
  decimals: number;
  name: string;
  symbol: string;
  normalizedWeight: number;
  liquidity: bigint;
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
  shareAddress: Address;
  tokens: Token[];
  swapFee: string;
  totalSupply: bigint;
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

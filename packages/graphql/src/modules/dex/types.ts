import { type LIQUIDITY_CHANGED_TYPE, type SWAP_DIRECTION } from "./enum";

export interface LiquidityChanged {
  id: string;
  type: LIQUIDITY_CHANGED_TYPE;
  liquidity: Liquidity[];
  sender: string;
  timestamp: number;
}
export interface Liquidity {
  coin: SubgraphCoin;
  swapDirection: SWAP_DIRECTION;
  amount: number;
  timestamp: number;
  latestPriceUsd: {
    id: string;
    price: string;
  };
}
export interface SubgraphCoin {
  denom: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}
export interface PoolDayData {
  id: string;
  tvlUsd: string;
  date: number;
  volumeUsd: string;
  feesUsd: string;
  latestTime: number;
  baseTvl: number;
  quoteTvl: number;
  baseVolume: number;
  quoteVolume: number;
  baseFees: number;
  quoteFees: number;
  lastPriceSwap: number;
  lastPriceLiq: number;
  lastPriceIndic: number;
  feeRate: number;
  baseTvlInHoney: number;
  quoteTvlInHoney: number;
  baseFeesInHoney: number;
  quoteFeesInHoney: number;
  baseVolumeInHoney: number;
  quoteVolumeInHoney: number;
}

export interface PoolDayDataV2 {
  day: number;
  volume24HInHoney: number;
  tvlInHoney: number;
  fees24HInHoney: number;
}

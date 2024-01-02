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
}

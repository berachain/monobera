import type {
  ClosedTrade,
  Market,
  MarketOrder,
  OpenLimitOrder,
  OpenTrade,
  Pagination,
} from "@bera/proto/src";

export interface IMarket extends Market {
  imageUri?: string;
  tokenName?: string;
  dailyHistoricPrice?: number;
  dailyVolume?: number;
  dailyNumOfTrades?: number;
}
export interface OpenPositionData {
  result: OpenTrade[];
  pagination: Pagination;
}

export interface LimitOrderData {
  result: OpenLimitOrder[];
  pagination: Pagination;
}

export interface MarketOrderData {
  result: MarketOrder[];
  pagination: Pagination;
}

export interface ClosedTradeData {
  result: ClosedTrade[];
  pagination: Pagination;
}

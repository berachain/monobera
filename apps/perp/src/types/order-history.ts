import type { ClosedTrade, OpenLimitOrder, OpenTrade } from "@bera/proto/src";

import { type IMarket } from "./market";

export interface IMarketOrder extends OpenTrade {
  market: IMarket;
}

export interface ILimitOrder extends OpenLimitOrder {
  market: IMarket;
}

export interface IClosedTrade extends ClosedTrade {
  market: IMarket;
}

export interface IPosition {
  market: IMarket;
  trader: string;
  pair_index: string;
  index: string;
  buy: boolean;
  leverage: string;
  open_price: string;
  tp: string;
  sl: string;
  borrowing_fee: string;
  rollover_fee: string;
  funding_rate: string;
  closing_fee: string;
  open_fee: string;
  close_time: string;
  open_time: string;
  volume: string;
  pnl: string;
  close_price: string;
  close_type: string;
}

export type CloseOrderPayload = {
  pairIndex: bigint;
  index: bigint;
};

export interface IRow {
  key: string;
  value: React.ReactNode;
}

export interface ICards {
  title: React.ReactNode;
  rows: IRow[];
  footer: React.ReactNode | undefined;
}

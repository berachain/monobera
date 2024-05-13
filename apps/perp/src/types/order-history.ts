import type {
  ClosedTrade,
  OpenLimitOrder,
  OpenTrade,
  MarketOrder,
} from "@bera/proto/src";

import { type IMarket } from "./market";

export interface IOpenTrade extends OpenTrade {
  market: IMarket;
}

export interface ILimitOrder extends OpenLimitOrder {
  market: IMarket;
}

export interface IMarketOrder extends MarketOrder {
  market: IMarket;
}

export interface IClosedTrade extends ClosedTrade {
  market: IMarket;
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

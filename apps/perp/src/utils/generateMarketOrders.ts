import type {
  OpenPositionData,
  ClosedTradeData,
  LimitOrderData,
  MarketOrderData,
  IMarket,
} from "~/types/market";
import type {
  IOpenTrade,
  ILimitOrder,
  IMarketOrder,
  IClosedTrade,
} from "~/types/order-history";

export const generateMarketOrders = (
  data: OpenPositionData | LimitOrderData | MarketOrderData | ClosedTradeData,
  markets: IMarket[],
): (IOpenTrade | ILimitOrder | IMarketOrder | IClosedTrade)[] => {
  return (data?.result ?? []).map((position) => {
    return {
      ...position,
      market: markets.find(
        (market) => market.pair_index === position.pair_index,
      ) as IMarket,
    };
  });
};

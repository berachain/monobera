import { type IMarket } from "~/types/market";
import type {
  ICards,
  IClosedTrade,
  ILimitOrder,
  IMarketOrder,
  IOpenTradeCalculated,
} from "~/types/order-history";
import { getHistoryListItems } from "./history";
import { getLimitListItems } from "./orders";
import { getPnlListItems } from "./pnl";
import { getMarketListItems } from "./positions";

export const getAssetCardList = ({
  openPositionsItems,
  openOrderItems,
  marketOrdersItems,
  markets,
  closedTradesItems,
}: {
  openPositionsItems: IOpenTradeCalculated[];
  openOrderItems: ILimitOrder[];
  closedTradesItems: IClosedTrade[];
  markets: IMarket[];
  marketOrdersItems: IMarketOrder[];
}): {
  marketList: ICards[];
  limitList: ICards[];
  historyList: ICards[];
  pnlList: ICards[];
} => {
  return {
    marketList: getMarketListItems(openPositionsItems ?? [], markets),
    limitList: getLimitListItems(openOrderItems ?? []),
    historyList: getHistoryListItems(marketOrdersItems ?? []),
    pnlList: getPnlListItems(closedTradesItems ?? []),
  };
};

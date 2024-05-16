import { type IMarket } from "~/types/market";
import type {
  ICards,
  IClosedTrade,
  ILimitOrder,
  IMarketOrder,
  IOpenTrade,
} from "~/types/order-history";
import { getHistoryListItems } from "./history";
import { getLimitListItems } from "./orders";
import { getPnlListItems } from "./pnl";
import { getMarketListItems } from "./positions";

export const getAssetCardList = ({
  marketOrderItems,
  limitOrderItems,
  historyItems,
  markets,
  marketOrders,
}: {
  marketOrderItems: IOpenTrade[];
  limitOrderItems: ILimitOrder[];
  historyItems: IClosedTrade[];
  markets: IMarket[];
  marketOrders: IMarketOrder[];
}): {
  marketList: ICards[];
  limitList: ICards[];
  historyList: ICards[];
  pnlList: ICards[];
} => {
  return {
    marketList: getMarketListItems(marketOrderItems ?? [], markets),
    limitList: getLimitListItems(limitOrderItems ?? []),
    historyList: getHistoryListItems(marketOrders ?? []),
    pnlList: getPnlListItems(historyItems ?? []),
  };
};

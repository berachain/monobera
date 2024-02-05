import { useMemo } from "react";

import { AsesetCardMobile } from "~/app/portfolio/userAssets";
import { getAssetCardList } from "../getAssetCards";
import type { IMarket } from "../page";
import {
  getPositionColumns,
  history_columns,
  orders_columns,
  pnl_columns,
} from "./columns";
import { DataTable } from "@bera/shared-ui";
import type { IClosedTrade, ILimitOrder, IMarketOrder } from "./order-history";
import { type BerpTabTypes } from "./order-history-header";

export interface IRow {
  key: string;
  value: React.ReactNode;
}

export interface ICards {
  title: React.ReactNode;
  rows: IRow[];
  footer: React.ReactNode | undefined;
}

export function OrderHistoryTable({
  tab,
  openPositons,
  openOrders,
  history,
  markets,
}: {
  tab: BerpTabTypes;
  openPositons: IMarketOrder[];
  openOrders: ILimitOrder[];
  history: IClosedTrade[];
  markets: IMarket[];
}) {
  const assetCardItems = useMemo(() => {
    return getAssetCardList({
      marketOrderItems: openPositons,
      limitOrderItems: openOrders,
      historyItems: history,
      markets,
    });
  }, [openPositons, openOrders, history]);

  return (
    <div className="relative w-full">
      {tab === "positions" && (
        <DataTable
          columns={getPositionColumns(markets)}
          data={openPositons ?? []}
          className="hidden w-full sm:block"
          embedded
          pagination
        />
      )}
      {tab === "orders" && (
        <DataTable
          columns={orders_columns}
          data={openOrders ?? []}
          className="hidden w-full min-w-[1000px] sm:block"
          embedded
          pagination
        />
      )}
      {tab === "history" && (
        <DataTable
          columns={history_columns}
          data={history ?? []}
          className="hidden w-full min-w-[850px] sm:block"
          embedded
          pagination
        />
      )}
      {tab === "pnl" && (
        <DataTable
          columns={pnl_columns}
          data={history ?? []}
          className="hidden w-full min-w-[1200px] sm:block"
          embedded
          pagination
        />
      )}
      <div className="flex flex-col gap-8 px-6 py-8 sm:hidden">
        {tab === "positions" &&
          assetCardItems.marketList.map((item, index) => (
            <AsesetCardMobile card={item} key={index} />
          ))}
        {tab === "orders" &&
          assetCardItems.limitList.map((item, index) => (
            <AsesetCardMobile card={item} key={index} />
          ))}
        {tab === "history" &&
          assetCardItems.historyList.map((item, index) => (
            <AsesetCardMobile card={item} key={index} />
          ))}
        {tab === "pnl" &&
          assetCardItems.pnlList.map((item, index) => (
            <AsesetCardMobile card={item} key={index} />
          ))}
      </div>
    </div>
  );
}

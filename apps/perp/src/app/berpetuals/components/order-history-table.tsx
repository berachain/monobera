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
import type {
  IClosedTrade,
  ILimitOrder,
  IMarketOrder,
  IPosition,
} from "./order-history";
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
  mobile,
  allPositions,
}: {
  tab: BerpTabTypes;
  openPositons: IMarketOrder[];
  openOrders: ILimitOrder[];
  history: IClosedTrade[];
  markets: IMarket[];
  mobile: boolean;
  allPositions: IPosition[];
}) {
  const assetCardItems = useMemo(() => {
    return getAssetCardList({
      marketOrderItems: openPositons,
      limitOrderItems: openOrders,
      historyItems: history,
      allPositions: allPositions,
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
          enablePagination={!mobile}
        />
      )}
      {tab === "orders" && (
        <DataTable
          columns={orders_columns}
          data={openOrders ?? []}
          className="hidden w-full sm:block"
          embedded
          enablePagination={!mobile}
        />
      )}
      {tab === "history" && (
        <DataTable
          columns={history_columns}
          data={allPositions ?? []}
          className="hidden w-full sm:block"
          embedded
          enablePagination={!mobile}
          additionalTableProps={{
            initialState: {
              sorting: [{ id: "open_time", desc: true }],
            },
          }}
        />
      )}
      {tab === "pnl" && (
        <DataTable
          columns={pnl_columns}
          data={history ?? []}
          className="hidden w-full sm:block"
          embedded
          enablePagination={!mobile}
        />
      )}
      {mobile && (
        <div className="flex flex-col gap-8 px-6 py-8">
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
      )}
    </div>
  );
}

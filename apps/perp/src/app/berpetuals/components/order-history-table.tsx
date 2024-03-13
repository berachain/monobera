import { useMemo, useState, useEffect } from "react";

import { AsesetCardMobile } from "~/app/portfolio/userAssets";
import { getAssetCardList } from "../getAssetCards";
import type { IMarket } from "../page";
import {
  getPositionColumns,
  history_columns,
  orders_columns,
  pnl_columns,
} from "./columns";
import { DataTable, usePrevious } from "@bera/shared-ui";
import type {
  IClosedTrade,
  ILimitOrder,
  IMarketOrder,
  IPosition,
} from "./order-history";
import {
  type RowSelectionState,
  type Updater,
  type TableState,
} from "@tanstack/react-table";
import { type BerpTabTypes } from "./order-wrapper";

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
  openPositions,
  openOrders,
  history,
  markets,
  mobile,
  allPositions,
  selection,
  setSelection,
}: {
  tab: BerpTabTypes;
  openPositions: IMarketOrder[];
  openOrders: ILimitOrder[];
  history: IClosedTrade[];
  markets: IMarket[];
  mobile: boolean;
  allPositions: IPosition[];
  selection: RowSelectionState;
  setSelection: (selection: RowSelectionState) => void;
}) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const prevPositionLength = usePrevious(openPositions?.length ?? 0);
  const prevOrderLength = usePrevious(openOrders?.length ?? 0);

  const assetCardItems = useMemo(() => {
    return getAssetCardList({
      marketOrderItems: openPositions,
      limitOrderItems: openOrders,
      historyItems: history,
      allPositions: allPositions,
      markets,
    });
  }, [openPositions, openOrders, history]);

  // edge case for selection when new orders are opened or closed
  useEffect(() => {
    if (
      tab === "positions" &&
      (openPositions?.length ?? 0) !== prevPositionLength
    ) {
      setSelection({});
    }
  }, [tab, openPositions]);

  useEffect(() => {
    if (tab === "orders" && (openOrders?.length ?? 0) !== prevOrderLength) {
      setSelection({});
    }
  }, [tab, openOrders]);

  const handleRowSelectionChange = (updater: Updater<RowSelectionState>) => {
    const newSelection = updater as RowSelectionState;
    setSelection(newSelection);
  };

  // clear selection on sorting and pagination until we implement server side pagination and sorting
  const fetchData = () => {
    setSelection({});
  };

  return (
    <div className="relative w-full">
      {tab === "positions" && (
        <DataTable
          columns={getPositionColumns(markets)}
          data={openPositions ?? []}
          className="hidden w-full sm:block"
          embedded
          enablePagination={!mobile}
          enableSelection
          fetchData={fetchData}
          additionalTableProps={{
            state: {
              rowSelection: selection,
              pagination: pagination,
            },
            manualPagination: false,
            pageCount: Math.ceil((openPositions ?? []).length / 10),
            onPaginationChange: setPagination,
            onRowSelectionChange: handleRowSelectionChange,
            autoResetPageIndex: false,
            meta: {
              selectVisibleRows: true,
            },
          }}
        />
      )}
      {tab === "orders" && (
        <DataTable
          columns={orders_columns}
          data={openOrders ?? []}
          className="hidden w-full sm:block"
          embedded
          enablePagination={!mobile}
          enableSelection
          additionalTableProps={{
            state: {
              rowSelection: selection,
              pagination: pagination,
            },
            manualPagination: false,
            pageCount: Math.ceil((openOrders ?? []).length / 10),
            onPaginationChange: setPagination,
            onRowSelectionChange: handleRowSelectionChange,
            autoResetPageIndex: false,
            meta: {
              selectVisibleRows: true,
            },
          }}
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
            autoResetPageIndex: false,
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
          additionalTableProps={{
            autoResetPageIndex: false,
          }}
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

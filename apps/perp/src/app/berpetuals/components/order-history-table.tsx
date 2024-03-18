import { useMemo, useState, useEffect } from "react";

import { ClosePositionModal } from "~/app/components/close-position-modal";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
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
  type PaginationState,
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
  pagination,
  setPagination,
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
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
}) {
  const prevPositionLength = usePrevious(openPositions?.length ?? 0);
  const prevOrderLength = usePrevious(openOrders?.length ?? 0);
  const [updateOpen, setUpdateOpen] = useState<boolean | IMarketOrder>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean | IMarketOrder>(false);

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

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    const newPagination = updater as PaginationState;
    setPagination(newPagination);
  };

  // clear selection on sorting and pagination until we implement server side pagination and sorting
  const fetchData = () => {
    setSelection({});
  };

  return (
    <div className="relative w-full overflow-auto h-full">
      {tab === "positions" && (
        <>
          <UpdatePositionModal
            openPosition={updateOpen as IMarketOrder}
            controlledOpen={!!updateOpen}
            onOpenChange={setUpdateOpen}
          />
          <ClosePositionModal
            openPosition={deleteOpen as IMarketOrder}
            controlledOpen={!!deleteOpen}
            onOpenChange={setDeleteOpen}
          />
          <DataTable
            columns={getPositionColumns(markets, setUpdateOpen, setDeleteOpen)}
            data={openPositions ?? []}
            className="hidden overflow-auto h-full w-full sm:block"
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
              onPaginationChange: handlePaginationChange,
              onRowSelectionChange: handleRowSelectionChange,
              autoResetPageIndex: false,
              meta: {
                selectVisibleRows: true,
              },
            }}
          />
        </>
      )}
      {tab === "orders" && (
        <DataTable
          columns={orders_columns}
          data={openOrders ?? []}
          className="hidden overflow-auto h-full w-full sm:block"
          embedded
          enablePagination={!mobile}
          enableSelection
          stickyHeaders
          additionalTableProps={{
            state: {
              rowSelection: selection,
              pagination: pagination,
            },
            manualPagination: false,
            pageCount: Math.ceil((openOrders ?? []).length / 10),
            onPaginationChange: handlePaginationChange,
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
          className="hidden overflow-auto h-full w-full sm:block"
          embedded
          stickyHeaders
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
          className="hidden overflow-auto h-full w-full sm:block"
          embedded
          stickyHeaders
          enablePagination={!mobile}
          additionalTableProps={{
            autoResetPageIndex: false,
          }}
        />
      )}
      {mobile && (
        <div className="w-[calc(100%-16px)] h-[calc(100%+32px)] flex flex-col gap-4 mx-2 my-2">
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

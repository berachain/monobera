import { useEffect, useMemo, useState } from "react";
import { DataTable, usePrevious } from "@bera/shared-ui";
import type {
  PaginationState,
  RowSelectionState,
  Updater,
} from "@tanstack/react-table";

import { ClosePositionModal } from "~/app/components/close-position-modal";
import { historyColumns } from "~/app/components/table-columns/history";
import { ordersColumns } from "~/app/components/table-columns/orders";
import { pnlColumns } from "~/app/components/table-columns/pnl";
import { generatePositionColumns } from "~/app/components/table-columns/positions";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { AsesetCardMobile } from "~/app/portfolio/components/userAssets";
import { type IMarket } from "~/types/market";
import type {
  IClosedTrade,
  ILimitOrder,
  IMarketOrder,
  IPosition,
} from "~/types/order-history";
import type { TableTabTypes } from "~/types/table-tab-types";
import { getAssetCardList } from "./asset-cards/getAssetCards";
import { TotalAmount } from "./total-amount";

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
  tab: TableTabTypes;
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

  const positionsColumns = useMemo(
    () => generatePositionColumns(markets, setUpdateOpen, setDeleteOpen),
    [markets, setUpdateOpen, setDeleteOpen],
  );

  return (
    <div className="relative h-full w-full overflow-auto sm:border-t sm:border-border">
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
            columns={positionsColumns}
            data={openPositions ?? []}
            className="hidden h-full w-full overflow-auto sm:block"
            embedded
            enablePagination={!mobile}
            enableSelection
            fetchData={fetchData}
            stickyHeaders
            additionalActions={[
              <TotalAmount
                className="hidden flex-shrink-0 p-0 sm:flex"
                markets={markets}
                tabType={tab}
                spacer
              />,
            ]}
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
          columns={ordersColumns}
          data={openOrders ?? []}
          className="hidden h-full w-full overflow-auto sm:block"
          embedded
          enablePagination={!mobile}
          enableSelection
          stickyHeaders
          additionalActions={[
            <TotalAmount
              className="hidden flex-shrink-0 p-0 sm:flex"
              markets={markets}
              tabType={tab}
              spacer
            />,
          ]}
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
          columns={historyColumns}
          data={allPositions ?? []}
          className="hidden h-full w-full overflow-auto sm:block"
          embedded
          stickyHeaders
          enablePagination={!mobile}
          additionalActions={[
            <TotalAmount
              className="hidden flex-shrink-0 p-0 sm:flex"
              markets={markets}
              tabType={tab}
              spacer
            />,
          ]}
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
          columns={pnlColumns}
          data={history ?? []}
          className="hidden h-full w-full overflow-auto sm:block"
          embedded
          stickyHeaders
          additionalActions={[
            <TotalAmount
              className="hidden flex-shrink-0 p-0 sm:flex"
              markets={markets}
              tabType={tab}
              spacer
            />,
          ]}
          enablePagination={!mobile}
          additionalTableProps={{
            autoResetPageIndex: false,
          }}
        />
      )}
      {mobile && (
        <div className="mx-2 flex h-[calc(100%+32px)] w-[calc(100%-16px)] flex-col gap-4">
          {tab === "positions" && assetCardItems.marketList.length > 0 && (
            <>
              {assetCardItems.marketList.map((item, index) => (
                <AsesetCardMobile card={item} key={index} />
              ))}
              <div />
            </>
          )}
          {tab === "orders" && assetCardItems.limitList.length > 0 && (
            <>
              {assetCardItems.limitList.map((item, index) => (
                <AsesetCardMobile card={item} key={index} />
              ))}
              <div />
            </>
          )}
          {tab === "history" && assetCardItems.historyList.length > 0 && (
            <>
              {assetCardItems.historyList.map((item, index) => (
                <AsesetCardMobile card={item} key={index} />
              ))}
              <div />
            </>
          )}
          {tab === "pnl" && assetCardItems.pnlList.length > 0 && (
            <>
              {assetCardItems.pnlList.map((item, index) => (
                <AsesetCardMobile card={item} key={index} />
              ))}
              <div />
            </>
          )}
        </div>
      )}
    </div>
  );
}

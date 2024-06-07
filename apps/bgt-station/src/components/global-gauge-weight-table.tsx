import React, { useCallback, useState } from "react";
import { usePollGauges, type Gauge } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { TableState, type ColumnDef } from "@tanstack/react-table";

import { global_gauge_weight_columns } from "~/columns/global-gauge-weight-columns";

const GAUGE_PAGE_SIZE = 10;

export default function GlobalGaugeWeightTable({
  myGauge = false,
  keywords = "",
}: {
  myGauge?: boolean;
  keywords?: string;
}) {
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState([{ id: "activeIncentivesInHoney", desc: true }]);
  const handleNewSort = (newSort: any) => {
    if (newSort === sorting) return;
    setSorting(newSort);
  };
  const { gaugeCounts, gaugeList, isLoading, isValidating } = usePollGauges({
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    page: page + 1,
    pageSize: GAUGE_PAGE_SIZE,
    query: keywords,
  });
  const fetchData = useCallback(
    (state: TableState) => setPage(state?.pagination?.pageIndex),
    [setPage],
  );
  return (
    <div className="w-full ">
      <DataTable
        fetchData={fetchData}
        enablePagination
        loading={isLoading}
        validating={isValidating}
        columns={global_gauge_weight_columns as ColumnDef<Gauge>[]}
        data={myGauge ? [] : gaugeList ?? []}
        className="min-h-[400px] min-w-[1100px] shadow"
        additionalTableProps={{
          initialState: { pagination: { pageSize: GAUGE_PAGE_SIZE } },
          pageCount: Math.ceil(gaugeCounts / GAUGE_PAGE_SIZE),
          state: { sorting },
          manualPagination: true,
        }}
        onRowClick={(row: any) =>
          window.open(
            `/gauge/${row.original.vaultAddress}${myGauge ? "?my-gauge" : ""}`,
            "_self",
          )
        }
        onCustomSortingChange={(a: any) => handleNewSort(a)}
      />
    </div>
  );
}

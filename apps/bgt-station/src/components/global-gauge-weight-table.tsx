import React from "react";
import { usePollGauges, type Gauge } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

import { global_gauge_weight_columns } from "~/columns/global-gauge-weight-columns";

export default function GlobalGaugeWeightTable({
  myGauge = false,
  keywords = "",
}: {
  myGauge?: boolean;
  keywords?: string;
}) {
  const { gaugeList, isLoading, isValidating } = usePollGauges();
  // const [page, setPage] = useState(0);
  // const fetchData = useCallback(
  //   (state: TableState) => setPage(state?.pagination?.pageIndex),
  //   [setPage],
  // );

  return (
    <div className="w-full ">
      <DataTable
        // fetchData={fetchData}
        // enablePagination
        loading={isLoading}
        validating={isValidating}
        columns={global_gauge_weight_columns as ColumnDef<Gauge>[]}
        data={gaugeList ?? []}
        className="min-w-[1100px] shadow"
        // additionalTableProps={{
        //   pageCount: 1,
        //   manualFiltering: true,
        //   manualSorting: true,
        //   manualPagination: true,
        // }}
        // onRowClick={(row: any) =>
        //   window.open(
        //     `/gauge/${row.original.vaultAddress}${myGauge ? "?my-gauge" : ""}`,
        //     "_self",
        //   )
        // }
      />
    </div>
  );
}

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { usePollGauges, useTokens } from "@bera/berajs";
import type { TableState } from "@tanstack/react-table";

import { TableLoading } from "~/app/validators/components/table-loading";
import { global_gauge_weight_columns } from "~/columns/global-gauge-weight-columns";

const DataTable = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.DataTable),
  {
    ssr: false,
    loading: () => <TableLoading />,
  },
);

export default function GlobalGaugeWeightTable({
  keywords = "",
}: {
  keywords?: string;
}) {
  const { gaugeList, isLoading, isValidating } = usePollGauges();
  const { data } = useTokens();
  const tokenList = data?.tokenList ?? [];
  const [page, setPage] = useState(0);
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
        columns={global_gauge_weight_columns as any}
        data={(gaugeList ?? []).map((gauge) => ({
          ...gauge,
          tokenList: [tokenList[0], tokenList[1]],
        }))}
        className="min-w-[1100px] shadow"
        additionalTableProps={{
          pageCount: 1,
          manualFiltering: true,
          manualSorting: true,
          manualPagination: true,
        }}
      />
    </div>
  );
}

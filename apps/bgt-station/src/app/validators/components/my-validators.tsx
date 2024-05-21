import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { usePollValidators } from "@bera/berajs";
import type { ColumnDef, TableState } from "@tanstack/react-table";

import { user_general_validator_columns } from "~/columns/general-validator-columns";
import { TableLoading } from "./table-loading";

const DataTable = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.DataTable),
  {
    ssr: false,
    loading: () => <TableLoading />,
  },
);

export const MyValidator = ({ keyword }: { keyword: any }) => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isValidating } = usePollValidators({page});
  const router = useRouter();

  const fetchData = useCallback(
    (state: TableState) => setPage(state?.pagination?.pageIndex),
    [setPage],
  );

  return (
    <DataTable
      columns={user_general_validator_columns as ColumnDef<unknown, unknown>[]}
      data={data ?? []}
      className="min-w-[900px]"
      fetchData={fetchData}
      enablePagination
      loading={isLoading}
      validating={isValidating}
      additionalTableProps={{
        pageCount: 2,
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
      }}
      onRowClick={(row: any) =>
        router.push(`/validators/${row.original.coinbase}`)
      }
    />
  );
};

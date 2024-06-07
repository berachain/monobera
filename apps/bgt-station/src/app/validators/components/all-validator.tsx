import { useCallback, useState } from "react";
import { usePollValidatorInfo, type Validator } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import type { ColumnDef, TableState } from "@tanstack/react-table";

import { general_validator_columns } from "~/columns/general-validator-columns";

const VALIDATOR_PAGE_SIZE = 10;

export const AllValidator = ({
  keyword,
  onRowClick,
}: {
  keyword?: any;
  onRowClick?: any;
}) => {
  const [page, setPage] = useState(0);

  const [sorting, setSorting] = useState<any>([
    {
      id: "tvl",
      desc: true,
    },
  ]);

  const handleNewSort = (newSort: any) => {
    if (newSort === sorting) return;
    setSorting(newSort);
  };

  const {
    validatorInfoList,
    isLoading,
    isValidating,
    validatorCounts = 0,
  } = usePollValidatorInfo({
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    page: page + 1,
    pageSize: VALIDATOR_PAGE_SIZE,
    query: keyword,
  });
  const fetchData = useCallback(
    (state: TableState) => setPage(state?.pagination?.pageIndex),
    [setPage],
  );
  return (
    <DataTable
      columns={general_validator_columns as ColumnDef<Validator>[]}
      data={validatorInfoList}
      className="min-w-[900px]"
      fetchData={fetchData}
      enablePagination
      loading={isLoading}
      // validating={isValidating}
      additionalTableProps={{
        initialState: { pagination: { pageSize: VALIDATOR_PAGE_SIZE } },
        state: { sorting },
        pageCount: Math.ceil(validatorCounts / VALIDATOR_PAGE_SIZE),
        manualPagination: true,
      }}
      onRowClick={onRowClick}
      onCustomSortingChange={(a: any) => handleNewSort(a)}
    />
  );
};

import { useCallback, useState } from "react";
import { usePollValidatorInfo, type Validator } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import type { ColumnDef, TableState } from "@tanstack/react-table";

import { general_validator_columns } from "~/columns/general-validator-columns";

const VALIDATOR_PAGE_SIZE = 10;

export const AllValidator = ({
  keyword,
  isTyping,
  onRowClick,
}: {
  keyword?: any;
  isTyping?: boolean;
  onRowClick?: any;
}) => {
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState([{ id: "votingpower", desc: true }]);
  const handleNewSort = (newSort: any) => {
    if (newSort === sorting) return;
    setSorting(newSort);
  };
  const fetchData = useCallback(
    (state: TableState) => setPage(state?.pagination?.pageIndex),
    [setPage],
  );
  const {
    validatorInfoList,
    isLoading,
    isValidating,
    validatorCounts = 0,
  } = usePollValidatorInfo({
    sortBy: sorting[0]?.id as "commission" | "apy" | "votingpower" | undefined,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    page: page + 1,
    pageSize: VALIDATOR_PAGE_SIZE,
    query: isTyping ? "" : keyword,
  });
  return (
    <DataTable
      columns={general_validator_columns as ColumnDef<Validator>[]}
      data={validatorInfoList}
      className="min-w-[900px]"
      fetchData={fetchData}
      enablePagination
      loading={isLoading}
      validating={isValidating}
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

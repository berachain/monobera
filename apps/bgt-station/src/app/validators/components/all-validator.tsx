import { useCallback, useState } from "react";
import { usePollValidatorInfo, type Validator } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import type { ColumnDef, TableState } from "@tanstack/react-table";

import { general_validator_columns } from "~/columns/general-validator-columns";

const VALIDATOR_PAGE_SIZE = 2;

export const AllValidator = ({
  keyword,
  onRowClick,
}: {
  keyword?: any;
  onRowClick?: any;
}) => {
  const [page, setPage] = useState(0);
  const {
    validatorInfoList,
    isLoading,
    isValidating,
    validatorCounts = 0,
  } = usePollValidatorInfo({
    sortBy: "votingpower",
    sortOrder: "desc",
    page: page + 1,
    pageSize: VALIDATOR_PAGE_SIZE,
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
      validating={isValidating}
      additionalTableProps={{
        initialState: { pagination: { pageSize: VALIDATOR_PAGE_SIZE } },
        pageCount: Math.ceil(validatorCounts / VALIDATOR_PAGE_SIZE),
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
      }}
      onRowClick={onRowClick}
      onCustomSortingChange={(sort) => {
        console.log(sort);
      }}
    />
  );
};

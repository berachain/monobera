import React, { useCallback, useMemo, useState } from "react";
import {
  usePollValidatorInfo,
  useUserValidators,
  type Validator,
} from "@bera/berajs";
import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import type {
  ColumnDef,
  PaginationState,
  SortingState,
  TableState,
  Updater,
} from "@tanstack/react-table";

import { generalValidatorColumns } from "~/columns/general-validator-columns";

const VALIDATOR_PAGE_SIZE = 10;

export const AllValidator = ({
  keyword,
  isTyping,
  onRowClick,
  page,
  setPage,
}: {
  keyword?: any;
  isTyping?: boolean;
  onRowClick?: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "votingpower", desc: true },
  ]);

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

  const {
    data = [],
    isLoading: isUserLoading,
    isValidating: isUserValidating,
  } = useUserValidators();

  const validators = useMemo(() => {
    return validatorInfoList;
  }, [data, validatorInfoList]);

  const fetchData = useCallback(
    (state: TableState) => {
      setPage(state?.pagination?.pageIndex);
      setSorting(state?.sorting);
    },
    [setPage],
  );

  const handleSortingChange = useCallback(
    (updater: Updater<SortingState>) => {
      setSorting((prev: SortingState) => {
        return typeof updater === "function" ? updater(prev ?? []) : updater;
      });
    },
    [setSorting],
  );

  const handlePaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      setPage((prev: number) => {
        const newPaginationState =
          typeof updater === "function"
            ? updater({
                pageIndex: prev ?? 0,
                pageSize: VALIDATOR_PAGE_SIZE,
              })
            : updater;
        return newPaginationState.pageIndex ?? 0;
      });
    },
    [setPage],
  );

  const allValidatorTable = useAsyncTable({
    fetchData: fetchData,
    columns: generalValidatorColumns as ColumnDef<Validator>[],
    data: validators ?? [],
    enablePagination: true,
    additionalTableProps: {
      meta: {
        loading: isLoading || isUserLoading,
        loadingText: "Loading...",
        validating: isValidating || isUserValidating,
      },
      state: {
        pagination: {
          pageIndex: page,
          pageSize: VALIDATOR_PAGE_SIZE,
        },
        sorting,
      },
      manualSorting: true,
      manualPagination: true,
      autoResetPageIndex: false,
      pageCount: Math.ceil(validatorCounts / VALIDATOR_PAGE_SIZE),
      onPaginationChange: handlePaginationChange,
      onSortingChange: handleSortingChange,
    },
  });

  return (
    <SimpleTable
      table={allValidatorTable}
      className="min-h-[614px]"
      flexTable
      wrapperClassName="min-h-[614px]"
      variant="ghost"
      onRowClick={onRowClick}
      mutedBackgroundOnHead={false}
    />
  );
};

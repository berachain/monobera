"use client";

import _ from "lodash";
import { TableState } from "@tanstack/react-table";
import { useEffect, useState, useMemo } from "react";

import { usePrevious } from "../../../../hooks/usePrevious";
import { BaseTableOptions, useBaseTable } from "./useBaseTable";

interface AsyncTableOptions<TData> extends BaseTableOptions<TData> {
  fetchData: (state: TableState) => Promise<void> | void;
  stateChangeFetchInclusions?: Array<keyof TableState>;
}

/**
 * Used during the check to know when to call fetchData.
 * Changes to these state properties should not trigger a refetch of data.
 */
const defaultStateChangeFetchInclusions: Array<keyof TableState> = [
  "columnFilters",
  "sorting",
  "pagination",
  "globalFilter",
];

export function useAsyncTable<TData>({
  data,
  fetchData,
  columns,
  additionalTableProps,
  stateChangeFetchInclusions = defaultStateChangeFetchInclusions,
  ...props
}: AsyncTableOptions<TData>) {
  const [state, setState] = useState<TableState>({
    columnFilters: [],
    sorting: [],
    rowSelection: {},
    columnVisibility: {},
    columnOrder: [],
    columnPinning: {},
    expanded: {},
    globalFilter: null,
    columnSizing: {},
    ...additionalTableProps?.initialState,
    pagination: {
      pageIndex: additionalTableProps?.initialState?.pagination?.pageIndex ?? 0,
      pageSize: additionalTableProps?.initialState?.pagination?.pageSize ?? 100,
    },
  } as TableState);

  const mergedState = useMemo(() => {
    if (additionalTableProps?.state) {
      return {
        ...state,
        ...(additionalTableProps?.state ?? {}),
      };
    }
    return state;
  }, [state, additionalTableProps?.state]);

  const table = useBaseTable({
    data,
    columns,
    additionalTableProps: {
      state: mergedState,
      manualFiltering: true,
      manualSorting: true,
      manualPagination: true,
      onStateChange: setState,
      ...additionalTableProps,
    },
    ...props,
  });

  const previousState = usePrevious(mergedState);

  const resetPageIndex = table.resetPageIndex;

  useEffect(() => {
    if (
      mergedState.pagination.pageIndex !== 0 &&
      !_.isEqual(
        _.pick(previousState, ["columnFilters", "globalFilter"]),
        _.pick(mergedState, ["columnFilters", "globalFilter"]),
      )
    ) {
      resetPageIndex();
    } else if (
      !_.isEqual(
        _.pick(previousState, stateChangeFetchInclusions),
        _.pick(mergedState, stateChangeFetchInclusions),
      )
    ) {
      fetchData(mergedState);
    }
  }, [
    fetchData,
    previousState,
    mergedState,
    stateChangeFetchInclusions,
    resetPageIndex,
  ]);

  return table;
}

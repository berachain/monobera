"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  TableOptions,
} from "@tanstack/react-table";

import { TextCell } from "../components/cells/text-cell";
import { RowSelectColumn } from "../components/columns/row-select-column";
import { regexFilter } from "../utils";

export interface BaseTableOptions<TData> {
  data: TData[];
  columns: TableOptions<TData>["columns"];
  additionalTableProps?: Partial<TableOptions<TData>>;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
}

export function useBaseTable<TData>({
  data,
  columns,
  additionalTableProps,
  enablePagination,
  enableRowSelection,
}: BaseTableOptions<TData>) {
  const defaultColumn = useMemo<Partial<ColumnDef<TData, unknown>>>(
    () => ({
      cell: TextCell,
      filterFn: regexFilter,
    }),
    [],
  );

  const columnsWithSelection = useMemo(() => {
    if (!enableRowSelection) {
      return columns;
    }

    return [RowSelectColumn, ...columns];
  }, [columns, enableRowSelection]);

  return useReactTable({
    data: data,
    columns: columnsWithSelection as ColumnDef<TData, any>[],
    defaultColumn,
    enableRowSelection,
    columnResizeMode: "onEnd",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    ...(enablePagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
    ...additionalTableProps,
    initialState: {
      columnFilters: [],
      sorting: [],
      rowSelection: {},
      columnVisibility: {},
      columnOrder: [],
      columnPinning: {},
      expanded: {},
      ...additionalTableProps?.initialState,
      pagination: {
        pageIndex:
          additionalTableProps?.initialState?.pagination?.pageIndex ?? 0,
        pageSize:
          additionalTableProps?.initialState?.pagination?.pageSize ?? 100,
      },
    },
    meta: {
      ...additionalTableProps?.meta,
    },
  });
}

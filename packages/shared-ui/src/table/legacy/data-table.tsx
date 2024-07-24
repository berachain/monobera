"use client";

// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { cn } from "@bera/ui";
import { Checkbox } from "@bera/ui/checkbox";
import _ from "lodash";

import "../../types/data-table.d.ts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
  type HeaderContext,
  type TableOptions,
  type TableState,
} from "@tanstack/react-table";

import { usePrevious } from "../../hooks";
import { Spinner } from "../../spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  onCustomSortingChange?: (sorting: any) => void;
  className?: string;
  title?: string;
  embedded?: boolean;
  enablePagination?: boolean;
  enableSelection?: boolean;
  fetchData?: (state: TableState) => Promise<void> | void;
  stateChangeFetchInclusions?: Array<keyof TableState>;
  loading?: boolean;
  validating?: boolean;
  additionalTableProps?: Partial<TableOptions<TData>>;
  customEmptyDataState?: React.ReactElement;
  stickyHeaders?: boolean;
  additionalActions?: React.ReactElement[];
}

interface RowSelectHeaderProps<TData, TValue>
  extends HeaderContext<TData, TValue> {}
interface RowSelectCellProps<TData, TValue>
  extends CellContext<TData, TValue> {}

const defaultStateChangeFetchInclusions: Array<keyof TableState> = [
  "columnFilters",
  "sorting",
  "pagination",
  "globalFilter",
];

function RowSelectHeader<TData, TValue>({
  table,
}: RowSelectHeaderProps<TData, TValue>) {
  return (
    <>
      {table.options.meta?.selectVisibleRows ? (
        <Checkbox
          className="mt-1"
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          onClick={table.getToggleAllPageRowsSelectedHandler()}
        />
      ) : (
        <Checkbox
          className="mt-1"
          checked={
            table.getIsAllRowsSelected()
              ? true
              : table.getIsSomeRowsSelected()
                ? "indeterminate"
                : false
          }
          onClick={table.getToggleAllRowsSelectedHandler()}
        />
      )}
    </>
  );
}

function RowSelectCell<TData, TValue>(
  props: RowSelectCellProps<TData, TValue>,
) {
  return (
    <Checkbox
      className="mt-1"
      checked={props.row.getIsSelected()}
      disabled={!props.row.getCanSelect()}
      onClick={props.row.getToggleSelectedHandler()}
    />
  );
}

const rowSelectColumn = {
  id: "select",
  header: RowSelectHeader,
  cell: RowSelectCell,
  enableHiding: false,
  enableResizing: false,
};

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  className,
  title,
  enablePagination,
  enableSelection,
  embedded,
  fetchData,
  stateChangeFetchInclusions = defaultStateChangeFetchInclusions,
  loading = false,
  validating = false,
  additionalTableProps,
  customEmptyDataState,
  onCustomSortingChange,
  stickyHeaders,
  additionalActions,
}: DataTableProps<TData, TValue>) {
  const initialState = {
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
      pageSize: additionalTableProps?.initialState?.pagination?.pageSize ?? 10,
    },
  };
  const [state, setState] = useState<TableState>(initialState as TableState);

  const mergedState = useMemo(() => {
    if (additionalTableProps?.state) {
      return {
        ...state,
        ...(additionalTableProps?.state ?? {}),
      };
    }
    return state;
  }, [state, additionalTableProps?.state]);

  const previousState = usePrevious(mergedState);
  useEffect(() => {
    if (
      fetchData &&
      !_.isEqual(
        _.pick(previousState, stateChangeFetchInclusions),
        _.pick(mergedState, stateChangeFetchInclusions),
      )
    ) {
      void fetchData(mergedState);
    }
  }, [fetchData, previousState, mergedState, stateChangeFetchInclusions]);

  const tableColumns = useMemo(() => {
    if (enableSelection) {
      return [rowSelectColumn, ...columns];
    }
    return columns;
  }, [columns, enableSelection]);

  const table = useReactTable<TData>({
    state: mergedState,
    data,
    columns: tableColumns,
    initialState: initialState,
    enableRowSelection: true,
    onStateChange: setState,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...additionalTableProps,
    ...(enablePagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
    meta: {
      ...additionalTableProps?.meta,
    },
    ...(onCustomSortingChange
      ? {
          onSortingChange: (value: any) => {
            onCustomSortingChange?.(value());
          },
        }
      : {}),
  });

  return (
    <div
      className={cn("flex h-full w-full flex-col overflow-auto bg-background")}
    >
      <div
        className={cn(
          "h-full w-full overflow-x-auto overflow-y-auto border-border",
          embedded ? "" : "rounded-tl-md rounded-tr-md",
        )}
      >
        <div className={cn(className)}>
          <Table>
            {title && (
              <TableCaption className="text-lg sm:text-2xl">
                {" "}
                {title}
              </TableCaption>
            )}
            <TableHeader
              className={cn("relative", stickyHeaders && "sticky top-0")}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table?.getRowModel().rows.map((row) => (
                  <TableRow
                    className={cn(onRowClick && "hover:cursor-pointer")}
                    onClick={() => onRowClick?.(row as any)}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="border-b">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-background">
                  <TableCell
                    colSpan={columns.length + (enableSelection ? 1 : 0)}
                    className="h-24 text-center"
                  >
                    {" "}
                    {loading ? (
                      <p className="flex justify-center px-4">
                        <Spinner size={16} color="white" />
                      </p>
                    ) : (
                      customEmptyDataState ?? "No results."
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {enablePagination && (
        <div className="flex p-2 text-primary-foreground">
          <div className="flex justify-center overflow-hidden">
            {additionalActions?.map((action, index) => (
              <div key={index} className="inline-flex gap-2.5">
                {action}
              </div>
            ))}
          </div>
          <div className="flex-shink-0 ml-auto flex">
            {validating && (
              <p className="self-center px-4">
                <Spinner size={16} color="white" />
              </p>
            )}
            <div className="flex h-9 items-center gap-1 py-3">
              <button
                type="button"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="select-none rounded-xs border border-border px-2 py-1 text-sm leading-tight text-foreground hover:bg-muted disabled:opacity-50"
              >
                First
              </button>
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="select-none rounded-xs border border-border px-2 py-1 text-sm leading-tight text-foreground hover:bg-muted disabled:opacity-50"
              >
                «
              </button>

              <div className="select-none rounded-xs border border-border px-2 py-1 text-sm leading-tight text-foreground hover:bg-muted disabled:opacity-50">
                {`${table.getState().pagination.pageIndex + 1} of ${
                  table.getPageCount() || 1
                }`}
              </div>

              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="select-none rounded-xs border border-border px-2 py-1 text-sm leading-tight text-foreground hover:bg-muted disabled:opacity-50"
              >
                »
              </button>

              <button
                type="button"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                className="select-none rounded-xs border border-border px-2 py-1 text-sm leading-tight text-foreground hover:bg-muted disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

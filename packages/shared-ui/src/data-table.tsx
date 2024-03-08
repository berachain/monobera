"use client";

import { useEffect, useState } from "react";
import { cn } from "@bera/ui";
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
  type ColumnDef,
  type TableOptions,
  type TableState,
} from "@tanstack/react-table";
import _ from "lodash";

import { usePrevious } from "./hooks";
import { Spinner } from "./spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  onCustomSortingChange?: (sorting: any) => void;
  className?: string;
  title?: string;
  embedded?: boolean;
  enablePagination?: boolean;
  fetchData?: (state: TableState) => Promise<void> | void;
  stateChangeFetchInclusions?: Array<keyof TableState>;
  loading?: boolean;
  additionalTableProps?: Partial<TableOptions<TData>>;
  customEmptyDataState?: React.ReactElement;
}

const defaultStateChangeFetchInclusions: Array<keyof TableState> = [
  "columnFilters",
  "sorting",
  "pagination",
  "globalFilter",
];

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  className,
  title,
  enablePagination,
  embedded,
  fetchData,
  stateChangeFetchInclusions = defaultStateChangeFetchInclusions,
  loading = false,
  additionalTableProps,
  customEmptyDataState,
}: DataTableProps<TData, TValue>) {
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
      pageSize: additionalTableProps?.initialState?.pagination?.pageSize ?? 10,
    },
  } as TableState);

  const previousState = usePrevious(state);
  useEffect(() => {
    if (
      fetchData &&
      !_.isEqual(
        _.pick(previousState, stateChangeFetchInclusions),
        _.pick(state, stateChangeFetchInclusions),
      )
    ) {
      void fetchData(state);
    }
  }, [fetchData, previousState, state, stateChangeFetchInclusions]);

  const table = useReactTable({
    data,
    columns,
    state: state,
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
  });

  return (
    <div
      className={cn(
        "w-full border border-border bg-background",
        embedded ? "" : "rounded-md",
      )}
    >
      <div
        className={cn(
          "w-full overflow-x-auto overflow-y-auto border-b border-border",
          embedded ? "" : "rounded-tl-md rounded-tr-md",
        )}
      >
        <div className={cn(className)}>
          {/* <DataTableToolbar table={table} /> */}
          <Table>
            {title && (
              <TableCaption className="text-lg sm:text-2xl">
                {" "}
                {title}
              </TableCaption>
            )}
            <TableHeader className={"relative bg-muted"}>
              {/* {title && (
                <div className="absolute w-full border-b border-border px-8 py-4 text-2xl font-semibold">
                
                </div>
              )} */}
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
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {customEmptyDataState ?? "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {enablePagination && (
        <div className="flex justify-end p-4 text-primary-foreground">
          {loading && (
            <p className="self-center pr-4">
              <Spinner size={16} color="white" />
            </p>
          )}
          <div className="inline-flex h-9 items-center justify-start rounded-lg border py-3">
            <div className="flex items-center justify-center gap-2.5 border-r px-3 py-2">
              <button
                type="button"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="font-['IBM Plex Sans'] w-8 text-xs leading-tight text-foreground disabled:opacity-50"
              >
                First
              </button>
            </div>
            <div className="flex w-8 items-center justify-center border-r p-1">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="relative text-foreground disabled:opacity-50"
              >
                &lt;
              </button>
            </div>
            <div className="flex items-center justify-center gap-2.5 p-1 ">
              <div className="font-['IBM Plex Sans'] p-2 text-xs leading-tight text-foreground">
                {`${table.getState().pagination.pageIndex + 1} of ${
                  table.getPageCount() || 1
                }`}
              </div>
            </div>
            <div className="flex w-8 items-center justify-center border-l p-1">
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="relative text-foreground disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
            <div className="flex items-center justify-center gap-2.5 border-l px-3 py-2">
              <button
                type="button"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                className="font-['IBM Plex Sans'] w-8 text-xs leading-tight text-foreground disabled:opacity-50"
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

"use client";

// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { cn } from "@bera/ui";
import { Checkbox } from "@bera/ui/checkbox";
import { Skeleton } from "@bera/ui/skeleton";
import _ from "lodash";

// Added this import

import "../../types/data-table.d.ts";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
import { usePrevious } from "@bera/berajs";
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

import { PaginationWithLinks } from "../../pagination-with-links";
import { Spinner } from "../../spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  onCustomSortingChange?: (sorting: any) => void;
  onCustomPaginationChange?: (pagination: any) => void;
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
  totalCount?: number;
  pageSize?: number;
  page?: number;
  useQueryParamSearch?: boolean;
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

// Added this new component
export function DataTableLoading({
  columns,
  rowCount = 10,
}: {
  columns: number;
  rowCount?: number;
}) {
  return (
    <div className="w-full">
      <div>
        <div className="flex flex-row justify-start space-x-4 py-4">
          {Array(columns)
            .fill(0)
            .map((_, index) => (
              <div className="flex w-full">
                <Skeleton className="h-6 w-[100px]" />
              </div>
            ))}
        </div>
        {Array(rowCount)
          .fill(0)
          .map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center space-x-4 py-4">
              {Array(columns)
                .fill(0)
                .map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-6 w-full" />
                ))}
            </div>
          ))}
      </div>
      <div className="flex items-center justify-between space-x-4 py-4">
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-8 w-[200px]" />
      </div>
    </div>
  );
}

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
  additionalTableProps,
  customEmptyDataState,
  onCustomSortingChange,
  stickyHeaders,
  page,
  pageSize,
  totalCount,
  useQueryParamSearch = false,
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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const table = useReactTable<TData>({
    state: mergedState,
    data,
    columns: tableColumns,
    manualPagination: true,
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
    ...(onCustomSortingChange || useQueryParamSearch
      ? {
          onSortingChange: (value: any) => {
            if (useQueryParamSearch) {
              const sort = value()[0].id;
              const desc = value()[0].desc === true ? "desc" : "asc";
              const sortKey = "sort";
              const descKey = "direction";
              const newSearchParams = new URLSearchParams(
                searchParams || undefined,
              );
              newSearchParams.set(sortKey, String(sort));
              newSearchParams.set(descKey, String(desc));

              router.push(`${pathname}?${newSearchParams.toString()}`, {
                scroll: false,
              });
            } else {
            }
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
        <div className="mt-4 w-full">
          <PaginationWithLinks
            totalCount={totalCount ?? 0}
            pageSize={pageSize ?? 10}
            page={page ?? 0}
            pageSizeSelectOptions={{ pageSizeOptions: [10, 25, 50, 100] }}
          />
        </div>
      )}
    </div>
  );
}

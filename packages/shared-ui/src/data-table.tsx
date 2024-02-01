"use client";

import * as React from "react";
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
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  className?: string;
  title?: string;
  pagination?: boolean;
  embedded?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  className,
  title,
  pagination,
  embedded,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
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
          "w-full border-b border-border overflow-x-auto overflow-y-auto",
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {pagination && (
        <div className="text-primary-foreground text-end p-4">
          <div className="py-3 inline-flex h-9 items-center justify-start rounded-lg border">
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
              <div className="font-['IBM Plex Sans'] leading-tight p-2 text-xs text-foreground">
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

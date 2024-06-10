import React, { type PropsWithChildren } from "react";
import { cn } from "@bera/ui";
import { Table } from "@tanstack/react-table";

import { Spinner } from "../../../../../spinner";

export interface TableFooterProps<TData> {
  table: Table<TData>;
  className?: string;
  flexTable?: boolean;
  style?: React.CSSProperties;
  showSelection?: boolean;
}

export function TableFooter<TData>({
  table,
  children,
  className,
  style,
  showSelection,
}: PropsWithChildren<TableFooterProps<TData>>) {
  const usesPagination =
    table.options.getPaginationRowModel || table.options.manualPagination;
  const tableState = table.getState();
  const selection = Object.keys(tableState.rowSelection);

  return (
    <div
      style={style}
      className={cn(
        "relative h-14 p-2 border-t border-border bg-background flex inline-flex",
        className,
      )}
    >
      <div className="flex flex-1 align-left">
        {children}
        <div className="flex items-center justify-center p-1">
          {selection.length > 0 && showSelection && (
            <span className="text-xs leading-tight text-foreground">
              {selection.length} row(s) selected
            </span>
          )}
        </div>
      </div>
      <div className="flex-shink-0 ml-auto flex align-center">
        {usesPagination && (
          <>
            {(table.options.meta?.loading ||
              table.options.meta?.validating) && (
              <p className="self-center px-4">
                <Spinner size={16} color="white" />
              </p>
            )}
            <div className="inline-flex h-9 items-center justify-start rounded-md border py-3">
              <div className="flex items-center justify-center gap-2.5 border-r px-2 py-2">
                <button
                  type="button"
                  onClick={() => {
                    table.setPageIndex(0);
                    table.resetRowSelection();
                  }}
                  disabled={!table.getCanPreviousPage()}
                  className="w-8 select-none text-xs leading-tight text-foreground disabled:opacity-50"
                >
                  First
                </button>
              </div>
              <div className="flex w-8 items-center justify-center border-r p-1">
                <button
                  type="button"
                  onClick={() => {
                    table.previousPage();
                    table.resetRowSelection();
                  }}
                  disabled={!table.getCanPreviousPage()}
                  className="relative select-none text-foreground disabled:opacity-50"
                >
                  &lt;
                </button>
              </div>
              <div className="flex flex-shrink-0 items-center justify-center gap-2.5 p-1">
                <div className="p-2 text-xs leading-tight text-foreground">
                  {`${table.getState().pagination.pageIndex + 1} of ${
                    table.getPageCount() || 1
                  }`}
                </div>
              </div>
              <div className="flex w-8 items-center justify-center border-l p-1">
                <button
                  type="button"
                  onClick={() => {
                    table.nextPage();
                    table.resetRowSelection();
                  }}
                  disabled={!table.getCanNextPage()}
                  className="relative select-none text-foreground disabled:opacity-50	"
                >
                  &gt;
                </button>
              </div>
              <div className="flex items-center justify-center gap-2.5 border-l px-2 py-2">
                <button
                  type="button"
                  disabled={!table.getCanNextPage()}
                  onClick={() => {
                    table.setPageIndex(table.getPageCount() - 1);
                    table.resetRowSelection();
                  }}
                  className="w-8 select-none text-xs leading-tight text-foreground disabled:opacity-50"
                >
                  Last
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

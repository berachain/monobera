"use client";

import React from "react";
import { cn } from "@bera/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Header, flexRender } from "@tanstack/react-table";

import { Tooltip } from "../../../../../tooltip";
import { StringFilter } from "../filters/string-filter";

export interface TableHeaderProps<TData, TValue> {
  header: Header<TData, TValue>;
  className?: string;
  flexTable?: boolean;
  dynamicFlex?: boolean;
  /**
   * Show borders on the table header
   */
  showBorders?: boolean;
  variant?: string;
}

export function TableHeader<TData, TValue>({
  header,
  className,
  flexTable,
  dynamicFlex,
  showBorders = true,
  variant,
}: TableHeaderProps<TData, TValue>) {
  if (header.isPlaceholder) {
    return <td colSpan={header.colSpan} />;
  }
  const isResizing = header.column.getIsResizing();
  const canSort = header.column.getCanSort();

  const canFilter = header.column.columnDef.enableColumnFilter;
  const isFiltering = header.column.getIsFiltered();

  return (
    <th
      className={cn(
        flexTable ? "flex w-full" : "table-cell",
        "relative h-12 items-center px-4 text-left",
        className,
      )}
      style={
        flexTable
          ? dynamicFlex
            ? {
                width:
                  header.column.columnDef.size === 150
                    ? "100%"
                    : header.column.columnDef.size,
                minWidth: header.column.columnDef.minSize,
                borderRight:
                  header.column.getIsLastColumn() || variant === "ghost"
                    ? undefined
                    : "1px solid hsla(0, 2%, 68%, 0.1)",
              }
            : {
                width: header.column.columnDef.size,
                flex: `${header.column.columnDef.size} 0 auto`,
                minWidth: header.column.columnDef.minSize,
                maxWidth: header.column.getIsLastColumn()
                  ? undefined
                  : header.column.columnDef.size,
                borderRight:
                  header.column.getIsLastColumn() || variant === "ghost"
                    ? undefined
                    : "1px solid hsla(0, 2%, 68%, 0.1)",
              }
          : {}
      }
    >
      {typeof header.column.columnDef.header === "string" ? (
        <div
          className={cn(
            "flex flex-1 flex-col font-medium",
            header?.column.columnDef.meta?.headerClassname,
          )}
        >
          <div className="flex text-sm">
            {canFilter ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="mr-1 cursor-pointer self-center rounded-full p-1 hover:bg-hover data-[state=open]:bg-hover">
                    <Icons.filter
                      onClick={() => {}}
                      className={cn(
                        "h-4 w-4",
                        isFiltering ? "text-accent" : "",
                      )}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[250px] border border-border bg-background p-0"
                >
                  <div className="bg-muted p-2">
                    {flexRender(
                      header.column.columnDef.meta?.filter ?? StringFilter,
                      header.getContext(),
                    ) ?? null}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            {flexRender(header.column.columnDef.header, header.getContext())}
            {canSort ? (
              <div className="ml-1 cursor-pointer self-center rounded-full p-1 hover:bg-hover data-[state=open]:bg-hover">
                {header.column.getIsSorted() === "desc" ? (
                  <Icons.sortDesc
                    onClick={header.column.getToggleSortingHandler()}
                    className="h-4 w-4 text-accent "
                  />
                ) : header.column.getIsSorted() === "asc" ? (
                  <Icons.sortAsc
                    onClick={header.column.getToggleSortingHandler()}
                    className="h-4 w-4 text-accent "
                  />
                ) : (
                  <Icons.arrowDownUp
                    onClick={header.column.getToggleSortingHandler()}
                    className="h-4 w-4 "
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        flexRender(header.column.columnDef.header, header.getContext())
      )}
      {header.column.columnDef.meta?.tooltip && (
        <Tooltip
          text={header.column.columnDef.meta.tooltip}
          className={cn("ml-1", header.column.columnDef.meta.tooltipClassname)}
        />
      )}
      {header.column.columnDef.enableResizing && flexTable ? (
        <div
          className="absolute h-full bg-secondary"
          onMouseDown={header.getResizeHandler()}
          onDoubleClick={header.column.resetSize}
          style={{
            width: "6px",
            right: "-3px",
            cursor: "col-resize",
            zIndex: 9,
            height: "100%",
            opacity: isResizing ? 1 : 0,
            transform: isResizing
              ? `translateX(${
                  header.getContext().table.getState().columnSizingInfo
                    .deltaOffset
                }px)`
              : undefined,
          }}
        />
      ) : null}
    </th>
  );
}

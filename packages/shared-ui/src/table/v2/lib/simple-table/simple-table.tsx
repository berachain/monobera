"use client";

import React from "react";
import { cn } from "@bera/ui";

import { ReactTable } from "../components/core/table";
import { TableBody, TableBodyProps } from "../components/core/table-body";
import { TableCaption } from "../components/core/table-caption";
import { TableCell } from "../components/core/table-cell";
import { TableFooter } from "../components/core/table-footer";
import { TableHead } from "../components/core/table-head";
import { TableHeader } from "../components/core/table-header";
import { TableHeaderGroup } from "../components/core/table-header-group";
import { TableRow } from "../components/core/table-row";

export type SimpleTableProps<TData> = TableBodyProps<TData> & {
  title?: string;
  flexTable?: boolean;
  dynamicFlex?: boolean;
  onRowClick?: (row: any) => void;
  wrapperClassName?: string;
  toolbarContent?: React.ReactNode;
  showToolbar?: boolean;
  showSelection?: boolean;
  mutedBackgroundOnHead?: boolean;
  minWidth?: number;
  variant?: string;
};

export function SimpleTable<TData>({
  table,
  className,
  wrapperClassName,
  title,
  flexTable,
  dynamicFlex = true,
  toolbarContent,
  showToolbar = true,
  showSelection = true,
  mutedBackgroundOnHead = true,
  onRowClick,
  variant = "",
  ...props
}: SimpleTableProps<TData>) {
  const minWidth =
    props.minWidth ?? (flexTable ? table.getTotalSize() : "auto");
  const tableBodyRef = React.useRef<HTMLTableSectionElement>(null);
  const rows = table.getRowModel().rows;
  const loading = table.options.meta?.loading || table.options.meta?.validating;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-auto ",
        wrapperClassName,
        variant !== "ghost" && "border border-border rounded-md",
      )}
    >
      <ReactTable flexTable={flexTable} className={className}>
        {/* <caption> components */}
        {title ? (
          <TableCaption
            flexTable={flexTable}
            title={title}
            style={{ minWidth }}
          />
        ) : null}
        {/* <thead> components */}
        <TableHead
          style={{ minWidth }}
          flexTable={flexTable}
          tableBodyRef={tableBodyRef}
          backgroundColor={mutedBackgroundOnHead ? "muted" : "none"}
          variant={variant}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderGroup key={headerGroup.id} flexTable={flexTable}>
              {headerGroup.headers.map((header) => (
                <TableHeader
                  showBorders={mutedBackgroundOnHead}
                  flexTable={flexTable}
                  key={header.id}
                  header={header}
                  variant={variant}
                  dynamicFlex={dynamicFlex}
                  className={header.column.columnDef.meta?.className}
                />
              ))}
            </TableHeaderGroup>
          ))}
        </TableHead>
        {/* <tbody> components */}
        <TableBody
          table={table}
          style={{ minWidth }}
          flexTable={flexTable}
          tableBodyRef={tableBodyRef}
        >
          {rows.length > 0 ? (
            rows.map((row) => {
              return (
                <TableRow
                  row={row}
                  key={row.id}
                  flexTable={flexTable}
                  onRowClick={onRowClick}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      flexTable={flexTable}
                      cell={cell}
                      key={cell.id}
                      dynamicFlex={dynamicFlex}
                      className={cell.column.columnDef.meta?.className}
                    />
                  ))}
                </TableRow>
              );
            })
          ) : loading ? (
            <tr>
              {" "}
              <td className="flex h-24 items-center justify-center">
                {table.options.meta?.loadingText ?? "Loading Table Data..."}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="flex h-24 items-center justify-center">
                {table.options.meta?.emptyDataText ?? "No Results"}
              </td>
            </tr>
          )}
        </TableBody>
        {/* <tfoot> components */}
      </ReactTable>
      {showToolbar && (
        <TableFooter
          table={table}
          flexTable={flexTable}
          showSelection={showSelection}
        >
          {toolbarContent}
        </TableFooter>
      )}
    </div>
  );
}

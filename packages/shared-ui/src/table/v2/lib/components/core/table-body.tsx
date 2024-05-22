"use client";

import { PropsWithChildren, type MutableRefObject } from "react";
import { cn } from "@bera/ui";
import { TableBody as TableBodyComponent } from "@bera/ui/table";
import { Table } from "@tanstack/react-table";

export interface TableBodyProps<TData> {
  table: Table<TData>;
  className?: string;
  style?: React.CSSProperties;
  flexTable?: boolean;
  tableBodyRef?: MutableRefObject<HTMLTableSectionElement | null>;
}

export function TableBody<TData>({
  table,
  className,
  style,
  children,
  flexTable,
  tableBodyRef,
}: PropsWithChildren<TableBodyProps<TData>>) {
  return (
    <TableBodyComponent
      style={
        flexTable
          ? {
              ...(style ?? {}),
            }
          : style
      }
      className={cn(
        flexTable ? "flex flex-col flex-1" : "table-row-group",
        "overflow-x-hidden overflow-y-auto",
        className,
      )}
      ref={tableBodyRef}
    >
      {/* grid body */}
      {children}
    </TableBodyComponent>
  );
}

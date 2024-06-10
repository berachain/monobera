import React, { FC, PropsWithChildren } from "react";
import { cn } from "@bera/ui";
import { TableCell as TableCellComponent } from "@bera/ui/table";
import { Cell, flexRender } from "@tanstack/react-table";

export interface TableCellProps<TData, TValue> {
  cell: Cell<TData, TValue>;
  flexTable?: boolean;
  dynamicFlex?: boolean;
}

export function TableCell<TData, TValue>(
  props: React.PropsWithChildren<TableCellProps<TData, TValue>>,
) {
  return (
    <TableCellComponent
      className={cn(
        props.flexTable ? "flex" : "table-cell",
        "items-center p-1.5 px-4 py-3 text-left truncate",
      )}
      style={
        props.flexTable
          ? props.dynamicFlex
            ? {
                width:
                  props.cell.column.columnDef.size === 150
                    ? "100%"
                    : props.cell.column.columnDef.size,
                minWidth: props.cell.column.columnDef.minSize,
              }
            : {
                width: props.cell.column.columnDef.size,
                flex: `${props.cell.column.columnDef.size} 0 auto`,
                minWidth: props.cell.column.columnDef.minSize,
                maxWidth: props.cell.column.getIsLastColumn()
                  ? undefined
                  : props.cell.column.columnDef.size,
              }
          : {}
      }
    >
      {
        flexRender(
          props.cell.column.columnDef.cell,
          props.cell.getContext(),
        ) as ReturnType<FC<PropsWithChildren>>
      }
    </TableCellComponent>
  );
}

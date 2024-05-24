import React, { CSSProperties, ReactNode } from "react";
import { cn } from "@bera/ui";
import { TableRow as TableRowComponent } from "@bera/ui/table";
import { Row } from "@tanstack/react-table";

export interface TableRowProps<TData> {
  row: Row<TData>;
  style?: CSSProperties;
  className?: string;
  flexTable?: boolean;
  onRowClick?: (row: any) => void;
}

export const TableRow: <TData>(
  p: React.PropsWithChildren<TableRowProps<TData>>,
) => ReactNode | null = ({
  row,
  style,
  onRowClick,
  className,
  children,
  flexTable,
}) => {
  return (
    <TableRowComponent
      key={row.id}
      style={{ borderBottomWidth: "1px", ...(style ?? {}) }}
      onClick={() => onRowClick?.(row as any)}
      data-state={row.getIsSelected() && "selected"}
      className={cn(
        flexTable ? "flex inline-flex" : "table-row",
        "padding-2.5 w-full",
        onRowClick && "hover:cursor-pointer",
        className,
      )}
    >
      {children}
    </TableRowComponent>
  );
};

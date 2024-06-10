import React, { ReactElement, Ref, TdHTMLAttributes } from "react";
import { Column } from "@tanstack/react-table";

interface BaseCellProps<TData, TValue>
  extends TdHTMLAttributes<HTMLTableCellElement> {
  column: Column<TData, TValue>;
}

function _BaseCell<TData, TValue>(
  { column, style, className, ...rest }: BaseCellProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLTableCellElement>,
) {
  return (
    <div
      {...rest}
      data-column-id={column.id}
      style={{
        ...style,
        width: column.getSize(),
        flexGrow: `${column.getSize()} 0 auto`,
        minWidth: column.columnDef.minSize,
        maxWidth: column.getSize(),
        boxSizing: "border-box",
      }}
      className={`${className ?? ""} vw-grid-cell`}
    />
  );
}

export const BaseCell = React.memo(React.forwardRef(_BaseCell)) as <
  TData,
  TValue,
>(
  p: BaseCellProps<TData, TValue> & { ref?: Ref<HTMLTableCellElement> },
) => ReactElement;

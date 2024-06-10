import { Checkbox } from "@bera/ui/checkbox";
import { type HeaderContext } from "@tanstack/react-table";
import { RowSelectCell } from "../cells/row-select-cell";

interface RowSelectHeaderProps<TData, TValue>
  extends HeaderContext<TData, TValue> {}

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

export const RowSelectColumn = {
  id: "select",
  header: RowSelectHeader,
  cell: RowSelectCell,
  size: 48,
  minSize: 48,
  maxSize: 48,
  enableHiding: false,
  enableResizing: false,
};

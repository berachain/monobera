import { Checkbox } from "@bera/ui/checkbox";
import { type CellContext } from "@tanstack/react-table";
import { BaseCell } from "./base-cell";

interface RowSelectCellProps<TData, TValue>
  extends CellContext<TData, TValue> {}

export function RowSelectCell<TData, TValue>(
  props: RowSelectCellProps<TData, TValue>,
) {
  return (
    <BaseCell tabIndex={0} column={props.column}>
      <Checkbox
        className="mt-1"
        checked={props.row.getIsSelected()}
        disabled={!props.row.getCanSelect()}
        onClick={props.row.getToggleSelectedHandler()}
      />
    </BaseCell>
  );
}

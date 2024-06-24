import type {
  CloseOrderPayload,
  ILimitOrder,
  IOpenTrade,
} from "~/types/order-history";
import { RowSelectionState } from "@tanstack/react-table";

export const createCloseOrderPayload = (
  positions: IOpenTrade[] | ILimitOrder[],
  tableStateSelection: RowSelectionState,
): CloseOrderPayload[] => {
  return (
    positions?.reduce<CloseOrderPayload[]>((acc, position, index) => {
      const shouldInclude =
        tableStateSelection && Object.keys(tableStateSelection).length !== 0
          ? tableStateSelection[index] === true
          : true;

      if (shouldInclude) {
        acc.push({
          pairIndex: BigInt(position.market?.pair_index ?? 0),
          index: BigInt(position?.index ?? 0),
        });
      }
      return acc;
    }, []) || []
  );
};

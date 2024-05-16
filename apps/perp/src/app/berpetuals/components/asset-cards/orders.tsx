import { formatUsd } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { CloseOrderModal } from "~/app/components/close-order-modal";
import { PositionCardTitle } from "~/app/components/position-title";
import { UpdateLimitOrderModal } from "~/app/components/update-limit-order-modal";
import type { ICards, ILimitOrder } from "~/types/order-history";

export const getLimitListItems = (limitOrderItems: ILimitOrder[]): ICards[] => {
  const cards = limitOrderItems.map((item: ILimitOrder) => {
    const positionSize = formatFromBaseUnit(item.position_size, 18).times(
      item.leverage ?? "1",
    );
    const openPrice = formatFromBaseUnit(item.min_price ?? "0", 10);
    const size = positionSize.div(openPrice).dp(4).toString(10);
    const date = new Date(Number(item.timestamp_placed) * 1000);
    return {
      title: (
        <PositionCardTitle
          market={item.market}
          type={item.buy === true ? "Long" : "Short"}
          size={size}
        />
      ),
      footer: (
        <div className="flex h-11 w-full flex-row gap-4">
          <UpdateLimitOrderModal
            type={"market"}
            openOrder={item}
            className="h-full w-14"
            trigger={
              <Button variant={"secondary"} className="h-full w-14">
                <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
              </Button>
            }
          />
          <CloseOrderModal
            className="w-full"
            trigger={
              <Button className="text-md h-full w-full cursor-pointer rounded-lg  bg-destructive text-center font-semibold text-destructive-foreground hover:opacity-80 ">
                Close Order
              </Button>
            }
            openOrder={item}
          />
        </div>
      ),
      rows: [
        {
          key: "Time",
          value: (
            <div className="flex gap-1">
              <div className="text-xs font-semibold leading-tight text-foreground ">
                {date.toLocaleDateString()}
              </div>
              <div className="text-xs font-medium leading-tight text-muted-foreground">
                {`(${date.toLocaleTimeString()})`}
              </div>
            </div>
          ),
        },
        {
          key: "Execution Price",
          value: (
            <p className="text-xs font-medium leading-tight text-muted-foreground">
              {formatUsd(
                formatFromBaseUnit(item.min_price ?? "0", 10).toString(10),
              )}
            </p>
          ),
        },
        {
          key: "Position Size",
          value: (
            <p className="text-xs font-medium leading-tight text-muted-foreground">
              {formatUsd(positionSize.toString(10))}
            </p>
          ),
        },
      ],
    };
  });

  return cards;
};

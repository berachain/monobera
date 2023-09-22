import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";

import { TPSL } from "../berpetuals/components/tpsl";

export function UpdatePositionModal({
  trigger,
  className="",
}: {
  trigger: any;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={className}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-[342px]">
          <div className="text-lg font-semibold leading-7">Update Position</div>

          <div className="px-1 text-sm font-medium leading-5 text-muted-foreground">
            Adjust your{" "}
            <span className="text-destructive-foreground">StopLoss</span> &/Or{" "}
            <span className="text-success-foreground">TakeProfit</span>, you can
            update one or both values.
          </div>

          <div className="flex h-[108px] justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Avatar className="h-4 w-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>btc</AvatarFallback>
                </Avatar>
                BTC-USD / Long
              </div>
              <div>
                <div className="text-lg font-semibold leading-7 text-muted-foreground">
                  42.69BTC
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  $657,938.28
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="text-right  text-[10px] leading-[10px] text-muted-foreground">
                  Liquidation Price
                </div>
                <div className=" text-sm font-semibold leading-5 text-destructive-foreground">
                  $23,460.69
                </div>
              </div>
              <div>
                <div className="text-right text-[10px] leading-[10px] text-muted-foreground">
                  Executed at
                </div>
                <div className=" text-sm font-semibold leading-5 text-foreground">
                  $25,312.06
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-[70px] justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="text-[10px] text-muted-foreground">
                UnRealized PnL
              </div>
              <div className=" text-sm font-semibold text-destructive-foreground">
                -$6942.06
              </div>
            </div>
            <div className="flex h-full flex-col justify-between">
              <div className="text-[10px] text-muted-foreground">Leverage</div>
              <div className=" text-sm font-semibold text-foreground">6.9x</div>
            </div>
          </div>
          <TPSL />
          <Button>Update Order</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

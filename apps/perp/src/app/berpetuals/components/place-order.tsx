import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { type OrderType } from "../type";

export function PlaceOrder({ form }: { form: OrderType }) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-xl border border-border bg-muted px-4 py-3 text-xs font-medium leading-5 text-muted-foreground">
      <div className="flex w-full justify-between">
        <div>EST. EXECUTION PRICE</div>
        <div>$0.00</div>
      </div>
      <div className="flex w-full justify-between">
        <div>LIQ. PRICE</div>
        <div>$0.00</div>
      </div>
      <div className="flex w-full justify-between">
        <div>LEVERAGE</div>
        <div>{form.leverage}x</div>
      </div>
      {form.tp && (
        <div className="flex w-full justify-between">
          <div>TAKE PROFIT</div>
          <div>{form.tp}%</div>
        </div>
      )}
      {form.sl && (
        <div className="flex w-full justify-between">
          <div>STOP LOSS</div>
          <div>{form.sl}%</div>
        </div>
      )}
      <div className="flex w-full justify-between">
        <div>POSITION SIZE</div>
        <div>
          0.00{" "}
          <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>OPENING FEES</div>
        <div>
          0.00{" "}
          <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>DAILY (24H) BORROW FEE</div>
        <div>
          0.00{" "}
          <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <Button className="mt-4">
        Place {form.optionType} {form.orderType} order
      </Button>
    </div>
  );
}

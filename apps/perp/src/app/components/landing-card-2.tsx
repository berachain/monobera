"use client";

import { Button } from "@bera/ui/button";

import { TPSL } from "../berpetuals/components/tpsl";

export function LandingCard2() {
  return (
    <div className="pointer-events-none flex w-[350px] flex-col gap-4 overflow-hidden rounded-xl bg-background p-4 blur-[1px]">
      <div className="text-lg font-semibold leading-7">Update Position</div>

      <div className="px-1 text-sm font-medium leading-5 text-muted-foreground">
        Adjust your{" "}
        <span className="text-destructive-foreground">StopLoss</span> &/Or{" "}
        <span className="text-success-foreground">TakeProfit</span>, you can
        update one or both values.
      </div>
      <TPSL leverage={0} tpslOnChange={() => null} />
      <Button>Update Order</Button>
    </div>
  );
}

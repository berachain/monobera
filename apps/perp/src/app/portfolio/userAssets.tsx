"use client";

import { formatUsd, formatter } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Icons } from "@bera/ui/icons";

import { usePositions, type Position } from "~/hooks/usePositions";

export default function UserAssets() {
  const positions = usePositions();
  return (
    <div className="flex flex-col gap-4">
      <AsesetTitle />
      {positions.slice(0, 5).map((position, index) => (
        <AsesetCard key={index} position={position} />
      ))}
    </div>
  );
}

function AsesetTitle() {
  return (
    <div className="flex items-center justify-between px-6 text-xs font-medium leading-3">
      <div className="w-[112px]">Market</div>
      <div className="w-[55px]">Side</div>
      <div className="w-[112px]">Size</div>
      <div className="w-[50px]">Leverage</div>
      <div className="w-[112px]">Liq.Price / Oracle</div>
      <div className="w-[112px]">Unrealized P&L</div>
      <div className="w-[92px]">Realized P&L</div>
      <div className="w-[100px]">TP/SL</div>
      <div className="w-[38px]" />
    </div>
  );
}

function AsesetCard({ position }: { position: Position }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-background px-6 py-4">
      <div className="flex w-[112px] items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{position.assets}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-semibold leading-tight text-foreground">
            {position.assets}
          </div>
          <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
            {position.assets}-{position.counter}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-[55px] text-xs font-medium capitalize leading-tight",
          position.option_type === "long"
            ? "text-success-foreground"
            : "text-destructive-foreground",
        )}
      >
        {position.option_type}
      </div>

      <div className="w-[112px]">
        <div className="text-sm font-semibold leading-tight text-foreground ">
          {formatUsd(position.position_size * position.current_price)}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {position.position_size} {position.assets}
        </div>
      </div>

      <div className="w-[50px] text-xs font-medium leading-tight text-muted-foreground">
        {position.leverage}x
      </div>

      <div className="w-[112px]">
        <div className="text-sm font-semibold leading-tight text-foreground">
          {formatUsd(position.liquidation_price)}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {formatUsd(position.current_price)}
        </div>
      </div>

      <div className="w-[112px]">
        <div
          className={cn(
            "text-sm font-semibold leading-tight text-foreground",
            position.unrealized_pnl >= 0
              ? "text-success-foreground"
              : "text-destructive-foreground",
          )}
        >
          {formatUsd(position.unrealized_pnl)}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {position.open_interest_long > 0 && "+"}
          {(position.open_interest_long * 100).toFixed(2)}%
        </div>
      </div>

      <div className="w-[92px]">
        <div
          className={cn(
            "text-sm font-semibold leading-tight text-foreground",
            position.realized_pnl >= 0
              ? "text-success-foreground"
              : "text-destructive-foreground",
          )}
        >
          {formatUsd(position.realized_pnl)}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {position.open_interest_long > 0 && "+"}
          {(position.open_interest_short * 100).toFixed(2)}%
        </div>
      </div>

      <div className="w-[100px] text-sm font-semibold">
        <span className="text-success-foreground">
          {formatter.format(position.take_profit as number) ?? "-"}
        </span>
        /
        <span className="text-destructive-foreground">
          {formatter.format(position.stop_loss as number) ?? "-"}
        </span>
      </div>

      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted">
        <Icons.close className=" h-4 w-4 text-destructive-foreground" />
      </div>
    </div>
  );
}

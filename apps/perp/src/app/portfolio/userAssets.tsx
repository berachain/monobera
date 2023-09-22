"use client";

import { formatUsd, formatter } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { usePositions, type Position } from "~/hooks/usePositions";
import { ClosePositionModal } from "../components/close-position-modal";
import { PositionTitle, PositionTitleSM } from "../components/position-title";
import { UpdatePositionModal } from "../components/update-position-modal";

export default function UserAssets() {
  const { generatepositionData } = usePositions();
  return (
    <div className="flex flex-col gap-4">
      <AsesetTitle />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col">
        {generatepositionData()
          .slice(0, 5)
          .map((position, index) => (
            <>
              <AsesetCard key={index} position={position} />
              <AsesetCardMobile key={index} position={position} />
            </>
          ))}
      </div>
    </div>
  );
}

function AsesetTitle() {
  return (
    <>
      <div className="hidden items-center justify-between px-6 text-xs font-medium leading-3 lg:flex">
        <div className="w-[112px]">Market</div>
        <div className="w-[55px]">Side</div>
        <div className="w-[112px]">Size</div>
        <div className="w-[50px]">Leverage</div>
        <div className="w-[112px]">Liq.Price / Oracle</div>
        <div className="w-[112px]">Unrealized PnL</div>
        <div className="w-[92px]">Realized PnL</div>
        <div className="w-[100px]">TP/SL</div>
        <div className="w-[74px]" />
      </div>
      <div className="block text-lg font-semibold leading-7 lg:hidden">
        Open Positions
      </div>
    </>
  );
}

function AsesetCard({ position }: { position: Position }) {
  return (
    <div className="hidden items-center justify-between rounded-2xl border border-border bg-background px-6 py-4 lg:flex ">
      <PositionTitle position={position} />
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

      <div className="flex w-[74px] gap-1">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted">
          <Icons.penSquare className="h-4 h-4 text-foreground" />
        </div>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted">
          <Icons.close className="-ml-[2px] h-4 w-4 text-destructive-foreground" />
        </div>
      </div>
    </div>
  );
}

export function AsesetCardMobile({ position }: { position: Position }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:hidden">
      <PositionTitleSM position={position} />

      <div className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        <div className="flex justify-between leading-5">
          <div>Entry Price</div>
          <div>
            {formatUsd(position.position_size * position.current_price)}
          </div>
        </div>
        <div className="flex justify-between leading-5">
          <div>Size</div>
          <div>
            {position.position_size} {position.assets} (
            {formatUsd(position.position_size * position.current_price)})
          </div>
        </div>
        <div className="flex justify-between leading-5">
          <div>Leverage</div>
          <div>{position.leverage}x</div>
        </div>
        <div className="flex justify-between leading-5">
          <div>Liquidation Price</div>
          <div>{formatUsd(position.liquidation_price)}</div>
        </div>
        <div className="flex justify-between leading-5">
          <div>Realized PnL</div>
          <div
            className={cn(
              position.unrealized_pnl > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {" "}
            {position.unrealized_pnl > 0 && "+"}
            {formatUsd(position.realized_pnl)}
          </div>
        </div>
        <div className="flex justify-between leading-5">
          <div>Unrealized PnL</div>
          <div
            className={cn(
              position.unrealized_pnl > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {position.unrealized_pnl > 0 && "+"}
            {formatUsd(position.unrealized_pnl)}
          </div>
        </div>

        <div className="flex justify-between leading-5">
          <div>TP/SL</div>
          <div>
            <span className="text-success-foreground">
              {formatter.format(position.take_profit as number) ?? "-"}
            </span>
            /
            <span className="text-destructive-foreground">
              {formatter.format(position.stop_loss as number) ?? "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <UpdatePositionModal
          trigger={
            <Button className="w-14 flex-shrink-0 bg-primary ">
              <Icons.penSquare className="h-6 h-6 text-primary-foreground" />
            </Button>
          }
        />
        <ClosePositionModal
          className="w-full"
          trigger={
            <Button className="w-full bg-destructive text-destructive-foreground">
              Close Position
            </Button>
          }
        />
      </div>
    </div>
  );
}

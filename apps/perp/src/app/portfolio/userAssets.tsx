import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";

import { usePositions, type Position } from "~/hooks/usePositions";

export default function UserAssets() {
  const positions = usePositions();
  return (
    <div>
      {positions.slice(0, 5).map((position, index) => (
        <AsesetCard key={index} position={position} />
      ))}
    </div>
  );
}

function AsesetCard({ position }: { position: Position }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-background px-6 py-4">
      <div className="flex items-center gap-2">
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
          "w-8 text-xs font-medium capitalize leading-tight",
          position.option_type === "long"
            ? "text-success-foreground"
            : "text-destructive-foreground",
        )}
      >
        {position.option_type}
      </div>

      <div>
        <div className="text-sm font-semibold leading-tight text-foreground">
          ${formatUsd(position.position_size * position.current_price)}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {position.position_size} {position.assets}
        </div>
      </div>

      <div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {position.leverage}x
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold leading-tight text-foreground">
          {formatUsd(position.liquidation_price)}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {formatUsd(position.current_price)}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold leading-tight text-foreground">
          {formatUsd(position.unrealized_pnl)}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {formatUsd(position.current_price)}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold leading-tight text-foreground">
          {formatUsd(position.realized_pnl)}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {formatUsd(position.current_price)}
        </div>
      </div>
    </div>
  );
}

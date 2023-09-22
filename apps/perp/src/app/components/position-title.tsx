import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";

import { type Position } from "~/hooks/usePositions";

export function PositionTitle({
  position,
  className,
}: {
  position: Position;
  className?: string;
}) {
  return (
    <div className={cn("flex w-[112px] items-center gap-2", className)}>
      <Avatar className="h-6 w-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{position.assets}</AvatarFallback>
      </Avatar>
      <div>
        <div className="mt-1 text-xs font-medium leading-tight text-foreground">
          {position.assets}-{position.counter}
        </div>
        <div
          className={cn(
            "text-[10px] uppercase leading-tight text-foreground",
            position.option_type === "long"
              ? "text-success-foreground"
              : "text-destructive-foreground",
          )}
        >
          {position.option_type}
        </div>
      </div>
    </div>
  );
}

export function PositionTitleSM({
  position,
  className,
}: {
  position: Position;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full justify-between", className)}>
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{position.assets}</AvatarFallback>
        </Avatar>
        <div className="text-sm font-semibold leading-tight text-muted-foreground">
          {position.assets}-{position.counter} /{" "}
          <span
            className={cn(
              "capitalize",
              position.option_type === "long"
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {position.option_type}
          </span>
        </div>
      </div>
      <div className="text-lg font-semibold leading-7 text-muted-foreground">
        {position.position_size} {position.assets}
      </div>
    </div>
  );
}

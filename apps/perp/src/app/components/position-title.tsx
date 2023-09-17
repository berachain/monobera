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
        <div className="text-sm font-semibold leading-tight text-foreground">
          {position.assets}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {position.assets}-{position.counter}
        </div>
      </div>
    </div>
  );
}

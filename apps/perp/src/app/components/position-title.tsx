import Image from "next/image";
import { cn } from "@bera/ui";

import { type IMarket } from "../berpetuals/page";

export function PositionTitle({
  market,
  className,
}: {
  market: IMarket;
  className?: string;
}) {
  return (
    <div className={cn("flex w-[112px] items-center gap-2", className)}>
      <Image
        src={market.imageUri ?? ""}
        alt={"selectedMarket"}
        width={24}
        height={24}
        className="rounded-full"
      />{" "}
      <div>
        <div className="mt-1 text-sm font-semibold leading-tight text-foreground">
          {market.tokenName}
        </div>
        <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
          {market.name}
        </div>
      </div>
    </div>
  );
}

export function PositionTitleSM({
  position,
  className,
}: {
  position: IMarket;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full justify-between", className)}>
      {/* <div className="flex items-center gap-2">
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
      </div> */}
    </div>
  );
}

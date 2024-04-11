import React from "react";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import {
  Tooltip as BeraUiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@bera/ui/tooltip";

export function Tooltip({
  text,
  className,
  size = 4,
  children,
  toolTripTrigger,
  ...props
}: {
  text?: any;
  className?: string;
  size?: number;
  children?: React.ReactNode;
  toolTripTrigger?: React.ReactNode;
}) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  return (
    <TooltipProvider>
      <BeraUiTooltip open={tooltipOpen} defaultOpen={false} {...props}>
        <TooltipTrigger asChild>
          {toolTripTrigger ? (
            <div
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
            >
              {toolTripTrigger}
            </div>
          ) : (
            <Button
              variant="ghost"
              className={cn(
                "flex-inline h-5 w-5 rounded-full p-0 align-middle hover:bg-transparent",
                className,
              )}
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
            >
              <Icons.tooltip className={cn(`h-${size} w-${size}`)} />
              <span className="sr-only">Tooltip</span>
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent className="w-fit max-w-[96vw]">
          {text}
          {children}
        </TooltipContent>
      </BeraUiTooltip>
    </TooltipProvider>
  );
}

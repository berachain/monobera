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
  toolTipTrigger,
  ...props
}: {
  text?: any;
  className?: string;
  size?: number;
  children?: React.ReactNode;
  toolTipTrigger?: React.ReactNode;
}) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  return (
    <TooltipProvider>
      <BeraUiTooltip open={tooltipOpen} defaultOpen={false} {...props}>
        <TooltipTrigger asChild>
          {toolTipTrigger ? (
            <div
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
            >
              {toolTipTrigger}
            </div>
          ) : (
            <div
              className={cn(
                "inline-flex h-5 w-5 rounded-full align-middle items-center text-muted-foreground hover:bg-transparent",
                className,
              )}
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
            >
              <Icons.tooltip className={cn(`h-${size} w-${size}`)} />
              <span className="sr-only">Tooltip</span>
            </div>
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

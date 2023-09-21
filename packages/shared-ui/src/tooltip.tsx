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
}: {
  text: any;
  className?: string;
}) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  return (
    <TooltipProvider>
      <BeraUiTooltip open={tooltipOpen} defaultOpen={false}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex-inline h-5 w-5 rounded-full p-0 align-middle",
              className,
            )}
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
          >
            <Icons.tooltip className="h-4 w-4" />
            <span className="sr-only">Tooltip</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </BeraUiTooltip>
    </TooltipProvider>
  );
}

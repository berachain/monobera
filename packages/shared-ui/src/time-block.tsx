import React from "react";
import {
  Tooltip as BeraUiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@bera/ui/tooltip";

export function Timeblock({
  text,
  blockDown,
}: {
  text: any;
  blockDown?: boolean;
}) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  return (
    <TooltipProvider>
      <BeraUiTooltip open={tooltipOpen} defaultOpen={false}>
        <TooltipTrigger asChild>
          <div
            className={`h-3 w-3 rounded-sm hover:cursor-pointer`}
            style={{ background: blockDown ? `#DC2626` : `#059669` }}
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
          />
        </TooltipTrigger>
        <TooltipContent className="text-muted-foreground">
          {text}
        </TooltipContent>
      </BeraUiTooltip>
    </TooltipProvider>
  );
}

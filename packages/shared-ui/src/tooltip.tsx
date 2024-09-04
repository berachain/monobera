import React, { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import {
  Tooltip as BeraUiTooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@bera/ui/tooltip";

const OptionalPortal: FC<
  PropsWithChildren<
    {
      usePortal?: boolean;
    } & ComponentProps<typeof TooltipPortal>
  >
> = ({ usePortal = false, children, ...props }) => {
  return usePortal ? (
    <TooltipPortal {...props}>{children}</TooltipPortal>
  ) : (
    <>{children}</>
  );
};

export function Tooltip({
  text,
  className,
  size = 4,
  children,
  toolTipTrigger,
  portal = false,
  ...props
}: {
  text?: any;
  className?: string;
  size?: number;
  portal?: boolean | ComponentProps<typeof TooltipPortal>;
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
                "inline-flex h-5 w-5 items-center rounded-full align-middle text-muted-foreground hover:bg-transparent",
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
        <OptionalPortal
          usePortal={!!portal}
          {...(typeof portal === "object" ? portal : {})}
        >
          <TooltipContent className="w-fit max-w-[96vw]">
            {text}
            {children}
          </TooltipContent>
        </OptionalPortal>
      </BeraUiTooltip>
    </TooltipProvider>
  );
}

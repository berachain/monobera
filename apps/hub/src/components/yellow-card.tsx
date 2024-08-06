import React, { type PropsWithChildren } from "react";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";

type Props = {
  tooltip?: any;
  className?: string;
};

export default function YellowCard({
  tooltip,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "to-transaparent relative inline-flex flex-col items-center justify-start gap-4 rounded-[18px] border border-border bg-card p-8",
        className,
      )}
    >
      {tooltip && (
        <div className="absolute right-3 top-3">
          <Tooltip text={tooltip} />
        </div>
      )}
      {children}
    </div>
  );
}

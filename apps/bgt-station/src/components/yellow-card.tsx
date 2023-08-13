import React, { PropsWithChildren } from "react";
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
        "relative inline-flex flex-col items-center justify-start gap-4 rounded-[18px] border border-amber-200 bg-gradient-to-b from-amber-100 to-stone-50 p-8",
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

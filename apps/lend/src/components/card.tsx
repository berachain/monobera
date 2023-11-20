import React, { type PropsWithChildren } from "react";
import { cn } from "@bera/ui";

type Props = {
  className?: string;
};

export default function Card({
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "rounded-18 block border border-border bg-background p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

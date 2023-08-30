import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2 py-1 font-thin transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary border-transparent text-primary-foreground",
        secondary: "bg-muted border-border text-muted-foreground",
        outline: "text-foreground",
        destructive:
          "bg-destructive border-destructive-foreground text-destructive-foreground",
        warning: "bg-warning text-warning-foreground border-warning-foreground",
        info: "bg-info text-info-foreground border-info-foreground",
        success: "bg-success text-success-foreground border-success-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

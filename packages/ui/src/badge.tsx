import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
        secondary:
          "bg-muted hover:bg-border border-transparent text-foreground",
        destructive:
          "bg-red-50 hover:bg-red-50/80 border-transparent text-red-700",
        outline: "text-foreground",
        info: "bg-info text-info-foreground border-transparent",
        success: "bg-success text-success-foreground border-transparent",
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

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const alertVariants = cva(
  "relative w-full rounded-xl border px-4 py-3 text-sm font-normal leading-tight",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        warning:
          "border-solid border-warning-foreground bg-warning text-warning-foreground",
        info: "border-solid border-info-foreground bg-info text-info-foreground",
        success:
          "border-solid border-success-foreground bg-success text-success-foreground",
        destructive:
          "text-destructive-foreground border-destructive-foreground dark:border-destructive text-destructive-foreground bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "text-sm font-semibold leading-tight tracking-tight",
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs leading-tight md:text-sm", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

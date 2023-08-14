import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-muted hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "hover:bg-muted border drop-shadow-sm shadow-sm",
        secondary:
          "bg-muted text-foreground border border-border hover:bg-muted/80",
        ghost: " hover:bg-muted",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-11 py-2 px-4 text-lg font-semibold leading-7",
        sm: "h-8 px-3 rounded-xl text-sm font-medium leading-[14px]",
        lg: "h-14 px-8 rounded-md text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

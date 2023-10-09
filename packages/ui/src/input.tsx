import * as React from "react";

import { cn } from "./utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface CustomInputProps extends InputProps {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}
const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, startAdornment, endAdornment, type, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {startAdornment && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 disabled:text-muted-foreground">
            {startAdornment}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "focus:border-1 flex h-10 w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:text-muted-foreground",
            className,
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3 text-muted-foreground disabled:text-muted-foreground">
            {endAdornment}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

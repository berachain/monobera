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
      <div className="relative rounded-md">
        {startAdornment && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {startAdornment}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-border bg-input py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3">
            {endAdornment}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

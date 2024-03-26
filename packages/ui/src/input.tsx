import * as React from "react";

import { cn } from "./utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface CustomInputProps extends InputProps {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  outerClassName?: string;
  /** @param allowScientific - if @type is "number", this allows scientific notation by allowing the characters "e" or "E" to be inserted into the input */
  allowScientific?: boolean;
  /** @param allowMinus - if @type is "number", this allows negative numbers by allowing the character "-" to be inserted into the input */
  allowMinus?: boolean;
  /** @param allowDecimal - if @type is "number", this allows negative numbers by allowing the character "." to be inserted into the input */
  allowDecimal?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      className,
      outerClassName,
      startAdornment,
      endAdornment,
      type,
      allowScientific = false,
      allowMinus = true,
      allowDecimal = true,
      onChange,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "number" && !allowScientific) {
        e.target.value = e.target.value?.replaceAll(/[eE]/g, "");
      }
      if (type === "number" && !allowMinus) {
        e.target.value = e.target.value?.replace("-", "");
      }
      if (type === "number" && !allowDecimal) {
        e.target.value = e.target.value?.replace(".", "");
      }
      if (type === "number") {
        e.target.value = e.target.value?.replaceAll(/[^eE\d.-]+/g, "");
        if (e.target.value?.split(".").length > 2) {
          // abort if more than one decimal in number
          return;
        }
      }
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === "number" && !allowMinus && e.key === "-") {
        e.preventDefault();
        return;
      }
      if (type === "number" && !allowScientific && ["e", "E"].includes(e.key)) {
        e.preventDefault();
        return;
      }
      if (type === "number" && !allowDecimal && e.key === ".") {
        e.preventDefault();
        return;
      }
      if (type === "number" && /[^eE\d.-]+/.test(e.key)) {
        return;
      }
      onKeyDown?.(e);
    };

    return (
      <div className={cn("relative w-full", outerClassName)}>
        {startAdornment && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 disabled:text-muted-foreground">
            {startAdornment}
          </div>
        )}
        <input
          type={type !== "number" ? type : undefined}
          className={cn(
            "focus:border-1 flex h-10 w-full rounded-md border border-border px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:text-muted-foreground",
            className,
          )}
          ref={ref}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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

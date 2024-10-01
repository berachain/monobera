import * as React from "react";

import { cn } from "./utils/cn";
import { Label } from "./label";
import { FormError } from "./form-error";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface CustomInputProps extends InputProps {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: "muted" | "black";
  outerClassName?: string;
  /** @param allowScientific - if @type is "number-enhanced", this allows scientific notation by allowing the characters "e" or "E" to be inserted into the input */
  allowScientific?: boolean;
  /** @param allowMinus - if @type is "number-enhanced", this allows negative numbers by allowing the character "-" to be inserted into the input */
  allowMinus?: boolean;
  /** @param allowDecimal - if @type is "number-enhanced", this allows negative numbers by allowing the character "." to be inserted into the input */
  allowDecimal?: boolean;
  type?: InputProps["type"] | "number-enhanced";
}

const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  CustomInputProps & { label?: string; error?: string | null }
>(({ label, error, ...props }, ref) => {
  return (
    <div className="grid grid-cols-1 gap-y-2">
      {label && (
        <Label disabled={props.disabled} htmlFor={props.id}>
          {label}
        </Label>
      )}

      <Input {...props} ref={ref} />

      <FormError>{error}</FormError>
    </div>
  );
});

InputWithLabel.displayName = "InputWithLabel";

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
      variant = "muted",
      ...props
    },
    ref,
  ) => {
    const keepFirst = (str: string = "", char: string) => {
      const firstIndex = str.indexOf(char);
      const formatted = str.replaceAll(char, "").split("");
      formatted.splice(firstIndex, 0, char);
      return formatted.join("");
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "number-enhanced" && !allowScientific) {
        e.target.value = e.target.value?.replaceAll(/[eE]/g, "");
      }
      if (type === "number-enhanced" && !allowMinus) {
        e.target.value = e.target.value?.replace("-", "");
      }
      if (type === "number-enhanced" && !allowDecimal) {
        e.target.value = e.target.value?.replace(".", "");
      }
      if (type === "number-enhanced") {
        e.target.value = e.target.value?.replaceAll(/[^eE\d.-]+/g, "");
        if (e.target.value?.split(".").length > 2) {
          // abort if more than one decimal in number
          e.target.value = keepFirst(e.target.value, ".");
          return;
        }
        if (e.target.value?.toLowerCase().split("e").length > 2) {
          // abort if more than one e in number
          e.target.value = keepFirst(e.target.value, "e");
          return;
        }
        if (e.target.value?.slice(1)?.includes("-")) {
          // abort if more than one - and not in first index in number
          e.target.value =
            e.target.value[0] + e.target.value.slice(1).replaceAll("-", "");
          return;
        }
      }
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === "number-enhanced" && !allowMinus && e.key === "-") {
        e.preventDefault();
        return;
      }
      if (
        type === "number-enhanced" &&
        !allowScientific &&
        ["e", "E"].includes(e.key)
      ) {
        e.preventDefault();
        return;
      }
      if (type === "number-enhanced" && !allowDecimal && e.key === ".") {
        e.preventDefault();
        return;
      }
      if (type === "number-enhanced" && /[^eE\d.-]+/.test(e.key)) {
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
          type={type === "number-enhanced" ? undefined : type}
          className={cn(
            "focus:border-1 flex h-10 w-full rounded-sm border border-border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus:border-foreground focus:outline-none disabled:cursor-not-allowed",
            variant === "black" && "bg-black",
            variant === "muted" &&
              "text-foreground placeholder:text-muted-foreground disabled:text-muted-foreground",
            endAdornment && "pr-10", // Add right padding when endAdornment exists
            className,
          )}
          ref={ref}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {endAdornment && (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3 text-muted-foreground disabled:text-foreground-foreground">
            {endAdornment}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, InputWithLabel };

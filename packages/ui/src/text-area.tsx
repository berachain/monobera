import * as React from "react";

import { cn } from "./utils/cn";
import { FormError } from "./form-error";

export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string | null;
    variant?: "black" | "muted";
  };

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, variant = "muted", ...props }, ref) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor={props.id}
          className="text-sm font-semibold leading-tight  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <textarea
          className={cn(
            "focus:border-1 flex w-full rounded-xl border border-border px-3 py-2 text-sm text-foreground shadow ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:text-muted-foreground",
            variant === "black" && "bg-black",
            variant === "muted" &&
              "text-foreground placeholder:text-muted-foreground  disabled:text-muted-foreground",
            className,
          )}
          ref={ref}
          rows={4}
          {...props}
        />
        {error && <FormError>{error}</FormError>}
      </div>
    );
  },
);
TextArea.displayName = "TextArea";

export { TextArea };

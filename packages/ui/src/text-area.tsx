import * as React from "react";

import { cn } from "./utils/cn";

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "focus:border-1 flex h-10 w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground shadow ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:text-muted-foreground",
          className,
        )}
        rows={3}
        ref={ref}
        {...props}
      />
    );
  },
);
TextArea.displayName = "TextArea";

export { TextArea };

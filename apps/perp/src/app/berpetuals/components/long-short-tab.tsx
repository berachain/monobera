import { cn } from "@bera/ui";

export function LongShortTab({
  value = "long",
  valueOnChange,
}: {
  value?: "short" | "long";
  valueOnChange?: (value: "short" | "long") => void;
}) {
  return (
    <div className="flex h-12 flex-shrink-0 flex-grow-0 cursor-pointer ">
      <div
        onClick={() => valueOnChange?.("long")}
        className={cn(
          "flex h-full w-1/2 flex-shrink-0 flex-grow-0 items-center justify-center border-b border-r border-border font-semibold hover:border-b-success-foreground",
          value === "long" &&
            "border-b-success-foreground text-success-foreground",
        )}
      >
        Long
      </div>
      <div
        onClick={() => valueOnChange?.("short")}
        className={cn(
          "flex h-full w-1/2 flex-shrink-0 flex-grow-0 items-center justify-center border-b border-border font-semibold hover:border-destructive-foreground",
          value === "short" &&
            "border-destructive-foreground text-destructive-foreground",
        )}
      >
        Short
      </div>
    </div>
  );
}

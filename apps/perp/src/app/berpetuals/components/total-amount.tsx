import { cn } from "@bera/ui";

export function TotalAmount({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex justify-between border-y border-border p-3",
        className,
      )}
    >
      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Relative Pnl
        </span>
        <span className="font-medium text-success-foreground">
          $1,246,499.00
        </span>
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Position Size
        </span>
        <span className="font-medium text-foreground">$69,246,499.00</span>
      </div>
    </div>
  );
}

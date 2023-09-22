import { cn } from "@bera/ui";

export function OrderHistorHeader({
  headers,
  tabType,
  setTabType,
}: {
  headers: {
    title: string;
    counts?: number;
    type: string;
  }[];
  tabType: "positions" | "orders" | "history" | "pnl";
  setTabType: (type: "positions" | "orders" | "history" | "pnl") => void;
}) {
  return (
    <div>
      <div className="flex w-full flex-col items-center justify-between border-y border-border bg-muted px-6 py-4 sm:flex-row">
        <div className=" flex gap-10 text-foreground">
          {headers.map((header, index) => (
            <div
              onClick={() =>
                setTabType(
                  header.type as "positions" | "orders" | "history" | "pnl",
                )
              }
              key={index}
              className={cn(
                "flex cursor-pointer items-center gap-2",
                tabType === header.type
                  ? "text-sm font-semibold"
                  : "text-xs font-medium text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "hover:underline",
                  tabType === header.type
                    ? "text-sm font-semibold"
                    : "text-xs font-medium text-muted-foreground",
                )}
              >
                {header.title}
              </div>
              {header.counts && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-background">
                  {header.counts}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 block w-full border-t border-border pt-4 sm:hidden" />
        <div className="w-full cursor-pointer rounded-lg bg-destructive px-2 py-1 text-center text-sm font-semibold text-destructive-foreground hover:opacity-80 sm:w-fit">
          🌋 Market Close All
        </div>
      </div>
    </div>
  );
}

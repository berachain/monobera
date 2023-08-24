import { cn } from "@bera/ui";

export default function GeneralInfo() {
  const info = [
    {
      title: "Trading Volume",
      amount: "$842,886,669",
      subtitle: "Exchanged in the last 24hours",
    },
    {
      title: "Number of Trades",
      amount: "182,073",
      subtitle: "Exchanged in the last 24hours",
    },
    {
      title: "Open Interest",
      amount: "$267,393,702",
      subtitle: "In open positions on BeraPerps",
    },
  ];
  return (
    <div className="flex h-36 w-full max-w-[1078px] items-center justify-between rounded-2xl border border-border bg-stone-900 bg-opacity-20 shadow-dark-shadow">
      {info.map((item, index) => (
        <div
          key={index}
          className={cn(
            index === 1 ? "border-l border-r border-border" : "",
            "flex h-full flex-1 flex-col items-center justify-center gap-1",
          )}
        >
          <div className="mb-1 text-center text-sm font-normal leading-tight text-muted-foreground">
            Open Interest
          </div>
          <div className="text-3xl font-semibold leading-9 text-popover-foreground">
            $267,393,702
          </div>
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            In open positions on BeraPerps
          </div>
        </div>
      ))}
    </div>
  );
}

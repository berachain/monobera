import { formatUsd } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";

export function UserGeneralInfo() {
  const portfolio = {
    total_amount: 4206.9,
    p_and_l: -26.71,
    data: [
      {
        subtitle: "Total Trades",
        amount: 420,
      },
      {
        subtitle: "Feeds Paid",
        amount: formatUsd(690.42),
      },
      {
        subtitle: "PnL Ratio",
        amount: <>tin</>,
      },
    ],
  };
  return (
    <div className="flex w-full flex-shrink-0 flex-col gap-8 rounded-md border border-border bg-muted px-4 py-6 md:w-[270px]">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-none text-muted-foreground">
          Current Open Positions <Tooltip text="tooltip text" />
        </div>
        <div className="text-3xl font-semibold leading-9 text-foreground">
          {formatUsd(portfolio.total_amount)}
        </div>
        <div
          className={cn(
            "text-sm font-medium leading-normal",
            portfolio.p_and_l < 0
              ? "text-destructive-foreground"
              : "text-success-foreground",
          )}
        >
          {formatUsd(portfolio.p_and_l)} (
          {(portfolio.p_and_l / portfolio.total_amount).toFixed(2)})%
          <span className="ml-2 cursor-pointer text-muted-foreground underline">
            24H PnL
          </span>
        </div>
      </div>

      <div>
        <div className="mb-4 border-b border-border p-[10px] font-medium">
          Details
        </div>
        <div className="p flex flex-col gap-2">
          {portfolio.data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between px-3 text-sm leading-tight"
            >
              <div>{item.subtitle}</div>
              <div>{item.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

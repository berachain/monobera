"use client";

import { formatUsd, formatter } from "@bera/berajs";
import { cn } from "@bera/ui";

export default function GeneralInfo({
	tradingSummary,
}: {
	tradingSummary: any;
}) {
	const info = [
		{
			title: "Trading Volume",
			amount: formatUsd(tradingSummary?.volume),
			subtitle: "In the last 24 hours",
		},
		{
			title: "Number of Trades",
			amount: formatter.format(tradingSummary?.num_trades),
			subtitle: "In the last 24 hours",
		},
		{
			title: "Open Interest",
			amount: formatUsd(tradingSummary?.oi),
			subtitle: "Currently open",
		},
	];
	return (
		<div className="flex justify-center">
			<div className="bg-backgrond flex h-36 w-[90%] max-w-[1078px] items-center justify-between rounded-2xl border border-border bg-opacity-20 shadow-light-shadow backdrop-blur-sm dark:shadow-dark-shadow">
				{info.map((item, index) => (
					<div
						key={index}
						className={cn(
							index === 1 ? "border-l border-r border-border" : "",
							"flex h-full flex-1 flex-col items-center justify-center gap-1",
						)}
					>
						<div className="mb-1 text-center text-xs font-normal leading-tight text-muted-foreground sm:leading-3 lg:text-sm lg:leading-tight xl:leading-normal">
							{item.title}
						</div>
						<div className="text-sm font-semibold text-popover-foreground sm:leading-tight md:text-xl md:leading-7 lg:text-3xl lg:leading-9">
							{item.amount}
						</div>
						<div className="text-center text-xs font-medium leading-tight text-muted-foreground md:px-8">
							{item.subtitle}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

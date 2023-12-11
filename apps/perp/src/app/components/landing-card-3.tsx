"use client";

import { useState } from "react";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";

export function LandingCard3() {
	const withdrawTier = [25, 50, 75, 100];
	const [selectedTier, setSelectedTier] = useState<number>(25);
	return (
		<div className="pointer-events-none flex w-[268px] flex-col gap-4 overflow-hidden rounded-md bg-background p-4 shadow-light-shadow blur-[1px] dark:shadow-dark-shadow">
			<div className="text-lg font-semibold leading-7">Close Position</div>
			<div className="flex h-[108px] justify-between rounded-sm border border-border bg-muted p-4">
				<div className="flex h-full flex-col justify-between">
					<div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
						<Avatar className="h-4 w-4">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>btc</AvatarFallback>
						</Avatar>
						BTC-USD / Long
					</div>
					<div>
						<div className="text-lg font-semibold leading-7 text-muted-foreground">
							42.69BTC
						</div>
						<div className="text-xs font-medium leading-5 text-muted-foreground">
							$657,938.28
						</div>
					</div>
				</div>
				<div className="flex h-full flex-col justify-between">
					<div>
						<div className="text-right  text-[10px] leading-[10px] text-muted-foreground">
							UnRealized PnL
						</div>
						<div className=" text-sm font-semibold leading-5 text-foreground">
							$23,460.69
						</div>
					</div>
					<div>
						<div className="text-right text-[10px] leading-[10px] text-muted-foreground">
							Executed at
						</div>
						<div className=" text-sm font-semibold leading-5 text-foreground">
							$25,312.06
						</div>
					</div>
				</div>
			</div>

			<div className="flex h-[70px] justify-between rounded-sm border border-border bg-muted p-4">
				<div className="flex h-full flex-col justify-between">
					<div className="text-[10px] text-muted-foreground">
						UnRealized PnL
					</div>
					<div className=" text-sm font-semibold text-destructive-foreground">
						-$6942.06
					</div>
				</div>
				<div className="flex h-full flex-col justify-between">
					<div className="text-[10px] text-muted-foreground">Leverage</div>
					<div className=" text-sm font-semibold text-foreground">6.9x</div>
				</div>
			</div>

			<div className="flex w-full gap-1">
				{withdrawTier.map((tier, index) => (
					<div
						onClick={() => setSelectedTier(tier)}
						key={index}
						className={cn(
							"flex h-[22px] w-[25%] cursor-pointer items-center justify-center border text-sm font-medium hover:bg-opacity-80",
							selectedTier === tier
								? "rounded-sm border-warning-foreground bg-muted"
								: "rounded border-border",
						)}
					>
						{tier}%
					</div>
				))}
			</div>
			<div className="px-1 text-sm font-medium leading-5">
				25% of Your position will be closed at $25,600 resulting in a net loss
				of <span className="text-destructive-foreground">$6942.06</span>
			</div>
		</div>
	);
}

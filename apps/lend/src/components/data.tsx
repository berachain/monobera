"use client";

import React from "react";
import { formatUsd, usePollReservesDataList } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

function DataCard({
	icon,
	title,
	value,
}: {
	icon: React.ReactNode;
	title: string;
	value: number;
}) {
	return (
		<div className="flex flex-col rounded-2xl border-2 bg-card p-6">
			<div className="flex items-center gap-3 text-sm">
				<div className="text-muted-foreground">{icon}</div>
				<div className="text-muted-foreground">{title}</div>
			</div>
			{value ? (
				<div className="mt-2 text-3xl font-bold">{formatUsd(value)}</div>
			) : (
				<Skeleton className="mt-2 h-12 w-full" />
			)}
		</div>
	);
}

export default function Data() {
	const { useReservesDataList } = usePollReservesDataList();
	const { data } = useReservesDataList();

	let displayMarketSize = 0;
	let displayBorrowed = 0;
	Object.keys(data ?? {}).forEach((key) => {
		displayMarketSize += Number(data[key].totalLiquidity);
		displayBorrowed += Number(data[key].totalDebt);
	});
	return (
		<section className="m-auto max-w-[800px] py-24">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<DataCard
					title="Total Market Size"
					value={displayMarketSize}
					icon={<Icons.lineChart />}
				/>
				<DataCard
					title="Total borrows"
					value={displayBorrowed}
					icon={<Icons.helpingHand />}
				/>
			</div>
		</section>
	);
}

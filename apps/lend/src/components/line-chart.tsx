import { useState } from "react";
import { Dropdown } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { type RateItem } from "~/utils/getServerSideData";

export interface LineChartProps {
	data: LineChartDataProps[];
}
export interface LineChartDataProps {
	title: any;
	data: {
		"24H": RateItem[];
		"7D": RateItem[];
		"30D": RateItem[];
		ALL_TIME: RateItem[];
	};
	color: string;
}
const timeFrame = ["24H", "7D", "30D", "ALL_TIME"];
export default function LineChart({ data }: LineChartProps) {
	const [time, setTime] = useState<"24H" | "7D" | "30D" | "ALL_TIME">(
		"ALL_TIME",
	);

	const trimTimeString = (timeString: string) => {
		switch (time) {
			case "24H":
				return timeString.slice(11, 16);
			case "7D":
			case "30D":
				return timeString.slice(5, 10);
			case "ALL_TIME":
				return timeString.slice(0, 10);
			default:
				return timeString;
		}
	};

	const labels = data[0]?.data[time].map((item: RateItem) =>
		trimTimeString(item.time),
	);

	const dataG = {
		labels,
		datasets: data.map((d: LineChartDataProps) => {
			return {
				label: d.title,
				data: d.data[time].map((item) => Number(item.rate) * 100),
				borderColor: d.color,
				backgroundColor: d.color,
			};
		}),
	};

	const Options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				border: {
					display: false,
				},
				grid: {
					display: false,
				},
			},
			y: {
				border: {
					display: false,
				},
				grid: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<div>
			<div className="mb-6 flex items-end justify-between md:items-center">
				<div className="flex h-full flex-col items-center gap-2 md:flex-row md:gap-8">
					{data.map((d) => (
						<div className="flex items-center gap-2 font-medium" key={d.title}>
							<div
								className={"h-2 w-2 rounded-full border"}
								style={{ backgroundColor: d.color, borderColor: d.color }}
							/>
							{d.title}
						</div>
					))}
				</div>
				<Tabs defaultValue={time} className="hidden md:block">
					<TabsList>
						{timeFrame.map((t: string) => (
							<TabsTrigger
								value={t}
								key={t}
								className="capitalize"
								onClick={() => setTime(t as "24H" | "7D" | "30D" | "ALL_TIME")}
							>
								{t.replaceAll("_", " ").toUpperCase()}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
				<div className="block md:hidden">
					<Dropdown
						selected={time}
						selectionList={timeFrame}
						onSelect={(t: string) =>
							setTime(t as "24H" | "7D" | "30D" | "ALL_TIME")
						}
					/>
				</div>
			</div>
			<div className="h-[180px] w-full">
				<BeraChart data={dataG} type="line" options={Options as any} />
			</div>
		</div>
	);
}

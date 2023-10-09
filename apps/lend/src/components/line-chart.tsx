import { useState } from "react";
import { Dropdown } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

export interface LineChartProps {
  data: LineChartDataProps[];
  labels: string[];
}
export interface LineChartDataProps {
  title: any;
  data: any[];
  color: string;
}
const timeFrame = ["24H", "7d", "30d", "all-time"];
export default function LineChart({ data, labels }: LineChartProps) {
  const [time, setTime] = useState("all-time");
  const dataG = {
    labels,
    datasets: data.map((d) => ({
      label: d.title,
      data: d.data.map((v) => v),
      borderColor: d.color,
      backgroundColor: d.color,
    })),
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
                className={`h-2 w-2 rounded-full border`}
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
                onClick={() => setTime(t)}
              >
                {t.replaceAll("-", " ").toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="block md:hidden">
          <Dropdown
            selected={time}
            selectionList={timeFrame}
            onSelect={setTime}
          />
        </div>
      </div>
      <div className="h-[180px] w-full">
        <BeraChart data={dataG} type="line" options={Options as any} />
      </div>
    </div>
  );
}

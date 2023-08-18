import { useState } from "react";
import { BeraChart } from "@bera/ui/bera-chart";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
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
        <div className="flex flex-col gap-2 md:flex-row md:gap-8">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-xl border border-border bg-muted p-2 text-sm font-medium capitalize leading-[14px] text-foreground">
                {time.replaceAll("-", " ")}
                <Icons.chevronDown className="relative h-3 w-3 text-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Object.values(timeFrame).map((t) => (
                <DropdownMenuCheckboxItem
                  checked={time === t}
                  key={t}
                  onClick={() => setTime(t)}
                >
                  {t.replaceAll("-", " ")}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="h-[180px] w-full">
        <BeraChart data={dataG} type="line" options={Options as any} />
      </div>
    </div>
  );
}

import { TimeFrame, type TimeFrame as TimeFrameT } from "@bera/berajs";
import { HistoryRate } from "@bera/graphql";
import { Dropdown, Spinner } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

export interface LineChartProps {
  attribute: string;
  title: any;
  color: string;
  data: HistoryRate[];
  time: TimeFrameT;
  setTime: (time: TimeFrameT) => void;
  isLoading: boolean;
}

export default function LineChart({
  attribute,
  title,
  color,
  data,
  time,
  setTime,
  isLoading,
}: LineChartProps) {
  const trimTimeString = (unixTime: number) => {
    const date = new Date(unixTime);
    switch (time) {
      case TimeFrame.HOURLY: {
        const strH = date.toLocaleTimeString().replace(" ", ":").split(":");
        return `${strH[0]}${strH[3]?.toLowerCase()}`;
      }
      case TimeFrame.WEEKLY: {
        const strW1 = date.toLocaleTimeString().replace(" ", ":").split(":");
        const strW2 = date.toLocaleDateString().split("/");
        return `${strW2[0]}/${strW2[1]} ${strW1[0]}${strW1[3]?.toLowerCase()} `;
      }
      case TimeFrame.MONTHLY:
      case TimeFrame.QUARTERLY: {
        const strM = date.toLocaleDateString().split("/");
        return `${strM[0]}/${strM[1]}`;
      }
      default:
        return date.toLocaleDateString();
    }
  };

  const labels = data.map(
    (item: HistoryRate) => trimTimeString(item.timestamp * 1000), //local xx
  );

  const dataG = {
    labels,
    datasets: [
      {
        label: title,
        //@ts-ignore
        data: data.map((item) => Number(item[attribute]).toFixed(2)),
        borderColor: color,
        backgroundColor: color,
      },
    ],
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
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.4, // smooth lines
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        position: "nearest",
        borderRadius: 18,
        caretSize: 0,

        interaction: {
          intersect: false,
        },
        callbacks: {
          label: (context: {
            dataset: { label: string };
            parsed: { y: number | bigint | null };
          }) => {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${
                Number(context.parsed.y) < 0.01
                  ? "<0.01"
                  : Number(context.parsed.y).toFixed(2)
              }%`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex h-full flex-col items-center gap-2 md:flex-row md:gap-8">
          <div className="flex items-center gap-2 font-medium" key={title}>
            <div
              className={"h-2 w-2 rounded-full border"}
              style={{ backgroundColor: color, borderColor: color }}
            />
            {title}
          </div>
        </div>
        <Tabs defaultValue={time} className="hidden md:block">
          <TabsList>
            {Object.keys(TimeFrame).map((t: string) => (
              <TabsTrigger
                value={TimeFrame[t as keyof typeof TimeFrame]}
                key={t}
                className="capitalize"
                onClick={() => setTime(TimeFrame[t as keyof typeof TimeFrame])}
              >
                {TimeFrame[t as keyof typeof TimeFrame]
                  .replaceAll("_", " ")
                  .toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="block md:hidden">
          <Dropdown
            selected={time}
            selectionList={Object.keys(TimeFrame).map((t: string) =>
              TimeFrame[t as keyof typeof TimeFrame]
                .replaceAll("_", " ")
                .toUpperCase(),
            )}
            onSelect={(t: string) => setTime(t as TimeFrameT)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex h-[180px] w-full items-center justify-center">
          <Spinner color={color} />
        </div>
      ) : (
        <div className="h-[180px] w-full">
          <BeraChart data={dataG as any} type="line" options={Options as any} />
        </div>
      )}
    </div>
  );
}

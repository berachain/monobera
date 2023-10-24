import { useMemo } from "react";
import { Tooltip } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Skeleton } from "@bera/ui/skeleton";

import {
  OPTIMAL_USAGE_RATE,
  getRates,
  type Rate,
} from "~/utils/utilization-rates";
import Card from "~/components/card";

export default function InterestRateOvertime({
  reserveData,
  currentUtilizationRate,
}: {
  reserveData: any;
  currentUtilizationRate: number;
}) {
  const data = useMemo(() => {
    const rates = getRates();
    const labelsArray = Array.from({ length: 101 }, (_, i) => `${i}%`);
    return {
      labels: labelsArray,
      datasets: [
        {
          label: "Borrow APR, variable",
          data: rates.map((r: Rate) => r.variableRate * 100),
          borderColor: "#FBBF24",
          tension: 0,
          pointRadius: 0,
        },
      ],
    };
  }, []);

  const options = {
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
        ticks: {
          callback: function (value: string, index: number, _: any) {
            // Display only specific labels
            if ([0, 25, 50, 75, 100].includes(index)) return value + "%";
            else return null;
          },
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
      tooltip: {
        intersect: false,
        mode: "index",
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "vertical",
            scaleID: "x",
            value: `${currentUtilizationRate * 100}%`,
            borderColor: "#059669",
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              content: "10% Line",
              enabled: true,
              position: "start",
              yAdjust: -10,
            },
          },
          {
            type: "line",
            mode: "vertical",
            scaleID: "x",
            value: `${OPTIMAL_USAGE_RATE * 100}%`,
            borderColor: "#059669",
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              content: "Optimal 80%",
              enabled: true,
              position: "start",
              yAdjust: -10,
            },
          },
        ],
      },
    },
  };

  return (
    <div className="w-full">
      <div className="text-2xl font-semibold leading-loose">
        Interest Rate Overtime
      </div>
      <Card className="flex flex-col gap-8 p-9">
        <div className="flex gap-8">
          <div className="flex flex-col gap-[6px]">
            <div className="font-medium">Interest Rate Modal</div>
            <div className="text-sm font-normal leading-normal text-muted-foreground">
              Utilization Rate <Tooltip text="" />
            </div>
            {reserveData ? (
              <div className=" text-xl font-semibold leading-7">
                {(Number(reserveData?.borrowUsageRatio) * 100).toFixed(2)}%
              </div>
            ) : (
              <Skeleton className="h-7 w-20" />
            )}
          </div>
        </div>

        <div className="flex h-full flex-col items-center gap-2 md:flex-row md:gap-8">
          <div className="flex items-center gap-2 font-medium">
            <div
              className={`h-2 w-2 rounded-full border border-accent bg-accent`}
            />
            Borrow APR, variable
          </div>

          <div className="flex items-center gap-2 font-medium">
            <div
              className={`h-2 w-2 rounded-full border border-success-foreground bg-success-foreground`}
            />
            Utilization Rate
          </div>
        </div>

        <div className="relative h-[180px] w-full">
          <div
            className="absolute -top-[10px] text-[10px] text-muted-foreground"
            style={{ left: `calc(${currentUtilizationRate * 100}% - 28px)` }}
          >
            Current {currentUtilizationRate * 100}%
          </div>
          <div
            className="absolute -top-[10px] text-[10px] text-muted-foreground"
            style={{ left: "calc(80% - 30px)" }}
          >
            Optimal 80%
          </div>
          <BeraChart data={data} options={options as any} type="line" />
        </div>
      </Card>
    </div>
  );
}

import React, { useMemo } from "react";
import { BeraChart } from "@bera/ui/bera-chart";
import { Card } from "@bera/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { generateRandomData } from "../home/mockData";
import { VoteColorMap } from "../types";

const Options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Bera Chart",
    },

    tooltip: {
      displayColors: false,
      position: "nearest",
      interaction: {
        intersect: false,
      },
      callbacks: {
        label: function (context: {
          dataset: { label: string };
          parsed: { y: number | bigint | null };
        }) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
};

const getChartData = (
  data: {
    amount: number;
    voteType: string | undefined;
    voter: string;
  }[],
) => {
  return {
    labels: data.map((_, index) => `Label ${index + 1}`), // You can customize labels as needed
    datasets: [
      {
        data: data.map((d) => d.amount),
        labelColor: false,
        backgroundColor: data.map((d) => VoteColorMap[d.voteType]),
        borderColor: data.map((d) => VoteColorMap[d.voteType]),
        tension: 0.4,
        borderRadius: 100,
        borderSkipped: false,
      },
    ],
  };
};

const voteTypes = ["all", "yes", "no", "veto", "abstain"];
export function OverviewChart() {
  const [voteType, setVoteType] = React.useState<typeof voteTypes>("all");

  const chartData = useMemo(
    () =>
      getChartData(
        generateRandomData().filter((data) =>
          voteType === "all" ? true : data.voteType === voteType,
        ),
      ),
    [voteType],
  );

  return (
    <Card className="relative mt-1 h-[234px] p-4">
      <Tabs defaultValue={voteType} className="absolute right-4">
        <TabsList>
          {voteTypes.map((type) => (
            <TabsTrigger
              value={type}
              key={type}
              className="capitalize"
              onClick={() => setVoteType(type)}
            >
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-[50px] h-[152px] w-full">
        <BeraChart data={chartData} options={Options as any} type="bar" />
      </div>
    </Card>
  );
}

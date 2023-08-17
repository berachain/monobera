import React, { useMemo } from "react";
import { BeraChart } from "@bera/ui/bera-chart";
import { Card } from "@bera/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { generateRandomData } from "../home/mockData";
import { VoteColorMap, type ALL, type VOTE_TYPE } from "../types";

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
    // xAxis: [
    //   {
    //     barThickness: 12,
    //   },
    // ],
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
      backgroundColor: "#FAFAF9",
      borderColor: "#E7E5E4",
      borderRadius: 18,
      borderWidth: 1,
      padding: {
        top: 8,
        right: 8,
        bottom: 0,
        left: 8,
      },
      caretSize: 0,
      titleFontSize: 12,
      titleColor: "#292524",
      bodyColor: "#292524",
      callbacks: {
        label: function (context: {
          dataset: { label: string };
          parsed: { y: number | bigint | null };
        }) {
          return context.dataset.label || "";
        },
      },
    },
  },
};

const getChartData = (
  data: {
    amount: number;
    voteType: VOTE_TYPE;
    voter: string;
  }[],
) => {
  return {
    labels: data.map((da, _) => `${da.amount} BGT  ${da.voter}`),
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

const voteTypes: Array<ALL | VOTE_TYPE> = [
  "all",
  "yes",
  "no",
  "veto",
  "abstain",
];
export function OverviewChart() {
  const [voteType, setVoteType] = React.useState<ALL | VOTE_TYPE>("all");

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
          {voteTypes.map((type: ALL | VOTE_TYPE) => (
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

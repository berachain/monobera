import React, { useMemo } from "react";
import { formatter, truncateHash, type IVote } from "@bera/berajs";
import { VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { BeraChart } from "@bera/ui/bera-chart";
import { Card } from "@bera/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

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

const getChartData = (data: IVote[]) => {
  return {
    labels: data.map(
      (da, _) =>
        `${formatter.format(da.delegation)} BGT  ${truncateHash(da.voter)}`,
    ),
    datasets: [
      {
        data: data.map((d) => d.delegation),
        labelColor: false,
        backgroundColor: data.map((d) => (VoteColorMap as any)[d.option]),
        borderColor: data.map((d) => (VoteColorMap as any)[d.option]),
        tension: 0.4,
        borderRadius: 100,
        borderSkipped: false,
      },
    ],
  };
};

const voteTypes: Array<any> = ["all", "yes", "no", "veto", "abstain"];

const helperMap = {
  yes: VoteOption.VOTE_OPTION_YES,
  no: VoteOption.VOTE_OPTION_NO,
  veto: VoteOption.VOTE_OPTION_NO_WITH_VETO,
  abstain: VoteOption.VOTE_OPTION_ABSTAIN,
};
export function OverviewChart({
  votes,
  isLoading,
}: {
  votes: IVote[];
  isLoading: boolean;
}) {
  const [voteType, setVoteType] = React.useState<any>("all");

  const chartData = useMemo(
    () =>
      getChartData(
        votes?.filter((data) =>
          voteType === "all"
            ? true
            : data.option === (helperMap as any)[voteType],
        ),
      ),
    [voteType, votes],
  );

  return (
    <Card className="relative mt-1 h-[234px] p-4">
      <Tabs defaultValue={voteType.toString()} className="absolute right-4">
        <TabsList>
          {voteTypes.map((type: any) => (
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
        {!isLoading && (
          <BeraChart data={chartData} options={Options as any} type="bar" />
        )}
        {isLoading && <p>Loading...</p>}
      </div>
    </Card>
  );
}

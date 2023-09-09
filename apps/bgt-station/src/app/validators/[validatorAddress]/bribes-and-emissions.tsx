import React, { useMemo } from "react";
import { formatUsd, usePollValidatorBribes } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Card } from "@bera/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { type Address } from "viem";

import YellowCard from "~/components/yellow-card";
import { type FormattedHistoricalBribes } from "~/hooks/useHistoricalBribes";
import { usePollPrices } from "~/hooks/usePollPrices";
import { TimeFrameEnum } from "./types";

const Options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: true,
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    xAxes: [
      {
        barThickness: 12,
      },
    ],
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

const getChartData = (data: FormattedHistoricalBribes[]) => {
  return {
    labels: data?.map((da, _) => `${da.value} BGT  ${da.epoch}`),
    datasets: [
      {
        data: data?.map((d) => d.value),
        labelColor: false,
        backgroundColor: "#78716C",
        borderColor: "#78716C",
        tension: 0.4,
        borderRadius: 100,
        borderSkipped: false,
      },
    ],
  };
};

const getHistoryInterval = (
  historicalBribes: FormattedHistoricalBribes[],
  timeframe: TimeFrameEnum,
) => {
  if (historicalBribes === undefined) return [];
  let historyInterval = [...historicalBribes];
  if (timeframe === TimeFrameEnum.ONE_HUNDERED_EPOCHS) {
    historyInterval = historyInterval.slice(0, 100);
  }
  if (timeframe === TimeFrameEnum.FIFTY_EPOCHS) {
    historyInterval = historyInterval.slice(0, 50);
  }
  if (timeframe === TimeFrameEnum.TEN_EPOCHS) {
    historyInterval = historyInterval.slice(0, 10);
  }
  console.log(historyInterval);

  return historyInterval.reverse();
};
export default function BribesAndEmissions({
  validatorAddress,
  historicalBribes,
  isLoading,
}: {
  validatorAddress: Address | undefined;
  historicalBribes: FormattedHistoricalBribes[];
  isLoading: boolean;
}) {
  const { useActiveValidatorBribesTotalValue } =
    usePollValidatorBribes(validatorAddress);
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const bribesTotalValue = useActiveValidatorBribesTotalValue(prices);
  const [timeframe, setTimeframe] = React.useState(TimeFrameEnum.ALL_TIME);

  const chartData = useMemo(
    () => getChartData(getHistoryInterval(historicalBribes, timeframe)),
    [timeframe, historicalBribes],
  );

  return (
    <div className="">
      <div className="flex items-center text-lg font-semibold leading-7">
        Bribes
        <Tooltip text="Bribes on this validator" />
      </div>
      <div className="mt-4 flex gap-4">
        <YellowCard className="flex w-full justify-center p-8">
          <div className="text-3xl font-semibold leading-9 text-foreground">
            {formatUsd(bribesTotalValue ?? 0)}
          </div>
          <div className="text-sm font-medium leading-[14px] text-muted-foreground">
            Total value
          </div>
        </YellowCard>
        <Card className="hidden w-3/4 min-w-[666px] p-4 md:block">
          <div className="relative flex h-10 w-full items-center justify-end gap-2 text-sm font-medium leading-[14px] text-muted-foreground">
            Time frame
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-xl border border-border p-2 text-sm font-medium capitalize leading-[14px] text-foreground">
                  {timeframe.replaceAll("-", " ")}
                  <Icons.chevronDown className="relative h-3 w-3 text-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {Object.values(TimeFrameEnum).map((timeframeS) => (
                  <DropdownMenuCheckboxItem
                    checked={timeframe === timeframeS}
                    key={timeframeS}
                    onClick={() => setTimeframe(timeframeS)}
                  >
                    {timeframeS.replaceAll("-", " ")}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 h-[142px]">
            {!isLoading && (
              <BeraChart data={chartData} options={Options as any} type="bar" />
            )}
            {isLoading && <>Loading...</>}
          </div>
        </Card>
      </div>
    </div>
  );
}

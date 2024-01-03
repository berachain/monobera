import React from "react";
import {
  // formatUsd,
  // usePollActiveValidators,
  usePollValidatorBribes,
} from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { type Address } from "viem";

import { type FormattedHistoricalBribes } from "~/hooks/useHistoricalBribes";
import BribeList, { BribeCardLoading } from "./bribe-list";

// import { TimeFrameEnum } from "./types";

// const Options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     x: {
//       display: false,
//     },
//     y: {
//       display: true,
//       grid: {
//         drawBorder: false,
//         display: false,
//       },
//     },
//     xAxes: [
//       {
//         barThickness: 12,
//       },
//     ],
//   },
//   plugins: {
//     legend: {
//       display: false,
//     },
//     title: {
//       display: false,
//       text: "Bera Chart",
//     },

//     tooltip: {
//       displayColors: false,
//       position: "nearest",
//       interaction: {
//         intersect: false,
//       },
//       backgroundColor: "#FAFAF9",
//       borderColor: "#E7E5E4",
//       borderRadius: 18,
//       borderWidth: 1,
//       padding: {
//         top: 8,
//         right: 8,
//         bottom: 0,
//         left: 8,
//       },
//       caretSize: 0,
//       titleFontSize: 12,
//       titleColor: "#292524",
//       bodyColor: "#292524",
//       callbacks: {
//         label: function (context: {
//           dataset: { label: string };
//           parsed: { y: number | bigint | null };
//         }) {
//           return context.dataset.label || "";
//         },
//       },
//     },
//   },
// };

// const getChartData = (data: FormattedHistoricalBribes[]) => {
//   return {
//     labels: data?.map(
//       (da, _) => `Value: ${formatUsd(da.value)}\nEpoch: ${da.epoch}`,
//     ),
//     datasets: [
//       {
//         data: data?.map((d) => d.value),
//         labelColor: false,
//         backgroundColor: "#78716C",
//         borderColor: "#78716C",
//         tension: 0.4,
//         borderRadius: 100,
//         borderSkipped: false,
//       },
//     ],
//   };
// };

// const getHistoryInterval = (
//   historicalBribes: FormattedHistoricalBribes[],
//   timeframe: TimeFrameEnum,
// ) => {
//   if (historicalBribes === undefined) return [];
//   let historyInterval = [...historicalBribes];
//   if (timeframe === TimeFrameEnum.ONE_HUNDERED_EPOCHS) {
//     historyInterval = historyInterval.slice(0, 100);
//   }
//   if (timeframe === TimeFrameEnum.FIFTY_EPOCHS) {
//     historyInterval = historyInterval.slice(0, 50);
//   }
//   if (timeframe === TimeFrameEnum.TEN_EPOCHS) {
//     historyInterval = historyInterval.slice(0, 10);
//   }
//   return historyInterval.reverse();
// };
export default function BribesAndEmissions({
  // historicalBribes,
  // cumulativeBribeValue,
  // currentBribeValue,
  validatorAddress,
  isLoading,
}: {
  historicalBribes: FormattedHistoricalBribes[];
  cumulativeBribeValue: number;
  currentBribeValue: number;
  validatorAddress: Address;
  isLoading: boolean;
}) {
  // const [timeframe, setTimeframe] = React.useState(TimeFrameEnum.ALL_TIME);

  // const chartData = useMemo(
  //   () => getChartData(getHistoryInterval(historicalBribes, timeframe)),
  //   [timeframe, historicalBribes],
  // );
  const { useActiveValidatorBribes, isLoading: isBribesLoading } =
    usePollValidatorBribes(validatorAddress);

  // const { useValidatorTokens } = usePollActiveValidators();
  // const totalDelegated = useValidatorTokens(validatorAddress);
  // const amountPerBgt = useMemo(() => {
  //   const amnt = Number(currentBribeValue) / totalDelegated;
  //   if (Number.isNaN(amnt)) {
  //     return 0;
  //   }
  //   return Number(currentBribeValue) / totalDelegated;
  // }, [totalDelegated, currentBribeValue]);

  const bribes = useActiveValidatorBribes();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1 text-lg font-semibold leading-7">
        Bribes
        <Tooltip text="Overview of bribe information on this validator" />
      </div>
      {isLoading || isBribesLoading ? (
        <div>
          Loading
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 0, 0].map((_: any, index: number) => (
              <BribeCardLoading key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {bribes.length === 0 ? (
            <div className="flex items-center gap-4 py-4">
              <hr className="h-[2px] flex-1" />
              <div className="text-sm text-muted-foreground">
                This validator has no bribes
              </div>
              <hr className="h-[2px] flex-1" />
            </div>
          ) : (
            <>
              {/* <div className="mt-4 flex gap-4">
                <div className="flex w-full  flex-shrink-0 flex-grow-0 flex-col gap-4 lg:w-[230px]">
                  <Card className="flex w-full flex-1 flex-col items-center justify-center gap-2 p-4 shadow lg:p-0">
                    <div className="text-3xl font-semibold leading-9 text-foreground">
                      ${formatter.format(cumulativeBribeValue ?? 0)}
                    </div>
                    <div className="text-sm font-medium leading-[14px] text-muted-foreground">
                      Cumulative bribe value
                    </div>
                  </Card>

                  <Card className="flex w-full flex-1 flex-col items-center justify-center gap-2  p-4 shadow lg:p-0">
                    <div className="text-3xl font-semibold leading-9 text-foreground">
                      ${formatter.format(amountPerBgt ?? 0)}
                    </div>
                    <div className="text-sm font-medium leading-[14px] text-muted-foreground">
                      current per BGT
                    </div>
                  </Card>
                </div>

                <Card className="hidden w-full flex-1 p-4 shadow lg:block">
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
                    {isLoading ? (
                      <Icons.spinner className="mx-auto h-8 w-8 animate-spin" />
                    ) : (
                      <BeraChart
                        data={chartData}
                        options={Options as any}
                        type="bar"
                      />
                    )}
                  </div>
                </Card>
              </div> */}
              <BribeList bribes={[bribes ?? []]} />
            </>
          )}
        </>
      )}
    </div>
  );
}

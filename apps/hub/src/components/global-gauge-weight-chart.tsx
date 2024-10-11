import React, { useCallback, useMemo, useRef, useState } from "react";
import { ADDRESS_ZERO, type CuttingBoardWeight } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Skeleton } from "@bera/ui/skeleton";
import { type Chart, type TooltipModel } from "chart.js";
import uniqolor from "uniqolor";

import {
  ChartTooltip,
  CuttingBoardWeightMega,
} from "~/components/chart-tooltip";

export const OTHERS_GAUGES = "Others"; // Identifier for aggregated others
export const THRESHOLD = 0.04;

export default function GlobalGaugeWeightChart({
  gaugeWeights = [],
  totalAmountStaked,
  globalAmountStaked,
  isLoading,
  showTotal = true,
}: {
  gaugeWeights: CuttingBoardWeight[] | undefined;
  totalAmountStaked: string | number;
  globalAmountStaked: string;
  isLoading: boolean;
  showTotal?: boolean;
}) {
  const tooltipRef = useRef<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedGauge, setSelectedGauge] = useState<any>();
  const [othersIndex, setOthersIndex] = useState<number>(-1);

  const gauges: CuttingBoardWeightMega[] = useMemo(() => {
    const gaugeW = (gaugeWeights ?? []).map(
      (gauge: CuttingBoardWeight, index: number) => ({
        ...gauge,
        percentage: Number(gauge.percentageNumerator) / 10000,
        id: index,
      }),
    );

    let othersPercentage = 0;
    gaugeW.forEach(
      (gauge: CuttingBoardWeight & { percentage: number; id: number }) => {
        if (gauge.percentage < THRESHOLD) othersPercentage += gauge.percentage;
      },
    );

    const filtered = gaugeW.filter((gauge) => gauge.percentage >= THRESHOLD);

    const combined = [...filtered];

    // Only add the "Others" gauge if it has a significant percentage
    if (othersPercentage > THRESHOLD) {
      combined.push({
        receiverMetadata: {
          logoURI: "",
          name: OTHERS_GAUGES,
          product: OTHERS_GAUGES,
          receiptTokenAddress: ADDRESS_ZERO,
          url: "",
          vaultAddress: ADDRESS_ZERO,
        },
        id: combined.length,
        owner: ADDRESS_ZERO,
        receiver: ADDRESS_ZERO,
        percentage: othersPercentage,
        percentageNumerator: "",
      } as any);
    }
    setOthersIndex(combined.length - 1);

    return combined;
  }, [gaugeWeights]);

  const dataP = useMemo(() => {
    const backgroundColor = [];
    const hoverBorderColor = [];
    gauges.forEach((gauge) => {
      if (gauge.receiver && gauge.receiver !== ADDRESS_ZERO) {
        const bgColor = uniqolor(gauge.receiver).color;
        backgroundColor.push(bgColor);
        hoverBorderColor.push(`${bgColor}52`);
      }
    });
    if (othersIndex > -1 && gauges.length > 1) {
      if (
        gauges.some(
          (gauge) => gauge.receiver && gauge.receiver === ADDRESS_ZERO,
        )
      ) {
        const bgColor = uniqolor(ADDRESS_ZERO).color;
        backgroundColor.push(bgColor);
        hoverBorderColor.push(`${bgColor}52`);
      }
    }
    return {
      labels: gauges?.map((d) => d.receiver),
      datasets: [
        {
          hoverBorderWidth: 10,
          borderRadius: 8,
          spacing: 5,
          borderWidth: 0,
          backgroundColor,
          hoverBorderColor,
          data: gauges?.map((d) => d.percentage),
        },
      ],
    };
  }, [gauges]);

  const externalTooltipHandler = useCallback(
    ({ tooltip }: { tooltip: TooltipModel<"doughnut">; chart: Chart }) => {
      // hide tooltip
      if (tooltip.opacity === 0) {
        setSelectedGauge(undefined);
        tooltipRef.current = null;
        return;
      }
      // already visible
      if (tooltipRef.current === `${tooltip.caretX},${tooltip.caretX}`) {
        return;
      }
      // set tooltip visible
      tooltipRef.current = `${tooltip.caretX},${tooltip.caretX}`;
      setSelectedGauge(tooltip.title[0]);
      setTooltipPosition({ x: tooltip.caretX, y: tooltip.caretY });
    },
    [gaugeWeights],
  );

  const gauge: CuttingBoardWeightMega | undefined = gauges.find(
    (gauge: CuttingBoardWeightMega) => gauge.receiver === selectedGauge,
  );

  return (
    <div className="flex w-full shrink-0 flex-col gap-10 rounded-lg border border-border p-6 lg:mt-16 lg:w-[300px] lg:items-stretch">
      <div className="text-center text-sm font-medium leading-5 text-muted-foreground">
        Rewards Weight
      </div>

      {isLoading ? (
        <Skeleton className="relative mx-auto h-[230px] w-[230px] rounded-full" />
      ) : (
        <div className="relative mx-auto h-[230px] w-[230px]">
          <BeraChart
            data={dataP}
            options={{
              responsive: true,
              cutout: "70%",
              radius: "95%",
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false, // @ts-ignore
                  external: externalTooltipHandler,
                },
              },
            }}
            type="doughnut"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
            <div className="text-xs font-medium uppercase leading-5 tracking-wide text-muted-foreground mb-1">
              Total Staked BGT
            </div>
            <FormattedNumber
              value={totalAmountStaked}
              compact
              className="text-lg font-bold leading-6"
            />

            {/* {showTotal && (
              <div className="whitespace-nowrap text-xs leading-5 text-warning-foreground">
                <FormattedNumber
                  value={globalAmountStaked}
                  compact
                  symbol="BGT"
                />{" "}
                Circulating
              </div>
            )} */}
          </div>

          <div
            className="z-1 pointer-events-none absolute hidden -translate-y-1/2 transform transition-all duration-200 ease-in-out sm:block"
            style={{
              top: `${tooltipPosition.y}px`,
              ...(tooltipPosition.x < 230 / 2
                ? { left: tooltipPosition.x }
                : { right: 230 - tooltipPosition.x }),
            }}
          >
            <ChartTooltip gauge={gauge} />
          </div>
          <div className="z-1 pointer-events-none absolute left-[50%] top-[50%] block -translate-x-1/2 -translate-y-1/2 transform transition-all duration-200 ease-in-out sm:hidden">
            <ChartTooltip gauge={gauge} />
          </div>
        </div>
      )}
    </div>
  );
}

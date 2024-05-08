import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ADDRESS_ZERO, truncateHash, useGauges } from "@bera/berajs";
import { BeraChart } from "@bera/ui/bera-chart";
import { type Chart, type TooltipModel } from "chart.js";
import uniqolor from "uniqolor";

import { ChartTooltip } from "./chart-tooltip";

interface chartData {
  label: string;
  address: string;
  percentage: number;
  amount: number;
}

export const OTHERS_GAUGES = "Others"; // Identifier for aggregated others

export default function GlobalGaugeWeightChart({
  gaugeWeights = [],
}: {
  gaugeWeights: chartData[] | undefined;
}) {
  const { gaugeDictionary } = useGauges();
  const tooltipRef = useRef<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedGauge, setSelectedGauge] = useState<any>();
  const [othersIndex, setOthersIndex] = useState<number>(-1);

  const gauges = useMemo(() => {
    const threshold = 0.04; // 4%
    const filtered =
      gaugeWeights?.filter((gauge) => gauge.percentage >= threshold) || [];
    const others = gaugeWeights?.reduce(
      (prev, curr) => {
        if (curr.percentage < threshold) {
          return {
            amount: prev.amount + curr.amount,
            percentage: prev.percentage + curr.percentage,
          };
        }
        return prev;
      },
      { amount: 0, percentage: 0 },
    );

    const combined = [...filtered];

    // Only add the "Others" gauge if it has a significant amount
    if (others.amount > 0) {
      combined.push({
        address: ADDRESS_ZERO,
        label: OTHERS_GAUGES,
        amount: others.amount,
        percentage: others.percentage,
      });
    }
    setOthersIndex(combined.length - 1);

    return combined;
  }, [gaugeWeights]);

  const dataP = useMemo(() => {
    const backgroundColor = [];
    const hoverBorderColor = [];
    gauges.forEach((gauge, index) => {
      if (gauge.label !== OTHERS_GAUGES) {
        const bgColor = uniqolor(gauge.address).color;
        backgroundColor.push(bgColor);
        hoverBorderColor.push(`${bgColor}52`);
      }
    });
    if (othersIndex > -1 && gauges.length > 1) {
      if (gauges.some((gauge) => gauge.label === OTHERS_GAUGES)) {
        const bgColor = uniqolor(ADDRESS_ZERO).color;
        backgroundColor.push(bgColor);
        hoverBorderColor.push(`${bgColor}52`);
      }
    }
    return {
      labels: gauges?.map((d) => d.address),
      datasets: [
        {
          hoverBorderWidth: 10,
          borderRadius: 8,
          spacing: 5,
          borderWidth: 0,
          backgroundColor,
          hoverBorderColor,
          data: gauges?.map((d) => d.amount),
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
      if (tooltipRef.current === `${tooltip.x},${tooltip.y}`) {
        return;
      }
      // set tooltip visible
      tooltipRef.current = `${tooltip.x},${tooltip.y}`;
      setSelectedGauge(tooltip.title[0]);
      setTooltipPosition({ x: tooltip.x, y: tooltip.y });
    },
    [gaugeWeights],
  );

  const gauge = {
    ...gauges.find((gauge) => gauge.address === selectedGauge),
    ...(gaugeDictionary?.[selectedGauge] ?? {}),
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg border border-border bg-muted p-6 md:w-[340px]">
      <div className="text-sm leading-5 text-muted-foreground">
        Gauge Weight
      </div>

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
          <div className="text-xs leading-3 text-muted-foreground">
            Total Staked BGT
          </div>
          <div className="text-lg font-bold leading-7">69.42M</div>
          <div className="whitespace-nowrap text-xs leading-5 text-warning-foreground">
            79.69M BGT Circulating
          </div>
        </div>

        <div
          className="z-1 pointer-events-none absolute hidden transition-all duration-200 ease-in-out sm:block"
          style={{
            top: `${tooltipPosition.y}px`,
            ...(tooltipPosition.x < 230 / 2
              ? { left: tooltipPosition.x }
              : { right: 230 - tooltipPosition.x - 60 }),
          }}
        >
          {selectedGauge && <ChartTooltip gauge={gauge} />}
        </div>
        <div className="z-1 pointer-events-none absolute left-[50%] top-[50%] block -translate-x-1/2 -translate-y-1/2 transform transition-all duration-200 ease-in-out sm:hidden">
          {selectedGauge && <ChartTooltip gauge={gauge} />}
        </div>
      </div>
    </div>
  );
}

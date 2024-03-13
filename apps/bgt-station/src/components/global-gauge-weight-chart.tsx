import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { truncateHash, useGauges } from "@bera/berajs";
import { BeraChart } from "@bera/ui/bera-chart";
import { type Chart, type TooltipModel } from "chart.js";

import { type GaugeWeight } from "~/hooks/useGaugeWeights";
import { ChartTooltip } from "./chart-tooltip";

interface Props {
  gaugeWeights: GaugeWeight[] | undefined;
}

const othersColor = {
  backgroundColor: "#919191",
  hoverBorderColor: "#91919152",
};
const OTHERS_GAUGES = "Others"; // Identifier for aggregated others

export default function GlobalGaugeWeightChart({ gaugeWeights = [] }: Props) {
  const [cuttingBoardData, setCuttingBoardData] = React.useState<any[]>([]);
  const tooltipRef = useRef<string | null>(null);
  const { gaugeDictionary } = useGauges();
  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);
  const [selectedGauge, setSelectedGauge] = React.useState<GaugeWeight>();
  const [color, setColor] = React.useState<string>("");
  const [tooltipPosition, setTooltipPosition] = React.useState({
    left: 0,
    top: 0,
  });

  const { combinedGauges } = useMemo(() => {
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

    let combined = [...filtered];

    // Only add the "Others" gauge if it has a significant amount
    if (others.amount > 0) {
      combined.push({
        address: OTHERS_GAUGES,
        label: OTHERS_GAUGES,
        amount: others.amount,
        percentage: others.percentage,
      });
    }
    console.log("combined", gaugeWeights, combined);

    return {
      combinedGauges: combined,
    };
  }, [gaugeWeights]);

  useEffect(() => {
    const temp = combinedGauges?.map((data: GaugeWeight) => {
      return {
        label:
          data.label === OTHERS_GAUGES
            ? OTHERS_GAUGES
            : truncateHash(data.label),
        percentage: data.percentage,
        amount: data.amount,
      };
    });
    setCuttingBoardData(temp);
  }, [gaugeWeights]);

  const pieData = React.useMemo(() => {
    return cuttingBoardData?.map((data) => ({
      label:
        data.label === OTHERS_GAUGES ? OTHERS_GAUGES : truncateHash(data.label),
      originalLabel: data.label,
      amount: data.amount,
    }));
  }, [cuttingBoardData]);
  console.log("pieData", pieData, selectedGauge);

  const dataP = {
    labels: pieData?.map((d) =>
      gaugeDictionary
        ? gaugeDictionary[d.originalLabel]?.name ?? d.label
        : "Others",
    ),
    datasets: [
      {
        data: pieData?.map((d) => d.amount),
        // TODO: switch to berachain colors
        backgroundColor: [
          "#F35E79",
          "#27B9C4",
          "#8051D6",
          "#129E7D",
          "#FCC631",
          "#2882CC",
          "#3DDBB5",
        ],
        hoverBorderColor: [
          "#F35E7952",
          "#27B9C452",
          "#8051D652",
          "#129E7D52",
          "#FCC63152",
          "#2882CC52",
          "#3DDBB552",
        ],
        hoverBorderWidth: 10,
        borderRadius: 8,
        spacing: 20,
        borderWidth: 0,
      },
    ],
  };

  const externalTooltipHandler = useCallback(
    ({
      tooltip,
      chart,
    }: {
      tooltip: TooltipModel<"doughnut">;
      chart: Chart;
    }) => {
      console.log("tooltip", tooltip);
      // hide tooltip
      if (tooltip.opacity === 0) {
        setTooltipVisible(false);
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
      if (tooltip.labelColors[0]) {
        setColor(tooltip.labelColors[0].backgroundColor as string);
      }

      setSelectedGauge(
        gaugeWeights?.find((gauge) =>
          gauge.address === OTHERS_GAUGES
            ? gauge
            : truncateHash(gauge.address) === tooltip.title[0],
        ),
      );

      console.log("selectedGauge", gaugeWeights, selectedGauge);

      // if (tooltip.title[0] === OTHERS_GAUGES) {
      //   setSelectedGauge(
      //     combinedGauges?.find((gauge) => gauge.label === tooltip.title[0]),
      //   );
      // } else {
      //   setSelectedGauge(
      //     combinedGauges?.find(
      //       (gauge) => truncateHash(gauge.address) === tooltip.title[0],
      //     ),
      //   );
      // }

      const canvasPosition = chart.canvas.getBoundingClientRect();
      setTooltipVisible(true);
      setTooltipPosition({
        left: tooltip.x + canvasPosition.left,
        top: tooltip.y + canvasPosition.top,
      });
    },
    [gaugeWeights],
  );

  const tooltipComp = selectedGauge ? (
    <ChartTooltip
      color={color}
      visible={tooltipVisible}
      gauge={selectedGauge}
    />
  ) : undefined;

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="p-4 text-2xl font-bold">Gauge Weights</div>
      <div className="flex items-center justify-center">
        <div className="absolute flex flex-col items-center justify-center">
          Total Staked BGT
          <div className="text-2xl font-bold">69.42M</div>
          79.69M BGT Circulating
        </div>
        <div
          className="z-1 pointer-events-none absolute transition-all duration-200 ease-in-out"
          style={{
            left: `${tooltipPosition.left}px`,
            top: `${tooltipPosition.top}px`,
          }}
        >
          {tooltipComp}
        </div>
        <BeraChart
          data={dataP}
          options={{
            responsive: true,
            cutout: "70%",
            radius: "100%",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
                // @ts-ignore
                external: externalTooltipHandler,
              },
            },
          }}
          type="doughnut"
        />
      </div>
    </div>
  );
}

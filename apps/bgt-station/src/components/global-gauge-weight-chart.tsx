import React, { useEffect } from "react";
import { truncateHash, useTokens } from "@bera/berajs";
import { BeraChart } from "@bera/ui/bera-chart";

import { type GaugeWeight } from "~/hooks/useGaugeWeights";

const options = {
  responsive: true,
  cutout: "80%",
  radius: "95%",
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
      titleColor: "#78716C",
      bodyColor: "#78716C",
      callbacks: {
        label: (context: {
          dataset: { label: string };
          parsed: { y: number | bigint | null };
        }) => context?.dataset?.label || "",
      },
    },
  },
};

interface Props {
  gaugeWeights: GaugeWeight[] | undefined;
}

export default function GlobalGaugeWeight({ gaugeWeights = [] }: Props) {
  const [cuttingBoardData, setCuttingBoardData] = React.useState<any[]>([]);

  const { gaugeDictionary } = useTokens();

  useEffect(() => {
    const temp = gaugeWeights?.map((data: GaugeWeight) => {
      return {
        label: data.address,
        percentage: data.percentage,
        amount: data.amount,
      };
    });
    setCuttingBoardData(temp);
  }, [gaugeWeights]);

  const pieData = React.useMemo(() => {
    return cuttingBoardData?.map((data) => ({
      label: truncateHash(data.label),
      originalLabel: data.label,
      amount: data.amount,
    }));
  }, [cuttingBoardData]);

  const dataP = {
    labels: pieData?.map((d) =>
      gaugeDictionary ? gaugeDictionary[d.originalLabel]?.name ?? d.label : "",
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

  return (
    <div className="flex w-[330px] items-center justify-center">
      <BeraChart data={dataP} options={options as any} type="doughnut" />
    </div>
  );
}

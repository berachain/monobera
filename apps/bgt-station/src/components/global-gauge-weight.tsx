import React, { useEffect } from "react";
import { truncateHash, useTokens } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { BeraChart } from "@bera/ui/bera-chart";
import { Checkbox } from "@bera/ui/checkbox";
import uniqolor from "uniqolor";

import {
  global_gauge_weight_columns,
  type GlobalGaugeColumns,
} from "~/columns/global-gauge-weight";
import { type GaugeWeight } from "~/hooks/useGaugeWeights";

const options = {
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
        label: function (context: {
          dataset: { label: string };
          parsed: { y: number | bigint | null };
        }) {
          return context?.dataset?.label || "";
        },
      },
    },
  },
};

interface Props {
  gaugeWeights: GaugeWeight[] | undefined;
}

const Gauge = ({ address }: { address: string | undefined }) => {
  const { gaugeDictionary } = useTokens();
  const value =
    address === undefined || gaugeDictionary === undefined
      ? ""
      : gaugeDictionary[address]?.name ?? truncateHash(address);
  const logo =
    address === undefined || gaugeDictionary === undefined
      ? ""
      : gaugeDictionary[address]?.logoURI ?? "https://github.com/shadcn.png";

  return (
    <div className="flex h-full w-[150px] items-center gap-1">
      <Avatar className="h-6 w-6">
        <AvatarImage src={logo} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      {value}
    </div>
  );
};
export default function GlobalGaugeWeight({ gaugeWeights = [] }: Props) {
  const [cuttingBoardData, setCuttingBoardData] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState<Record<string, boolean>>({});
  const [disableChecks, setDisableChecks] = React.useState<boolean>(false);

  useEffect(() => {
    console.log("updas");
    setDisableChecks(
      Object.values(filter).reduce(
        (acc, curr) => acc + (curr === true ? 1 : 0),
        0,
      ) ===
        cuttingBoardData.length - 1,
    );
  }, [JSON.stringify(filter)]);

  const handleCheckboxChange = (data: any) => {
    setFilter((prev) => ({
      ...prev,
      [data.label]: !prev[data.label],
    }));
  };

  useEffect(() => {
    const temp = gaugeWeights?.map((data: GaugeWeight) => {
      return {
        label: data.address,
        percentage: data.percentage,
        amount: data.amount,
        tvl: data.tvl,
      };
    });
    setCuttingBoardData(temp);
  }, [gaugeWeights]);

  const dataT: GlobalGaugeColumns[] = React.useMemo(() => {
    return (
      cuttingBoardData?.map((data, index: number) => ({
        gauge: <Gauge address={data.label} />,
        incentiveAmount: data.amount,
        incentivePercentage: data.percentage,
        tvl: data.tvl,
        hide: (
          <Checkbox
            id={`dashboard-checkbox-${index}`}
            className="mx-auto"
            disabled={
              disableChecks &&
              (filter[data.label] === undefined || filter[data.label] === false)
            }
            onClick={() => handleCheckboxChange(data)}
          />
        ),
      })) ?? []
    );
  }, [cuttingBoardData, disableChecks]);

  const pieData = React.useMemo(() => {
    const filteredData = cuttingBoardData?.filter(
      (data) => !filter[data.label],
    );
    return filteredData?.map((data) => ({
      label: truncateHash(data.label),
      originalLabel: data.label,
      amount: data.amount,
    }));
  }, [cuttingBoardData, filter]);

  const dataP = {
    labels: pieData?.map((d) => d.label) ?? [],
    datasets: [
      {
        data: pieData?.map((d) => d.amount),
        backgroundColor: pieData?.map((d) => uniqolor(d.originalLabel).color),
        borderColor: pieData?.map((d) => uniqolor(d.originalLabel).color),
        borderWidth: 1,
      },
    ],
  };

  console.log(dataP);
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-16 md:flex-row ">
      <div className="flex w-[350px] items-center justify-center">
        <BeraChart data={dataP} options={options as any} type="pie" />
      </div>
      <div className="w-full">
        <DataTable
          columns={global_gauge_weight_columns as any}
          data={dataT ?? []}
          className="min-w-[490px]"
        />
      </div>
    </div>
  );
}

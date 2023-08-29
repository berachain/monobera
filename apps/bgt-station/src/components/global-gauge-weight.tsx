import React, { useEffect } from "react";
import {
  formatter,
  truncateHash,
  useTokens,
  type CuttingBoard,
} from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { BeraChart } from "@bera/ui/bera-chart";
import { Checkbox } from "@bera/ui/checkbox";

import { getColors } from "~/utils/colors";
import RT from "~/components/react-table";
import { global_gauge_weight_columns } from "~/columns/global-gauge-weight";

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
  globalCuttingBoard: CuttingBoard[] | undefined;
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
export default function GlobalGaugeWeight({ globalCuttingBoard = [] }: Props) {
  const [cuttingBoardData, setCuttingBoardData] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState<Record<string, boolean>>({});

  console.log("globalCuttingBoard", globalCuttingBoard);
  const handleCheckboxChange = (data: any) => {
    setFilter((prev) => ({
      ...prev,
      [data.label]: !prev[data.label],
    }));
  };

  useEffect(() => {
    const temp = globalCuttingBoard?.map((data: CuttingBoard) => {
      return {
        label: data.address,
        percentage: Number(data.percentage),
        amount: Number(data.amount),
      };
    });
    setCuttingBoardData(temp);
  }, []);

  const dataT = React.useMemo(() => {
    return cuttingBoardData?.map((data, index: number) => ({
      poolOrAddress: <Gauge address={data.label} />,
      bgtIncentive: (
        <div className="flex h-full w-[100px] items-center">
          {formatter.format(data.amount)} ({data.percentage}%)
        </div>
      ),
      tvl: <div className="flex h-full w-[53px] items-center">69.42M%</div>,
      hide: (
        <div className="flex w-[27px] justify-center">
          {" "}
          <Checkbox
            id={`dashboard-checkbox-${index}`}
            className="mx-auto"
            onClick={() => handleCheckboxChange(data)}
          />
        </div>
      ),
    }));
  }, [cuttingBoardData]);

  const pieData = React.useMemo(() => {
    const filteredData = cuttingBoardData?.filter(
      (data) => !filter[data.label],
    );

    return filteredData?.map((data) => ({
      label: truncateHash(data.label),
      amount: data.amount,
    }));
  }, [cuttingBoardData, filter]);

  const dataP = {
    labels: pieData?.map((d) => d.label) ?? [],
    datasets: [
      {
        data: pieData?.map((d) => d.amount),
        backgroundColor: getColors(pieData?.length ?? 0),
        borderColor: getColors(pieData?.length ?? 0),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-16 md:flex-row ">
      <div className="flex w-[350px] items-center justify-center">
        <BeraChart data={dataP ?? []} options={options as any} type="pie" />
      </div>
      <div className="w-full">
        <RT
          columns={global_gauge_weight_columns}
          data={dataT ?? []}
          className="min-w-[490px]"
        />
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import Link from "next/link";
import { truncateHash, useTokens } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { DataTable } from "@bera/shared-ui";
import { Checkbox } from "@bera/ui/checkbox";

import { GaugeIcon } from "~/app/validators/validators-table";
import {
  global_gauge_weight_columns_v2,
  type GlobalGaugeColumns,
} from "~/columns/global-gauge-weight-columns";
import { type GaugeWeight } from "~/hooks/useGaugeWeights";

interface Props {
  gaugeWeights: GaugeWeight[] | undefined;
}

const Gauge = ({ address }: { address: string | undefined }) => {
  const { gaugeDictionary } = useTokens();
  const value =
    address === undefined || gaugeDictionary === undefined
      ? ""
      : gaugeDictionary[address]?.name ?? truncateHash(address);
  const url =
    address && gaugeDictionary && gaugeDictionary[address]?.url
      ? gaugeDictionary[address]?.url
      : `${blockExplorerUrl}/address/${address}`;
  return (
    <Link
      href={url}
      target="_blank"
      className="flex h-full w-[150px] items-center gap-2"
    >
      <GaugeIcon address={address ?? ""} />
      <div className="min-w-[150px] cursor-pointer truncate whitespace-nowrap hover:underline">
        {value}
      </div>
    </Link>
  );
};
export default function GlobalGaugeWeightTable({ gaugeWeights = [] }: Props) {
  const [cuttingBoardData, setCuttingBoardData] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState<Record<string, boolean>>({});
  const [disableChecks, setDisableChecks] = React.useState<boolean>(false);

  useEffect(() => {
    setDisableChecks(
      cuttingBoardData.length === 1 ||
        Object.values(filter).reduce(
          (acc, curr) => acc + (curr === true ? 1 : 0),
          0,
        ) ===
          cuttingBoardData.length - 1,
    );
  }, [JSON.stringify(filter), cuttingBoardData]);

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
      };
    });
    setCuttingBoardData(temp);
  }, [gaugeWeights]);

  const dataT: GlobalGaugeColumns[] = React.useMemo(() => {
    return (
      cuttingBoardData
        ?.map((data, index: number) => ({
          gauge: <Gauge address={data.label} />,
          incentiveAmount: data.amount,
          incentivePercentage: data.percentage,
          tvl: data.tvl,
          hide: (
            <Checkbox
              id={`dashboard-checkbox-${index}`}
              disabled={
                disableChecks &&
                (filter[data.label] === undefined ||
                  filter[data.label] === false)
              }
              onClick={() => handleCheckboxChange(data)}
            />
          ),
        }))
        ?.sort((a, b) => b.incentivePercentage - a.incentivePercentage) ?? []
    );
  }, [cuttingBoardData, disableChecks]);

  return (
    <div className="w-full">
      <DataTable
        columns={global_gauge_weight_columns_v2 as any}
        data={dataT ?? []}
        className="max-h-[300px] min-w-[490px] shadow"
      />
    </div>
  );
}

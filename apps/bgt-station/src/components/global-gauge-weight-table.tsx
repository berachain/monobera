import React, { useEffect } from "react";
import Link from "next/link";
import { truncateHash, useGauges } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { DataTable } from "@bera/shared-ui";
import { Checkbox } from "@bera/ui/checkbox";
import { getAddress } from "viem";

import { GaugeIcon } from "~/app/validators/validators-table";
import {
  global_gauge_weight_columns_v2,
  type GlobalGaugeColumns,
} from "~/columns/global-gauge-weight-columns";
import { type GaugeWeight } from "~/hooks/useGaugeWeights";

interface Props {
  gaugeWeights: GaugeWeight[] | undefined;
  keywords?: string;
}

const Gauge = ({ address }: { address: string | undefined }) => {
  const { gaugeDictionary } = useGauges();
  const value =
    address === undefined || gaugeDictionary === undefined
      ? ""
      : gaugeDictionary[address]?.name ?? truncateHash(address);
  const url =
    address && gaugeDictionary && gaugeDictionary[address]?.url
      ? gaugeDictionary[address]?.url
      : `${blockExplorerUrl}/address/${address}`;
  const name = address && (gaugeDictionary as any)[getAddress(address)]?.name;
  return (
    <Link
      href={url}
      target="_blank"
      className="flex h-full w-[150px] items-center gap-2"
    >
      <div className="flex flex-col items-start justify-center ">
        <div className="text-md text-forgeound flex flex-row items-center justify-center gap-2 font-semibold">
          <GaugeIcon address={address ?? ""} />
          {name ?? "Test default gauge"}
        </div>
        <div className="flex items-start justify-center truncate whitespace-nowrap text-sm text-muted-foreground hover:underline">
          {value}
        </div>
      </div>
    </Link>
  );
};
export default function GlobalGaugeWeightTable({
  gaugeWeights = [],
  keywords = "",
}: Props) {
  const [cuttingBoardData, setCuttingBoardData] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState<Record<string, boolean>>({});
  const [disableChecks, setDisableChecks] = React.useState<boolean>(false);
  const { gaugeDictionary } = useGauges();
  useEffect(() => {
    if (!keywords) {
      const temp = gaugeWeights?.map((data: GaugeWeight) => {
        return {
          label: data.address,
          percentage: data.percentage,
          amount: data.amount,
        };
      });
      setCuttingBoardData(temp);
      return;
    }
    // Normalize keywords for case-insensitive comparison
    const normalizedKeywords = keywords.toLowerCase();

    const filteredGaugeWeights = gaugeWeights?.filter(
      (gaugeWeight: GaugeWeight) => {
        const address = gaugeWeight.address;
        const name = (gaugeDictionary as any)[getAddress(address)]?.name ?? "";

        const normalizedName = name.toLowerCase();
        const normalizedAddress = address.toLowerCase();

        return (
          normalizedName.includes(normalizedKeywords) ||
          normalizedAddress.includes(normalizedKeywords)
        );
      },
    );

    // Map the filtered gaugeWeights to the format needed for cuttingBoardData
    const temp = filteredGaugeWeights?.map((data: GaugeWeight) => ({
      label: data.address,
      percentage: data.percentage,
      amount: data.amount,
    }));

    setCuttingBoardData(temp);
  }, [gaugeWeights, keywords, gaugeDictionary]);

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

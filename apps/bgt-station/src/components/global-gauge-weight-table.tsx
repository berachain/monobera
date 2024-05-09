import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { truncateHash, useGauges } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { DataTable } from "@bera/shared-ui";
import { Checkbox } from "@bera/ui/checkbox";
import { getAddress } from "viem";
import {
  GaugeCategoryIcon,
  GaugeIcon,
} from "~/app/validators/validators-table";
import {
  global_gauge_weight_columns,
  type GlobalGaugeColumns,
} from "~/columns/global-gauge-weight-columns";

export default function GlobalGaugeWeightTable({
  gaugeWeights = [],
  keywords = "",
}: {
  gaugeWeights: any[] | undefined;
  keywords?: string;
}) {
  const { gaugeDictionary } = useGauges();

  return (
    <div className="w-full ">
      <DataTable
        columns={global_gauge_weight_columns as any}
        data={[]}
        className="max-h-[300px] min-w-[1000px] shadow"
      />
    </div>
  );
}

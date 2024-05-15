import React, { useEffect, useMemo } from "react";
import { truncateHash, useGauges } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";

import { global_gauge_weight_columns } from "~/columns/global-gauge-weight-columns";

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
        enablePagination
      />
    </div>
  );
}

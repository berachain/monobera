"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { SearchInput } from "@bera/shared-ui";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import { useGlobalValidatorGaugeWeight } from "~/hooks/useGaugeWeights";
import GaugeInfoCard from "./gauge-info-card";

export default function Gauge() {
  const [keywords, setKeywords] = React.useState<string | null>(null);
  // TODO: switch to use the new subgraph
  const { data } = useGlobalValidatorGaugeWeight();
  return (
    <div className="container mx-auto mb-20 flex w-full flex-col">
      <div className="flex flex-col items-center justify-center gap-[160px] py-12 md:flex-row">
        <GaugeInfoCard />

        <GlobalGaugeWeightChart gaugeWeights={data ?? []} />
      </div>
      <SearchInput
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeywords(e.target.value)
        }
      />
      <div className="py-4">
        <GlobalGaugeWeightTable gaugeWeights={data ?? []} />
      </div>
    </div>
  );
}

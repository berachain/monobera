"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { SearchInput } from "@bera/shared-ui";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import GaugeInfoCard from "./gauge-info-card";

export default function Gauge() {
  const [keywords, setKeywords] = React.useState<string | null>(null);
  const data = [];
  return (
    <div className="container mx-auto mb-20 flex w-full flex-col">
      <div className="flex flex-row gap-[160px] py-12">
        <div className="w-[1/2]">
          <GaugeInfoCard />
        </div>
        <div className="w-[1/2]">
          <GlobalGaugeWeightChart gaugeWeights={data ?? []} />
        </div>
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

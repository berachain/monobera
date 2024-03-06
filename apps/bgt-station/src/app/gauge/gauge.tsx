"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { SearchInput } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import { useGlobalValidatorGaugeWeight } from "~/hooks/useGaugeWeights";
import GaugeInfoCard from "./gauge-info-card";

export default function Gauge() {
  const [keywords, setKeywords] = React.useState<string | undefined>(undefined);
  // TODO: switch to use the new subgraph
  const { data, isLoading } = useGlobalValidatorGaugeWeight();
  return (
    <div className="container mx-auto mb-20 flex w-full flex-col">
      <div className="flex flex-col items-center justify-center gap-[160px] py-12 lg:flex-row">
        <GaugeInfoCard />
        {isLoading || !data || !data.length ? (
          <div className="flex flex-col gap-16 md:flex-row">
            <Skeleton className="h-[350px] w-[350px] flex-shrink-0 rounded-full" />
          </div>
        ) : (
          <GlobalGaugeWeightChart gaugeWeights={data ?? []} />
        )}
      </div>
      <SearchInput
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeywords(e.target.value)
        }
      />
      <div className="py-4">
        {isLoading || !data || !data.length ? (
          <div className="mt-10 flex w-full flex-col gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <GlobalGaugeWeightTable
            gaugeWeights={data ?? []}
            keywords={keywords}
          />
        )}
      </div>
    </div>
  );
}

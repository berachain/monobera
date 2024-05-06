"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { SearchInput } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import GaugeInfoCard from "./gauge-info-card";

export default function Gauge() {
  const [keywords, setKeywords] = React.useState<string | undefined>(undefined);
  // TODO: switch to use the new subgraph
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center gap-8 xs:gap-3 lg:flex-row">
        <GaugeInfoCard />
        {/* {isLoading || !data || !data.length ? (
          <div className="flex flex-col gap-16 md:flex-row">
            <Skeleton className="h-[350px] w-[350px] flex-shrink-0 rounded-full" />
          </div>
        ) : ( */}
          {/* <GlobalGaugeWeightChart gaugeWeights={[]} /> */}
        {/* )} */}
        <Skeleton className="h-[350px] w-[350px] flex-shrink-0 rounded-full" />
      </div>
      <div className="flex flex-col">
        <SearchInput
          placeholder="Search..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeywords(e.target.value)
          }
        />
        <div className="py-4">
          {/* {isLoading || !data || !data.length ? (
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
          )} */}
        </div>
      </div>
    </div>
  );
}

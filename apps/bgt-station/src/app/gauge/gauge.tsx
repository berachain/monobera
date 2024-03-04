"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { SearchInput } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";

import GlobalGaugeWeightInfo from "~/components/global-gauge-weight";

export default function Gauge() {
  const [keywords, setKeywords] = React.useState<string | null>(null);
  return (
    <div className="container mx-auto mb-20 flex w-full flex-col">
      <div className="flex flex-row gap-[160px] py-12">
        <div className="w-[1/2]">
          <Card className="flex w-[520px] flex-col">
            <div className="flex w-full flex-row items-stretch justify-between gap-8 bg-muted p-4">
              <div className="flex flex-col items-start gap-4 text-2xl font-bold">
                Total BGT
              </div>
              <div className="flex flex-col gap-4 text-2xl font-bold">
                69.99 M
              </div>
            </div>
            <div className="gap-2 px-4 py-8">
              <div className="flex w-full flex-row items-stretch justify-between gap-8">
                <div className="text-md flex flex-col items-start gap-4 text-muted-foreground">
                  Total Circulating BGT
                </div>
                <div className="text-md flex flex-col gap-4 font-semibold text-foreground">
                  150.69 M
                </div>
              </div>
              <div className="flex w-full flex-row items-stretch justify-between gap-8">
                <div className="text-md flex flex-col items-start gap-4 text-muted-foreground">
                  Active Bribes
                </div>
                <div className="text-md flex flex-col gap-4 font-semibold text-foreground">
                  690.42k
                </div>
              </div>
              <div className="flex w-full flex-row items-stretch justify-between gap-8">
                <div className="text-md flex flex-col items-start gap-4 text-muted-foreground">
                  Active Bribes
                </div>
                <div className="text-md flex flex-col gap-4 font-semibold text-foreground">
                  690.42k
                </div>
              </div>
            </div>
            <div className="flex w-full flex-row items-stretch justify-between bg-muted">
              <Image
                // className="max-[600px]:mx-auto"
                src={`${cloudinaryUrl}/bears/l9oaplrgfkrqw8y6noyp`}
                alt="proposal-bear"
                layout="intrinsic"
                width={220}
                height={200}
              />
              <div className="flex flex-col gap-2 p-4">
                <div className="text-md m-2 flex flex-col items-start text-muted-foreground">
                  Estimates are updated weekly. Checkout each validator for
                  their bribes distribution breakdown
                </div>
                <div className="flex h-[128px] w-[240px] flex-col items-start justify-center rounded-md border border-[#CA8A04] bg-[#FEFCE8] p-4">
                  <div className="text-xs font-semibold text-muted-foreground">
                    Estimated Avg. Return per BGT Staked
                  </div>
                  <div className="text-xl font-semibold text-foreground">
                    69.9
                  </div>
                  <div className="mt-4 text-xs font-semibold text-muted-foreground">
                    Checkout Bribes
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-[1/2]">
          <GlobalGaugeWeightInfo />
        </div>
      </div>
      <SearchInput
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeywords(e.target.value)
        }
      />
    </div>
  );
}

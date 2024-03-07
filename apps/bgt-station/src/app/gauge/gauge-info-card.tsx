"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

export default function GaugeInfoCard() {
  return (
    <Card className="flex flex-col overflow-hidden md:min-w-[520px]">
      <div className="flex w-full flex-row items-stretch justify-between gap-8 bg-muted p-4">
        <div className="flex flex-row items-start gap-2 text-2xl font-bold">
          <Icons.bgt className="h-[32px] w-[32px]" /> Total BGT
        </div>
        <div className="flex flex-col gap-4 text-2xl font-bold">69.99 M</div>
      </div>
      <div className="flex flex-col gap-2 px-4 py-8">
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
          <div className="flex flex-row">
            <div className="text-md flex flex-col gap-4 font-semibold text-foreground">
              690.42k
            </div>
            <div className="text-md ml-1 flex flex-col gap-4 font-semibold text-muted-foreground">
              (42 Active Gauges)
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-stretch justify-between gap-8">
          <div className="text-md flex flex-col items-start gap-4 text-muted-foreground">
            Total No. of Validators
          </div>
          <div className="flex flex-row">
            <div className="text-md flex flex-col gap-4 font-semibold text-success-foreground">
              69 Active /
            </div>
            <div className="text-md ml-1 flex flex-col gap-4 font-semibold text-info-foreground">
              80 Total
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-muted sm:flex-row sm:items-stretch sm:justify-between">
        <Image
          className="hidden sm:block"
          src="/bg/smokey-bear.png"
          alt="proposal-bear"
          layout="intrinsic"
          width={291}
          height={354}
        />
        <div className="m-4 flex flex-col items-center justify-center gap-2 py-4">
          <div className="text-md flex max-w-[240px] flex-col flex-wrap items-start text-muted-foreground sm:text-right">
            Estimates are updated weekly. Checkout each validator for their
            bribes distribution breakdown
          </div>
          <div className="flex h-[72px] max-w-[240px] flex-col items-end justify-center rounded-md border border-warning-foreground bg-warning px-4">
            <div className="whitespace-nowrap text-xs font-semibold text-muted-foreground">
              Estimated Avg. Return per BGT Staked
            </div>
            <div className="text-2xl font-semibold text-foreground">$69.9</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

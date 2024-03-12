"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

export default function GaugeInfoCard() {
  return (
    <Card className="flex w-full flex-col overflow-hidden sm:max-w-[520px]">
      <div className="flex w-full flex-row items-stretch justify-between gap-8 border-b border-border bg-muted p-4">
        <div className="flex flex-row items-start gap-2 text-2xl font-bold">
          <Icons.bgt className="h-8 w-8" /> Total BGT
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
        <span className="flex w-full flex-row items-stretch justify-between">
          <div className="text-md flex items-start gap-4 text-muted-foreground">
            Active Bribes
          </div>
          <div className="flex flex-row flex-wrap items-end justify-end gap-1 text-right">
            <div className="text-md font-semibold text-foreground">690.42k</div>
            <div className="text-md font-semibold text-muted-foreground">
              (42 Active Gauges)
            </div>
          </div>
        </span>
        <div className="flex w-full flex-row items-stretch justify-between">
          <div className="text-md flex flex-col items-start gap-4 text-muted-foreground">
            Total No. of Validators
          </div>
          <div className="flex flex-row flex-wrap items-end justify-end gap-1 text-right">
            <span className="text-md flex flex-col font-semibold text-success-foreground">
              69 Active
            </span>
            <span className="text-md flex flex-col font-semibold text-foreground">
              /
            </span>
            <span className="text-md flex flex-col font-semibold text-info-foreground">
              80 Total
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center border-t border-border bg-muted  sm:flex-row sm:items-stretch sm:justify-between lg:flex-row">
        <div className="hidden sm:block lg:max-w-[200px]">
          <Image
            src={`${cloudinaryUrl}/bears/m7abj0nxzpkh5mcuz5g2`}
            alt="proposal-bear"
            layout="intrinsic"
            width={200}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center justify-start gap-2 px-4 py-4 lg:max-w-[calc(100%-200px)]">
          <div className="text-md flex flex-col flex-wrap items-center text-muted-foreground sm:max-w-[240px] sm:items-start sm:text-right lg:flex-wrap">
            Estimates are updated weekly. Checkout each validator for their
            bribes distribution breakdown
          </div>
          <div className="flex h-[72px] w-full flex-col justify-center rounded-md border border-warning-foreground bg-warning px-4 lg:flex-wrap">
            <div className="whitespace-normal text-xs font-semibold text-muted-foreground">
              Estimated Avg. Return per BGT Staked
            </div>
            <div className="text-right text-2xl font-semibold text-foreground">
              $69.9
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

"use client";

import { type Metadata } from "next";
import Image from "next/image";
import { Button } from "@bera/ui/button";

import { Details } from "./components/details";
import GlobalGaugeWeight from "./components/global-gauge-weight";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard() {
  return (
    <div className="container flex w-full max-w-[926px] flex-col gap-24 pb-24">
      <div className="flex flex-col items-center gap-1">
        <Image
          src="/bears/bee.png"
          alt="dashboard bee"
          width={164}
          height={168}
        />
        <div className="text-5xl font-bold leading-[48px] text-foreground">
          BGT Station
        </div>
        <div className="text-xl font-semibold leading-7 text-muted-foreground">
          A place for all your BGT
        </div>
        <Details />
      </div>
      <GlobalGaugeWeight />

      <div className="mx-auto">
        <Button variant="outline" className=" w-fit">
          View More
        </Button>
      </div>
    </div>
  );
}

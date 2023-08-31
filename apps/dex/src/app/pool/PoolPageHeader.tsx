"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { DataCard } from "../components/Data";
import { PoolSearch } from "./PoolsTable";

export default function PoolPageHeader() {
  const router = useRouter();
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-6">
      <h1 className="text-center text-5xl font-bold">
        Create a <span className="text-secondary-foreground">Pool</span>
        <br /> <span className="text-secondary-foreground">Or</span> Add
        Liquidity
      </h1>
      <div className="flex flex-row gap-2 self-center">
        <Button
          onClick={() => router.push("/pool/create")}
          className="text-md mb-10 self-center"
        >
          Create a Pool
        </Button>
        <Button
          variant={"outline"}
          className="text-md mb-10 self-center"
          onClick={() => {
            const poolSearchElement = document.getElementById("poolSearch");
            if (poolSearchElement) {
              poolSearchElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          View Pools
        </Button>
      </div>
      <div className="flex w-full max-w-[980px] flex-col items-center justify-center gap-6 self-center md:flex-row">
        <DataCard
          icon={<Icons.lock />}
          title={"Total Value Locked"}
          value={"$842,886,669"}
        />
        <DataCard
          icon={<Icons.candleStick />}
          title={"24H Volume"}
          value={"$69,420,702"}
        />
        <DataCard
          icon={<Icons.medal />}
          title={"BGT Rewards Distributed"}
          value={"1,690,420 BGT"}
        />
      </div>
      {/* <HotPools isMainPage={false} />
      <TrendingPools /> */}
      <div id="poolSearch" className="mt-[72px] w-full max-w-[980px]">
        <PoolSearch />
      </div>
    </div>
  );
}

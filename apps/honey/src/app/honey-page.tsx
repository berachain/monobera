"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@bera/ui";

import Data from "~/components/data";
import Graph from "~/components/graph";
import Hero from "~/components/hero";
import HoneyBanner from "~/components/honey-banner";
import { HoneyMachine } from "~/components/honey-machine";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import { SwapCard } from "~/components/swap-card";
import { type HoneySupply, type HoneyVolume } from "./type";

export default function HoneyPage({
  volume,
  weeklyVolume,
  monthlyVolume,
  quarterlyVolume,
  supply,
  weeklySupply,
  monthlySupply,
  quarterlySupply,
}: {
  volume: HoneyVolume;
  weeklyVolume: HoneyVolume;
  monthlyVolume: HoneyVolume;
  quarterlyVolume: HoneyVolume;
  supply: HoneySupply;
  weeklySupply: HoneySupply;
  monthlySupply: HoneySupply;
  quarterlySupply: HoneySupply;
}) {
  const [mode, setMode] = useState<"pro" | "arcade">("arcade");

  return (
    <div
      className={cn(
        "pt-[72px]",
        mode === "arcade" ? "bg-[#468DCB] font-honey" : "",
      )}
    >
      <div className="h-fit w-full bg-slate-200 bg-opacity-50 p-2 text-center hover:cursor-pointer hover:underline">
        {mode === "arcade" ? (
          <div onClick={() => setMode("pro")}>🍯 Enter Honey Pro Mode</div>
        ) : (
          <div onClick={() => setMode("arcade")}>
            🕹️ Enter Honey Arcade Mode
          </div>
        )}
      </div>
      <div>
        <div>
          {mode === "arcade" ? (
            <div className="m-auto hidden max-w-[1000px] honey:block">
              <HoneyMachine />
              <HoneyBanner />
            </div>
          ) : (
            <div className="flex justify-center honey:hidden">
              <div className="container">
                <Hero />
                <SwapCard />
              </div>
            </div>
          )}
        </div>

        <div
          className={cn(
            mode === "arcade"
              ? "bg-gradient-to-b from-[#468DCB] honey:to-background"
              : "",
          )}
        >
          <div className="container honey:max-w-[1050px] honey:text-blue-900">
            <div className="py-4 lg:py-0">
              <Data
                tvl={supply.honeyTotalSupply[0]?.amount || "0"}
                dailyVolume={volume.honeyVolume[0]?.amount || "0"}
              />
            </div>
            <div className="py-4">
              <h3 className="mb-4 flex items-center gap-4 text-3xl text-blue-900 ">
                <Image
                  src="/honeyCoin.png"
                  className="w-8"
                  alt="honey"
                  width={32}
                  height={32}
                />
                Total Honey Supply
              </h3>
              <Graph
                hourlySupply={supply?.honeyTotalSupply ?? []}
                hourlyVolume={volume?.honeyVolume ?? []}
                weeklyVolume={weeklyVolume?.honeyVolume ?? []}
                weeklySupply={weeklySupply?.honeyTotalSupply ?? []}
                monthlyVolume={monthlyVolume?.honeyVolume ?? []}
                monthlySupply={monthlySupply?.honeyTotalSupply ?? []}
                quarterlyVolume={quarterlyVolume?.honeyVolume ?? []}
                quarterlySupply={quarterlySupply?.honeyTotalSupply ?? []}
              />
            </div>
            <HoneyTransactionsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
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
  const [mode, setMode] = useState<"pro" | "arcade">("pro");
  const arcade = mode === "arcade";

  useEffect(() => {
    const handleResize = () => {
      if (arcade && window.innerWidth < 1000) {
        setMode("pro");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mode]);

  return (
    <div className={cn("pt-[72px]", arcade ? "bg-[#468DCB] font-honey" : "")}>
      <div className="hidden h-fit w-full bg-slate-200 bg-opacity-50 p-2 text-center hover:cursor-pointer hover:underline honey:block">
        {arcade ? (
          <div onClick={() => setMode("pro")}>🍯 Enter Honey Pro Mode</div>
        ) : (
          <div onClick={() => setMode("arcade")}>
            🕹️ Enter Honey Arcade Mode
          </div>
        )}
      </div>
      <div>
        <div>
          {arcade ? (
            <div className="m-auto block max-w-[1000px]">
              <HoneyMachine />
              <HoneyBanner />
            </div>
          ) : (
            <div className="flex justify-center md:justify-start">
              <div className="container flex max-w-[1000px] flex-col items-center justify-between md:flex-row">
                <Hero />
                <SwapCard />
              </div>
            </div>
          )}
        </div>

        <div
          className={cn(
            arcade ? "bg-gradient-to-b from-[#468DCB] honey:to-background" : "",
          )}
        >
          <div
            className={cn(
              "container max-w-[1050px]",
              arcade ? "text-blue-900" : "",
            )}
          >
            <div className="py-4 lg:py-0">
              <Data
                tvl={supply.honeyTotalSupply[0]?.amount || "0"}
                dailyVolume={volume.honeyVolume[0]?.amount || "0"}
                arcade={arcade}
              />
            </div>
            <div className="py-4">
              <h3
                className={cn(
                  "mb-4 flex items-center gap-3 text-lg md:text-3xl",
                  arcade
                    ? "text-blue-900"
                    : "bg-gradient-to-r from-[#292524] via-[#875100] via-30% to-[#292524] bg-clip-text font-semibold text-transparent",
                )}
              >
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
                arcade={arcade}
              />
            </div>
            <HoneyTransactionsTable arcade={arcade} />
          </div>
        </div>
      </div>
    </div>
  );
}

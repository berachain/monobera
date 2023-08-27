"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@bera/ui";

import Data from "~/components/data";
import Graph from "~/components/graph";
import Hero from "~/components/hero";
import HoneyBanner from "~/components/honey-banner";
import { HoneyMachine } from "~/components/honey-machine";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import { SwapCard } from "~/components/swap-card";
import { cloudinaryUrl } from "~/config";
import { type HoneySupply, type HoneyVolume } from "./type";

export default function HoneyPage({
  data,
  weeklyData,
  monthlyData,
  quarterlyData,
  mode,
}: {
  data: [HoneyVolume, HoneySupply];
  weeklyData: [HoneyVolume, HoneySupply];
  monthlyData: [HoneyVolume, HoneySupply];
  quarterlyData: [HoneyVolume, HoneySupply];
  mode: "arcade" | "pro";
}) {
  const [volume, supply] = data;
  const [weeklyVolume, weeklySupply] = weeklyData;
  const [monthlyVolume, monthlySupply] = monthlyData;
  const [quarterlyVolume, quarterlySupply] = quarterlyData;

  const arcade = mode === "arcade";
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      if (arcade && window.innerWidth < 1000) {
        router.push("/?mode=pro");
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
          <div onClick={() => router.push("/?mode=pro")} className="font-honey">
            🍯 Enter Honey Pro Mode
          </div>
        ) : (
          <div onClick={() => router.push("/?mode=arcade")}>
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
                dailyVolume={volume.honeyVolume?.[0]?.amount ?? "0"}
                tvl={supply.honeyTotalSupply?.[0]?.amount ?? "0"}
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
                  src={`${cloudinaryUrl}/honey/qqyo5g3phzdwezvazsih`}
                  className="w-8"
                  alt="honey"
                  width={32}
                  height={32}
                />
                Total Honey Supply
              </h3>
              <Graph
                hourlySupply={supply.honeyTotalSupply ?? []}
                hourlyVolume={volume.honeyVolume ?? []}
                weeklyVolume={weeklyVolume.honeyVolume ?? []}
                weeklySupply={weeklySupply.honeyTotalSupply ?? []}
                monthlyVolume={monthlyVolume.honeyVolume ?? []}
                monthlySupply={monthlySupply.honeyTotalSupply ?? []}
                quarterlyVolume={quarterlyVolume.honeyVolume ?? []}
                quarterlySupply={quarterlySupply.honeyTotalSupply ?? []}
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

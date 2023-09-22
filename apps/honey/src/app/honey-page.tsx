"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { formatEther } from "viem";

import Data from "~/components/data";
import Hero from "~/components/hero";
import HoneyBanner from "~/components/honey-banner";
import { HoneyChart } from "~/components/honey-chart";
import { HoneyMachine } from "~/components/honey-machine";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import { SwapCard } from "~/components/swap-card";
import { type HoneyEntry } from "./type";

export default function HoneyPage({
  supply24H,
  volume24H,
  supply7D,
  volume7D,
  supply30D,
  volume30D,
  supply90D,
  volume90D,
  mode,
}: {
  supply24H: HoneyEntry[];
  volume24H: HoneyEntry[];
  supply7D: HoneyEntry[];
  volume7D: HoneyEntry[];
  supply30D: HoneyEntry[];
  volume30D: HoneyEntry[];
  supply90D: HoneyEntry[];
  volume90D: HoneyEntry[];
  mode: "arcade" | "pro";
}) {
  const arcade = mode === "arcade";
  const router = useRouter();
  const formatted24HVolume = formatEther(
    BigInt(volume7D[volume7D.length - 1]?.amount ?? "0"),
  );
  const formattedTotalSupply = formatEther(
    BigInt(supply24H[supply24H.length - 1]?.amount ?? "0"),
  );
  if (arcade && typeof window !== "undefined" && window?.innerWidth < 1000) {
    router.push("/?mode=pro");
  }

  useEffect(() => {
    const handleResize = () => {
      if (arcade && window?.innerWidth < 1000) {
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
            🍯 Enter Simple Mode
          </div>
        ) : (
          <div
            onClick={() => router.push("/?mode=arcade")}
            className="font-honey"
          >
            🕹️ Enter Arcade Mode
          </div>
        )}
      </div>
      <div>
        <section id="mint">
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
        </section>

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
                dailyVolume={formatted24HVolume}
                tvl={formattedTotalSupply}
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
                Total Honey Supply & Volume
              </h3>
              <HoneyChart
                {...{
                  supply24H,
                  volume24H,
                  supply7D,
                  volume7D,
                  supply30D,
                  volume30D,
                  supply90D,
                  volume90D,
                }}
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

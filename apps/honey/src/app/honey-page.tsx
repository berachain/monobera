"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";

import Data from "~/components/data";
import Hero from "~/components/hero";
import { HoneyChart } from "~/components/honey-chart";
import { HoneyMachine } from "~/components/honey-machine";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import { LoadingBee } from "~/components/loadingBee";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window && window.innerWidth) {
      setLoading(false);
      if (window.innerWidth < 1000 && mode === "arcade") {
        router.push("/?mode=pro");
      }
    }
  }, []);

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

  const arcade = mode === "arcade";
  const router = useRouter();
  const formatted24HVolume = volume7D[volume7D.length - 1]?.amount ?? "0";
  const formattedTotalSupply = supply7D[supply7D.length - 1]?.amount ?? "0";
  if (arcade && typeof window !== "undefined" && window?.innerWidth < 1000) {
    router.push("/?mode=pro");
  }

  return (
    <>
      {!loading ? (
        <div
          className={cn(
            arcade ? "bg-[#468DCB] font-honey" : "pro-mode-background",
          )}
        >
          <div
            className="hidden h-fit w-full cursor-pointer text-center font-medium honey:block"
            id="mint"
          >
            {arcade ? (
              <div
                onClick={() => router.push("/?mode=pro")}
                className="flex items-center justify-center gap-1 bg-sky-50 p-2 font-honey"
              >
                <Image
                  src={`${cloudinaryUrl}/honey/k67yfz1uswqqvfh2pmgo`}
                  className="block w-8"
                  alt="arcade bear"
                  width={32}
                  height={32}
                />{" "}
                Switch To Simple Mode
              </div>
            ) : (
              <div
                onClick={() => router.push("/?mode=arcade")}
                className="flex items-center justify-center gap-1 bg-yellow-50 bg-opacity-20 p-2 backdrop-blur-2xl"
              >
                <Image
                  src={`${cloudinaryUrl}/honey/k67yfz1uswqqvfh2pmgo`}
                  className="block w-8"
                  alt="arcade bear"
                  width={32}
                  height={32}
                />{" "}
                Switch To Arcade Mode
              </div>
            )}
          </div>
          <div>
            <section>
              {arcade ? (
                <div className="m-auto block max-w-[1000px]">
                  <HoneyMachine />
                  {/* <HoneyBanner /> */}
                </div>
              ) : (
                <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-between gap-8 px-4 py-16">
                  <Hero />
                  <SwapCard showBear={false} />
                </div>
              )}
            </section>

            <div
              className={cn(
                arcade
                  ? "bg-gradient-to-b from-[#468DCB] honey:to-background"
                  : "",
              )}
            >
              <div
                className={cn(
                  "container max-w-[1050px]",
                  arcade ? "text-blue-900" : "",
                )}
              >
                <div className="py-4 lg:py-0" id="supply">
                  <Data
                    dailyVolume={formatted24HVolume}
                    tvl={formattedTotalSupply}
                    arcade={arcade}
                  />
                </div>
                <div className="py-4">
                  {arcade ? (
                    <h3 className="mb-4 flex items-center gap-3 text-lg text-blue-900 md:text-3xl">
                      <Image
                        src={`${cloudinaryUrl}/honey/qqyo5g3phzdwezvazsih`}
                        className="w-8"
                        alt="honey"
                        width={32}
                        height={32}
                      />
                      Total Honey Supply & Volume
                    </h3>
                  ) : (
                    <h3 className="mb-12 flex items-center justify-center gap-2 text-3xl font-bold md:text-5xl">
                      <Image
                        src={`${cloudinaryUrl}/honey/gugztuverdsqvzw5co8a`}
                        className="w-12"
                        alt="honey"
                        width={48}
                        height={48}
                      />
                      Honey Stats
                    </h3>
                  )}
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
      ) : (
        <LoadingBee />
      )}
    </>
  );
}

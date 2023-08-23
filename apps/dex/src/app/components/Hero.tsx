"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { SwapCard } from "~/components/swap-card";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="my-24 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex-1">
        <h1 className="md:leading-14 mb-6 text-center text-3xl font-extrabold leading-9 md:text-left md:text-5xl">
          <span className="text-accent">Swap Tokens</span> on{" "}
          <br className="hidden md:block" /> Your Favorite{" "}
          <br className="block md:hidden" /> New Dex
        </h1>
        <div className="mb-6 text-center md:text-left">
          <Button onClick={() => router.push("/swap")} className="mr-3">
            Enter App
          </Button>
          <Button variant="outline" onClick={() => router.push("/pool")}>
            View Pools
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() => router.push("/pool")}
          >
            💧 Add Liquidity to Earn BGT Rewards{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() =>
              window.open("https://bgt-station.vercel.app/", "_blank")
            }
          >
            🐝 Get BGT Emissions for my token{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() => router.push("/pool/create")}
          >
            🏖️ Create your own Liquidity Pools{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="mx-auto w-full min-w-[320px] md:w-[400px]">
          <SwapCard />
        </div>
      </div>
    </div>
  );
}

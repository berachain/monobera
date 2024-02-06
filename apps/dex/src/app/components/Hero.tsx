"use client";

import React from "react";
import Link from "next/link";
import { docsUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  return (
    <div className="my-24 flex w-full flex-col items-center justify-between gap-4">
      <div className="mb-2 text-center text-3xl font-extrabold md:text-left md:text-5xl">
        <div className="text-center">
          <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
            Swap Tokens
          </span>{" "}
          on
        </div>
        <div>
          Your Favorite <br className="block md:hidden" /> New Dex
        </div>
      </div>

      <div className="mb-6 text-center md:text-left">
        <Link href={"/swap"} className="shadow-dark-shadow">
          <Button className="mr-3" variant={"primary"}>
            Swap Tokens
          </Button>
        </Link>
        <Link href={"/pool"} className="shadow-dark-shadow">
          <Button variant="outline">View Pools</Button>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3 lg:flex-row">
        <Link
          className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
          href={"/pool"}
        >
          💧 Add Liquidity to Earn BGT Rewards{" "}
          <Icons.arrowRight className="h-3 w-3" />
        </Link>
        <Link
          className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
          href={"/pools/create"}
        >
          🏖️ Create your own Liquidity Pools{" "}
          <Icons.arrowRight className="h-3 w-3" />
        </Link>
        <div
          className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
          onClick={() =>
            window.open(`${docsUrl}/learn/protocol/bgt-emissions`, "_blank")
          }
        >
          🐝 Learn about BGT emissions <Icons.arrowRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

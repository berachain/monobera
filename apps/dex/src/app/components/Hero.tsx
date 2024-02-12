"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl, docsUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  return (
    <div className="flex flex-col justify-between lg:flex-row">
      <div className="lg:items-start items-center my-24 flex w-full lg:w-[450px] flex-col gap-8 ">
        <div className="text-center text-6xl font-extrabold lg:text-left lg:text-5xl">
          Swap Tokens <br />
          on{" "}
          <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
            {" "}
            Berachain&apos;s
          </span>{" "}
          <br />
          Native
          <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
            {" "}
            AMM
          </span>
        </div>

        <div className="text-2xl font-semibold leading-8 text-muted-foreground">
          Swap tokens, add liquidity, create <br />
          pools, and earn BGT rewards.
        </div>

        <div className="text-center lg:text-left flex gap-3">
          <Link href={"/swap"} className="shadow-dark-shadow">
            <Button variant={"primary"}>Swap Tokens</Button>
          </Link>
          <Link href={"/pools"} className="shadow-dark-shadow">
            <Button variant="outline">
              {" "}
              <Icons.search className="w-6 h-6 mr-1 inline-block" /> View Pools
            </Button>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3 lg:items-start lg:hidden">
          <Link
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            href={"/pools"}
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
            🐝 Learn about BGT emissions{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
      <Image
        // className=""
        src={`${cloudinaryUrl}/DEX/g0ntgyc2atxltdycxymz`}
        alt="Create a pool screenshot"
        width={610}
        height={700}
      />
    </div>
  );
}

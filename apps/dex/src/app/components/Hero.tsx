"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cloudinaryUrl, docsUrl } from "@bera/config";
import { useAnalytics } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  const router = useRouter();
  const { track } = useAnalytics();
  return (
    <div className="flex flex-col justify-around lg:flex-row">
      <div className="my-16 flex w-full flex-col items-center gap-4 md:my-24 md:gap-8 lg:w-[500px] lg:items-start ">
        <div className="!whitespace-nowrap text-center text-3xl font-extrabold md:text-4xl md:text-4xl lg:text-left xl:text-6xl">
          Swap Tokens on <br />
          <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
            Berachain&apos;s
          </span>{" "}
          <br />
          Native{" "}
          <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
            AMM
          </span>
        </div>

        <div className="text-md font-semibold leading-8 text-muted-foreground md:text-lg xl:text-2xl">
          Swap tokens, add liquidity, create <br />
          pools, and earn BGT rewards.
        </div>

        <div className="flex gap-3 text-center lg:text-left">
          <Button
            variant={"primary"}
            className="lg:text-md text-sm shadow-dark-shadow xl:text-lg"
            onClick={() => {
              track("Home Hero - Swap CTA Clicked");
              router.push("/swap");
            }}
          >
            Swap Tokens
          </Button>
          <Button
            variant="outline"
            className="lg:text-md text-sm shadow-dark-shadow xl:text-lg"
            onClick={() => {
              track("Home Hero - Pools CTA Clicked");
              router.push("/pools");
            }}
          >
            {" "}
            <Icons.search className="mr-1 inline-block h-6 w-6" /> View Pools
          </Button>
        </div>

        <div className="flex flex-col items-center gap-3 lg:hidden lg:items-start">
          <Link
            className="flex min-h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 py-1 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground md:py-0"
            href={"/pools"}
          >
            💧 Add Liquidity to Earn BGT Rewards{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </Link>
          <Link
            className="flex min-h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 py-1 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground md:py-0"
            href={"/pools/create"}
          >
            🏖️ Create your own Liquidity Pools{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </Link>
          <div
            className="flex min-h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 py-1 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground md:py-0"
            onClick={() =>
              window.open(`${docsUrl}/learn/protocol/gauges`, "_blank")
            }
          >
            🐝 Learn about BGT emissions{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>

      <Image
        className="block self-center dark:hidden "
        src={`${cloudinaryUrl}/DEX/rjzfm2opk1ga6sxugrms`}
        alt="Create a pool screenshot"
        width={610}
        height={700}
      />
      <Image
        className="hidden self-center dark:block"
        src={`${cloudinaryUrl}/DEX/aubb5lkityvqbpzbwkp2`}
        alt="Create a pool screenshot"
        width={610}
        height={700}
      />
    </div>
  );
}

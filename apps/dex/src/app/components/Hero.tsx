"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cloudinaryUrl, docsUrl } from "@bera/config";
import { useAnalytics } from "@bera/shared-ui/src/utils/analytics";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  const router = useRouter();
  const { track } = useAnalytics();
  return (
    <div className="flex flex-col justify-around lg:flex-row">
      <div className="my-24 flex w-full flex-col items-center gap-8 lg:w-[450px] lg:items-start ">
        <div className="text-center text-6xl font-extrabold lg:text-left lg:text-4xl xl:text-6xl">
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

        <div className="text-2xl font-semibold leading-8 text-muted-foreground lg:text-lg xl:text-2xl">
          Swap tokens, add liquidity, create <br />
          pools, and earn BGT rewards.
        </div>

        <div className="flex gap-3 text-center lg:text-left">
          <Button
            variant={"primary"}
            className="text-lg shadow-dark-shadow lg:text-sm xl:text-lg"
            onClick={() => {
              track("Home Hero - Swap CTA Clicked");
              router.push("/swap");
            }}
          >
            Swap Tokens
          </Button>
          <Button
            variant="outline"
            className="text-lg shadow-dark-shadow lg:text-sm xl:text-lg"
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

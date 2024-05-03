"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  return (
    <div className="relative h-[483px] w-full bg-background xl:w-[1280px]">
      <div className="hidden sm:block">
        <Image
          src="/dark_bear_bg.png"
          alt="Eco Bear"
          layout="fill"
          objectFit="cover"
          className="absolute left-0 top-0 z-0 dark:block "
        />
        <Image
          src="/light_bear_bg.png"
          alt="Eco Bear"
          layout="fill"
          objectFit="cover"
          className="absolute left-0 top-0 z-0 dark:hidden "
        />
      </div>
      <div className="flex h-[483px] w-full px-4 xl:w-[1280px]">
        <div className="z-10 flex w-full flex-col items-center justify-center lg:items-start">
          <div className="flex flex-col flex-wrap items-center justify-center lg:items-start">
            <h1 className="text-5xl font-extrabold text-foreground">
              Berachain
              <br />
              Ecosystem
            </h1>
            <h2 className="text-md xs:whitespace-nowrap mt-2 text-center leading-8 tracking-tight text-muted-foreground md:text-left">
              A hub for all the bAPPs and brojects Building on Berachain.
              <br />
              Want to contribute to the bearchain ecosystem?
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 py-4 md:flex-row lg:justify-start">
            <div className="w-full">
              <Link href="https://forms.clickup.com/9014124274/f/8cmh7qj-2334/W32RVORQNXSRUJDSSB">
                <Button
                  className="rounded-18 w-full text-lg font-semibold leading-7 sm:whitespace-nowrap "
                  size={"lg"}
                >
                  <Icons.hammer />
                  <div className="px-2"> Get my project listed</div>
                </Button>
              </Link>
            </div>
            <div className="w-full">
              <Link href="https://blog.berachain.com/blog/flow-of-value-examining-the-differences-between-pos-and-pol-a-case-for-a-new-paradigm-in-sustainable-incentive-alignment-at-the-protocol-layer">
                <Button
                  className="rounded-18 w-full text-lg font-semibold leading-7 sm:whitespace-nowrap"
                  size={"lg"}
                  variant="secondary"
                >
                  Read about Proof of Liquidity
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

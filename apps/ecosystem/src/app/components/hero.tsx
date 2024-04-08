"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme, systemTheme } = useTheme();
  const t = !theme || theme === "system" ? systemTheme || "dark" : theme;
  const bg = t === "dark" ? "/dark_bear_bg.png" : "/light_bear_bg.png";

  return (
    <div className="flex h-[483px] w-full px-4 xl:w-[1280px]">
      {/* <Image
          src={bg}
          alt="Eco Bear"
          layout="fill"
          objectFit="cover"
          className="absolute left-0 top-0 z-0"
        /> */}

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
            <Link href={"/dashboard"}>
              <Button
                className="rounded-18 w-full text-lg font-semibold leading-7 sm:whitespace-nowrap "
                size={"lg"}
              >
                <Icons.hammer />
                <div className="px-2"> Build on Berachain</div>
              </Button>
            </Link>
          </div>
          <div className="w-full">
            <Link href={"/dashboard"}>
              <Button
                className="rounded-18 w-full text-lg font-semibold leading-7 sm:whitespace-nowrap"
                size={"lg"}
                variant="secondary"
              >
                Read about $150M Ecosystem Fund
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

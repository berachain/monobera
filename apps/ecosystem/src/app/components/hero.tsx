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
    <div className="flex items-center justify-center">
      <div className=" relative mx-auto flex h-[483px] w-[1280px]">
        <div className="hidden md:block">
          <Image
            src={bg}
            alt="Eco Bear"
            width={1280}
            height={483}
            className="absolute left-0 top-0 h-full w-full"
          />
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center py-28 md:absolute md:items-start">
          <div className="flex flex-row leading-10 md:flex-col lg:left-0 lg:top-0">
            <h1 className="text-5xl font-extrabold leading-[72px] tracking-tight text-foreground">
              Berachain
              <br />
              Ecosystem
            </h1>
            <h2 className="text-md mt-2 whitespace-nowrap leading-8 tracking-tight text-muted-foreground">
              A hub for all the bAPPs and brojects Building on Berachain.
              <br />
              Want to contribute to the bearchain ecosystem?
            </h2>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <Link href={"/dashboard"}>
              <Button
                className="rounded-18 mt-8 w-full text-lg font-semibold leading-7 sm:w-auto"
                size={"lg"}
              >
                <Icons.hammer />
                <div className="px-2"> Build on Berachain</div>
              </Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button
                className="rounded-18 mt-8 w-full text-lg font-semibold leading-7 sm:w-auto"
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

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme: appTheme, systemTheme } = useTheme();
  const theme = (appTheme === "system" ? systemTheme : appTheme) || "dark";
  return (
    <div className="flex items-center justify-center">
      <div className="relative mx-auto flex h-[483px] w-[1280px]">
        <Image
          src={theme == "dark" ? "/dark_bear_bg.png" : "/light_bear_bg.png"}
          alt="Eco Bear"
          width={1280}
          height={483}
          className="absolute left-0 top-0 h-full w-full"
        />
        <div className="absolute p-12">
          <h1 className="text-3xl font-extrabold leading-8 tracking-tight text-foreground sm:text-4xl">
            Berachain Ecosystem
          </h1>
          <h2 className="text-md mt-2 whitespace-nowrap leading-8 tracking-tight text-muted-foreground">
            A hub for all the bAPPs and brojects Building on Berachain. Want to
            contribute to the bearchain ecosystem?
          </h2>

          <div className="mt-4 flex gap-4">
            <Link href={"/dashboard"}>
              <Button
                className="rounded-18 mt-8 w-full text-lg font-semibold leading-7 sm:w-auto"
                size={"lg"}
              >
                Build on Berachain
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

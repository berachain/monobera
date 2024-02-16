"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function MyProject() {
  return (
    <div className="px-16 pb-16 pt-[64px]">
      <div className="relative">
        <div className="relative mx-auto flex min-h-[300px] w-full flex-wrap overflow-hidden rounded-xl border border-solid bg-muted px-8 py-4 md:h-[220px] md:max-w-[1080px]">
          <div className="absolute flex flex-col flex-wrap items-center justify-center pr-8 sm:items-start">
            <div className="top-0 flex flex-col flex-wrap leading-10 lg:left-0">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
                Get My Project Listed
              </h1>
              <h2 className="flex-wrap text-sm tracking-tight text-muted-foreground sm:text-lg sm:leading-8">
                Fellow builder in the making? Submit project details via this
                form <br />
                and please be sure to provide us as much information as
                possible.
              </h2>
            </div>

            <div className="flex items-center lg:mt-8">
              <Link href={"/dashboard"}>
                <Button
                  className="rounded-18 mt-4 w-full text-lg font-semibold leading-7 sm:w-auto"
                  size={"sm"}
                  variant="info"
                >
                  Submit
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden justify-center sm:flex sm:justify-end">
          <Image
            src="/ecobear.png"
            alt="Project"
            width={650}
            height={600}
            layout="intrinsic"
            className="xl:absolute xl:bottom-[-5%] xl:right-[10%]"
          />
        </div>
      </div>
    </div>
  );
}

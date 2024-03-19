"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function MyProject() {
  return (
    <div className="flex w-full flex-col gap-8 px-4 pb-16 pt-12 sm:w-auto xl:flex-row">
      <div className="relative">
        <div className="min-h-[200px] rounded-xl border border-solid bg-muted px-8 py-4 sm:min-h-[300px] sm:min-w-[400px] lg:w-[620px]">
          <div className="flex flex-col flex-wrap items-center justify-center sm:max-w-[320px] sm:items-start">
            <div className="top-0 flex flex-col flex-wrap items-center leading-10 sm:items-start">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
                Get My Project Listed
              </h1>
              <div className="max-w-[300px] flex-wrap">
                <h2 className="text-center text-sm tracking-tight text-muted-foreground sm:text-left sm:text-lg sm:leading-8">
                  Fellow builder in the making? Submit project details via this
                  form and please be sure to provide us as much information as
                  possible.
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap">
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
        <div className="relative hidden justify-end sm:flex">
          <div className="absolute bottom-0 right-0">
            <Image
              src="/projectbear.png"
              alt="Project"
              width={220}
              height={220}
              layout="intrinsic"
              className="h-[150px] w-[150px] lg:h-auto lg:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="min-h-[200px] rounded-xl border border-solid bg-muted px-8 py-4 sm:min-h-[300px] sm:min-w-[400px] lg:w-[620px]">
          <div className="flex flex-col flex-wrap items-center justify-center sm:max-w-[320px] sm:items-start">
            <div className="top-0 flex flex-col flex-wrap items-center leading-10 sm:items-start lg:left-0">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
                Ecosystem Careers
              </h1>
              <div className="max-w-[300px] flex-wrap">
                <h2 className="text-center text-sm tracking-tight text-muted-foreground sm:text-left sm:text-lg sm:leading-8">
                  Fellow builder in the making? Submit project details via this
                  form and please be sure to provide us as much information as
                  possible.
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap">
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
        <div className="relative hidden justify-end sm:flex">
          <div className="absolute bottom-0 right-0">
            <Image
              src="/careerbear.png"
              alt="Project"
              width={200}
              height={200}
              layout="intrinsic"
              className="h-[130px] w-[130px] lg:h-auto lg:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

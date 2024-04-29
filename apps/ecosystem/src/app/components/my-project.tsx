"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@bera/config";
import { Button } from "@bera/ui/button";

import ComponentTransition from "./component-transition";

export default function MyProject() {
  return (
    <ComponentTransition>
      <div className="flex max-w-[1280px] flex-col gap-8 px-4 pb-16 pt-12 sm:w-auto xl:flex-row">
        <div className="flex w-full flex-col justify-between rounded-xl border border-solid bg-muted sm:min-h-[300px] sm:flex-row md:h-[220px] lg:w-full">
          <div className="flex flex-col items-center justify-center p-8 sm:items-start">
            <div className="top-0 flex flex-col items-center leading-7 sm:items-start lg:left-0">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
                Build-a-Bera
              </h1>
              <div className="flex-wrap items-center sm:max-w-[300px] md:max-w-[440px] lg:w-full">
                <h2 className="text-md flex-wrap text-center tracking-tight text-muted-foreground sm:text-left sm:text-lg">
                  Zero to one incubator focused on fostering innovation on
                  Berachain
                </h2>
              </div>
            </div>

            <div className="flex items-start lg:mt-auto">
              <Link href="https://buildabera.xyz/">
                {/* <Link href="https://forms.clickup.com/9014124274/f/8cmh7qj-2334/W32RVORQNXSRUJDSSB"> */}
                <Button
                  className="rounded-18 mt-4 w-full text-lg font-semibold leading-7 sm:w-auto"
                  size={"sm"}
                  variant="outline"
                >
                  Check it out
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden items-end sm:flex">
            <Image
              src={`${cloudinaryUrl}/Ecosystem/rwevtwpxuhtjovnx2vd5`}
              alt="Project"
              width={370}
              height={30}
              layout="intrinsic"
              className="h-[200px] w-[200px] md:h-[300px] md:w-[300px] lg:h-auto lg:w-auto"
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-between rounded-xl border border-solid bg-muted sm:min-h-[300px] sm:flex-row md:h-[220px] lg:w-full">
          <div className="flex flex-col items-center justify-center p-8 sm:items-start">
            <div className="top-0 flex flex-col items-center leading-7 sm:items-start lg:left-0">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
                Ecosystem Careers
              </h1>
              <div className="flex-wrap items-center sm:max-w-[300px] md:max-w-[440px] lg:w-full">
                <h2 className="text-md flex-wrap text-center tracking-tight text-muted-foreground sm:text-left sm:text-lg">
                  Fellow builder in the making? Submit project details via this
                  form and please be sure to provide us as much information as
                </h2>
              </div>
            </div>

            <div className="flex items-start lg:mt-auto">
              <Link href="/program-details">
                <Button
                  className="rounded-18 mt-4 w-full text-lg font-semibold leading-7 sm:w-auto"
                  size={"sm"}
                  variant="outline"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden items-end sm:flex">
            <Image
              src={`${cloudinaryUrl}/Ecosystem/wreirhtyrmuvfb3k7bx2`}
              alt="Project"
              width={320}
              height={350}
              layout="intrinsic"
              className="h-[200px] w-[200px] md:h-[300px] md:w-[300px] lg:h-auto lg:w-auto"
            />
          </div>
        </div>
      </div>
    </ComponentTransition>
  );
}

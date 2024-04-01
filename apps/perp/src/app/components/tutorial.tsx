import React from "react";

import { LandingCard1 } from "./landing-card-1";
import { LandingCard2 } from "./landing-card-2";
import { LandingCard3 } from "./landing-card-3";

export default function Tutorial() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[128px] px-[172px] xl:flex-row">
      <div className="relative mb-8 hidden h-[520px] w-[480px] flex-shrink-0 sm:block">
        <div className="absolute left-0 top-10">
          <LandingCard3 />
        </div>
        <div className="absolute bottom-0 right-10">
          <LandingCard2 />
        </div>
        <div className="absolute right-0 top-0">
          <LandingCard1 />
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-col gap-4">
        <h1 className="md:leading-14 text-center text-3xl font-extrabold leading-9 md:text-5xl xl:text-left">
          <span className="whitespace-nowrap bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Level Up
          </span>{" "}
          <br />
          Your Trading
        </h1>
        <div className=" text-center font-medium leading-normal text-muted-foreground xl:text-left ">
          Enabling a full suite of features <br className="block md:hidden" />{" "}
          for both <br className="hidden md:block" /> veteran and novice{" "}
          <br className="block md:hidden" />
          traders to transact.
        </div>
      </div>
    </div>
  );
}

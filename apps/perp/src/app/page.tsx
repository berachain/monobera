import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Footer } from "@bera/shared-ui";

import GeneralInfo from "./components/general-info";
import Help from "./components/help";
import Hero from "./components/hero";
import Markets from "./components/positions";
import Tutorial from "./components/tutorial";

export default function Home() {
  return (
    <div className="relative">
      <Image
        src={`${cloudinaryUrl}/BERPS/grid-hero_ht7fz0`}
        alt="dashboard"
        priority
        className="absolute left-1/2 z-0 w-full max-w-[1280px] -translate-x-1/2 transform opacity-20 dark:opacity-100"
        width={1280}
        height={100}
      />
      <div className="relative z-10 flex flex-col gap-[128px] bg-lend bg-contain bg-no-repeat pt-20 md:pt-[116px] lg:pt-[140px]">
        <Hero />
        <GeneralInfo />
        <Markets />
        <Tutorial />
        <Help />
      </div>
      <Footer />
    </div>
  );
}

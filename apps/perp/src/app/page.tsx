import React from "react";
import Image from "next/image";

import { cloudinaryUrl } from "~/config";
import GeneralInfo from "./components/general-info";
import Help from "./components/help";
import Hero from "./components/hero";
import Markets from "./components/positions";
import Tutorial from "./components/tutorial";

export default function Home() {
  return (
    <div className="container relative">
      <Image
        src={`${cloudinaryUrl}/BERPS/grid-hero_ht7fz0`}
        alt="dashboard"
        className="absolute z-0 w-full max-w-[1280px]"
        width={1280}
        height={100}
      />
      <div className="relative z-10 mt-14 flex flex-col gap-[128px] bg-lend bg-contain bg-no-repeat">
        <Hero />
        <div className="flex justify-center">
          <GeneralInfo />
        </div>
        <Markets />
        <Tutorial />
        <Help />
      </div>
    </div>
  );
}

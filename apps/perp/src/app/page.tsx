import React from "react";

import GeneralInfo from "./components/general-info";
import Help from "./components/help";
import Hero from "./components/hero";
import Markets from "./components/markets";
import Tutorial from "./components/tutorial";

export default function Home() {
  return (
    <>
      <div className="container mt-14 flex flex-col gap-[128px] bg-lend bg-contain bg-no-repeat">
        <Hero />
        <div className="flex justify-center">
          <GeneralInfo />
        </div>
        <Markets />
        <Tutorial />
        <Help />
      </div>
    </>
  );
}

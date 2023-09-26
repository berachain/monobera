import React from "react";
import { type Metadata } from "next";
import { lendName } from "@bera/config";

import Data from "~/components/data";
import Help from "~/components/help";
import Hero from "~/components/hero";
import HowItWorks from "~/components/how-it-works";
import Markets from "~/components/markets";

export const metadata: Metadata = {
  title: `Home | ${lendName}`,
  description: `Welcome to ${lendName}!`,
};

export default function Page() {
  return (
    <>
      <div className="container mt-14 bg-lend bg-contain bg-no-repeat">
        <Hero />
      </div>
      <div className="container">
        <Data />
      </div>
      <Markets />
      <div className="container">
        <HowItWorks />
        <Help />
      </div>
    </>
  );
}

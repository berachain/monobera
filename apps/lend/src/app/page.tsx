import React from "react";
import { type Metadata } from "next";
import { lendDocsUrl, lendName } from "@bera/config";
import { Documentation, Footer } from "@bera/shared-ui";

import Data from "~/components/data";
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
      <div className="container mt-14 max-w-1280 bg-lend bg-contain bg-no-repeat pb-16">
        <Hero />
        <Data />
        <Markets />
        <HowItWorks />
        <Documentation docLink={lendDocsUrl} className="my-24" />
      </div>
      <Footer />
    </>
  );
}

import React from "react";
import { type Metadata } from "next";
import { Footer } from "@bera/shared-ui";

import AmbassadorCards from "./components/ambassador-tiers/ambassadorCards";
import BackGroundOrbit from "./components/background-orbit";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import KnowMore from "./components/know-more";
import SignUp from "./components/signUp-section/signup";
import { Projects } from "./components/upcoming-events/events";

export const metadata: Metadata = {
  title: "Ambassador",
  description: "Welcome to the ambassador page",
};

export default function Page() {
  return (
    <>
      <div className="relative mx-auto flex flex-col gap-16 bg-contain bg-no-repeat sm:gap-64 lg:pt-[140px]">
        <Hero />
        <div className="-mx-full">
          <div className="relative m-auto mt-8 bg-cover bg-center bg-no-repeat">
            <div className="hidden sm:block">
              <BackGroundOrbit />
            </div>
            <Projects />
            <AmbassadorCards />
          </div>
          <SignUp />
          <FAQ />
          <KnowMore />
          <Footer />
        </div>
      </div>
    </>
  );
}

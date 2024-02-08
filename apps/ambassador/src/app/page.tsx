import React from "react";
import { type Metadata } from "next";
import { Footer } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";

import {
  AmbassadorCard,
  brigadeGeneral,
  colonel,
  kingsOath,
} from "./components/ambassador-tiers/tiers";
import BackGroundOrbit from "./components/background-orbit";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import SignUp from "./components/signUp-section/signup";
import { Projects } from "./components/upcoming-events/events";

export const metadata: Metadata = {
  title: "Ambassador",
  description: "Welcome to the ambassador page",
};

export default function Page() {
  return (
    <>
      <div className="relative mx-auto flex flex-col gap-64 bg-contain bg-no-repeat pt-20 md:pt-[116px] lg:pt-[140px]">
        <Hero />
        <div className="-mx-full">
          <div className="relative m-auto mt-8 bg-cover bg-center bg-no-repeat">
            <div className="z-20 hidden sm:block">
              <BackGroundOrbit />
            </div>
            <Projects />
            <div className="flex flex-col items-center justify-center pb-12 pt-12">
              <h1 className="md:leading-14 leading-24 pb-12 text-3xl font-extrabold md:text-5xl">
                Tiers of an{" "}
                <span className="bg-gradient-to-r from-[rgba(255,181,113,0.9)] to-[rgba(255,122,0,0.9)] bg-clip-text text-transparent backdrop-blur-md">
                  Ambassador
                </span>
              </h1>
              <div className="flex flex-wrap justify-center gap-8 p-4 pb-4">
                <div className="order-2 sm:order-1">
                  <AmbassadorCard ambassador={brigadeGeneral} />
                </div>
                <div className="order-1">
                  <AmbassadorCard ambassador={kingsOath} />
                </div>
                <div className="order-3">
                  <AmbassadorCard ambassador={colonel} />
                </div>
              </div>
              <Button variant="outline" className="mb-8 mt-12">
                Learn more about Tiers
              </Button>
            </div>
          </div>
          <SignUp />
          <FAQ />
          <Footer />
        </div>
      </div>
    </>
  );
}

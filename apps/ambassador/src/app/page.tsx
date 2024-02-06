import { type Metadata } from "next";
import Image from "next/image";
import { Footer } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { useTheme } from "next-themes";

import {
  AmbassadorCard,
  brigadeGeneral,
  colonel,
  kingsOath,
} from "./components/ambassador-tiers/tiers";
import BackGroundOrbit from "./components/background-orbit";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import { Orbit } from "./components/orbit";
// import Announcements from "./components/announcements/announcements";
import { SignUp } from "./components/signUp-section/signup";
import { Projects } from "./components/upcoming-events/events";

export const metadata: Metadata = {
  title: "Ambassador",
  description: "Welcome!",
};

export default function Page() {
  return (
    <>
      <div className="relative mx-auto flex flex-col gap-64 bg-contain bg-no-repeat pt-20 md:pt-[116px] lg:pt-[140px]">
        <Hero />
        <div className="-mx-full">
          <div className="relative m-auto mt-8 bg-glow bg-cover bg-center bg-no-repeat">
            <BackGroundOrbit />
            {/* <div className="relative mx-auto flex h-[3200px] items-center justify-center flex-col gap-[64px]">
              <Image
                src="/bright_bg.png"
                alt="Ellipase"
                layout="fill"
                objectFit="contain"
                className="absolute left-0 top-400 h-full w-full"
              /> */}
            <Projects />
            <div className="flex flex-col items-center justify-center pb-12 pt-12">
              <h1 className="md:leading-14 leading-24 pb-12 text-3xl font-extrabold md:text-5xl">
                Tiers of an{" "}
                <span className="bg-gradient-to-r from-[rgba(255,181,113,0.9)] to-[rgba(255,122,0,0.9)] bg-clip-text text-transparent backdrop-blur-md">
                  Ambassador
                </span>
              </h1>
              <div className="flex flex-wrap justify-center gap-8 p-4 pb-4">
                <AmbassadorCard ambassador={brigadeGeneral} />
                <AmbassadorCard ambassador={kingsOath} />
                <AmbassadorCard ambassador={colonel} />
              </div>
              <Button variant="outline" className="mb-8 mt-12">
                Learn more about Tiers
              </Button>
            </div>
            <Button variant="outline" className="mb-8 mt-12">
              Learn more about Tiers
            </Button>
          </div>
          <SignUp cloudinaryUrl={""} />
          {/* <Announcements /> */}
          <FAQ />
          <Footer />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

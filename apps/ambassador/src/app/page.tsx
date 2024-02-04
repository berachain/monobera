import { type Metadata } from "next";
// import Image from "next/image";
import { Footer } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import {
  AmbassadorCard,
  brigadeGeneral,
  kingsOath,
  footSoldier,
} from "./components/ambassador-tiers/tiers";
import { Projects } from "./components/upcoming-events/events";
import Hero from "./components/hero";
import Announcements from "./components/announcements/announcements";
import { SignUp } from "./components/signUp-section/signup";
import FAQ from "./components/faq";

export const metadata: Metadata = {
  title: "Ambassador",
  description: "Welcome!",
};

export default function Page() {
  return (
    <>
      <div className="relative mx-auto flex max-w-1280 flex-col gap-64 bg-contain bg-no-repeat pb-[72px] pt-20 md:pt-[116px] lg:pt-[140px]">
        <Hero />
        <div className="-mx-full">
          <div className="relative m-auto mt-8 bg-glow bg-cover bg-center bg-no-repeat">
            {/* <div className="relative mx-auto flex h-[3200px] items-center justify-center flex-col gap-[64px]">
              <Image
                src="/bright_bg.png"
                alt="Ellipase"
                layout="fill"
                objectFit="contain"
                className="absolute left-0 top-400 h-full w-full"
              /> */}
            <Projects />
            <div className="flex flex-col items-center justify-center pt-12 pb-12">
              <h1 className="md:leading-14 leading-24 pb-8 text-3xl font-extrabold md:text-5xl">
                Stages of an{" "}
                <span className="bg-gradient-to-r from-[rgba(255,181,113,0.9)] to-[rgba(255,122,0,0.9)] bg-clip-text text-transparent backdrop-blur-md">
                  Ambassador
                </span>
              </h1>
              <div className="flex flex-wrap justify-between gap-4 p-4 pb-4">
                <AmbassadorCard ambassador={brigadeGeneral} />
                <AmbassadorCard ambassador={kingsOath} />
                <AmbassadorCard ambassador={footSoldier} />
              </div>
              <Button variant="outline" className="mt-12 mb-8">
                Learn more about Tiers
              </Button>
            </div>
            <SignUp cloudinaryUrl={""} />
            <Announcements />
            <FAQ />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

import { type Metadata } from "next";
import Image from "next/image";
import { Footer } from "@bera/shared-ui";

import AmbassadorPageContent from "./components/ambassador-page-content";
import Hero from "./components/hero";

export const metadata: Metadata = {
  title: "Ambassador",
  description: "Welcome!",
};

export default function Page() {
  return (
    <>
      <div className="relative mx-auto flex max-w-1280 flex-col gap-[128px] bg-lend bg-contain bg-no-repeat pb-[72px] pt-20 md:pt-[116px] lg:pt-[140px]">
        <Hero />
        <div className="-mx-full">
          <div className="relative m-auto mt-8 bg-glow bg-cover bg-center bg-no-repeat">
            <div className="relative mx-auto flex h-[2000px] items-center justify-center">
              <Image
                src="/bright_bg.png"
                alt="Ellipase"
                layout="fill"
                objectFit="contain"
                className="absolute left-0 top-0 h-full w-full"
              />
              <AmbassadorPageContent />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

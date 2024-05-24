import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

import { HowToEarnBGT } from "./how-to-earn-bgt";
import { HowToEarnIncentives } from "./how-to-earn-incentives";

export const INTRO = () => {
  return (
    <>
      <HowToEarnBGT />
      <HowToEarnIncentives />

      <div className="flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:text-left">
        <div className="flex flex-col gap-6">
          <div className="text-center text-4xl font-bold capitalize md:text-left lg:text-6xl xl:text-8xl">
            how to <br />
            Incentivize
          </div>
          <div className="text-lg leading-7">
            Stake Your LP/Receipt Tokens from <br /> platforms and dAPPs Into
            Gauge Vaults
          </div>
        </div>
        <div className="relative hidden w-[450px] lg:block">
          <hr className="z-1 relative w-full border-2 border-dashed border-foreground" />
          <Image
            src="/user.png"
            alt="user"
            width={80}
            height={80}
            className="absolute left-0 top-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-amber-400 text-center"
          />
          <div className="absolute right-0 top-1/2 z-10 flex w-fit -translate-y-1/2 translate-x-1/2 transform items-center gap-2 rounded-md border-2 border-orange-600 bg-rose-200 p-2 text-sm font-medium text-background">
            <Icons.refreshccw className="h-8 w-8 rounded-sm bg-orange-600 p-1 text-amber-100" />
            Gauge Vaults
          </div>
          <div
            style={{ "--duration": 5 } as React.CSSProperties}
            className="animate-moveRight absolute z-[5] flex h-8 w-fit -translate-x-1/2 transform-gpu items-center rounded-full border border-border bg-background p-1 font-medium"
          >
            <Icons.beraIcon className="-ml-1 mr-1 h-5 w-5" />
            BERA
          </div>
        </div>
        <div className="block aspect-auto w-full max-w-[570px] lg:hidden lg:w-1/2">
          <Image
            src={`${cloudinaryUrl}/BGT/e1sadhyga0nawrkfjnn3`}
            alt="bg-dark"
            width={570}
            height={225}
            className="hidden dark:block"
          />
          <Image
            src={`${cloudinaryUrl}/BGT/o0rnb49hueobioms6gui`}
            alt="bg-light"
            width={570}
            height={225}
            className="block dark:hidden"
          />
        </div>
      </div>
    </>
  );
};

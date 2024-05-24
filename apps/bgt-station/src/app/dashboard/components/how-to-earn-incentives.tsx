import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

import { OrbitingLeftToRight, OrbitingRightToLeft } from "./orbiting";

export const HowToEarnIncentives: React.FC = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-between gap-12 text-center lg:flex-row lg:text-left">
      <div className="block aspect-auto w-full max-w-[570px] lg:hidden lg:w-[40%]">
        <Image
          src={`${cloudinaryUrl}/BGT/ldlgrugr5ib2jiqi488h`}
          alt="bg-dark"
          width={570}
          height={225}
          className="hidden dark:block"
        />
        <Image
          src={`${cloudinaryUrl}/BGT/fhfq9qzixcamjypyzhw3`}
          alt="bg-light"
          width={570}
          height={225}
          className="block dark:hidden"
        />
      </div>
      <div className="relative hidden w-fit lg:block">
        <Image
          src="/user.png"
          alt="user"
          width={80}
          height={80}
          className="absolute left-0 top-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-amber-400 text-center text-background"
        />

        <div className="absolute right-0 top-1/2 z-10 flex w-fit -translate-y-1/2 translate-x-1/2 transform items-center gap-2 rounded-md border-2 border-purple-700 bg-purple-200 p-2 text-sm font-medium text-black">
          <Icons.biohazard className="h-8 w-8 rounded-sm bg-purple-700 p-1 text-purple-200" />
          Validators
        </div>
        <OrbitingLeftToRight classname="relative z-2" delay={1}>
          <div className="flex h-[50px] w-[50px] items-center justify-center">
            <Icons.bgt className="h-8 w-8" />
          </div>
        </OrbitingLeftToRight>
        <OrbitingRightToLeft classname="relative z-2" delay={3}>
          <div className="flex h-8 items-center rounded-full border border-warning-foreground bg-warning p-1 font-medium">
            <Icons.honey className="h-5 w-5" />
            <Icons.beraIcon className="-ml-1 mr-1 h-5 w-5" />
            +24
          </div>
        </OrbitingRightToLeft>
      </div>

      <div className="flex flex-col gap-6">
        <div className="whitespace-nowrap text-center text-4xl font-bold capitalize md:text-left lg:text-6xl xl:text-8xl">
          how to <br />
          earn
          <span className="ml-2 inline-flex w-fit items-center gap-1 rounded-md border-2 border-border bg-muted p-1 text-xl font-medium xl:ml-6 xl:p-3 xl:text-5xl">
            <Icons.honey className="h-8 w-8 xl:h-[52px] xl:w-[52px]" />
            <Icons.beraIcon className="-ml-4 h-8 w-8 xl:h-[52px] xl:w-[52px]" />
            <Icons.bgt className="-ml-4 h-8 w-8 xl:h-[52px] xl:w-[52px]" />
            Incentives
          </span>
        </div>
        <div className="text-lg leading-7">
          Stake Your LP/Receipt Tokens from <br /> platforms and dAPPs Into
          Gauge Vaults
        </div>
      </div>
    </div>
  );
};

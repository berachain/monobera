import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

import { OrbitingLeftToRight, OrbitingRightToLeft } from "./orbiting";

export const HowToEarnBGT: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:text-left">
        <div className="flex flex-col gap-6">
          <div className="text-center text-4xl font-bold capitalize lg:text-left lg:text-6xl xl:text-8xl">
            how to <br />
            earn
            <span className="ml-2 inline-flex w-fit items-center gap-1 rounded-md border-2 border-border bg-muted p-1 text-xl font-medium xl:ml-6 xl:p-3 xl:text-5xl">
              <Icons.bgt className="h-8 w-8 xl:h-[52px] xl:w-[52px]" />
              BGT
            </span>
          </div>
          <div className="text-lg leading-7">
            Stake Your LP/Receipt Tokens from <br /> platforms and dAPPs Into
            Gauge Vaults
          </div>
        </div>
        <div className="relative hidden w-fit lg:block">
          <Image
            src="/user.png"
            alt="user"
            width={80}
            height={80}
            className="absolute left-0 top-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-amber-400 text-center text-black"
          />

          <div className="absolute right-0 top-1/2 z-10 flex w-fit -translate-y-1/2 translate-x-1/2 transform items-center gap-2 rounded-md border-2 border-orange-600 bg-rose-200 p-2 text-sm font-medium text-background">
            <Icons.refreshccw className="h-8 w-8 rounded-sm bg-orange-600 p-1 text-amber-100" />
            Gauge Vaults
          </div>
          <OrbitingLeftToRight classname="relative z-2" delay={1}>
            <div className="flex h-8 items-center rounded-full border border-border bg-background p-1 font-medium">
              <Icons.honey className="h-5 w-5" />
              <Icons.beraIcon className="-ml-1 mr-1 h-5 w-5" />
              50-50
            </div>
          </OrbitingLeftToRight>
          <OrbitingRightToLeft classname="relative z-2" delay={4}>
            <div className="flex h-[50px] w-[50px] items-center justify-center">
              <Icons.bgt className="h-8 w-8" />
            </div>
          </OrbitingRightToLeft>
        </div>
        <div className="block aspect-auto w-full max-w-[570px] lg:hidden">
          <Image
            src={`${cloudinaryUrl}/BGT/k3s2ocj0wygtix2pjqrg`}
            alt="bg-dark"
            width={570}
            height={225}
            className="hidden dark:block"
          />
          <Image
            src={`${cloudinaryUrl}/BGT/oonqwcl6w59knymw2cwn`}
            alt="bg-light"
            width={570}
            height={225}
            className="block dark:hidden"
          />
        </div>
      </div>
    </div>
  );
};

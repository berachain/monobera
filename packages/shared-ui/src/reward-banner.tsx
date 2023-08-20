import Image from "next/image";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export const RewardBanner = () => {
  return (
    <div className="relative flex items-center rounded-18 border border-amber-500 bg-honey-gradient p-4 px-8 py-6 md:h-40 md:p-4">
      <Image
        src="/beras/redeem-bear.png"
        width={188}
        height={174}
        className="absolute bottom-0 left-0 hidden md:block"
        alt="business bear"
      />
      <div className="flex h-full w-full flex-col justify-between gap-4 md:ml-[204px] md:flex-row md:items-center  lg:px-4">
        <div className="md:max-w-[330px]">
          <div className="mb-2 flex items-center gap-2 text-lg font-semibold leading-7">
            Claim your BGT Rewards
          </div>
          <div className="md text-sm font-normal leading-tight">
            Now that you&apos;ve got some BGT rewards, you can start using them!
          </div>
        </div>

        <div className="flex h-full items-center gap-12">
          <div className="flex h-full w-full flex-col gap-2 md:flex-row md:gap-6">
            <div className="bg-whites flex h-full w-full justify-between rounded-18 border border-amber-500 bg-gradient-to-br from-white via-white to-amber-50 px-5 py-4 md:w-[138px] md:flex-col">
              <div>
                <div className="text-xs leading-3 text-muted-foreground">
                  BGT Rewards
                </div>
                <div className="flex items-center gap-1 text-lg font-semibold leading-7">
                  <Icons.nature className="block h-4 w-4" />
                  274.46
                </div>
              </div>
              <Button variant="outline" className="w-24 shadow-none">
                Claim
              </Button>
            </div>

            <div className="bg-whites flex h-full w-full justify-between rounded-18 border border-amber-500 bg-gradient-to-br from-white via-white to-amber-50 px-5 py-4 md:w-[138px] md:flex-col">
              <div>
                <div className="text-xs leading-3 text-muted-foreground">
                  BGT Balance
                </div>
                <div className="flex items-center gap-1 text-lg font-semibold leading-7">
                  <Icons.nature className=" blocks h-4 w-4" />
                  4.26K
                </div>
              </div>
              <Button variant="outline" className="w-24 shadow-none">
                Stake
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

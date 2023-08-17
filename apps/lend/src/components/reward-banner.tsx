import Image from "next/image";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function RewardBanner() {
  return (
    <div className="relative hidden h-[197px] items-center rounded-18 border border-amber-500 bg-honey-gradient p-4 md:flex">
      <Image
        src="/beras/redeem-bear.png"
        width={227}
        height={211}
        className="absolute bottom-0 left-0"
        alt="business bear"
      />
      <div className="ml-[204px] flex w-full items-center justify-between lg:px-4">
        <div className="max-w-[330px]">
          <div className="mb-2 text-lg font-semibold leading-7">
            Claim your BGT Rewards now!
          </div>
          <div className="md text-sm font-normal leading-relaxed text-muted-foreground">
            Now that you&apos;ve claimed your BGT rewards,you can start using
            them! You can Stake on BGT Station and start earning bribes
            alongisde BGT.
          </div>
        </div>

        <div className="flex items-center gap-12 lg:px-11">
          <div className="flex gap-6">
            <div className="bg-whites flex h-[165px] w-[138px] flex-col justify-between rounded-18 border border-amber-500 bg-gradient-to-br from-white via-white to-amber-50 px-5 py-4">
              <div>
                <div className="mb-3 text-xs leading-3 text-muted-foreground">
                  BGT Rewards
                </div>
                <div className="flex items-center gap-1 text-lg font-semibold leading-7">
                  <Icons.nature className=" h-4 w-4" />
                  274.46
                </div>
              </div>
              <Button variant="outline" className="text-secondary">
                Claim
              </Button>
            </div>

            <div className="bg-whites flex h-[165px] w-[138px] flex-col justify-between rounded-18 border border-amber-500 bg-gradient-to-br from-white via-white to-amber-50 px-5 py-4">
              <div>
                <div className="mb-2 mb-3 text-xs leading-3 text-muted-foreground">
                  BGT Balance
                </div>
                <div className="flex items-center gap-1 text-lg font-semibold leading-7">
                  <Icons.nature className=" h-4 w-4" />
                  4.26K
                </div>
              </div>
              <Button variant="outline" className="text-secondary">
                Stake
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

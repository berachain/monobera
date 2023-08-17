import Image from "next/image";
import { Icons } from "@bera/ui/icons";

export default function HoneyBanner() {
  return (
    <div className="rounded-spacing-4 relative hidden h-[197px] items-center rounded-18 border border-amber-500 bg-honey-gradient p-4 md:flex">
      <Image
        src="/beras/business-bear.png"
        width={194}
        height={211}
        className="absolute bottom-0 left-0"
        alt="business bear"
      />
      <div className="ml-[204px] flex w-full justify-between lg:px-4">
        <div className="w-60">
          <div className="mb-2 text-lg font-semibold leading-7">
            Supply & Borrow Honey
          </div>
          <div className="md text-sm font-normal leading-tight">
            Gain boosted yields by helping the protocol bootstrap liquidity.
          </div>
          <div className="mt-4 flex h-8 w-fit items-center justify-center gap-2 rounded-lg bg-gradient-to-bl from-amber-500 to-amber-300 px-3 py-2 text-sm hover:cursor-pointer lg:hidden">
            <Icons.coins className="relative h-4 w-4" />
            Mint Honey
          </div>
        </div>

        <div className="flex items-center gap-12 pr-11 lg:pl-11">
          <div className="flex gap-6">
            <Image src="/icons/baave.svg" width={56} height={60} alt="baave" />
            <div className="flex gap-3">
              <div>
                <div className="text-lg font-semibold leading-7">6.69M</div>
                <div className="mb-2 text-sm leading-tight">Total Supplied</div>
                <div className="flex  h-6 items-center justify-start gap-0.5 rounded-lg border border-emerald-300 bg-emerald-100 px-2 text-sm text-success-foreground">
                  <span>APY:</span> <span>6.69%</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold leading-7">4.20M</div>
                <div className="mb-2 text-sm leading-tight">Total Borrow</div>
                <div className="flex  h-6 items-center justify-start gap-0.5 rounded-lg border border-sky-300 bg-sky-100 px-2 text-sm text-info-foreground">
                  <span>APY:</span> <span>6.69%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-bl from-amber-500 to-amber-300 px-3 py-2 text-sm hover:cursor-pointer lg:flex">
            <Icons.coins className="relative h-4 w-4" />
            Mint Honey
          </div>
        </div>
      </div>
    </div>
  );
}

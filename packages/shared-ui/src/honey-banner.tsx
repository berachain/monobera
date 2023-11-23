import Image from "next/image";
import { Icons } from "@bera/ui/icons";

export const HoneyBanner = () => {
  return (
    <div className="rounded-spacing-4 relative flex items-center rounded-md border border-amber-500 bg-honey-gradient px-8 py-6 md:h-36 md:p-4">
      <Image
        src="/beras/business-bear.png"
        width={140}
        height={152}
        className="absolute bottom-0 left-0 hidden md:block"
        alt="business bear"
      />
      <div className="flex w-full flex-col-reverse justify-between gap-5 md:ml-[204px] md:flex-row lg:px-4">
        <div className="md:w-60">
          <div className="mb-2 flex items-center gap-2 text-lg font-semibold leading-7">
            <Image
              src="/icons/baave.svg"
              width={32}
              height={32}
              alt="bend"
              className="block h-8 w-8 md:hidden"
            />{" "}
            Supply & Borrow Honey
          </div>
          <div className="md text-sm font-normal leading-tight">
            Gain boosted yields by helping the protocol bootstrap liquidity.
          </div>
          <div className="mt-5 flex h-8 w-fit items-center justify-center gap-2 rounded-lg bg-gradient-to-bl from-amber-500 to-amber-300 px-3 py-2 text-sm hover:cursor-pointer md:mt-2 lg:hidden">
            <Icons.coins className="relative h-4 w-4" />
            Mint Honey
          </div>
        </div>

        <div className="flex items-center gap-12 pr-11 lg:pl-11">
          <div className="flex flex-row gap-4 xl:gap-6">
            <Image
              src="/icons/baave.svg"
              width={56}
              height={60}
              alt="bend"
              className="hidden h-8 w-8 md:block lg:h-14 lg:w-14"
            />
            <div className="flex gap-3">
              <div>
                <div className="flex gap-1 font-medium md:flex-col">
                  <div className="md:text-lg md:font-semibold md:leading-7">
                    6.69M
                  </div>
                  <div className="mb-2 md:text-sm md:leading-tight">
                    Supplied
                  </div>
                </div>
                <div className="flex h-6  w-fit items-center justify-start gap-0.5 rounded-lg border border-emerald-300 bg-emerald-100 px-2 text-sm text-success-foreground">
                  <span>APY:</span> <span>6.69%</span>
                </div>
              </div>
              <div>
                <div className="flex gap-1 font-medium md:flex-col">
                  <div className="md:text-lg md:font-semibold md:leading-7">
                    4.20M
                  </div>
                  <div className="mb-2 md:text-sm md:leading-tight">Borrow</div>
                </div>
                <div className="flex  h-6 items-center justify-start gap-0.5 rounded-lg border border-sky-300 bg-sky-100 px-2 text-sm text-info-foreground">
                  <span>APY:</span> <span>6.69%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden h-10 flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-bl from-amber-500 to-amber-300 px-3 py-2 text-sm hover:cursor-pointer lg:flex">
            <Icons.coins className="relative h-4 w-4" />
            Mint Honey
          </div>
        </div>
      </div>
    </div>
  );
};

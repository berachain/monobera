import Image from "next/image";
import Link from "next/link";
import { Icons } from "@bera/ui/icons";

export default function FaucetPartners() {
  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      <div className="flex text-3xl font-bold text-stone-50">
        Our Faucet Partners
      </div>
      <div className="text-md text-center font-semibold text-primary-foreground opacity-70">
        Help us assure a consistent drip across the ecosystem.
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 pt-6">
        <Link href="https://faucet.0xhoneyjar.xyz/">
          <div className="flex h-[60px] w-[352px] flex-row items-center justify-between rounded-lg bg-[#ffc100] p-2 hover:bg-[#ffd246] hover:shadow-xl">
            {/* TODO: upload logos to cloudinaryUrl */}
            <div className="flex items-center gap-2">
              <Image
                src="./thj-logo.png"
                alt="machine"
                width={48}
                height={48}
                loading="eager"
                className="relative object-cover"
                unoptimized
              />
              <div className="flex flex-col items-start">
                <div className="font-bold text-black">The Honey Jar Faucet</div>
              </div>
            </div>
            <Icons.arrowRight className="h-[24px] w-[24px] text-black" />
          </div>
        </Link>
        <Link href="https://faucet.quicknode.com/berachain/artio">
          <div className="flex h-[60px] w-[352px] flex-row items-center justify-between rounded-lg bg-[#2e1359] p-2 hover:bg-[#441a86] hover:shadow-xl">
            <div className="flex items-center gap-2">
              <Image
                src="./quicknode-logo.png"
                alt="machine"
                width={48}
                height={48}
                loading="eager"
                className="relative object-cover"
                unoptimized
              />
              <div className="flex flex-col items-start">
                <div className="font-bold text-white">Quicknode Faucet</div>
              </div>
            </div>
            <Icons.arrowRight className="h-[24px] w-[24px] text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
}

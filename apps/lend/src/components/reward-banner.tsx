import Image from "next/image";
import { bgtTokenAddress, bgtUrl, cloudinaryUrl } from "@bera/config";
import { TokenIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export const Banner = () => {
  return (
    <div className="relative flex items-start gap-16 rounded-18 border border-border bg-honey-gradient px-8 py-6  dark:bg-gradient-to-l dark:from-stone-950 dark:to-stone-950">
      <Image
        src={`${cloudinaryUrl}/bears/v3mi8ggx68n0mapznaju`}
        width={420}
        height={100}
        className="absolute right-0 hidden w-[420px] lg:bottom-0 lg:block"
        alt="happy bear"
      />
      <div className="flex h-full flex-col gap-4 rounded-xl border border-amber-400 bg-gradient-to-br from-[#FFF6D7] via-[#FFEAA3] to-[#FFD977] p-4">
        <div className="flex items-center gap-2 text-3xl font-semibold leading-9">
          <TokenIcon address={bgtTokenAddress} fetch />
          207.10
        </div>
        <Button>Claim Rewards</Button>
      </div>

      <div className="flex flex-col gap-4 ">
        <div className="w-full text-center font-bold md:text-lg md:leading-10 lg:text-left">
          What can I do with my BGT rewards?
          <div className="text-xs font-normal leading-normal text-muted-foreground md:text-sm">
            Now that you&apos;ve got some BGT rewards, you can start using them!
          </div>
        </div>
        <div className="flex w-full justify-center gap-4 lg:justify-start">
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🐝{" "}
            <span
              className="hover:underline"
              onClick={() => window.open(`${bgtUrl}/delegate`, "_blank")}
            >
              {" "}
              Stake
            </span>
            <Icons.externalLink className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🔥{" "}
            <span
              className="hover:underline"
              onClick={() => window.open(`${bgtUrl}/redeem`, "_blank")}
            >
              {" "}
              Burn
            </span>{" "}
            <Icons.externalLink className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🗳️{" "}
            <span
              className="hover:underline"
              onClick={() => window.open(`${bgtUrl}/governance`, "_blank")}
            >
              {" "}
              Vote
            </span>{" "}
            <Icons.externalLink className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

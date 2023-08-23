import Image from "next/image";
import { Icons } from "@bera/ui/icons";

export const Banner = () => {
  return (
    <div>
      <Image
        src="/happy-bea.png"
        width={100}
        height={100}
        className=" mx-auto block w-[320px] lg:bottom-0 lg:hidden"
        alt="happy bear"
      />
      <div className="relative flex flex-col items-start gap-4 rounded-18 border border-amber-500 bg-honey-gradient px-6 py-6 lg:px-8 lg:py-12 ">
        <Image
          src="/happy-bea.png"
          width={100}
          height={100}
          className="absolute right-0 hidden w-[420px] lg:bottom-0 lg:block"
          alt="happy bear"
        />
        <div className="w-full text-center text-xl font-bold md:text-3xl md:leading-10 lg:text-left">
          I&apos;ve claimed my BGT, now what?
          <div className="text-xs font-normal leading-normal text-muted-foreground md:text-sm">
            Find out how you can use BGT to get the most out of your Liquidity.
          </div>
        </div>

        <div className="flex w-full justify-center gap-4 lg:justify-start">
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🐝 <span className="hover:underline"> Stake</span>
            <Icons.external className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🔥 <span className="hover:underline"> Burn</span>{" "}
            <Icons.external className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🗳️ <span className="hover:underline"> Vote</span>{" "}
            <Icons.external className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { dexUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  return (
    <div className="flex flex-col items-center gap-4" id="mint-and-burn">
      <div
        className="flex h-8 w-fit items-center gap-1 rounded-2xl bg-muted bg-opacity-20 px-2 text-base font-normal leading-normal text-secondary-foreground shadow-lg backdrop-blur-xl hover:cursor-pointer hover:text-foreground"
        onClick={() => window.open(`${dexUrl}/pools`, "_blank")}
      >
        💧 Add Liquidity to Earn BGT Rewards{" "}
        <Icons.arrowRight className="h-3 w-3" />
      </div>
      <div className="leading-12 text-3xl font-extrabold md:text-7xl">
        Switch To Honey
      </div>
      <p className="text-center text-xl font-semibold leading-7 md:text-lg">
        Turn your favorite stables into Honey. <br />
        Leverage liquidity incentives on various platforms.
      </p>
    </div>
  );
}

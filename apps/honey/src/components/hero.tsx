"use client";

import React from "react";
import { dexUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  return (
    <div className="flex flex-col items-center gap-4" id="mint-and-burn">
      {/* <div className="my-12 text-center md:text-left"> */}
      {/* <div className="mx-auto mb-3 flex max-w-[250px] md:mx-0">
          <Image
            src={`${cloudinaryUrl}/honey/b0wxccnmqzvt2vkzjdm5`}
            alt="Coins"
            width={811}
            height={151}
          />
        </div> */}

      <div
        className="flex h-8 w-fit items-center gap-1 rounded-2xl bg-muted bg-opacity-20 px-2 text-base font-normal leading-normal text-secondary-foreground shadow-lg backdrop-blur-xl hover:cursor-pointer hover:text-foreground"
        onClick={() => window.open(dexUrl + "/pool", "_blank")}
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
      {/* <div className="mt-6 flex flex-col items-center justify-center gap-3 md:items-start">
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() =>
              window.open(process.env.NEXT_PUBLIC_LEND_URL, "_blank")
            }
          >
            🫴 Lend Honey on {process.env.NEXT_PUBLIC_LEND_NAME}{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() =>
              window.open(process.env.NEXT_PUBLIC_DEX_URL + "/pool", "_blank")
            }
          >
            💧 Add Liquidity to Earn BGT Rewards{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() =>
              window.open(process.env.NEXT_PUBLIC_PERPS_URL, "_blank")
            }
          >
            😎 Provide Collateral for {process.env.NEXT_PUBLIC_PERPS_NAME}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
}

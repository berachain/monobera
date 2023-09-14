"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  return (
    <div className="my-16 flex flex-col">
      <div className="my-12 text-center md:text-left">
        <div className="mx-auto mb-3 flex max-w-[250px] md:mx-0">
          <Image
            src={`${cloudinaryUrl}/honey/b0wxccnmqzvt2vkzjdm5`}
            alt="Coins"
            width={811}
            height={151}
          />
        </div>
        <div className="h-[60px] bg-gradient-to-r from-[#292524] via-[#875100] via-30% to-[#292524] bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl">
          Switch To Honey
        </div>
        <p className="bg-gradient-to-r from-[#292524] via-[#875100] via-30% to-[#292524] bg-clip-text text-lg font-extrabold leading-7 text-transparent">
          Turn your favorite stables into Honey. <br />
          <span className="hidden md:inline">
            Leverage liquidity incentives on various platforms.
          </span>
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 md:items-start">
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() =>
              window.open(process.env.NEXT_PUBLIC_LEND_URL, "_blank")
            }
          >
            <Icons.info className="h-3 w-3" />
            Lend Honey on {process.env.NEXT_PUBLIC_LEND_NAME}{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() =>
              window.open(process.env.NEXT_PUBLIC_DEX_URL + "/pool", "_blank")
            }
          >
            <Icons.info className="h-3 w-3" />
            Add Liquidity on {process.env.NEXT_PUBLIC_DEX_NAME}{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() =>
              window.open(process.env.NEXT_PUBLIC_PERPS_URL, "_blank")
            }
          >
            <Icons.info className="h-3 w-3" /> Provide Collateral for
            {process.env.NEXT_PUBLIC_PERPS_NAME}{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

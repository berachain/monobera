"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

export default function FaucetPartners() {
  const partnetFaucets = [
    {
      name: "The Honey Jar Faucet",
      url: "https://faucet.0xhoneyjar.xyz/",
      logo: "./thj-logo.png",
      color: "#ffc100",
      textColor: "black",
    },
    {
      name: "StakeLab Faucet",
      url: "https://app.stakelab.zone/testnet/faucet",
      logo: "./LW3_Logomark_Medium_Color.svg",
      color: "#765DFF",
      textColor: "white",
    },
    {
      name: "Quicknode Faucet",
      url: "https://faucet.quicknode.com/berachain/artio",
      logo: "./quicknode-logo.png",
      color: "#2e1359",
      textColor: "white",
    },
    {
      name: "Kodiak Faucet",
      url: "https://www.beraden.com/",
      logo: "./beraden.svg",
      color: "#f8fafc",
      textColor: "black",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      <div className="flex text-3xl font-bold text-stone-50">
        Our Faucet Partners
      </div>
      <div className="text-md text-center font-semibold text-primary-foreground opacity-70">
        Help us assure a consistent drip across the ecosystem.
      </div>
      {/* <div className="flex flex-row flex-wrap items-center justify-center gap-4 pt-6"> */}
      <div className="grid w-full max-w-[700px] grid-cols-1 gap-4 pt-6 md:grid-cols-2">
        {partnetFaucets.map((faucet) => (
          <Link href={faucet.url} key={faucet.name} target="_blank">
            <div
              className={
                "flex h-[60px] w-full flex-row items-center justify-between rounded-lg p-2 transition-shadow hover:bg-opacity-80 hover:shadow-xl"
              }
              style={{ backgroundColor: faucet.color }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={faucet.logo}
                  alt="machine"
                  width={44}
                  height={44}
                  loading="eager"
                  className="relative object-cover"
                  unoptimized
                />
                <div className="flex flex-col items-start">
                  <div className={cn(`font-bold text-${faucet.textColor}`)}>
                    {faucet.name}
                  </div>
                </div>
              </div>
              <Icons.arrowRight
                className={cn(`h-[24px] w-[24px] text-${faucet.textColor}`)}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

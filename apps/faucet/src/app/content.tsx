"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { DripToken } from "~/components/drip-tokens";
import { TokenBadge } from "~/components/token-badge";

export default function Content() {
  const [address, setAddress] = React.useState<string>("");
  return (
    <div className="flex w-full max-w-[600px] flex-col gap-8 text-stone-50 xl:max-w-[473px]">
      <div className="items-center text-center sm:flex sm:text-left">
        <div className="flex flex-col gap-4">
          <div className="leading-12 w-full text-5xl font-bold">
            Bootstrap Your
            <br /> Testnet Wallet
          </div>
          <div className="items-center text-lg font-semibold sm:flex">
            {" "}
            Fund your testnet wallet with <TokenBadge />
          </div>
        </div>
        <Image
          src={`${cloudinaryUrl}/faucet_v3_uktibg`}
          alt="machine"
          width={200}
          height={198}
          loading="eager"
          className="hidden h-[198px] object-cover sm:block xl:hidden"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-7 text-sm font-medium">
          Wallet Address <span className="text-destructive-foreground">*</span>
        </div>
        <div className="relative">
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          <Icons.close
            className="absolute right-3 top-3 h-4 w-4 cursor-pointer text-muted-foreground"
            onClick={() => setAddress("")}
          />
        </div>
      </div>
      <DripToken address={address} />
      <hr />
      <div className="leading-12 text-center text-sm opacity-70 sm:text-start">
        To ensure a sufficient balance for all users, the Faucet is set to
        dispense 10 testnet BERA tokens every 5 minutes.
      </div>
      {/* <div className="leading-12 text-center text-sm text-muted-foreground sm:text-start">
        Faucet drips: 10 Bera, 10K HONEY, 10K STGUSDC, .01 BTC, and 0.25 ETH{" "}
        <br className="hidden md:block" />
        Every 210,000 blocks for each user.
      </div>
      <div className="flex flex-col items-center gap-2 sm:items-start">
        {" "}
        {Object.keys(tokenDictionary ?? {}).map((key) => (
          <TokenList token={tokenDictionary![key]!} key={key} />
        ))}
      </div> */}
    </div>
  );
}

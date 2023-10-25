"use client";

import React from "react";
import { useTokens } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { isAddress } from "viem";

import { TokenBadge } from "~/components/token-badge";
import { TokenList } from "~/components/token-list";

export default function Content() {
  const [address, setAddress] = React.useState<string>("");
  const { tokenDictionary } = useTokens();

  return (
    <div className="flex w-full max-w-[473px] flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="leading-12 text-5xl font-bold">
          Bootstrap Your
          <br /> Testnet Wallet
        </div>
        <div className="text-lg text-muted-foreground">
          {" "}
          Fund your testnet wallet with{" "}
          {Object.keys(tokenDictionary ?? {}).map((key) => (
            <TokenBadge token={tokenDictionary![key]!} key={key} />
          ))}
        </div>
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
      <Button disabled={!isAddress(address ?? "")}>Drip Tokens</Button>
      <hr />
      <div className="leading-12 text-center text-sm text-muted-foreground sm:text-start">
        Faucet drips: 10 Bera, 10K HONEY, 10K STGUSDC, .01 BTC, and 0.25 ETH{" "}
        <br className="hidden md:block" />
        Every 210,000 blocks for each user.
      </div>
      <div className="flex flex-col items-center gap-2 sm:items-start">
        {" "}
        {Object.keys(tokenDictionary ?? {}).map((key) => (
          <TokenList token={tokenDictionary![key]!} key={key} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Token, truncateHash } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { PoolHeader, TokenIconList, TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export const Incentivize = ({ pool }: { pool: string }) => {
  //is valid pool address
  if (!pool) return notFound();

  const [totalAmount, setTotalAmount] = useState("0");
  const [bgtAmount, setBgtAmount] = useState("0");
  const [token, setToken] = useState<Token | undefined>(undefined);

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-8 rounded-md border border-border p-4 shadow">
      <PoolHeader
        title={
          <>
            <TokenIconList tokenList={[]} size="xl" />
            BERA / HONEY
          </>
        }
        subtitles={[
          {
            title: "Platform",
            content: (
              <>
                {" "}
                <Icons.bexFav className="h-4 w-4" />
                Bex
              </>
            ),
            externalLink: "https://berachain.com",
          },
          {
            title: "Pool Contract",
            content: <>{truncateHash("0xbwkjqbdjqkdbqiwjheiqowe")}</>,
            externalLink: `${blockExplorerUrl}/address/${"0xbwkjqbdjqkdbqiwjheiqowe"}`,
          },
        ]}
        center
        className="flex flex-col gap-4 rounded-md border border-border bg-muted px-2 py-3"
      />
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold leading-7">
          Incentivize a Pool
        </div>
        <div className="text-sm leading-5 text-muted-foreground">
          Note: Incentives are generally distributed by protocols.
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5">1. Pool Address</div>
        <input
          className="rounded-md border border-border px-3 py-2 text-sm"
          disabled
          placeholder={pool}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5">
          2. Select Token & Set Amounts
        </div>
        <div className="rounded-md border border-border">
          {/* whitelisted tokens */}
          <TokenInput
            selectable
            showExceeding
            selected={token}
            amount={totalAmount}
            setAmount={(amount) => setTotalAmount(amount as `${number}`)}
            onTokenSelection={(token: Token | undefined) => setToken(token)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5">
          3. How many Token(s) would you like to Distribute Per BGT
        </div>
        <div className="rounded-md border border-border">
          <TokenInput
            disabled={!token}
            selectable={false}
            showExceeding
            hideBalance
            selected={token}
            amount={bgtAmount}
            setAmount={(amount) => setBgtAmount(amount as `${number}`)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-md bg-muted p-4">
        <div className="text-sm font-medium leading-5">
          Total Incentive Distribution
        </div>
        <hr />
        <div className="flex justify-between text-muted-foreground">
          <div className="flex flex-col gap-1 py-1">
            <div className="text-sm font-medium leading-5">Per Hour</div>
            <div className="text-[10px] leading-[10px]">
              600 Blocks / Proposals
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-lg font-semibold leading-7">
              0.69 <Icons.beraIcon className="h-4 w-4" />
            </div>
            <div className="text-[10px] leading-[10px]">$42.69</div>
          </div>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <div className="flex flex-col gap-1 py-1">
            <div className="text-sm font-medium leading-5">Per Day</div>
            <div className="text-[10px] leading-[10px]">
              14,400 Blocks / Proposals
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-lg font-semibold leading-7">
              16.65 <Icons.beraIcon className="h-4 w-4" />
            </div>
            <div className="text-[10px] leading-[10px]">$42,690.69</div>
          </div>
        </div>
        <div className="flex flex-col justify-between text-muted-foreground sm:flex-row">
          <div className="flex flex-col gap-1 py-1">
            <div className="text-sm font-medium leading-5">
              Est. Distribution Period
            </div>
            <div className="text-[10px] leading-[10px]">
              362,400 Blocks / Proposals
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-lg font-semibold leading-7">
              25 Days 04 Hours
            </div>
            <div className="text-[10px] leading-[10px]">$42,690.69</div>
          </div>
        </div>
      </div>

      <Button>Incentivize</Button>
    </div>
  );
};

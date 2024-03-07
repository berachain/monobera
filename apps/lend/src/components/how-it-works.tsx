import React from "react";
import Link from "next/link";
import {
  bgtTokenAddress,
  bgtUrl,
  honeyTokenAddress,
  wbtcTokenAddress,
  wethTokenAddress,
} from "@bera/config";
import { TokenIcon, TokenIconList } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function HowItWorks() {
  return (
    <section className="my-24">
      <div className="p-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          What can I do on <span className="text-amber-400">BEND</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 rounded-2xl border-2 bg-muted  p-6 lg:grid-cols-3">
        <div className="flex flex-col">
          <TokenIconList
            tokenList={[wbtcTokenAddress, wethTokenAddress]}
            size="2xl"
          />
          <h3 className="mb-2 mt-4 text-lg font-semibold">
            Deposit Collateral
          </h3>
          <p>
            Deposit assets such as ETH, BTC, USDC, etc., to enhance the
            platform&apos;s liquidity and increase your borrowing capacity.
          </p>
        </div>
        <div className="flex flex-col">
          <TokenIcon address={honeyTokenAddress} size="2xl" className="mb-4" />
          <h3 className="mb-2 text-lg font-semibold">Borrow HONEY</h3>
          <p>
            Use your deposited collateral to borrow HONEY. Earn enhanced BGT
            rewards by utilizing HONEY within the berachain ecosystem.
          </p>
        </div>
        <div className="flex flex-col">
          <Icons.bgt className="mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-semibold">Earn BGT Rewards</h3>
          <p>
            Borrowing HONEY qualifies you for increased BGT rewards on BEND.{" "}
            <Link href={bgtUrl} target="_blank" className="underline">
              Stake your BGT at BGT Station
            </Link>{" "}
            to earn additional bribes.
          </p>
        </div>
      </div>
      <Link className="my-12 flex justify-center" href="/dashboard">
        <Button className="w-fit" variant="outline">
          Supply Assets
        </Button>
      </Link>
    </section>
  );
}

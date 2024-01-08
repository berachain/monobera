import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function HowItWorks() {
  return (
    <section className="my-24">
      <div className="p-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          How <span className="text-amber-400">Lending</span> Works
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 rounded-2xl border-2 bg-muted  p-6 lg:grid-cols-3">
        <div className="flex flex-col">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border bg-background p-2 text-xl font-semibold">
            1
          </div>
          <h3 className="mb-2 text-lg font-semibold">Supply Assets</h3>
          <p>
            Supply your assets like BERA, HONEY, ETH & BTC on BEND and start
            generating some Yield
          </p>
        </div>
        <div className="flex flex-col">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border bg-background p-2 text-xl font-semibold">
            2
          </div>
          <h3 className="mb-2 text-lg font-semibold">
            Receive Interest Bearing Tokens
          </h3>
          <p>
            Once you&apos;ve supplied assets, you will receive interest bearing
            tokens denoting your stake of assets in the lending pool.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border bg-background p-2 text-xl font-semibold">
            3
          </div>
          <h3 className="mb-2 text-lg font-semibold">
            Use Interest Bearing Tokens in Defi
          </h3>
          <p>
            Now that you&apos;ve got some interest bearing tokens you can use
            these across the Berachain Defi ecosystem.
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

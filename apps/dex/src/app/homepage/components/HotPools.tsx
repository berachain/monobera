"use client";

import React from "react";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";

export default function HotPools({ pools }: { pools: Pool[] }) {
  return (
    <section className="my-24">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Hottest Yield in Defi</h2>
        <h3 className="text-xl font-semibold text-muted-foreground">
          Leverage our boosted yields to increase your rewards
        </h3>
      </div>
      <div className="m-auto grid max-w-[1000px] grid-cols-1 gap-6 lg:grid-cols-3">
        {pools?.map((pool) => (
          <div key={pool.pool} className="mt-12 rounded-xl border px-6 py-8">
            <Badge>Hot Pools</Badge>
            <div className="mt-6">
              <div className="mb-2 text-sm">{pool.poolName}</div>
              <div className="flex flex-row">
                {Object.values(pool.tokens).map((token, i) => (
                  <TokenIcon
                    key={token.address}
                    token={token}
                    className={cn(
                      " border-2 border-border",
                      i !== 0 && "ml-[-15px]",
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="mb-6 mt-6 grid grid-cols-2 gap-2">
              <div className="rounded-xl border bg-muted p-4">
                <div className="text-sm">APR</div>
                <div className="text-2xl font-semibold">100%</div>
              </div>
              <div className="rounded-xl border bg-muted p-4">
                <div className="text-sm">APR</div>
                <div className="text-2xl font-semibold">100%</div>
              </div>
              <div className="rounded-xl border bg-muted p-4">
                <div className="text-sm">APR</div>
                <div className="text-2xl font-semibold">100%</div>
              </div>
              <div className="rounded-xl border bg-muted p-4">
                <div className="text-sm">APR</div>
                <div className="text-2xl font-semibold">100%</div>
              </div>
            </div>
            <Button className="w-full">Add Liquidity</Button>
          </div>
        ))}
      </div>
    </section>
  );
}

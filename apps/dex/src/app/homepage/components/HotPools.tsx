"use client";

import React from "react";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";

export default function HotPools({ pools }: { pools: Pool[] }) {
  return (
    <section className="my-24">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Hottest Yield in Defi</h2>
        <h3 className="text-xl font-semibold text-muted-foreground">
          Leverage our boosted yields to increase your rewards
        </h3>
      </div>
      <div>
        {pools.map((pool) => (
          <div key={pool.pool} className="mt-12 flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center">{pool.poolName}</div>
              <div className="mt-2 text-xl font-bold">
                {pool.tokens.map((token, i) => (
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
          </div>
        ))}
      </div>
    </section>
  );
}

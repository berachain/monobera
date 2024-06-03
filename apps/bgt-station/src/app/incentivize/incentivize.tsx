"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
  truncateHash,
  useBeraJs,
  usePollGauges,
  useTokenInformation,
  type Token,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { PoolHeader, TokenIconList, TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { Address } from "viem";

export const Incentivize = ({
  gauge,
  selectedToken,
}: {
  gauge: Address;
  selectedToken?: Address;
}) => {
  //is valid pool address
  if (!gauge) return notFound();
  const { isReady } = useBeraJs();
  const { gaugeDictionary, isLoading: isGaugeLoading } = usePollGauges();
  const gaugeInfo = gaugeDictionary?.[gauge];
  if (!gaugeInfo && !isGaugeLoading) return notFound();

  const [token, setToken] = useState<Token | undefined>(undefined);
  const { data: tokenT, isLoading: isTokenLoading } = useTokenInformation({
    address: selectedToken,
  });

  useEffect(() => {
    if (!isTokenLoading && tokenT) setToken(tokenT);
  }, [tokenT, isTokenLoading]);

  const [totalAmount, setTotalAmount] = useState("0");
  const [bgtAmount, setBgtAmount] = useState("0");

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-8 rounded-md border border-border p-4 shadow">
      {isGaugeLoading ? (
        <Skeleton className="h-[102px] w-full" />
      ) : (
        <PoolHeader
          title={
            <>
              <TokenIconList tokenList={[]} size="xl" />
              {gaugeInfo?.metadata.name}
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
              content: <>{truncateHash(gaugeInfo?.vaultAddress ?? "")}</>,
              externalLink: `${blockExplorerUrl}/address/${
                gaugeInfo?.vaultAddress ?? ""
              }`,
            },
          ]}
          center
          className="flex flex-col gap-4 rounded-md border border-border bg-muted px-2 py-3"
        />
      )}

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
          placeholder={gauge}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5">
          2. Select Token & Set Amounts
        </div>
        {isTokenLoading ? (
          <Skeleton className="h-[92px] w-full rounded-sm" />
        ) : (
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
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5">
          3. How many Token(s) would you like to Distribute Per BGT
        </div>
        {isTokenLoading ? (
          <Skeleton className="h-[72px] w-full rounded-sm" />
        ) : (
          <div className="rounded-md border border-border">
            <TokenInput
              disabled={!token}
              selectable={false}
              hideBalance
              hideMax
              hidePrice
              selected={token}
              amount={bgtAmount}
              setAmount={(amount) => setBgtAmount(amount as `${number}`)}
            />
          </div>
        )}
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

      <Button disabled={!isReady}>Incentivize</Button>
    </div>
  );
};

import { useEffect, useState } from "react";
import { type Pool } from "@bera/bera-router";
import {
  REWARDS_PRECOMPILE_ABI,
  formatUsd,
  useBeraJs,
  usePollBgtRewards,
  usePollPreviewBurnShares,
} from "@bera/berajs";
import { TokenIconList, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { mutate } from "swr";
import { formatUnits, parseUnits } from "viem";
import { type Address } from "wagmi";

import { usePollPrices } from "~/hooks/usePollPrices";

export default function RewardsCard({ pool }: { pool: Pool }) {
  const { account, isReady } = useBeraJs();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !mobile) {
        setMobile(true);
      } else if (window.innerWidth > 768 && mobile) {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { useBgtRewards, QUERY_KEY } = usePollBgtRewards(pool.pool);
  const bgtRewards = useBgtRewards();

  const { write, isLoading, ModalPortal } = useTxn({
    message: "Claiming BGT Rewards",
    disableToast: true,
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  const { usePrices } = usePollPrices();
  const prices = usePrices();

  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    parseUnits(`${Number(pool?.userDepositedShares)}`, 18) ?? 0n,
    pool?.pool,
    pool?.poolShareDenomHex,
  );

  const burnShares: Record<string, bigint> = usePreviewBurnShares();

  const [userTotalValue, setUserTotalValue] = useState<number | undefined>(0);

  useEffect(() => {
    if (burnShares && prices) {
      const totalValue = pool?.tokens.reduce((acc, token) => {
        const formattedAmount = burnShares
          ? Number(formatUnits(burnShares[token.address] ?? 0n, token.decimals))
          : 0;

        return acc + formattedAmount * (prices[token.address] ?? 0);
      }, 0);
      setUserTotalValue(totalValue ?? 0);
    }
  }, [burnShares, prices]);

  const title = pool.poolName ?? "";
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4 md:p-6 lg:flex-row">
      {ModalPortal}
      <div className="flex w-full flex-row gap-3">
        <TokenIconList tokenList={pool.tokens.map((t) => t.address)} />
        <div className="whitespace-nowrap text-xs font-medium leading-tight md:text-sm">
          {mobile && title.length > 19 ? title.slice(0, 19) + "..." : title}
        </div>
      </div>

      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row md:justify-between">
        <div className="flex min-w-[65px] flex-col gap-1">
          <div className=" text-left text-sm font-semibold leading-tight md:text-lg md:leading-7">
            {formatUsd(userTotalValue ?? 0)}
          </div>
          <div className="text-left text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
            My TVL
          </div>
        </div>

        <div className="flex min-w-[65px] flex-col gap-1">
          <div className=" text-left text-sm font-semibold leading-tight md:text-lg md:leading-7">
            {pool.bgtApy?.toFixed(2) ?? 0}%
          </div>
          <div className="text-left text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
            Est. APY
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex min-w-[65px] flex-col gap-1">
            <div className=" text-left text-sm font-semibold leading-tight text-warning-foreground md:text-lg md:leading-7">
              {bgtRewards.toFixed(2)}
            </div>
            <div className="text-left text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
              BGT earned
            </div>
          </div>
        </div>
        <Button
          variant={"warning"}
          disabled={isLoading || bgtRewards === 0 || !isReady}
          className="px-2 text-sm leading-none md:px-4 md:text-lg md:leading-7"
          onClick={() => {
            write({
              address: process.env.NEXT_PUBLIC_REWARDS_ADDRESS as Address,
              abi: REWARDS_PRECOMPILE_ABI,
              functionName: "withdrawDepositorRewards",
              params: [account, pool.pool],
            });
          }}
        >
          Claim
        </Button>
      </div>
    </div>
  );
}

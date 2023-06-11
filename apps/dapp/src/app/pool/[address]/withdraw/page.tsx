"use client";

import { useState } from "react";
import {
  DEX_PRECOMPILE_ABI,
  DEX_PRECOMPILE_ADDRESS,
  useBeraJs,
  usePollBalance,
  usePollPools,
  usePollPreviewBurnShares,
  type Pool,
  type Token,
} from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { formatUnits, parseUnits } from "viem";

import { SettingsPopover } from "~/components/settings-popover";
import SwapInput from "~/components/token-input";
import { useTxn } from "~/hooks/usTxn";

export default function Withdraw({ params }: { params: { address: string } }) {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const { account = undefined } = useBeraJs();
  const { useSelectedPool } = usePollPools();
  const pool: Pool | undefined = useSelectedPool(params.address);
  const { useBalance } = usePollBalance({ address: pool?.shareAddress });
  const shareBalance = useBalance();
  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    withdrawAmount,
    pool?.address,
    pool?.shareAddress,
  );
  const { write } = useTxn({
    message: `Withdraw from ${pool?.name}}`,
  });

  const preview = usePreviewBurnShares();
  const payload = [
    pool?.address,
    account,
    account,
    pool?.shareAddress,
    parseUnits(`${withdrawAmount}`, 18),
  ];
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="mx-6 w-full md:mx-0 md:w-[550px] ">
        <CardHeader>
          <CardTitle className="center flex justify-between font-bold">
            Withdraw from pool <SettingsPopover />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <SwapInput
            selected={
              {
                address: pool?.shareAddress,
                decimals: 18,
                name: pool?.name,
                symbol: pool?.name,
              } as Token
            }
            balance={shareBalance?.formattedBalance}
            selectable={false}
            amount={withdrawAmount}
            setAmount={setWithdrawAmount}
            hidePrice
          />
          <p>You receive</p>
          {pool?.weights?.map((token, i) => {
            return (
              <SwapInput
                key={token.address}
                selected={token as Token}
                selectable={false}
                hideBalance={true}
                disabled={true}
                amount={
                  preview &&
                  Number(
                    formatUnits(
                      (preview[i]?.output as bigint) ?? 0n,
                      token.decimals,
                    ),
                  )
                }
              />
            );
          })}

          <Button
            onClick={() => {
              write({
                address: DEX_PRECOMPILE_ADDRESS,
                abi: DEX_PRECOMPILE_ABI,
                functionName: "removeLiquidityBurningShares",
                params: payload,
              });
            }}
          >
            Withdraw
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

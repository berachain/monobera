"use client";

import { useState } from "react";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import {
  DEX_PRECOMPILE_ABI,
  useBeraJs,
  usePollBalance,
  usePollPreviewBurnShares,
  type Token,
  useBeraConfig,
} from "@bera/berajs";
import { TokenInput, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { formatUnits } from "viem";

import ApproveTokenButton from "~/components/approve-token-button";
import { SettingsPopover } from "~/components/settings-popover";
import useMultipleTokenApprovals from "~/hooks/useMultipleTokenApprovals";
import { type Address } from "wagmi";

export default function WithdrawPageContent({
  pool,
}: {
  pool: Pool | undefined;
}) {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const decimals = 18;
  const multiplier = 10n ** BigInt(decimals);

  const formattedBigInt = BigInt(withdrawAmount * 10 ** decimals) * multiplier;
  const { account = undefined } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const { useBalance } = usePollBalance({ address: pool?.shareAddress });
  const shareBalance = useBalance();
  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    withdrawAmount,
    pool?.pool,
    pool?.shareAddress,
  );
  const { write } = useTxn({
    message: `Withdraw from ${pool?.poolName}}`,
  });

  const { needsApproval } = useMultipleTokenApprovals(
    [
      {
        address: pool?.shareAddress ?? "",
        decimals: 18,
        symbol: "Share",
        name: "Share",
        amount: withdrawAmount,
        default: false,
      },
    ],
    networkConfig.precompileAddresses.erc20ModuleAddress as Address,
  );

  const preview = usePreviewBurnShares();

  const payload = [
    pool?.pool,
    account,
    account,
    pool?.shareAddress,
    formattedBigInt,
  ];
  console.log(payload);
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="mx-6 w-full md:mx-0 md:w-[550px] ">
        <CardHeader>
          <CardTitle className="center flex justify-between font-bold">
            Withdraw from pool <SettingsPopover />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <TokenInput
            selected={
              {
                address: pool?.shareAddress,
                decimals: 18,
                name: pool?.poolName,
                symbol: pool?.poolName,
              } as Token
            }
            balance={shareBalance?.formattedBalance ?? "0"}
            selectable={false}
            amount={withdrawAmount}
            setAmount={setWithdrawAmount}
            hidePrice
          />
          <p>You receive</p>
          {pool?.tokens?.map((token, i) => {
            return (
              <TokenInput
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
          {needsApproval.length > 0 ? (
            <ApproveTokenButton
              token={needsApproval[0]}
              spender={networkConfig.precompileAddresses.erc20ModuleAddress as Address}
            />
          ) : (
            <Button
              onClick={() => {
                write({
                  address: networkConfig.precompileAddresses.erc20DexAddress as Address,
                  abi: DEX_PRECOMPILE_ABI,
                  functionName: "removeLiquidityBurningShares",
                  params: payload,
                });
              }}
            >
              Withdraw
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

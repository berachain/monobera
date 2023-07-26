"use client";

import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import {
  DEX_PRECOMPILE_ABI,
  useBeraJs,
  type Token,
  useBeraConfig,
} from "@bera/berajs";
import { TokenInput, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { parseUnits } from "viem";

import ApproveTokenButton from "~/components/approve-token-button";
import { SettingsPopover } from "~/components/settings-popover";
import useMultipleTokenApprovals from "~/hooks/useMultipleTokenApprovals";
import useMultipleTokenInput from "~/hooks/useMultipleTokenInput";
import { type MappedTokens } from "../types";
import { type Address } from "wagmi";

interface IAddLiquidityContent {
  pool: Pool | undefined;
  prices: MappedTokens;
}
export default function AddLiquidityContent({
  pool,
}: IAddLiquidityContent) {
  const { account = undefined } = useBeraJs();
  const { networkConfig } = useBeraConfig();

  const { tokenInputs, updateTokenAmount } = useMultipleTokenInput(
    pool?.tokens ?? [],
  );
  const { needsApproval } = useMultipleTokenApprovals(
    tokenInputs,
    networkConfig.precompileAddresses.erc20ModuleAddress as Address,
  );
  const { write } = useTxn({
    message: `Add liquidity to ${pool?.poolName}}`,
  });

  const payload = [
    pool?.pool,
    account,
    tokenInputs.map((tokenInput) => tokenInput?.address),
    tokenInputs.map((tokenInput) =>
      parseUnits(`${tokenInput.amount}`, tokenInput?.decimals ?? 18),
    ),
  ];
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="mx-6 w-full md:mx-0 md:w-[550px] ">
        <CardHeader>
          <CardTitle className="center flex justify-between font-bold">
            Add Liquidity <SettingsPopover />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {pool?.tokens?.map((token, i) => {
            return (
              <TokenInput
                key={token.address}
                selected={token as Token}
                selectable={false}
                amount={tokenInputs[i]?.amount ?? 0}
                setAmount={(amount: number) => updateTokenAmount(i, amount)}
                weight={token.normalizedWeight / 100}
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
                  functionName: "addLiquidity",
                  params: payload,
                });
              }}
            >
              Add Liquidity
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

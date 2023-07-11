"use client";

import {
  DEX_PRECOMPILE_ABI,
  DEX_PRECOMPILE_ADDRESS,
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useBeraJs,
  usePollPools,
  type Token,
} from "@bera/berajs";
import { TokenInput, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { parseUnits } from "viem";

import ApproveTokenButton from "~/components/approve-token-button";
import { SettingsPopover } from "~/components/settings-popover";
import useMultipleTokenApprovals from "~/hooks/useMultipleTokenApprovals";
import useMultipleTokenInput from "~/hooks/useMultipleTokenInput";

export default function AddLiquidityContent({
  params,
}: {
  params: { address: string };
}) {
  const { account = undefined } = useBeraJs();
  const { useSelectedPool } = usePollPools();
  const { data: pool } = useSelectedPool(params.address);
  const { tokenInputs, updateTokenAmount } = useMultipleTokenInput(
    pool?.weights ?? [],
  );
  const { needsApproval } = useMultipleTokenApprovals(
    tokenInputs,
    ERC2MODULE_PRECOMPILE_ADDRESS,
  );
  const { write } = useTxn({
    message: `Add liquidity to ${pool?.name}}`,
  });

  const payload = [
    pool?.address,
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
          {pool?.weights?.map((token, i) => {
            return (
              <TokenInput
                key={token.address}
                selected={token as Token}
                selectable={false}
                amount={tokenInputs[i]?.amount ?? 0}
                setAmount={(amount: number) => updateTokenAmount(i, amount)}
                weight={token.weight * 100}
              />
            );
          })}
          {needsApproval.length > 0 ? (
            <ApproveTokenButton
              token={needsApproval[0]}
              spender={ERC2MODULE_PRECOMPILE_ADDRESS}
            />
          ) : (
            <Button
              onClick={() => {
                write({
                  address: DEX_PRECOMPILE_ADDRESS,
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

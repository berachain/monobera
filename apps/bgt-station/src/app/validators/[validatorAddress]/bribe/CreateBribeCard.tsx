"use client";

import React from "react";
import Link from "next/link";
import { TransactionActionType, useBeraConfig, type Token } from "@bera/berajs";
import { ERC20BGT_PRECOMPILE_ABI } from "@bera/berajs/src/config";
import { useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { type Address } from "wagmi";

import { ApproveTokenButton } from "~/components/approve-token-button";
import BribeTokenInputs from "./BribeTokenInputs";
import useCreateTokenBribes, {
  type ITokenBribe,
} from "./hooks/useCreateTokenBribes";

export default function CreateBribeCard({
  validatorAddress,
}: {
  validatorAddress: string;
}) {
  const {
    proposals,
    tokenBribes,
    error,
    epoch,
    epochError,
    payload,
    needsApproval,
    setEpoch,
    setProposals,
    onAddToken,
    onRemove,
    onTokenBribeChange,
    onTokenTotalChange,
    onTokenSelection,
  } = useCreateTokenBribes(validatorAddress);
  const { networkConfig } = useBeraConfig();

  const { write, isLoading } = useTxn({
    message: "Create Bribe",
    actionType: TransactionActionType.CREATE_BRIBE,
  });

  const selectedTokens = tokenBribes.map((tokenBribe: ITokenBribe) => {
    return tokenBribe.token;
  }) as Token[];
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <Link href={`/stake/${validatorAddress}`} className="flex items-center">
          <Icons.chevronLeft className="h-6 w-6" />
          <h3 className="text-xl font-semibold">Create Bribe</h3>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <label className="mb-2 block font-semibold" htmlFor="epoch">
            Epoch
          </label>
          <Input
            type="text"
            id="epoch"
            value={epoch ? epoch : ""}
            onChange={(e) => setEpoch(Number(e.target.value))}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block font-semibold" htmlFor="proposals">
            Number of proposals
          </label>
          <Input
            type="text"
            id="proposals"
            value={proposals}
            onChange={(e) => setProposals(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <BribeTokenInputs
            proposals={Number(proposals)}
            tokenBribes={tokenBribes}
            onAddToken={onAddToken}
            selectedTokens={selectedTokens}
            onRemove={onRemove}
            onTokenBribeChange={onTokenBribeChange}
            onTokenTotalChange={onTokenTotalChange}
            onTokenSelection={onTokenSelection}
            error={error}
          />
        </div>
        <div className="mb-6">
          {}
          {needsApproval.length > 0 ? (
            <ApproveTokenButton
              token={needsApproval[0]}
              spender={
                networkConfig.precompileAddresses.erc20ModuleAddress as Address
              }
            />
          ) : (
            <Button
              className="w-full"
              disabled={isLoading || !!error || !!epochError}
              onClick={() => {
                write({
                  address: networkConfig.precompileAddresses
                    .erc20BgtAddress as Address,
                  abi: ERC20BGT_PRECOMPILE_ABI,
                  functionName: "createBribe",
                  params: payload,
                });
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

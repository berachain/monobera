"use client";

import React from "react";
import Link from "next/link";
import {
  getTokens,
  truncateHash,
  usePollAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { dummyToken } from "~/utils/constants";
import SwapInput from "~/components/swap-input";
import ValidatorDialog from "~/components/validator-dialog";
import { validator } from "../../data/validator";
import { type Validator } from "../../data/validators";

export default function CreateBribeCard({
  validatorAddress,
}: {
  validatorAddress: `0x{string}`;
}) {
  const [open, setOpen] = React.useState(false);
  const [redeemAmount, setRedeemAmount] = React.useState(0);
  const [receivingValidator, setReceivingValidator] =
    React.useState<Validator | null>(null);
  usePollAssetWalletBalance();
  const tokens = getTokens();
  return (
    <>
      <ValidatorDialog
        open={open}
        setOpen={setOpen}
        fromAddress={validatorAddress}
        onSelectedValidator={setReceivingValidator}
      />
      <Card className="w-[600px]">
        <CardHeader>
          <Link
            href={`/stake/${validatorAddress}`}
            className="flex items-center"
          >
            <Icons.chevronLeft className="h-6 w-6" />
            <h3 className="text-xl font-semibold">Redelegate</h3>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="my-6 flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-300" />
                <div>
                  <h3 className="text-lg font-semibold">{validator.name}</h3>
                  <Badge variant="secondary">
                    {truncateHash(validatorAddress)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icons.arrowRight className="h-6 w-6" />
              </div>
              {receivingValidator ? (
                <div className="my-6 flex items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-gray-300" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {receivingValidator.name}
                    </h3>
                    <Badge variant="secondary">
                      {truncateHash(receivingValidator.address)}
                    </Badge>
                  </div>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  className="text-left"
                  onClick={() => setOpen(true)}
                >
                  Select validator
                </Button>
              )}
            </div>
            <SwapInput
              selected={tokens[0] || (dummyToken as Token)}
              amount={redeemAmount}
              setAmount={(amount) => setRedeemAmount(amount)}
              selectable={false}
              selectedTokens={tokens}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onTokenSelection={() => {}}
            />
          </div>
          <div className="mt-6">
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <Button className="w-full" onClick={() => {}}>
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

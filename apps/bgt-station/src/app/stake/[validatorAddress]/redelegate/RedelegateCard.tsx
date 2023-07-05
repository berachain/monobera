"use client";

import React from "react";
import Link from "next/link";
import { BeravaloperToEth, truncateHash, type Token } from "@bera/berajs";
import { TokenInput } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { dummyToken } from "~/utils/constants";
import ValidatorDialog from "~/components/validator-dialog";
import { useRedelegate } from "~/hooks/useRedelegate";

export default function CreateBribeCard({
  validatorAddress,
}: {
  validatorAddress: `0x{string}`;
}) {
  const [open, setOpen] = React.useState(false);
  const {
    srcValidator,
    redelegateAmount,
    setRedelegateAmount,
    accountDelegation,
    dstValidator,
    setDstValidator,
    redelegate,
    tokens,
  } = useRedelegate(validatorAddress);
  console.log(accountDelegation);

  return (
    <>
      <ValidatorDialog
        open={open}
        setOpen={setOpen}
        fromAddress={validatorAddress}
        onSelectedValidator={setDstValidator}
        selectedValidators={[validatorAddress]}
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
                  <h3 className="text-lg font-semibold">
                    {srcValidator?.description.moniker}
                  </h3>
                  <Badge variant="secondary">
                    {truncateHash(validatorAddress)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icons.arrowRight className="h-6 w-6" />
              </div>
              {dstValidator ? (
                <div className="my-6 flex items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-gray-300" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {dstValidator.description.moniker}
                    </h3>
                    <Badge variant="secondary">
                      {truncateHash(
                        BeravaloperToEth(
                          dstValidator.operatorAddress,
                        ) as `0x{string}`,
                      )}
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
            <TokenInput
              selected={tokens[0] || (dummyToken as Token)}
              amount={redelegateAmount}
              setAmount={(amount) => setRedelegateAmount(amount)}
              selectable={false}
              selectedTokens={tokens}
              balance={accountDelegation}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onTokenSelection={() => {}}
            />
          </div>
          <div className="mt-6">
            <Button
              className="w-full"
              disabled={!dstValidator || !redelegateAmount}
              onClick={() => {
                console.log("redelegate");
                redelegate();
              }}
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

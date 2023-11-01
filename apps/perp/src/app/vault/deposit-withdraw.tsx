"use client";

import { useState } from "react";
import {
  BTOKEN_ABI,
  useBeraJs,
  usePollAllowance,
  usePollBHoneyPendingWithdraw,
  usePollHoneyBalance,
} from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { ActionButton, TokenInput, TokenList, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { parseUnits } from "viem";
import { type Address } from "wagmi";

import ApproveTokenButton from "../components/approve-token-button";

export default function DepositWithdraw() {
  const [depositAmount, setDepositAmount] = useState<number | undefined>(
    undefined,
  );
  const [withdrawAmount, setWithdrawAmount] = useState<number | undefined>(
    undefined,
  );

  const [isDepositExceeding, setIsDepositExceeding] = useState(false);
  const [isWithdrawExceeding, setIsWithdrawExceeding] = useState(false);

  const {
    write: depositWrite,
    isLoading: isDepositLoading,
    ModalPortal: DepositModalPortal,
  } = useTxn({
    message: "Staking HONEY",
  });

  const {
    write: withdrawWrite,
    isLoading: isWithdrawLoading,
    ModalPortal: WithdrawModalPortal,
  } = useTxn({
    message: "Withdrawing HONEY",
  });

  const { account } = useBeraJs();
  const honey = {
    symbol: "HONEY",
    address: honeyAddress,
    decimals: 18,
    name: "Honey",
  };

  const gTokenAddress = process.env
    .NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address;

  const { useBHoneyEligibleWithdraw } = usePollBHoneyPendingWithdraw();
  const eligibleForWithdraw = useBHoneyEligibleWithdraw();
  
  const { useHoneyBalance } = usePollHoneyBalance();
  const honeyBalance = useHoneyBalance();
  
  const { useAllowance } = usePollAllowance({
    contract: gTokenAddress,
    token: honey,
  });

  const allowance = useAllowance();

  const withdrawPayload = [parseUnits(`${withdrawAmount ?? 0}`, 18), account];
  return (
    <div className="flex h-fit w-full flex-col justify-between rounded-xl border border-border px-4 py-6 md:flex-row">
      {DepositModalPortal}
      {WithdrawModalPortal}
      <div className="w-full flex-shrink-0">
        <Tabs defaultValue="deposit">
          <TabsList className="mb-8 w-full">
            <TabsTrigger value="deposit" className="w-full">
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="w-full">
              Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="flex flex-col gap-4">
            <div className="flex gap-1 text-xl font-semibold leading-7">
              <Icons.lock className="h-6 w-6 text-accent" />
              Deposit Honey
            </div>
            <div className="text-sm leading-tight text-muted-foreground">
              Deposit HONEY in exchange for bHONEY, stakers receive fees from
              each trade placed on the platform. bHONEY Accumulates these fees
              in real-time.
            </div>
            <div>
              <TokenList>
                <TokenInput
                  selectable={false}
                  selected={honey}
                  balance={Number(honeyBalance)}
                  amount={depositAmount}
                  setAmount={setDepositAmount}
                  showExceeding={true}
                  onExceeding={(isExceeding) =>
                    setIsDepositExceeding(isExceeding)
                  }
                />
              </TokenList>
            </div>
            <ActionButton>
              {allowance?.formattedAllowance === "0" ? (
                <ApproveTokenButton token={honey} spender={gTokenAddress} />
              ) : (
                <Button
                  variant={"success"}
                  className="w-full"
                  disabled={
                    isDepositLoading || !depositAmount || isDepositExceeding
                  }
                  onClick={() =>
                    depositWrite({
                      address: gTokenAddress,
                      abi: BTOKEN_ABI,
                      functionName: "deposit",
                      params: [
                        parseUnits(`${depositAmount ?? 0}`, 18),
                        account,
                      ],
                    })
                  }
                >
                  Deposit Honey
                </Button>
              )}
            </ActionButton>
          </TabsContent>

          <TabsContent value="withdraw" className="flex flex-col gap-4">
            <div className="flex gap-1 text-xl font-semibold leading-7">
              <Icons.lock className="h-6 w-6 text-accent" />
              Withdraw Honey
            </div>
            <div className="text-sm leading-tight text-muted-foreground">
              Withdraws are based on an epoch system of 24 hours. You can make a
              request to withdraw your assets during the first 18 hours of any
              epoch, but you must wait until the specified withdraw epoch to
              actually withdraw them.
            </div>
            <div className="text-sm leading-tight text-muted-foreground">
              Depending on the collateralization ratio of the vault, your
              withdraw epoch will be delayed by 1 to 3 epochs.{" "}
            </div>
            <div>
              <TokenList>
                <TokenInput
                  selectable={false}
                  balance={Number(eligibleForWithdraw)}
                  selected={{
                    symbol: "BHONEY",
                    address: gTokenAddress,
                    decimals: 18,
                    name: "BHONEY",
                    logoURI:
                      "https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/bhoney.png",
                  }}
                  amount={withdrawAmount}
                  setAmount={setWithdrawAmount}
                  showExceeding={true}
                  onExceeding={(isExceeding) =>
                    setIsWithdrawExceeding(isExceeding)
                  }
                />
              </TokenList>
            </div>
            <ActionButton>
              <Button
                disabled={
                  isWithdrawLoading || !withdrawAmount || isWithdrawExceeding
                }
                onClick={() =>
                  withdrawWrite({
                    address: gTokenAddress,
                    abi: BTOKEN_ABI,
                    functionName: "makeWithdrawRequest",
                    params: withdrawPayload,
                  })
                }
                variant={"destructive"}
                className="w-full"
              >
                Request Withdraw
              </Button>
            </ActionButton>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

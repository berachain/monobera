"use client";

import { useState } from "react";
import {
  TRADING_ABI,
  truncateHash,
  useBeraJs,
  useOct,
  usePollBeraBalance,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { ActionButton, TokenIcon, useTxn } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import Identicon from "@bera/shared-ui/src/identicon";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { parseUnits } from "ethers";
import { useCopyToClipboard } from "usehooks-ts";
import { parseEther } from "viem";
import { type Address } from "wagmi";

export function ManageOctDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    octPrivKey,
    isOctDelegated,
    refetchDelegated,
    isOctUnfunded,
    isOctBalanceLow,
    octAddress,
    octBalance,
    octTxCount,
  } = useOct();

  const [fundAmount, setFundAmount] = useState<string | undefined>(undefined);
  const { account, isReady } = useBeraJs();
  const { useBalance } = usePollBeraBalance({ address: account as string });
  const userBalance = useBalance();
  const { isLoading, write } = useTxn({
    message: "Delegate One Click Trading Wallet",
    onSuccess: () => {
      refetchDelegated();
    },
  });

  const { isLoading: isRevokeLoading, write: revokeWrite } = useTxn({
    message: "Revoke One Click Trading Wallet",
    onSuccess: () => {
      refetchDelegated();
    },
  });

  const { isFundingLoading, fundWrite } = useTxn({
    message: "Revoke One Click Trading Wallet",
  });

  const { isValueSendLoading, writeValueSend } = useOctTxn({
    message: "Withdrawing All From One Click Trading Wallet",
  });

  const [_, copy] = useCopyToClipboard();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-[382px]">
        <div className="text-xl font-semibold leading-7">
          ⚡ Setup One Click Trading{" "}
        </div>
        {!isOctBalanceLow && !isOctUnfunded && (
          <div
            className={
              "relative flex flex-row justify-between gap-2 rounded-xl border border-border p-3"
            }
          >
            <div className="flex flex-row gap-2 text-sm font-medium">
              <Icons.checkCircle2 className="text-[#059669]" />
              Wallet Funded
            </div>
          </div>
        )}
        {isOctDelegated && (
          <div
            className={
              "relative flex flex-row justify-between gap-2 rounded-xl border border-border p-3"
            }
          >
            <div className="flex flex-row gap-2 text-sm font-medium">
              <Icons.checkCircle2 className="text-[#059669]" />
              Granted Permission
            </div>
            <Button
              variant={"destructive"}
              size="sm"
              disabled={isRevokeLoading}
              onClick={() =>
                revokeWrite({
                  address: process.env
                    .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                  abi: TRADING_ABI,
                  functionName: "removeDelegate",
                  params: [],
                })
              }
            >
              Revoke
            </Button>
          </div>
        )}
        <div className={"relative rounded-xl border border-border p-3"}>
          <p className="text-sm font-medium leading-normal">
            Your 1-Click Trade Wallet
          </p>
          <div className="mt-2 flex flex-row gap-2">
            <Identicon account={octAddress} size={24} />
            <div
              className="text-sm font-semibold hover:underline"
              onClick={() =>
                window.open(
                  blockExplorerUrl + "/address/" + octAddress,
                  "_blank",
                )
              }
            >
              {truncateHash(octAddress)}
            </div>
            <Icons.external className="h-4 w-4" />
          </div>
          <div className="mt-2 flex flex-row gap-2">
            <TokenIcon
              token={{
                address: "0x0000000000000000000000000000000000000000",
                symbol: "BERA",
                decimals: 18,
                name: "BERA",
              }}
            />
            <div className="text-sm font-semibold">
              {Number(octBalance ?? 0).toFixed(2)} BERA{" "}
              <span className="text-xs font-medium text-emerald-600">
                ~ {octTxCount} txns
              </span>
            </div>
          </div>
          <div className="mt-3 flex flex-row gap-2">
            <Button
              size={"sm"}
              className="w-full"
              variant={"secondary"}
              disabled={isValueSendLoading}
              onClick={() => {
                writeValueSend({
                  address: account as Address,
                  value:
                    parseUnits(octBalance.toString(), 18) -
                    parseEther(`${Number(0.15)}`),
                });
              }}
            >
              Withdraw All
            </Button>
            <Button
              size={"sm"}
              className="w-full"
              variant={"secondary"}
              onClick={() => copy("0x" + octPrivKey)}
            >
              Copy Private Key
            </Button>
          </div>
        </div>
        <div className={"relative rounded-xl border border-border p-3"}>
          <p className="text-sm font-medium leading-normal">
            Fund Your One-Click Account
          </p>
          <p className="text-sm font-normal">
            Fund your 1-click trading account with at least 1.0 BERA token to
            ensure you have enough reserves for gas fees.{" "}
          </p>
          <div>
            <Input
              type="number"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              id="initial-deposit"
              className="mt-4"
              placeholder="0.00"
              endAdornment="BERA"
            />
            {isReady && (
              <div className="mt-1 flex h-3 w-full items-center justify-end gap-1 text-xs text-muted-foreground">
                <Icons.wallet className="relative inline-block h-3 w-3 " />
                {userBalance}
                <span
                  className="cursor-pointer underline"
                  onClick={() => setFundAmount(userBalance)}
                >
                  MAX
                </span>
              </div>
            )}
          </div>
          <ActionButton className="mt-4 w-full">
            <Button
              className="w-full"
              disabled={isFundingLoading}
              onClick={() =>
                fundWrite({
                  address: octAddress as Address,
                  value: parseEther(`${Number(fundAmount)}` ?? 0),
                })
              }
            >
              Fund One-Click Wallet
            </Button>
          </ActionButton>
        </div>
        {!isOctDelegated && (
          <div className={"relative rounded-xl border border-border p-3"}>
            <p className="text-sm font-normal">
              Grant your connected wallet permission to interact with trading
              contracts through the One-Click-Trading wallet.
            </p>
            <ActionButton className="mt-4 w-full">
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={() =>
                  write({
                    address: process.env
                      .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                    abi: TRADING_ABI,
                    functionName: "setDelegate",
                    params: [account],
                  })
                }
              >
                Approve
              </Button>
            </ActionButton>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

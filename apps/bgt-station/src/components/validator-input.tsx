import React from "react";
import { useRouter } from "next/navigation";
import { useBeraJs, usePollWalletBalances } from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { FormattedNumber, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { type Address } from "viem";

import { DelegateEnum } from "../app/delegate/types";
import ValidatorSelector from "./validator-selector";

export default function ValidatorInput({
  action = DelegateEnum.DELEGATE,
  amount,
  onAmountChange,
  validatorAddress,
  disabled = false,
  showDelegated, //when this is true, the validator list will only show the validators user delegated
  filter,
}: // emptyMessage = "No validators available",
{
  action: DelegateEnum;
  amount: string | undefined;
  onAmountChange: (amount: string | undefined) => void;
  validatorAddress: Address | undefined;
  disabled?: boolean;
  showDelegated?: boolean;
  filter?: Address[];
  // emptyMessage?: string;
}) {
  const router = useRouter();
  const { isReady } = useBeraJs();
  const { useSelectedWalletBalance } = usePollWalletBalances();
  const bgtBalance = useSelectedWalletBalance(bgtTokenAddress);
  const bgtDelegated = 0;
  return (
    <div className="relative">
      <div
        className="
        xs:justify-between flex min-h-[73px] flex-row items-center rounded-lg border border-solid bg-input py-3"
      >
        <ValidatorSelector
          validatorAddress={validatorAddress}
          onSelectValidator={(address) =>
            router.push(`/delegate?action=${action}&validator=${address}`)
          }
          showDelegated={showDelegated}
          filter={filter}
        />
        <Input
          type="number"
          className="max-w-100 border-0 bg-transparent text-right text-lg font-semibold leading-7 outline-none"
          value={amount}
          placeholder="0.0"
          disabled={disabled}
          onChange={(e: any) => onAmountChange(e.target.value)}
        />
      </div>
      {action === DelegateEnum.DELEGATE && isReady && (
        <div className=" mt-2 flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
          <Icons.wallet className="relative inline-block h-3 w-3 " />
          <FormattedNumber
            value={bgtBalance?.formattedBalance ?? "0"}
            symbol="BGT"
            compact={false}
          />
          <span
            className="underline hover:cursor-pointer"
            onClick={() => {
              onAmountChange("0");
            }}
          >
            MAX
          </span>
        </div>
      )}

      {action !== DelegateEnum.DELEGATE &&
        validatorAddress &&
        Boolean(bgtDelegated) && (
          <div className="absolute bottom-3 right-4 h-3 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
              {/* <ValidatorIcon className="h-6 w-6" address={validatorAddress} /> */}
              <Tooltip
                text="Amount of BGT delegated to this validator"
                className="h-3 w-3"
              />

              {bgtDelegated?.toString()}
              <span
                className="underline hover:cursor-pointer"
                onClick={() => {
                  if (bgtDelegated) onAmountChange("0");
                }}
              >
                MAX
              </span>
            </div>
          </div>
        )}
    </div>
  );
}

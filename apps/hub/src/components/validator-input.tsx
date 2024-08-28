import React from "react";
import { useRouter } from "next/navigation";
import {
  formatInputTokenValue,
  useBeraJs,
  useBgtUnstakedBalance,
  useUserValidators,
  type Validator,
} from "@bera/berajs";
import { FormattedNumber, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { type Address } from "viem";

import { DelegateEnum } from "../app/validators/validator/types";
import ValidatorSelector from "./validator-selector";

export default function ValidatorInput({
  action = DelegateEnum.DELEGATE,
  amount,
  unselectable,
  onAmountChange,
  validatorAddress,
  onSelectValidator,
  disabled = false,
  showDelegated, //when this is true, the validator list will only show the validators user delegated
  filter,
  showSearch,
}: // emptyMessage = "No validators available",
{
  action: DelegateEnum;
  amount: string | undefined;
  unselectable?: boolean;
  onAmountChange: (amount: string | undefined) => void;
  validatorAddress: Address | undefined;
  onSelectValidator?: (address: Address) => void;
  disabled?: boolean;
  showDelegated?: boolean;
  filter?: Address[];
  showSearch?: boolean;
  // emptyMessage?: string;
}) {
  const { isReady } = useBeraJs();
  const { data: bgtBalance } = useBgtUnstakedBalance();

  const { data } = useUserValidators();

  const selectedValidator = data?.find(
    (validator: Validator) =>
      validator.id.toLowerCase() === validatorAddress?.toLowerCase(),
  );
  const bgtDelegated = selectedValidator ? selectedValidator.userStaked : "0";
  return (
    <div className="relative">
      <div
        className="
        xs:justify-between flex min-h-[73px] flex-row items-center rounded-lg border border-solid bg-input py-3"
      >
        <ValidatorSelector
          validatorAddress={validatorAddress}
          onSelectValidator={(address) =>
            onSelectValidator?.(address as `0x${string}`)
          }
          showDelegated={showDelegated}
          showSearch={showSearch}
          unselectable={unselectable}
        />
        <Input
          type="number-enhanced"
          className="max-w-100 border-0 bg-transparent text-right text-lg font-semibold leading-7 outline-none"
          value={amount}
          placeholder="0.0"
          disabled={disabled}
          onChange={(e: any) => {
            const inputValue = e.target.value;
            const filteredValue = formatInputTokenValue(inputValue);
            const [_, decimalPart = ""] = filteredValue.split(".");
            if (decimalPart.length > 18) return;
            onAmountChange(e.target.value);
          }}
        />
      </div>

      {action === DelegateEnum.DELEGATE && isReady && (
        <div className=" mt-2 flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
          <Icons.wallet className="relative inline-block h-3 w-3 " />
          <FormattedNumber
            value={bgtBalance ?? "0"}
            symbol="BGT"
            compact={false}
          />
          <span
            className="underline hover:cursor-pointer"
            onClick={() => {
              onAmountChange(bgtBalance ? bgtBalance.toString() : "0");
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

              <FormattedNumber
                value={bgtDelegated}
                compact
                symbol="BGT"
                showIsSmallerThanMin
              />
              <span
                className="underline hover:cursor-pointer"
                onClick={() => {
                  if (bgtDelegated) onAmountChange(bgtDelegated);
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

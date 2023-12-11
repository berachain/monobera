import React from "react";
import { useRouter } from "next/navigation";
import {
	useBeraJs,
	usePollAccountDelegations,
	usePollBgtBalance,
} from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { type Address } from "wagmi";

import { DelegateEnum } from "../app/delegate/types";
import ValidatorSelector from "./validator-selector";

export default function ValidatorInput({
	action = DelegateEnum.DELEGATE,
	amount,
	onAmountChange,
	validatorAddress,
	redelegate,
	redelegateValidatorAddress,
	disabled = false,
	showDelegated, //when this is true, the validator list will only show the validators user delegated
}: // emptyMessage = "No validators available",
{
	action: DelegateEnum;
	amount: string | undefined;
	onAmountChange: (amount: string | undefined) => void;
	validatorAddress: Address | undefined;
	redelegate?: boolean;
	redelegateValidatorAddress?: string;
	disabled?: boolean;
	showDelegated?: boolean;
	// emptyMessage?: string;
}) {
	const router = useRouter();
	const { useBgtBalance, isLoading: isBalanceLoading } = usePollBgtBalance();
	const userBalance = useBgtBalance();
	const { isReady } = useBeraJs();
	const { useSelectedAccountDelegation } =
		usePollAccountDelegations(validatorAddress);
	const bgtDelegated = useSelectedAccountDelegation();

	return (
		<div className="relative">
			<Input
				type="number"
				className="h-[73px] p-4 text-right text-lg font-semibold leading-7"
				value={amount}
				placeholder="0"
				disabled={disabled || isBalanceLoading}
				onChange={(e) => onAmountChange(e.target.value)}
				startAdornment={
					<ValidatorSelector
						validatorAddress={
							redelegate ? redelegateValidatorAddress : validatorAddress
						}
						onSelectValidator={(address) =>
							router.push(
								`/delegate?action=${action}&validator=${
									redelegate ? validatorAddress : address
								}${redelegate ? `&redelegateValidator=${address}` : ""}`,
							)
						}
						showDelegated={showDelegated}
						// emptyMessage={emptyMessage}
					/>
				}
			/>

			{action === DelegateEnum.DELEGATE && isReady && (
				<div className=" mt-2 flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
					<Icons.wallet className="relative inline-block h-3 w-3 " />
					{Number(userBalance).toFixed(2)}
					<span
						className="underline hover:cursor-pointer"
						onClick={() => {
							onAmountChange(userBalance);
						}}
					>
						MAX
					</span>
				</div>
			)}

			{action !== DelegateEnum.DELEGATE &&
				!redelegate &&
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
									if (bgtDelegated) onAmountChange(bgtDelegated.toString());
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

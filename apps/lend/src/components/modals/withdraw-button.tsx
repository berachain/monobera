import { useEffect, useState } from "react";
import Image from "next/image";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
	TransactionActionType,
	formatter,
	lendPoolImplementationABI,
	useBeraJs,
	usePollReservesDataList,
	usePollUserAccountData,
	usePollUserReservesData,
	type Token,
} from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { TokenIcon, Tooltip, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import BigNumber from "bignumber.js";
import { formatEther, formatUnits, parseUnits } from "viem";

import { maxUint256 } from "~/utils/constants";
import { getLTVColor } from "~/utils/get-ltv-color";

export default function WithdrawBtn({
	token,
	disabled = false,
	variant = "outline",
}: {
	token: Token;
	disabled?: boolean;
	variant?: "primary" | "outline";
}) {
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState<string | undefined>(undefined);
	const { write, isLoading, ModalPortal, isSuccess } = useTxn({
		message: `Withdrawing ${amount} ${token.symbol}`,
		onSuccess: () => {
			userAccountRefetch();
			reservesDataRefetch();
			userReservesRefetch();
		},
		actionType: TransactionActionType.WITHDRAW,
	});
	const { refetch: userAccountRefetch } = usePollUserAccountData();
	const { refetch: reservesDataRefetch } = usePollReservesDataList();
	const { refetch: userReservesRefetch } = usePollUserReservesData();

	useEffect(() => setOpen(false), [isSuccess]);
	return (
		<>
			{" "}
			{ModalPortal}
			<Button
				onClick={() => setOpen(true)}
				className="w-full text-sm leading-5 xl:w-fit"
				disabled={disabled || isLoading}
				variant={variant}
			>
				{isLoading ? "Loading" : "Withdraw"}
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="w-fit p-8">
					<WithdrawModalContent {...{ token, amount, setAmount, write }} />
				</DialogContent>
			</Dialog>
		</>
	);
}

const WithdrawModalContent = ({
	token,
	amount,
	setAmount,
	write,
}: {
	token: Token;
	amount: string | undefined;
	setAmount: (amount: string | undefined) => void;
	write: (arg0: any) => void;
}) => {
	const userBalance = token.formattedBalance ?? "0";
	const { useSelectedReserveData } = usePollReservesDataList();
	const { data: reserveData } = useSelectedReserveData(token.address);
	const { account } = useBeraJs();
	const { useUserAccountData } = usePollUserAccountData();
	const { data: userAccountData } = useUserAccountData();

	const currentHealthFactor =
		Number(formatEther(userAccountData?.healthFactor || "0")) > 1000000000000
			? "∞"
			: Number(formatEther(userAccountData.healthFactor)).toFixed(2);

	const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
		collateralBalanceMarketReferenceCurrency:
			Number(formatUnits(userAccountData.totalCollateralBase, 8)) -
			Number(amount ?? "0") *
				Number(reserveData?.formattedPriceInMarketReferenceCurrency),
		borrowBalanceMarketReferenceCurrency: formatUnits(
			userAccountData.totalDebtBase,
			8,
		),
		currentLiquidationThreshold: formatUnits(
			userAccountData.currentLiquidationThreshold,
			4,
		),
	});

	const maxWithdrawalAllowance = BigNumber(
		formatUnits(
			(userAccountData.totalCollateralBase as bigint) -
				(userAccountData.totalDebtBase * 10000n) /
					userAccountData.currentLiquidationThreshold,
			8,
		),
	)
		.div(reserveData?.formattedPriceInMarketReferenceCurrency)
		.toFixed(token.decimals ?? 18);

	const balance =
		userAccountData.totalDebtBase === 0n ||
		Number(maxWithdrawalAllowance) > Number(userBalance)
			? userBalance
			: maxWithdrawalAllowance;

	console.log(userAccountData);
	return (
		<div className="flex flex-col gap-6">
			<div className="text-lg font-semibold leading-7">Withdraw</div>
			<Image
				src={"/supply.png"}
				alt="supply-img"
				className="h-36 w-96"
				width={100}
				height={100}
			/>

			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-1 text-sm font-semibold leading-tight">
					Amount <Tooltip text="amount" />{" "}
				</div>
				<Input
					type="number"
					id="forum-discussion-link"
					placeholder="0.0"
					endAdornment={
						<div className="flex items-center gap-1">
							<TokenIcon token={token} size={"md"} />
							{token.symbol}
						</div>
					}
					value={amount}
					onChange={(e) =>
						setAmount(Number(e.target.value) === 0 ? undefined : e.target.value)
					}
				/>
				<div className="flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
					Available to withdraw: {Number(balance).toFixed(2)}
					<span
						className="underline hover:cursor-pointer"
						onClick={() =>
							setAmount(Number(balance) === 0 ? undefined : balance)
						}
					>
						MAX
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex justify-between text-sm leading-tight">
					<div className="text-muted-foreground ">Estimated Value</div>
					<div className="font-semibold">
						{" "}
						$
						{formatter.format(
							Number(amount ?? "0") *
								Number(reserveData?.formattedPriceInMarketReferenceCurrency),
						)}
					</div>
				</div>
				<div className="flex justify-between text-sm leading-tight">
					<div className="text-muted-foreground ">Supply PRR</div>
					<div className="font-semibold text-success-foreground">
						{(reserveData.supplyAPR * 100).toFixed(2)}%
					</div>
				</div>
				<div className="flex justify-between text-sm leading-tight">
					<div className="text-muted-foreground ">LTV Health Ratio</div>
					<div className="flex items-center gap-1 font-semibold">
						<span
							className={cn(
								`text-${getLTVColor(
									currentHealthFactor === "∞"
										? 10
										: Number(currentHealthFactor),
								)}`,
							)}
						>
							{currentHealthFactor}{" "}
						</span>
						<Icons.moveRight className="inline-block h-6 w-6" />{" "}
						<span
							className={cn(`text-${getLTVColor(Number(newHealthFactor))}`)}
						>
							{Number(newHealthFactor.toFixed(2)) < 0
								? "∞"
								: newHealthFactor.toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			{userAccountData.totalDebtBase !== 0n &&
				newHealthFactor.toNumber() < 1.02 && (
					<Alert variant="destructive">
						<AlertTitle className="mb-1">
							{" "}
							<Icons.info className="inline-block h-4 w-4" /> Liquidation Risk
						</AlertTitle>
						<AlertDescription>
							Withdrawing this amount will reduce your health factor and
							increase risk of liquidation.
						</AlertDescription>
					</Alert>
				)}

			<Button
				disabled={
					!amount || Number(amount) <= 0 || Number(amount) > Number(balance)
				}
				onClick={() => {
					write({
						address: lendPoolImplementationAddress,
						abi: lendPoolImplementationABI,
						functionName: "withdraw",
						params: [
							token.address,
							userAccountData.totalDebtBase === 0n && balance === amount
								? maxUint256
								: parseUnits((amount ?? "0") as `${number}`, token.decimals),
							account,
						],
					});
				}}
			>
				{Number(amount) === 0 ? "Enter Amount" : "Withdraw"}
			</Button>
		</div>
	);
};

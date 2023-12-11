import {
	formatter,
	usePollAssetWalletBalance,
	usePollReservesDataList,
	usePollUserAccountData,
	type Token,
} from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";

import Card from "~/components/card";
import BorrowBtn from "~/components/modals/borrow-button";
import SupplyBtn from "~/components/modals/supply-button";

export default function UserInfo({ token }: { token: Token | undefined }) {
	const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
	const { data: tokenBalance } = useSelectedAssetWalletBalance(
		token?.address ?? "",
	);
	const { useSelectedReserveData, useBaseCurrencyData } =
		usePollReservesDataList();
	const { data: reserveData } = useSelectedReserveData(token?.address ?? "");
	const { data: baseCurrencyData } = useBaseCurrencyData();
	const { useUserAccountData } = usePollUserAccountData();
	const { data: userAccountData } = useUserAccountData();

	const supplyAmount =
		Number(reserveData?.supplyCap) > Number(tokenBalance?.formattedBalance)
			? Number(tokenBalance?.formattedBalance)
			: Number(reserveData?.supplyCap);

	const borrowPower =
		Number(
			formatUnits(
				userAccountData?.availableBorrowsBase ?? "0",
				baseCurrencyData?.networkBaseTokenPriceDecimals,
			),
		) / Number(reserveData?.formattedPriceInMarketReferenceCurrency);

	const availableLiquidity =
		Number(reserveData?.totalLiquidity) *
		Number(reserveData?.formattedPriceInMarketReferenceCurrency) *
		Number(1 - reserveData?.borrowUsageRatio);

	const borrowAmout =
		borrowPower > availableLiquidity ? availableLiquidity : borrowPower;

	return (
		<div className="w-full flex-shrink-0 lg:w-[378px]">
			<div>
				<div className="text-2xl font-semibold leading-loose">Your Info</div>
				<Card className="p-6">
					<div className="flex items-center gap-4 border-b border-border pb-4">
						<div className="h-fit w-fit rounded-full border border-border bg-muted p-2 hover:cursor-pointer md:rounded-lg">
							<Icons.wallet className="relative h-8 w-8 text-muted-foreground" />
						</div>
						<div className="flex flex-col justify-center">
							<div className="text-sm text-muted-foreground">
								Wallet Balance
							</div>
							<div className="text-muted-foreground">
								<b className="text-foreground">
									{tokenBalance ? (
										Number(tokenBalance?.formattedBalance).toLocaleString()
									) : (
										<Skeleton className="inline-block h-5 w-20" />
									)}
								</b>{" "}
								{token ? (
									token.symbol
								) : (
									<Skeleton className="inline-block h-5 w-20" />
								)}
							</div>
						</div>
					</div>
					<div className="mt-4">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-xs font-medium leading-tight">
									Available to Supply{" "}
									<Tooltip text="This is the total amount that you are able to supply to in this reserve. You are able to supply your wallet balance up until the supply cap is reached." />
								</div>
								<div className="mt-[-2px] leading-7 text-muted-foreground">
									<b>
										{!Number.isNaN(supplyAmount) ? (
											formatter.format(supplyAmount)
										) : (
											<Skeleton className="inline-block h-7 w-20" />
										)}
									</b>{" "}
									{token ? (
										token.symbol
									) : (
										<Skeleton className="inline-block h-7 w-20" />
									)}
								</div>
								<div className="text-xs font-medium leading-tight text-muted-foreground">
									$
									{formatter.format(
										Number(
											reserveData?.formattedPriceInMarketReferenceCurrency,
										) * supplyAmount,
									)}
								</div>
							</div>
							<div>
								{token ? (
									<SupplyBtn token={token} disabled={supplyAmount === 0} />
								) : (
									<Skeleton className="h-9 w-20" />
								)}
							</div>
						</div>

						{token && token.address === honeyAddress && (
							<div className="mt-4 flex items-center justify-between">
								<div>
									<div className="text-xs font-medium leading-tight">
										Available to Borrow{" "}
										<Tooltip text="This is the total amount available for you to borrow. You can borrow based on your collateral and until the borrow cap is reached." />
									</div>
									<div className="mt-[-2px] leading-7 text-muted-foreground">
										<b>
											{!Number.isNaN(borrowAmout) ? (
												formatter.format(borrowAmout)
											) : (
												<Skeleton className="inline-block h-7 w-20" />
											)}
										</b>{" "}
										{token ? (
											token.symbol
										) : (
											<Skeleton className="inline-block h-7 w-20" />
										)}
									</div>
									<div className="text-xs font-medium leading-tight text-muted-foreground">
										$
										{formatter.format(
											Number(
												reserveData?.formattedPriceInMarketReferenceCurrency,
											) * borrowAmout,
										)}
									</div>
								</div>
								<div>
									{token ? (
										<BorrowBtn token={token} disabled={borrowAmout === 0} />
									) : (
										<Skeleton className="h-9 w-20" />
									)}
								</div>
							</div>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
}

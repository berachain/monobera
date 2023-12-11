"use client";

import Image from "next/image";
import {
	formatter,
	usePollBgtRewardsForAddress,
	usePollHoneyVaultBalance,
} from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { Skeleton } from "@bera/ui/skeleton";
import type { Address } from "wagmi";

export default function Claim({ feeApr }: { feeApr: string }) {
	const feeAprTrimmed = feeApr.slice(0, -1);
	const feeAprNumber = Number(feeAprTrimmed);
	const {
		isLoading: isHoneyVaultBalanceLoading,
		useFormattedHoneyVaultBalance,
	} = usePollHoneyVaultBalance();

	const honeyLocked = useFormattedHoneyVaultBalance();

	const {
		isLoading: isBgtRewardsLoading,
		useBgtApr,
		useBgtRewardsForAddress,
	} = usePollBgtRewardsForAddress({
		address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
	});

	const _ = useBgtRewardsForAddress();

	// console.log("bgt rewards", bgtRewards);
	const bgtApr = useBgtApr(honeyLocked);

	const isLoading = isHoneyVaultBalanceLoading || isBgtRewardsLoading;
	return (
		<div className="relative w-full overflow-hidden rounded-md border border-border bg-gradient-to-r from-[#180B01] to-[#3B220F] px-10 py-8">
			<div className=" relative z-10 inline-flex h-[52px] w-fit items-center justify-center gap-1 rounded-md border border-yellow-600 bg-stone-900 px-3 py-2">
				<div className="font-['IBM Plex Sans'] text-3xl font-semibold leading-9 text-yellow-600">
					{isLoading || bgtApr === undefined ? (
						<Skeleton className="h-[28px] w-[80px]" />
					) : (
						<p>{formatter.format(bgtApr ?? 0 + feeAprNumber)}%</p>
					)}
				</div>
			</div>
			<div className=" relative z-10 mt-4 w-full text-xs text-muted-foreground">
				Honey Staking Projected <br /> Reward Rate (PRR)
			</div>
			<Image
				src={`${cloudinaryUrl}/BERPS/wlpafhymyjy8taz2x9qa`}
				alt="honey-jar"
				width={1080}
				height={186}
				className="absolute bottom-0 right-0 z-0 hidden h-[186px] object-cover sm:block"
				style={{ objectPosition: "right" }}
			/>
			<Image
				src={`${cloudinaryUrl}/BERPS/z2esmjuetjcppo8e6qsh`}
				alt="honey-jar"
				width={1080}
				height={186}
				className="absolute bottom-0 right-0 z-0 block h-[186px] object-cover sm:hidden"
				style={{ objectPosition: "right" }}
			/>
		</div>
	);
}

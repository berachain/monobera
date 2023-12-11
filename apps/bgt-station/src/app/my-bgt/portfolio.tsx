import React, { useRef } from "react";
import {
	BRIBE_PRECOMPILE_ABI,
	TransactionActionType,
	formatter,
	truncateHash,
	useBeraJs,
	usePollBribes,
	usePollDelegatorUnbonding,
	usePollDelegatorValidators,
	usePollPrices,
	usePollTotalDelegated,
	type Validator,
} from "@bera/berajs";
import { formatUsd } from "@bera/berajs/src/utils";
import { blockExplorerUrl, cloudinaryUrl, docsUrl } from "@bera/config";
import { TokenIconList, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { type Address } from "viem";

import YellowCard from "~/components/yellow-card";
import AverageGaugeWeight from "./components/average-gauge-weight";
import { Banner } from "./components/banner";
import { ClaimBribesDialog } from "./components/claim-bribes-dialog";
import UnbondingQueue from "./components/unbonding-queue";
import YourDelegations from "./components/your-delegations";
import { BGTSelectionEnum, type BGTselection } from "./types";

export default function Portfolio() {
	const tabRef = useRef(null);
	const { account } = useBeraJs();
	const [tab, setTab] = React.useState<BGTselection>(
		BGTSelectionEnum.YOUR_DELEGATIONS,
	);
	const [open, setOpen] = React.useState(false);
	const { useTotalValidatorsDelegated, useDelegatorValidators } =
		usePollDelegatorValidators();
	const delegatedValidators = useDelegatorValidators();

	const { useTotalDelegatorDelegated } = usePollTotalDelegated();
	const total = useTotalDelegatorDelegated();

	const totalValidators = useTotalValidatorsDelegated();
	const {
		useDelegatorUnbondingQueue,
		useDelegatorTotalUnbonding,
		useDelegatorTotalUnbondingValidators,
	} = usePollDelegatorUnbonding();

	const totalUnbonding = useDelegatorTotalUnbonding();
	const unbondingQueue = useDelegatorUnbondingQueue();
	const unbondingValidatorCount = useDelegatorTotalUnbondingValidators();
	const { usePrices } = usePollPrices();
	const { data: prices } = usePrices();
	const { useTotalBribes, useBribeTokens, useBribes } = usePollBribes();
	const totalBribes = useTotalBribes(prices);
	const bribeTokenList = useBribeTokens();
	const bribes = useBribes();
	const { write, isLoading, ModalPortal } = useTxn({
		message: "Claiming all bribes",
		actionType: TransactionActionType.CLAIMING_BRIBES,
		onSuccess: () => {
			setOpen(false);
		},
		onError: (e) => {
			console.log(e);
		},
	});

	return (
		<div>
			{ModalPortal}
			{(Number.isNaN(totalValidators) || totalValidators === 0) &&
			(!totalBribes || totalBribes === 0) &&
			(!totalUnbonding || totalUnbonding === 0) ? (
				<div className="flex flex-col gap-8">
					<div className="leading-12 text-center text-3xl font-bold md:text-5xl">
						👋 There’s nothing here yet...
					</div>
					<div className="text-center text-lg font-semibold leading-7 text-muted-foreground md:text-xl">
						This page will be populated with your delegations and
						<br className="hidden sm:block" /> rewards once you have delegated
						to some validators.{" "}
					</div>
					<Banner
						img={`${cloudinaryUrl}/bears/kj33rvgbemret3xrknv9`}
						title="How do I delegate BGT?"
						subtitle="Delegate like a pro with these helpful guides."
						href={`${docsUrl}/learn/protocol/bgt-station#delegating-bgt`}
					/>
					<Banner
						img={`${cloudinaryUrl}/bears/j7rciiglmcozlxryug4z`}
						title="What is a gauge weight?"
						subtitle="We’ll teach you what all this de-fi jargon means."
						href={`${docsUrl}/learn/protocol/bgt-emissions#preface-validators-set-the-gauge-weights-for-each-pool`}
					/>
					<Banner
						img={`${cloudinaryUrl}/bears/zkyxcj5qhdmd75xgozkn`}
						title="How do I unbond BGT?"
						subtitle="Unbond with ease following our walkthrough."
						href={`${docsUrl}/learn/protocol/bgt-station#unbonding-bgt`}
					/>
				</div>
			) : (
				<>
					<div className="mb-8 flex h-[100px] flex-row flex-wrap items-center justify-center text-2xl font-bold leading-[48px] text-foreground md:text-5xl">
						👋 Hey{" "}
						<span
							onClick={() => {
								window.open(`${blockExplorerUrl}/address/${account}`, "_blank");
							}}
							className="mx-2 cursor-pointer hover:underline"
						>
							{truncateHash(account ?? "0x", 6)}
						</span>{" "}
						you have...
					</div>
					<div className="flex flex-col gap-8 md:flex-row">
						<YellowCard
							tooltip={
								<div className="flex flex-col gap-1 p-2">
									{delegatedValidators?.map((validator) => (
										<MyValidator
											validator={validator}
											key={validator.operatorAddr}
										/>
									))}
								</div>
							}
							className="justify-betwee flex flex-1 flex-col"
						>
							<div className="text-5xl font-bold leading-[48px] text-foreground">
								{total?.toFixed(2) ?? 0}
							</div>
							<div className="py-[14px] text-center text-sm font-semibold leading-tight text-muted-foreground">
								BGT delegated
								<br />
								across {Number.isNaN(totalValidators) ? 0 : totalValidators}{" "}
								validators
							</div>
							<Button
								variant="outline"
								onClick={() => {
									setTab(BGTSelectionEnum.YOUR_DELEGATIONS);
									// @ts-ignore
									tabRef.current?.scrollIntoView({ behavior: "smooth" });
								}}
							>
								Manage delegations
							</Button>
						</YellowCard>
						<YellowCard className="flex flex-1 flex-col justify-between">
							<div className="text-5xl font-bold leading-[48px] text-foreground">
								{formatUsd(totalBribes ?? 0)}
							</div>
							<div className="flex flex-col items-center py-[8px] text-center text-sm font-semibold leading-tight text-muted-foreground">
								<TokenIconList size="xl" tokenList={bribeTokenList} />
								<p className="mt-1">
									{bribeTokenList.length > 0
										? "in claimable rewards"
										: "you have no rewards"}
								</p>
							</div>
							<ClaimBribesDialog
								open={open}
								setOpen={setOpen}
								disabled={bribeTokenList.length === 0}
								totalValue={totalBribes}
								bribes={bribes}
								write={() => {
									write({
										address: process.env
											.NEXT_PUBLIC_ERC20BRIBEMODULE_ADDRESS as Address,
										abi: BRIBE_PRECOMPILE_ABI,
										functionName: "claimAllBribes",
										params: [account],
									});
								}}
								isLoading={isLoading}
							/>
						</YellowCard>
						<YellowCard
							tooltip="Total amount of BGT unbonding across all validators"
							className="flex flex-1 flex-col justify-between"
						>
							<div className="text-5xl font-bold leading-[48px] text-foreground">
								{totalUnbonding?.toFixed(2) ?? 0}
							</div>
							<div className="py-[14px] text-center text-sm font-semibold leading-tight text-muted-foreground">
								BGT unbonding across {unbondingValidatorCount} validators
							</div>
							<Button
								variant="outline"
								onClick={() => {
									setTab(BGTSelectionEnum.UNBONDING_QUEUE);
									// @ts-ignore
									tabRef.current?.scrollIntoView({ behavior: "smooth" });
								}}
							>
								See my queue
							</Button>
						</YellowCard>
					</div>
					<div className="mt-16 flex flex-col gap-4">
						<div className="mx-auto">
							<Tabs value={tab} ref={tabRef}>
								<TabsList className="w-full">
									<TabsTrigger
										value={BGTSelectionEnum.YOUR_DELEGATIONS}
										className="capitalize"
										onClick={() => setTab(BGTSelectionEnum.YOUR_DELEGATIONS)}
									>
										<p className="hidden text-ellipsis sm:block">
											{" "}
											{BGTSelectionEnum.YOUR_DELEGATIONS.replaceAll("-", " ")}
										</p>
										<p className="w-22 block overflow-hidden text-ellipsis sm:hidden">
											{" "}
											{BGTSelectionEnum.YOUR_DELEGATIONS.split("-")[1]}
										</p>
									</TabsTrigger>
									<TabsTrigger
										value={BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT}
										className="capitalize"
										onClick={() =>
											setTab(BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT)
										}
									>
										<p className="hidden text-ellipsis sm:block">
											{" "}
											{BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT.replaceAll(
												"-",
												" ",
											)}
										</p>
										<p className="w-22 block overflow-hidden text-ellipsis sm:hidden">
											{" "}
											{BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT.split("-")[1]}
										</p>
									</TabsTrigger>
									<TabsTrigger
										value={BGTSelectionEnum.UNBONDING_QUEUE}
										className="capitalize"
										onClick={() => setTab(BGTSelectionEnum.UNBONDING_QUEUE)}
									>
										<p className="hidden text-ellipsis sm:block">
											{" "}
											{BGTSelectionEnum.UNBONDING_QUEUE.replaceAll("-", " ")}
										</p>
										<p className="w-22 block overflow-hidden text-ellipsis sm:hidden">
											{" "}
											{BGTSelectionEnum.UNBONDING_QUEUE.split("-")[0]}
										</p>
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
						<div className="mt-8">
							{tab === BGTSelectionEnum.YOUR_DELEGATIONS && <YourDelegations />}
							{tab === BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT && (
								<AverageGaugeWeight />
							)}
							{tab === BGTSelectionEnum.UNBONDING_QUEUE && (
								<UnbondingQueue unbondingQueue={unbondingQueue} />
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

const MyValidator = ({ validator }: { validator: Validator }) => {
	const { useValidatorDelegation } = usePollTotalDelegated();
	const userDelegated = useValidatorDelegation(validator.operatorAddr);
	return (
		<div className="flex w-[200px] justify-between leading-5 text-muted-foreground">
			<div>{validator.description.moniker}</div>
			<div>{formatter.format(Number(userDelegated))} BGT</div>
		</div>
	);
};

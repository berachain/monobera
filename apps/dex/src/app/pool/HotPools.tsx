"use client";

import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import useSWRInfinite from "swr/infinite";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { PoolCard } from "./PoolCard";

const DEFAULT_SIZE = 3;

export const HotPools = ({ isMainPage = false }: { isMainPage: boolean }) => {
	const {
		data: allData,
		size: allDataSize,
		setSize: setAllDataSize,
		isLoading: isAllDataLoading,
	} = useSWRInfinite(
		(index) => ["allData", index],
		async (key: any[]) => {
			const page = key[1] + 1;
			try {
				const res = await fetch(
					`${getAbsoluteUrl()}/pool/api?page=${page}&perPage=${DEFAULT_SIZE}&hotPools=true`,
					{
						method: "GET",
						headers: {
							"x-vercel-protection-bypass": process.env
								.VERCEL_AUTOMATION_BYPASS_SECRET as string,
						},
					},
				);
				const jsonRes = await res.json();
				return jsonRes;
			} catch (e) {
				console.error(e);
			}
		},
	);

	const isAllDataLoadingMore =
		isAllDataLoading ||
		(allDataSize > 0 &&
			allData &&
			typeof allData[allDataSize - 1] === "undefined");

	const isAllDataEmpty = allData?.[0]?.length === 0;

	const isAllDataReachingEnd =
		isAllDataEmpty ||
		(allData && allData[allData.length - 1]?.length < DEFAULT_SIZE);

	const data = allData ? [].concat(...allData) : [];

	const router = useRouter();
	return (
		<div className={"mt-[72px] w-full flex-col items-center justify-center"}>
			<div className="w-full text-center ">
				<p className="text-3xl font-extrabold">
					🔥 Hottest Yields <span className="hidden md:inline">in Defi 💰</span>
				</p>
				<p className="text-lg font-semibold leading-7 text-muted-foreground">
					Leverage our boosted yields{" "}
					<span className="hidden md:inline">to increase your rewards</span>
				</p>
				<div className="mt-6 flex w-full flex-col items-center justify-center gap-4 md:mt-12">
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 ">
						{data?.[0] &&
							data.map((pool: any) => {
								return <PoolCard pool={pool} key={`${pool?.address}hot`} />;
							})}
					</div>
					{!isMainPage && (
						<Button
							onClick={() => setAllDataSize(allDataSize + 1)}
							disabled={isAllDataLoadingMore || isAllDataReachingEnd}
							variant="outline"
						>
							{isAllDataLoadingMore
								? "Loading..."
								: isAllDataReachingEnd
								  ? "No more hot pools"
								  : "View More"}
						</Button>
					)}
					{isMainPage && (
						<Button
							variant="outline"
							className="mt-8"
							onClick={() => router.push("/pool")}
						>
							View Pools
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

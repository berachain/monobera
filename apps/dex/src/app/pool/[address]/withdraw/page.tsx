import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getMetaTitle } from "~/utils/metadata";
import { getAbsoluteUrl } from "~/utils/vercel-utils";
import WithdrawPageContent from "./WithdrawPageContent";

type Props = {
	params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
	const { address } = params;
	return {
		title: getMetaTitle("Withdraw Liquidity"),
		description: `Withdraw liquidity from pool ${address}`,
	};
}

export const fetchCache = "force-no-store";

export default async function Withdraw({
	params,
}: {
	params: { address: string };
}) {
	try {
		const poolResponse = await fetch(
			`${getAbsoluteUrl()}/api/getSelectedPool/api?address=${params.address}`,
			{
				method: "GET",
				headers: {
					"x-vercel-protection-bypass": process.env
						.VERCEL_AUTOMATION_BYPASS_SECRET as string,
				},
			},
		);
		const pricesResponse = await fetch(
			`${getAbsoluteUrl()}/api/getPrices/api`,
			{
				method: "GET",
				headers: {
					"x-vercel-protection-bypass": process.env
						.VERCEL_AUTOMATION_BYPASS_SECRET as string,
				},
			},
		);

		const pool = await poolResponse.json();
		const prices = await pricesResponse.json();

		return <WithdrawPageContent pool={pool} prices={prices} />;
	} catch (e) {
		console.log(`Error fetching pools: ${e}`);
		notFound();
	}
}

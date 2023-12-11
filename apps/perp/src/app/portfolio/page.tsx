import React from "react";
import type { Metadata } from "next";
import { perpsName } from "@bera/config";
import type { Market } from "@bera/proto/src";

import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import { getMarkets } from "~/endpoints";
import type { IMarket } from "../berpetuals/page";
import Home from "./portfolio-home";

export function generateMetadata(): Metadata {
	return {
		title: `Portfolio | ${perpsName}`,
	};
}

export const revalidate = 30;

export default async function Page() {
	const m = await getMarkets();
	const markets: IMarket[] = m?.map((m: Market) => ({
		...m,
		imageUri: MarketImages[m.name],
		tokenName: MarketTokenNames[m.name],
	})) as IMarket[];
	return <Home markets={markets} />;
}

// BELOW IS A SSR THINGY

// "use client"
// import React, { useEffect, useLayoutEffect } from "react";

// import { PortfolioHome } from "./components/portfolio";
// import { useBeraJs } from "@/../../packages/berajs/dist";
// import { redirect, useRouter } from 'next/navigation'
// import { ConnectWalletBear } from "@bera/shared-ui";

// export default function Home() {
//   const {account} = useBeraJs()
//     useLayoutEffect(() => {
//       if(account){
//         redirect(`/portfolio/${account}`)
//       }
//     }, [account])
//   return (
//     <>
//          <ConnectWalletBear message="Connect Wallet to view portfolio" />
//     </>
//   );
// }

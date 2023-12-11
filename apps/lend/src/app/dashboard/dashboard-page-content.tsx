"use client";

import React, { useEffect } from "react";
import { useBeraJs, usePollAssetWalletBalance } from "@bera/berajs";
import { ConnectWalletBear } from "@bera/shared-ui";

import { Banner } from "~/components/reward-banner";
import StatusBanner from "~/components/status-banner";
import { Dashboard } from "./dashboard";

export default function DashboardPageContent() {
	const { isReady } = useBeraJs();
	const [tableView, setUseTableView] = React.useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (tableView && window.innerWidth < 768) {
				setUseTableView(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [tableView]);

	usePollAssetWalletBalance();
	return (
		<div className="flex flex-col gap-9 md:gap-6">
			<Banner />
			<StatusBanner />
			{isReady ? (
				<Dashboard tableView={tableView} setUseTableView={setUseTableView} />
			) : (
				<div className="mt-20">
					<ConnectWalletBear message="Connect your wallet to view your supplies, borrows, and open positions." />
				</div>
			)}
		</div>
	);
}

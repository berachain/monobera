import React from "react";
import { honeyTokenAddress } from "@bera/config";
import { DataTable, NotFoundBear } from "@bera/shared-ui";

import UserTokenCard from "~/components/user-token-card";
import { available_supply_columns } from "./column";

export default function AvailableSupply({
	assets,
	tableView = false,
}: {
	assets: any[];
	tableView?: boolean;
}) {
	return (
		<>
			<div className="text-2xl font-semibold leading-loose">
				Available to Supply
			</div>
			{assets && assets.length > 0 ? (
				<>
					{tableView ? (
						<DataTable columns={available_supply_columns} data={assets} />
					) : (
						<>
							{assets
								.sort((a, b) => {
									if (a.address === honeyTokenAddress) return -1;
									if (b.address === honeyTokenAddress) return 1;
									return b.address.localeCompare(a.address);
								})

								.map((asset, index) => (
									<UserTokenCard asset={asset} key={index} type="supply" />
								))}
						</>
					)}{" "}
				</>
			) : (
				<div className="flex justify-center rounded-2xl border border-border px-4 py-6">
					<NotFoundBear
						subtitle={
							<>
								It looks like there are no assets to supply right now. <br />
								When you have eligible assets available, they will appear in
								this section.
							</>
						}
					/>
				</div>
			)}
		</>
	);
}

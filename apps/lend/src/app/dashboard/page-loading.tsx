import { Skeleton } from "@bera/ui/skeleton";

import { UserTokenLoading } from "~/components/user-token-card";

export default function PageLoading() {
	return (
		<div className="flex flex-col gap-9 md:gap-6">
			{" "}
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
				<div className="flex flex-1 flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Skeleton className="h-7 w-28" />
						<Skeleton className="h-4 w-96" />
					</div>
					<UserTokenLoading />
				</div>
				<div className="flex flex-1 flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Skeleton className="h-7 w-28" />
						<Skeleton className="h-4 w-96" />
					</div>
					<UserTokenLoading />
				</div>
			</div>
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
				<div className="flex flex-1 flex-col gap-4">
					<div className="flex justify-between gap-2">
						<Skeleton className="h-7 w-28" />
						<Skeleton className="h-4 w-32" />
					</div>
					<UserTokenLoading />
					<UserTokenLoading />
					<UserTokenLoading />
				</div>
				<div className="flex flex-1 flex-col gap-4">
					<div className="flex justify-between gap-2">
						<Skeleton className="h-7 w-28" />
						<Skeleton className="h-4 w-32" />
					</div>
					<UserTokenLoading />
				</div>
			</div>
		</div>
	);
}

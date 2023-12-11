import { useBeraJs } from "@bera/berajs";
import { perpsEndpoints } from "@bera/config";
import { type HoneyWithdrawalRequest } from "@bera/proto/src";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";

export const usePollWithdrawQueue = () => {
	const { account } = useBeraJs();
	const QUERY_KEY = ["honeywithdrawals", account];
	const { mutate } = useSWRConfig();
	const { isLoading } = useSWR(
		QUERY_KEY,
		async () => {
			if (account) {
				try {
					const res = await fetch(
						`${perpsEndpoints}/honeywithdrawals/${account}`,
					);
					const data = await res.json();
					return data;
				} catch (e) {
					return undefined;
				}
			}
			return undefined;
		},
		{
			refreshInterval: POLLING.NORMAL,
		},
	);

	const useWithdrawQueue = (): HoneyWithdrawalRequest[] | undefined => {
		const { data } = useSWRImmutable<any | undefined>(QUERY_KEY);
		if (data) {
			const withdrawRequests: HoneyWithdrawalRequest[] = data.withdraw_requests;
			const withdrawCancels: any[] = data.withdraw_cancels; // Assuming data structure, adjust as needed
			return withdrawRequests.filter((withdrawRequest) => {
				return !withdrawCancels.some((withdrawCancel) => {
					return (
						withdrawRequest.owner === withdrawCancel.owner &&
						withdrawRequest.shares === withdrawCancel.shares &&
						withdrawRequest.epoch_created === withdrawCancel.epoch_created &&
						withdrawRequest.unlock_epoch === withdrawCancel.unlock_epoch
					);
				});
			});
		}
		return data;
	};
	return {
		isLoading,
		refetch: () => void mutate(QUERY_KEY),
		useWithdrawQueue,
	};
};

import { formatUnits, getAddress } from "viem";

export const sumPrices = (
	prices: any,
	data: {
		denom: string;
		amount: string;
	}[],
) => {
	return data.reduce((acc, cur) => {
		const tokenValue = prices[getAddress(cur.denom)];
		const amount = Number(formatUnits(BigInt(cur.amount), 18));
		if (!tokenValue) {
			return acc;
		}
		const totalTokenValue = tokenValue * Number(amount);
		return acc + totalTokenValue;
	}, 0);
};

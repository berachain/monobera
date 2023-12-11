import { usePollEpochs, usePollPrices, useTokens } from "@bera/berajs";
import useSWR from "swr";
// import useSWRImmutable from "swr/immutable";
import { formatUnits, getAddress } from "viem";
import { erc20ABI, type Address } from "wagmi";

interface EpochBribe {
	bribePerProposal: {
		amount: string;
		denom: string;
	}[];
	numBlockProposals: string;
	startEpoch: string;
	valoperAddress: string;
}

export interface FormattedHistoricalBribes {
	epoch: number;
	value: number;
}

interface Call {
	abi: any[];
	address: `0x${string}`;
	functionName: string;
	args: any[];
}

export const useHistoricalBribes = (epochs: EpochBribe[]) => {
	const { useCurrentEpoch } = usePollEpochs();
	const currentEpoch = useCurrentEpoch();
	const { usePrices } = usePollPrices();
	const { data: prices } = usePrices();
	const { tokenDictionary } = useTokens();
	const QUERY_KEY = [
		"validator-historical-bribes",
		epochs,
		currentEpoch,
		prices,
	];
	return useSWR(QUERY_KEY, () => {
		console.log("rwearweereqwsafzgfdsaw");

		if (
			epochs.length === 0 ||
			currentEpoch === undefined ||
			prices === undefined ||
			!tokenDictionary
		)
			return [];

		const epoch = currentEpoch.current || 0;
		let history: EpochBribe[] = [];
		if (epochs.length > epoch) {
			history = [...epochs.slice(0, epoch)];
		} else {
			history = [...epochs];
		}
		let cumulativeBribeTotal = 0;

		console.log("rwearweeraw");

		const tokenDecimalMap: Record<Address, number> = {};

		const decimalCalls: Call[] = [];

		history?.forEach((historicalBribe: any, index) => {
			if (Object.keys(historicalBribe).length === 0) return;
			historicalBribe.bribePerProposal.forEach((total: number, bribe: any) => {
				const token = bribe.bribePerProposal.tokens[index];

				const tokenObj = tokenDictionary[getAddress(token)];
				if (tokenObj) {
					tokenDecimalMap[getAddress(token)] = tokenObj.decimals;
					return;
				}
				decimalCalls.push({
					address: token,
					abi: erc20ABI as unknown as (typeof erc20ABI)[],
					functionName: "decimals",
					args: [],
				});
			});
		});

		console.log("??????????");

		console.log("reee", { tokenDecimalMap, decimalCalls });
		const historicalBribes: FormattedHistoricalBribes[] = history.map(
			(historicalBribe: any, index) => {
				let value = 0;
				if (Object.keys(historicalBribe).length !== 0) {
					value = historicalBribe.bribePerProposal.reduce(
						(total: number, bribe: any) => {
							const tokenAddress = bribe.bribePerProposal.tokens[index];
							const decimals = tokenDecimalMap[getAddress(tokenAddress)];
							console.log({ tokenAddress, decimals });
							const formattedBribeAmount = Number(
								formatUnits(bribe.amount, decimals ?? 18),
							);
							const price = prices[getAddress(tokenAddress)] ?? 0;
							console.log({ price, formattedBribeAmount, bribe, tokenAddress });
							const bribeValue =
								Number(formattedBribeAmount) *
								price *
								Number(historicalBribe.numBlockProposals);
							cumulativeBribeTotal += bribeValue;
							return total + bribeValue;
						},
						0,
					);
				}
				return {
					epoch: epoch - index,
					value: value,
				};
			},
		);

		console.log({ historicalBribes, cumulativeBribeTotal });
		return {
			historicalBribes,
			cumulativeBribeTotal,
		};
	});
};

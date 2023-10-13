import { usePollEpochs, usePollPrices } from "@bera/berajs";
import useSWRImmutable from "swr/immutable";
import { formatUnits, getAddress } from "viem";

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

export const useHistoricalBribes = (epochs: EpochBribe[]) => {
  const { useCurrentEpoch } = usePollEpochs();
  const currentEpoch = useCurrentEpoch();
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const QUERY_KEY = [
    "validator-historical-bribes",
    epochs,
    currentEpoch,
    prices,
  ];
  return useSWRImmutable(QUERY_KEY, () => {
    if (
      epochs.length === 0 ||
      currentEpoch === undefined ||
      prices === undefined
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
    const historicalBribes: FormattedHistoricalBribes[] = history.map(
      (historicalBribe: any, index) => {
        let value = 0;
        if (Object.keys(historicalBribe).length !== 0) {
          value = historicalBribe.bribePerProposal.reduce(
            (total: number, bribe: any) => {
              const formattedBribeAmount = Number(
                formatUnits(BigInt(bribe.amount), 18),
              );
              const tokenAddress = getAddress(bribe.address);
              const price = prices[getAddress(tokenAddress)] ?? 0;
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
    return {
      historicalBribes,
      cumulativeBribeTotal,
    };
  });
};

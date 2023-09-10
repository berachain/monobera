import { usePollEpochs } from "@bera/berajs";
import useSWRImmutable from "swr/immutable";

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

  const QUERY_KEY = ["validator-historical-bribes", epochs, currentEpoch];
  return useSWRImmutable(QUERY_KEY, () => {
    if (epochs.length === 0 || !currentEpoch) return [];
    const epoch = currentEpoch.current || 0;
    let history: EpochBribe[] = [];
    if (epochs.length > epoch) {
      history = [...epochs.slice(0, epoch)];
    }

    const result: FormattedHistoricalBribes[] = history.map(
      (bribe: any, index) => {
        return {
          epoch: epoch - index,
          value: bribe?.bribePerProposal ? 100 : 0,
        };
      },
    );
    return result;
  });
};

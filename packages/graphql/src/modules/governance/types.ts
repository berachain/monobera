export interface Vote {
  id: string;
  proposalId: `${number}`;
  voter: `0x${string}`;
  weightedVoteOption: WeightedVoteOption[];
  metadata: string;
}

interface WeightedVoteOption {
  id: string;
  option: number;
  weight: string;
}

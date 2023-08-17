export interface TallyResult {
  abstainCount: string;
  noCount: string;
  noWithVetoCount: string;
  yesCount: string;
}

export interface TotalDeposit {
  amount: bigint;
  denom: string;
}

export interface Proposer {
  proposer: string;
}

export interface Proposal {
  id: bigint;
  title: string;
  status: number;
  proposalType: number; // You didn't provide this field, so you might need to adjust the type accordingly
  proposalContent: string; // You didn't provide this field, so you might need to adjust the type accordingly
  proposalResult: TallyResult;
  proposer: string;
  totalDeposit: TotalDeposit[];
  submitTime: bigint;
  depositEndTime: bigint;
  votingStartTime: bigint;
  votingEndTime: bigint;
  finalTallyResult: TallyResult;
  metadata: string;
  message: string;
  summary: string;
}

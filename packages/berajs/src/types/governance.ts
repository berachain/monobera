import { Address } from "viem";

export type Proposal = {
  block: {
    timestamp: string;
  };
  createdAt: string;
  creator: {
    name: string;
    picture: string | null;
    address: Address;
  };
  governor: {
    id: string;
    name: string;
    quorum: string;
    timelockId: string;
    token: { decimals: number };
  };
  executableCalls: ExecutableCalls[];
  id: string;
  metadata: {
    description: string;
  };
  onchainId: string;
  originalId: string;
  status: string;
  start: {
    timestamp: string;
  };
  voteStats: {
    percent: number;
    type: string;
    votersCount: number;
    votesCount: string;
  }[];
};

export type Vote = {
  block: { timestamp: string };
  reason: string;
  type: "for" | "against" | "abstain";
  voter: Voter;
  amount: string;
};

export type Voter = {
  address: Address;
  name: string;
  picture: string | null;
  twitter?: string;
};

export type ExecutableCalls = {
  calldata: string;
  offchaindata: any;
  signature: string;
  target: Address;
  type: any;
  value: string;
};

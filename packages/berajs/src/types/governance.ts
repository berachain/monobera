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
  id: string;
  metadata: {
    description: string;
  };
  onchainId: string;
  originalId: string;
  status: string;
  voteStats: {
    percent: number;
    type: string;
    votersCount: number;
    votesCount: string;
  }[];
};

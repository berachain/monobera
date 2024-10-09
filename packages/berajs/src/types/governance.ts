import { ProposalVoteFragment } from "@bera/graphql/dist/modules/governance/codegen";
import { ProposalWithVotesFragment } from "@bera/graphql/governance";
import { Address } from "viem";

export type Proposal = ProposalWithVotesFragment;

export type Vote = ProposalVoteFragment;

export type Voter = Address;

export type ExecutableCalls = {
  calldata: string;
  offchaindata: any;
  signature: string;
  target: Address;
  type: any;
  value: string;
};

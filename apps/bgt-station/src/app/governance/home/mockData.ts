import { StatusEnum } from "../types";

export const data = [
  {
    proposalStatus: StatusEnum.ACTIVE,
    proposalVotes: { yes: 40, no: 15, veto: 5, abstain: 10 },
    proposalTitle:
      "#001 Implementing Layer-2 Scaling Solutions for Faster Transactions",
    timestamp: 1678588800,
    expedited: true,
  },
  {
    proposalStatus: StatusEnum.ACTIVE,
    proposalVotes: { yes: 35, no: 20, veto: 10, abstain: 5 },
    proposalTitle: "#020 Introducing Staking Rewards for Long-Term Holders",
    timestamp: 1678502400,
    expedited: true,
  },
  {
    proposalStatus: StatusEnum.IN_QUEUE,
    proposalVotes: { yes: 20, no: 10, veto: 5, abstain: 15 },
    proposalTitle:
      "#101 Enhancing Security Protocols with Quantum-Resistant Algorithms",
    timestamp: 1678416000,
    expedited: true,
  },
  {
    proposalStatus: StatusEnum.PASSED,
    proposalVotes: { yes: 10, no: 30, veto: 5, abstain: 20 },
    proposalTitle:
      "#092 Proposal for a Decentralized Finance (DeFi) Integration",
    timestamp: 1678329600,
  },
  {
    proposalStatus: StatusEnum.REJECTED,
    proposalVotes: { yes: 10, no: 50, veto: 10, abstain: 10 },
    proposalTitle:
      "#003 Adopting Cross-Chain Interoperability for Enhanced Liquidity",
    timestamp: 1678243200,
  },
  {
    proposalStatus: StatusEnum.IN_QUEUE,
    proposalVotes: { yes: 25, no: 15, veto: 10, abstain: 5 },
    proposalTitle: "#105 Implementing Privacy Features for Enhanced Security",
    timestamp: 1678675200,
    expedited: false,
  },
  {
    proposalStatus: StatusEnum.ACTIVE,
    proposalVotes: { yes: 30, no: 10, veto: 5, abstain: 10 },
    proposalTitle: "#021 Proposal for Governance Token Distribution",
    timestamp: 1678761600,
    expedited: true,
  },
  {
    proposalStatus: StatusEnum.IN_QUEUE,
    proposalVotes: { yes: 15, no: 20, veto: 10, abstain: 10 },
    proposalTitle: "#102 Introduction of DAO Governance Structure",
    timestamp: 1678848000,
    expedited: false,
  },
  {
    proposalStatus: StatusEnum.PASSED,
    proposalVotes: { yes: 40, no: 5, veto: 5, abstain: 5 },
    proposalTitle: "#093 Upgrading Smart Contract Infrastructure",
    timestamp: 1678934400,
  },
  {
    proposalStatus: StatusEnum.REJECTED,
    proposalVotes: { yes: 10, no: 40, veto: 10, abstain: 5 },
    proposalTitle: "#004 Integration with Layer-1 Blockchains",
    timestamp: 1679020800,
  },
];

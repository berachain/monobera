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

export const description =
  "This proposal intends to upload the Ojo Oracle Contract for use by Comdex. Comdex and Harbor have agreed to begin using Ojo as an oracle provider. Ojo uses a push-model price oracle contract which broadcasts regular price updates. We plan on being the premiere price oracle for Comdex and the rest of the Cosmos; 60+ assets will be added to these feeds over the course of time, many of which are cosmos-native assets such as liquid staking tokens, stablecoins, and LP tokens. This also includes our Smart Oracle offering, which provides contextual data about these price feeds for DeFi to make safer decisions on how to mitigate risk.";

export function generateRandomData() {
  const voteTypes = ["yes", "no", "veto", "abstain"];
  const voterTypes = ["validators", "users"];
  const data = [];

  for (let i = 0; i < 100; i++) {
    const randomVoteType =
      voteTypes[Math.floor(Math.random() * voteTypes.length)];
    const randomAmount = Math.floor(Math.random() * 1000);
    const randomVoterType =
      voterTypes[Math.floor(Math.random() * voterTypes.length)];
    data.push({
      amount: randomAmount,
      voteType: randomVoteType,
      voter: "wally",
      voterTypes: randomVoterType,
    });
  }

  return data;
}

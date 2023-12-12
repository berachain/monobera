export const BGT_AGGREGATOR = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_bgtRewarder",
        type: "address",
        internalType: "address",
      },
      {
        name: "_lendRewardsAggregator",
        type: "address",
        internalType: "address",
      },
      {
        name: "_perpsRewarder",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "IS_SCRIPT",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claimAllRewards",
    inputs: [
      { name: "_receiver", type: "address", internalType: "address" },
      {
        name: "dexPoolAddresses",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getAllRewards",
    inputs: [
      { name: "_owner", type: "address", internalType: "address" },
      {
        name: "dexPoolAddresses",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [
      {
        name: "dexPendingRewards",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "lendPendingRewards",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "perpsPendingRewards",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
];

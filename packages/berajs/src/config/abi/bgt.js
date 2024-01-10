export const BGT_PRECOMPILE_ABI = [
  {
    type: "function",
    name: "redeem",
    inputs: [
      { name: "receiver", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Redeem",
    inputs: [
      {
        name: "bgtburner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "berareceiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "redeemed",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];

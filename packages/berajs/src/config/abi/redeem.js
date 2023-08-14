export const REDEEM_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "bgtburner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "berareceiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "redeemed",
        type: "uint64",
      },
    ],
    name: "Redeem",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "amount",
        type: "uint64",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

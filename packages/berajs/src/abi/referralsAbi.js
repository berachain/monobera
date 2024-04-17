export const referralsAbi = [
  {
    type: "function",
    name: "distributePotentialReward",
    inputs: [
      {
        name: "trader",
        type: "address",
        internalType: "address",
      },
      {
        name: "volumeHoney",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "pairOpenFeeP",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getPercentOfOpenFeeP",
    inputs: [
      {
        name: "trader",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPercentOfOpenFeeP_calc",
    inputs: [
      {
        name: "volumeReferredHoney",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "resultP",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTraderReferrer",
    inputs: [
      {
        name: "trader",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_storageT",
        type: "address",
        internalType: "contract ITradingStorage",
      },
      {
        name: "_startReferrerFeeP",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_openFeeP",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_targetVolumeHoney",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "openFeeP",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "referrerByTrader",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "referrerDetails",
    inputs: [
      {
        name: "referrer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IReferrals.ReferrerDetails",
        components: [
          {
            name: "tradersReferred",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "volumeReferredHoney",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "pendingRewardsToken",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalRewardsToken",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalRewardsValueHoney",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "active",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerPotentialReferrer",
    inputs: [
      {
        name: "referrer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "startReferrerFeeP",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "storageT",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ITradingStorage",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "targetVolumeHoney",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "updateOpenFeeP",
    inputs: [
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateStartReferrerFeeP",
    inputs: [
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateTargetVolumeHoney",
    inputs: [
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ReferrerRegistered",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "referrer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ReferrerRewardDistributed",
    inputs: [
      {
        name: "referrer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "volumeHoney",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "referredAmtHoney",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdatedOpenFeeP",
    inputs: [
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdatedStartReferrerFeeP",
    inputs: [
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdatedTargetVolumeHoney",
    inputs: [
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];

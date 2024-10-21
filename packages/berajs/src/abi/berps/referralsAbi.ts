export const referralsAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "UPGRADE_INTERFACE_VERSION",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
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
    name: "getAllReferrerDetails",
    inputs: [
      {
        name: "offset",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "count",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "details",
        type: "tuple[]",
        internalType: "struct IReferrals.ReferrerDetails[]",
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
        ],
      },
    ],
    stateMutability: "view",
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
    name: "getReferrerDetails",
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
        ],
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
        name: "_orders",
        type: "address",
        internalType: "address",
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
    name: "orders",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IOrdersForReferrals",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "referrersCount",
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
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
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
  {
    type: "event",
    name: "Upgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1967InvalidImplementation",
    inputs: [
      {
        name: "implementation",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1967NonPayable",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedInnerCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "UUPSUnauthorizedCallContext",
    inputs: [],
  },
  {
    type: "error",
    name: "UUPSUnsupportedProxiableUUID",
    inputs: [
      {
        name: "slot",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
] as const;

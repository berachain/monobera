export const BORROWING_FEES_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accBlockWeightedMarketCap",
        type: "uint256",
      },
    ],
    name: "GroupAccFeesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "increase",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "amount",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "oiLong",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "oiShort",
        type: "uint112",
      },
    ],
    name: "GroupOiUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint80",
        name: "maxOi",
        type: "uint80",
      },
    ],
    name: "GroupUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accBlockWeightedMarketCap",
        type: "uint256",
      },
    ],
    name: "PairAccFeesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "prevGroupIndex",
        type: "uint16",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "newGroupIndex",
        type: "uint16",
      },
    ],
    name: "PairGroupUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
    ],
    name: "PairParamsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "open",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "positionSizeDai",
        type: "uint256",
      },
    ],
    name: "TradeActionHandled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "initialPairAccFee",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "initialGroupAccFee",
        type: "uint64",
      },
    ],
    name: "TradeInitialAccFeesStored",
    type: "event",
  },
  {
    inputs: [],
    name: "getAllPairs",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "groupIndex",
                type: "uint16",
              },
              {
                internalType: "uint48",
                name: "block",
                type: "uint48",
              },
              {
                internalType: "uint64",
                name: "initialAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "initialAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "prevGroupAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "prevGroupAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "pairAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "pairAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "_placeholder",
                type: "uint64",
              },
            ],
            internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.PairGroup[]",
            name: "groups",
            type: "tuple[]",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "accLastUpdatedBlock",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "_placeholder",
            type: "uint48",
          },
          {
            internalType: "uint256",
            name: "lastAccBlockWeightedMarketCap",
            type: "uint256",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.Pair[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
    ],
    name: "getGroup",
    outputs: [
      {
        components: [
          {
            internalType: "uint112",
            name: "oiLong",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "oiShort",
            type: "uint112",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "accLastUpdatedBlock",
            type: "uint48",
          },
          {
            internalType: "uint80",
            name: "maxOi",
            type: "uint80",
          },
          {
            internalType: "uint256",
            name: "lastAccBlockWeightedMarketCap",
            type: "uint256",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.Group",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
    ],
    name: "getGroupPendingAccFee",
    outputs: [
      {
        internalType: "uint64",
        name: "accFee",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getGroupPendingAccFees",
    outputs: [
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "int256",
        name: "groupAccFeeDelta",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getGroupWeightedVaultMarketCapSinceLastUpdate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[]",
        name: "indices",
        type: "uint16[]",
      },
    ],
    name: "getGroups",
    outputs: [
      {
        components: [
          {
            internalType: "uint112",
            name: "oiLong",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "oiShort",
            type: "uint112",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "accLastUpdatedBlock",
            type: "uint48",
          },
          {
            internalType: "uint80",
            name: "maxOi",
            type: "uint80",
          },
          {
            internalType: "uint256",
            name: "lastAccBlockWeightedMarketCap",
            type: "uint256",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.Group[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getPair",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "groupIndex",
                type: "uint16",
              },
              {
                internalType: "uint48",
                name: "block",
                type: "uint48",
              },
              {
                internalType: "uint64",
                name: "initialAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "initialAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "prevGroupAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "prevGroupAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "pairAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "pairAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "_placeholder",
                type: "uint64",
              },
            ],
            internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.PairGroup[]",
            name: "groups",
            type: "tuple[]",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "accLastUpdatedBlock",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "_placeholder",
            type: "uint48",
          },
          {
            internalType: "uint256",
            name: "lastAccBlockWeightedMarketCap",
            type: "uint256",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.Pair",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "groupIndex",
            type: "uint16",
          },
          {
            internalType: "uint48",
            name: "block",
            type: "uint48",
          },
          {
            internalType: "uint64",
            name: "initialAccFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "initialAccFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "prevGroupAccFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "prevGroupAccFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "pairAccFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "pairAccFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "_placeholder",
            type: "uint64",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.PairGroup[]",
        name: "pairGroups",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "accPairFee",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accGroupFee",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "block",
            type: "uint48",
          },
          {
            internalType: "uint80",
            name: "_placeholder",
            type: "uint80",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.InitialAccFees",
        name: "initialFees",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getPairGroupAccFeesDeltas",
    outputs: [
      {
        internalType: "uint64",
        name: "deltaGroup",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "deltaPair",
        type: "uint64",
      },
      {
        internalType: "bool",
        name: "beforeTradeOpen",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getPairGroupIndex",
    outputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getPairOpenInterestDai",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
    ],
    name: "getPairPendingAccFee",
    outputs: [
      {
        internalType: "uint64",
        name: "accFee",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getPairPendingAccFees",
    outputs: [
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "int256",
        name: "pairAccFeeDelta",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getPairWeightedVaultMarketCapSinceLastUpdate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getPendingAccBlockWeightedMarketCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "oiLong",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "oiShort",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "accLastUpdatedBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vaultMarketCap",
        type: "uint256",
      },
    ],
    name: "getPendingAccFees",
    outputs: [
      {
        internalType: "uint64",
        name: "newAccFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "newAccFeeShort",
        type: "uint64",
      },
      {
        internalType: "int256",
        name: "delta",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pairIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "long",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "leverage",
            type: "uint256",
          },
        ],
        internalType:
          "struct GNSBorrowingFeesInterfaceV6_3_2.BorrowingFeeInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getTradeBorrowingFee",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getTradeInitialAccFees",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "accPairFee",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accGroupFee",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "block",
            type: "uint48",
          },
          {
            internalType: "uint80",
            name: "_placeholder",
            type: "uint80",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.InitialAccFees",
        name: "borrowingFees",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rollover",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "funding",
            type: "int256",
          },
          {
            internalType: "bool",
            name: "openedAfterUpdate",
            type: "bool",
          },
        ],
        internalType: "struct GNSPairInfosInterfaceV6.TradeInitialAccFees",
        name: "otherFees",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pairIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "openPrice",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "long",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "leverage",
            type: "uint256",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.LiqPriceInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getTradeLiquidationPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "accBlockWeightedMarketCap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastAccBlockWeightedMarketCap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockDelta",
        type: "uint256",
      },
    ],
    name: "getWeightedVaultMarketCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "groups",
    outputs: [
      {
        internalType: "uint112",
        name: "oiLong",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "oiShort",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "uint48",
        name: "accLastUpdatedBlock",
        type: "uint48",
      },
      {
        internalType: "uint80",
        name: "maxOi",
        type: "uint80",
      },
      {
        internalType: "uint256",
        name: "lastAccBlockWeightedMarketCap",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "positionSizeDai",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "open",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
    ],
    name: "handleTradeAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "initialAccFees",
    outputs: [
      {
        internalType: "uint64",
        name: "accPairFee",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accGroupFee",
        type: "uint64",
      },
      {
        internalType: "uint48",
        name: "block",
        type: "uint48",
      },
      {
        internalType: "uint80",
        name: "_placeholder",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract StorageInterfaceV5",
        name: "_storageT",
        type: "address",
      },
      {
        internalType: "contract GNSPairInfosInterfaceV6",
        name: "_pairInfos",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pairInfos",
    outputs: [
      {
        internalType: "contract GNSPairInfosInterfaceV6",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pairs",
    outputs: [
      {
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "uint48",
        name: "accLastUpdatedBlock",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "_placeholder",
        type: "uint48",
      },
      {
        internalType: "uint256",
        name: "lastAccBlockWeightedMarketCap",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint80",
            name: "maxOi",
            type: "uint80",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.GroupParams",
        name: "value",
        type: "tuple",
      },
    ],
    name: "setGroupParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[]",
        name: "indices",
        type: "uint16[]",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint80",
            name: "maxOi",
            type: "uint80",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.GroupParams[]",
        name: "values",
        type: "tuple[]",
      },
    ],
    name: "setGroupParamsArray",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "groupIndex",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.PairParams",
        name: "value",
        type: "tuple",
      },
    ],
    name: "setPairParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "indices",
        type: "uint256[]",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "groupIndex",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
        ],
        internalType: "struct GNSBorrowingFeesInterfaceV6_3_2.PairParams[]",
        name: "values",
        type: "tuple[]",
      },
    ],
    name: "setPairParamsArray",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "storageT",
    outputs: [
      {
        internalType: "contract StorageInterfaceV5",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "positionSizeDai",
        type: "uint256",
      },
    ],
    name: "withinMaxGroupOi",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

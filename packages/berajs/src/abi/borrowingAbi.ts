export const borrowingAbi = [
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
    name: "feesMarkets",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IFeesMarkets",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllPairs",
    inputs: [],
    outputs: [
      {
        name: "p",
        type: "tuple[]",
        internalType: "struct IFeesAccrued.Pair[]",
        components: [
          {
            name: "groups",
            type: "tuple[]",
            internalType: "struct IFeesAccrued.PairGroup[]",
            components: [
              {
                name: "groupIndex",
                type: "uint16",
                internalType: "uint16",
              },
              {
                name: "timestamp",
                type: "uint48",
                internalType: "uint48",
              },
              {
                name: "initialAccFeeLong",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "initialAccFeeShort",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "prevGroupAccFeeLong",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "prevGroupAccFeeShort",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "pairAccFeeLong",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "pairAccFeeShort",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "_placeholder",
                type: "uint64",
                internalType: "uint64",
              },
            ],
          },
          {
            name: "feePerSecond",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "accFeeLong",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "accFeeShort",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "accLastUpdatedTime",
            type: "uint48",
            internalType: "uint48",
          },
          {
            name: "_placeholder",
            type: "uint48",
            internalType: "uint48",
          },
          {
            name: "lastAccTimeWeightedMarketCap",
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
    name: "getGroupPendingAccFee",
    inputs: [
      {
        name: "groupIndex",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "currentTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "long",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [
      {
        name: "accFee",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGroupPendingAccFees",
    inputs: [
      {
        name: "groupIndex",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "currentTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "accFeeLong",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "accFeeShort",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGroupWeightedVaultMarketCapSinceLastUpdate",
    inputs: [
      {
        name: "groupIndex",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "currentTime",
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
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGroups",
    inputs: [
      {
        name: "indices",
        type: "uint16[]",
        internalType: "uint16[]",
      },
    ],
    outputs: [
      {
        name: "g",
        type: "tuple[]",
        internalType: "struct IFeesAccrued.Group[]",
        components: [
          {
            name: "oiLong",
            type: "uint112",
            internalType: "uint112",
          },
          {
            name: "oiShort",
            type: "uint112",
            internalType: "uint112",
          },
          {
            name: "feePerSecond",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "accFeeLong",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "accFeeShort",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "accLastUpdatedTime",
            type: "uint48",
            internalType: "uint48",
          },
          {
            name: "maxOi",
            type: "uint80",
            internalType: "uint80",
          },
          {
            name: "lastAccTimeWeightedMarketCap",
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
    name: "getGroupsCurrentAPR",
    inputs: [
      {
        name: "indices",
        type: "uint16[]",
        internalType: "uint16[]",
      },
    ],
    outputs: [
      {
        name: "borrowAPRLong",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "borrowAPRShort",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getInitialAccFees",
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
        name: "fees",
        type: "tuple[]",
        internalType: "struct IFeesAccrued.InitialAccFees[]",
        components: [
          {
            name: "tradeIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "accPairFee",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "accGroupFee",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "timestamp",
            type: "uint48",
            internalType: "uint48",
          },
          {
            name: "_placeholder",
            type: "uint80",
            internalType: "uint80",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairGroupAccFeesDeltas",
    inputs: [
      {
        name: "i",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "pairGroups",
        type: "tuple[]",
        internalType: "struct IFeesAccrued.PairGroup[]",
        components: [
          {
            name: "groupIndex",
            type: "uint16",
            internalType: "uint16",
          },
          {
            name: "timestamp",
            type: "uint48",
            internalType: "uint48",
          },
          {
            name: "initialAccFeeLong",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "initialAccFeeShort",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "prevGroupAccFeeLong",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "prevGroupAccFeeShort",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "pairAccFeeLong",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "pairAccFeeShort",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "_placeholder",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
      {
        name: "initialFees",
        type: "tuple",
        internalType: "struct IFeesAccrued.InitialAccFees",
        components: [
          {
            name: "tradeIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "accPairFee",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "accGroupFee",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "timestamp",
            type: "uint48",
            internalType: "uint48",
          },
          {
            name: "_placeholder",
            type: "uint80",
            internalType: "uint80",
          },
        ],
      },
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "long",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "currentTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "deltaGroup",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "deltaPair",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "beforeTradeOpen",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairGroupAccFeesDeltasNoTrade",
    inputs: [
      {
        name: "i",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "pairGroups",
        type: "tuple[]",
        internalType: "struct IFeesAccrued.PairGroup[]",
        components: [
          {
            name: "groupIndex",
            type: "uint16",
            internalType: "uint16",
          },
          {
            name: "timestamp",
            type: "uint48",
            internalType: "uint48",
          },
          {
            name: "initialAccFeeLong",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "initialAccFeeShort",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "prevGroupAccFeeLong",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "prevGroupAccFeeShort",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "pairAccFeeLong",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "pairAccFeeShort",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "_placeholder",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "long",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "currentTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "deltaGroup",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "deltaPair",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairGroupIndex",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "groupIndex",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairOpenInterest",
    inputs: [
      {
        name: "pairIndex",
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
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
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
    name: "getPairPendingAccFee",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "currentTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "long",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [
      {
        name: "accFee",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairPendingAccFees",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "currentTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "accFeeLong",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "accFeeShort",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairWeightedVaultMarketCapSinceLastUpdate",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "currentTime",
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
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairsCurrentAPR",
    inputs: [
      {
        name: "indices",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        name: "borrowAPRLong",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "borrowAPRShort",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairsOpenInterest",
    inputs: [
      {
        name: "indices",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        name: "longOIs",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "shortOIs",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "maxOIs",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPendingAccFees",
    inputs: [
      {
        name: "accFeeLong",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "accFeeShort",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "oiLong",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "oiShort",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "feePerSecond",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "currentTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "accLastUpdatedTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "vaultMarketCap",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "newAccFeeLong",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "newAccFeeShort",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getPendingAccTimeWeightedMarketCap",
    inputs: [
      {
        name: "currentTime",
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
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTradeBorrowingFee",
    inputs: [
      {
        name: "input",
        type: "tuple",
        internalType: "struct IFeesAccrued.BorrowingFeeInput",
        components: [
          {
            name: "pairIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tradeIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "long",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "collateral",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "leverage",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "fee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTradeInitialAccFees",
    inputs: [
      {
        name: "tradeIndex",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "feesAccrued",
        type: "tuple",
        internalType: "struct IFeesAccrued.InitialAccFees",
        components: [
          {
            name: "tradeIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "accPairFee",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "accGroupFee",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "timestamp",
            type: "uint48",
            internalType: "uint48",
          },
          {
            name: "_placeholder",
            type: "uint80",
            internalType: "uint80",
          },
        ],
      },
      {
        name: "otherFees",
        type: "tuple",
        internalType: "struct IFeesMarkets.TradeInitialAccFees",
        components: [
          {
            name: "tradeIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "rollover",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "funding",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "openedAfterUpdate",
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
    name: "getTradeLiquidationPrice",
    inputs: [
      {
        name: "input",
        type: "tuple",
        internalType: "struct IFeesAccrued.LiqPriceInput",
        components: [
          {
            name: "pairIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tradeIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "openPrice",
            type: "int64",
            internalType: "int64",
          },
          {
            name: "long",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "collateral",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "leverage",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "liqPrice",
        type: "int64",
        internalType: "int64",
      },
      {
        name: "borrowFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTradesLiquidationPrices",
    inputs: [
      {
        name: "tradeIndices",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        name: "liqPrices",
        type: "int64[]",
        internalType: "int64[]",
      },
      {
        name: "borrowFees",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getWeightedVaultMarketCap",
    inputs: [
      {
        name: "accTimeWeightedMarketCap",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "lastAccTimeWeightedMarketCap",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "timeDelta",
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
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "groups",
    inputs: [
      {
        name: "",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "oiLong",
        type: "uint112",
        internalType: "uint112",
      },
      {
        name: "oiShort",
        type: "uint112",
        internalType: "uint112",
      },
      {
        name: "feePerSecond",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "accFeeLong",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "accFeeShort",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "accLastUpdatedTime",
        type: "uint48",
        internalType: "uint48",
      },
      {
        name: "maxOi",
        type: "uint80",
        internalType: "uint80",
      },
      {
        name: "lastAccTimeWeightedMarketCap",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "handleTradeAction",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "tradeIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "positionSizeHoney",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "open",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "long",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_feesMarkets",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "orders",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IOrders",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pairs",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "feePerSecond",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "accFeeLong",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "accFeeShort",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "accLastUpdatedTime",
        type: "uint48",
        internalType: "uint48",
      },
      {
        name: "_placeholder",
        type: "uint48",
        internalType: "uint48",
      },
      {
        name: "lastAccTimeWeightedMarketCap",
        type: "uint256",
        internalType: "uint256",
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
    name: "setGroupParams",
    inputs: [
      {
        name: "groupIndex",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "value",
        type: "tuple",
        internalType: "struct IFeesAccrued.GroupParams",
        components: [
          {
            name: "baseBorrowAPR",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxOi",
            type: "uint80",
            internalType: "uint80",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGroupParamsArray",
    inputs: [
      {
        name: "indices",
        type: "uint16[]",
        internalType: "uint16[]",
      },
      {
        name: "values",
        type: "tuple[]",
        internalType: "struct IFeesAccrued.GroupParams[]",
        components: [
          {
            name: "baseBorrowAPR",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxOi",
            type: "uint80",
            internalType: "uint80",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPairParams",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "value",
        type: "tuple",
        internalType: "struct IFeesAccrued.PairParams",
        components: [
          {
            name: "groupIndex",
            type: "uint16",
            internalType: "uint16",
          },
          {
            name: "baseBorrowAPR",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPairParamsArray",
    inputs: [
      {
        name: "indices",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "values",
        type: "tuple[]",
        internalType: "struct IFeesAccrued.PairParams[]",
        components: [
          {
            name: "groupIndex",
            type: "uint16",
            internalType: "uint16",
          },
          {
            name: "baseBorrowAPR",
            type: "uint256",
            internalType: "uint256",
          },
        ],
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
    type: "function",
    name: "withinMaxGroupOi",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "long",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "positionSizeHoney",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "GroupAccFeesUpdated",
    inputs: [
      {
        name: "groupIndex",
        type: "uint16",
        indexed: true,
        internalType: "uint16",
      },
      {
        name: "currentTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "accFeeLong",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "accFeeShort",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "accBlockWeightedMarketCap",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GroupOiUpdated",
    inputs: [
      {
        name: "groupIndex",
        type: "uint16",
        indexed: true,
        internalType: "uint16",
      },
      {
        name: "long",
        type: "bool",
        indexed: true,
        internalType: "bool",
      },
      {
        name: "increase",
        type: "bool",
        indexed: true,
        internalType: "bool",
      },
      {
        name: "amount",
        type: "uint112",
        indexed: false,
        internalType: "uint112",
      },
      {
        name: "oiLong",
        type: "uint112",
        indexed: false,
        internalType: "uint112",
      },
      {
        name: "oiShort",
        type: "uint112",
        indexed: false,
        internalType: "uint112",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GroupUpdated",
    inputs: [
      {
        name: "groupIndex",
        type: "uint16",
        indexed: true,
        internalType: "uint16",
      },
      {
        name: "feePerSecond",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      {
        name: "maxOi",
        type: "uint80",
        indexed: false,
        internalType: "uint80",
      },
    ],
    anonymous: false,
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
    name: "PairAccFeesUpdated",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "currentTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "accFeeLong",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "accFeeShort",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "accBlockWeightedMarketCap",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PairGroupUpdated",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "prevGroupIndex",
        type: "uint16",
        indexed: true,
        internalType: "uint16",
      },
      {
        name: "newGroupIndex",
        type: "uint16",
        indexed: true,
        internalType: "uint16",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PairParamsUpdated",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "groupIndex",
        type: "uint16",
        indexed: true,
        internalType: "uint16",
      },
      {
        name: "feePerSecond",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TradeInitialAccFeesStored",
    inputs: [
      {
        name: "tradeIndex",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "initialPairAccFee",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "initialGroupAccFees",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
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

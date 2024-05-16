export const tradingAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "receive",
    stateMutability: "payable",
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
    name: "_msgSender",
    inputs: [],
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
    name: "borrowingFees",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IBorrowingFees",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cancelOpenLimitOrder",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "closeTradeMarket",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "priceUpdateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "delegatedAction",
    inputs: [
      {
        name: "trader",
        type: "address",
        internalType: "address",
      },
      {
        name: "call_data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "delegations",
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
    name: "done",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeLimitOrder",
    inputs: [
      {
        name: "orderType",
        type: "uint8",
        internalType: "enum ITradingStorage.LimitOrder",
      },
      {
        name: "trader",
        type: "address",
        internalType: "address",
      },
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "priceUpdateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "pythContract",
        type: "address",
        internalType: "address",
      },
      {
        name: "_tradingStorage",
        type: "address",
        internalType: "contract ITradingStorage",
      },
      {
        name: "_pairInfos",
        type: "address",
        internalType: "contract IPairInfos",
      },
      {
        name: "_borrowingFees",
        type: "address",
        internalType: "contract IBorrowingFees",
      },
      {
        name: "_pythCfg",
        type: "tuple",
        internalType: "struct ITrading.PythConfig",
        components: [
          {
            name: "confThresholdP",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "staleTolerance",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "useEma",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "_maxPosHoney",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isDone",
    inputs: [],
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
    type: "function",
    name: "isPaused",
    inputs: [],
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
    type: "function",
    name: "maxPosHoney",
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
    name: "multicall",
    inputs: [
      {
        name: "requireSuccess",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "data",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "openTrade",
    inputs: [
      {
        name: "t",
        type: "tuple",
        internalType: "struct ITradingStorage.Trade",
        components: [
          {
            name: "trader",
            type: "address",
            internalType: "address",
          },
          {
            name: "pairIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "index",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "initialPosToken",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "positionSizeHoney",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "openPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "buy",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "leverage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tp",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sl",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "orderType",
        type: "uint8",
        internalType: "enum ITradingCallbacks.TradeType",
      },
      {
        name: "slippageP",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "priceUpdateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "pairInfos",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IPairInfos",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "pyth",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IPyth",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pythConfig",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ITrading.PythConfig",
        components: [
          {
            name: "confThresholdP",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "staleTolerance",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "useEma",
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
    name: "removeDelegate",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDelegate",
    inputs: [
      {
        name: "delegate",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMaxPosHoney",
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
    name: "setPythConfig",
    inputs: [
      {
        name: "_pythCfg",
        type: "tuple",
        internalType: "struct ITrading.PythConfig",
        components: [
          {
            name: "confThresholdP",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "staleTolerance",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "useEma",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "tradingStorage",
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
    name: "updateOpenLimitOrder",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "newPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "tp",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sl",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "priceUpdateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "updateSl",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "newSl",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "priceUpdateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "updateTp",
    inputs: [
      {
        name: "pairIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "newTp",
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
    name: "Done",
    inputs: [
      {
        name: "done",
        type: "bool",
        indexed: false,
        internalType: "bool",
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
    name: "MaxPosHoneyUpdated",
    inputs: [
      {
        name: "newValue",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OpenLimitCanceled",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pairIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "openTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OpenLimitPlaced",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pairIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "order",
        type: "tuple",
        indexed: false,
        internalType: "struct ITradingStorage.OpenLimitOrder",
        components: [
          {
            name: "trader",
            type: "address",
            internalType: "address",
          },
          {
            name: "pairIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "index",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "positionSize",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "buy",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "leverage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tp",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sl",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "minPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "openTime",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OpenLimitUpdated",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pairIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newTp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newSl",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "order",
        type: "tuple",
        indexed: false,
        internalType: "struct ITradingStorage.OpenLimitOrder",
        components: [
          {
            name: "trader",
            type: "address",
            internalType: "address",
          },
          {
            name: "pairIndex",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "index",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "positionSize",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "buy",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "leverage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tp",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sl",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "minPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "openTime",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "paused",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PythConfigUpdated",
    inputs: [
      {
        name: "config",
        type: "tuple",
        indexed: false,
        internalType: "struct ITrading.PythConfig",
        components: [
          {
            name: "confThresholdP",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "staleTolerance",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "useEma",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SlUpdated",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pairIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newSl",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "openTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TpUpdated",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pairIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newTp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "openTime",
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
    name: "AboveMaxGroupCollateral",
    inputs: [],
  },
  {
    type: "error",
    name: "AboveMaxPos",
    inputs: [],
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
    name: "AmountOverflow",
    inputs: [],
  },
  {
    type: "error",
    name: "BelowMinPos",
    inputs: [],
  },
  {
    type: "error",
    name: "Done",
    inputs: [],
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
    name: "EthTransferFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedInnerCall",
    inputs: [],
  },
  {
    type: "error",
    name: "HasSl",
    inputs: [],
  },
  {
    type: "error",
    name: "InTimeout",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidConfidence",
    inputs: [
      {
        name: "invalidConfP",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidExpo",
    inputs: [
      {
        name: "pythExpo",
        type: "int32",
        internalType: "int32",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "LeverageIncorrect",
    inputs: [],
  },
  {
    type: "error",
    name: "MarketClosed",
    inputs: [],
  },
  {
    type: "error",
    name: "MaxTradesPerPair",
    inputs: [],
  },
  {
    type: "error",
    name: "NoLimit",
    inputs: [],
  },
  {
    type: "error",
    name: "NoSl",
    inputs: [],
  },
  {
    type: "error",
    name: "NoTp",
    inputs: [],
  },
  {
    type: "error",
    name: "NoTrade",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "PairNotListed",
    inputs: [],
  },
  {
    type: "error",
    name: "Paused",
    inputs: [],
  },
  {
    type: "error",
    name: "PriceImpactTooHigh",
    inputs: [],
  },
  {
    type: "error",
    name: "SlTooBig",
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
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "WrongLimitPrice",
    inputs: [],
  },
  {
    type: "error",
    name: "WrongParams",
    inputs: [],
  },
  {
    type: "error",
    name: "WrongSl",
    inputs: [],
  },
  {
    type: "error",
    name: "WrongTp",
    inputs: [],
  },
];

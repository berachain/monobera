export const TRADING_ABI = [
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
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "nonpayable",
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
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_maxPosHoney",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_staleFeedTimeout",
        type: "int256",
        internalType: "int256",
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
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "setStaleFeedTimeout",
    inputs: [
      {
        name: "value",
        type: "int256",
        internalType: "int256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "staleFeedTimeout",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "int256",
        internalType: "int256",
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
    name: "tryAggregate",
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
        name: "results",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
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
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "NumberUpdated",
    inputs: [
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
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
            name: "spreadReductionP",
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
            name: "spreadReductionP",
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
];

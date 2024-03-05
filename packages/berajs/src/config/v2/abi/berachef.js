export const BERACHEF_ABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "UPGRADE_INTERFACE_VERSION",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "activateQueuedCuttingBoard",
    inputs: [{ name: "valCoinbase", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cuttingBoardBlockDelay",
    inputs: [],
    outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "defaultCuttingBoard",
    inputs: [],
    outputs: [{ name: "startBlock", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "distributor",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getActiveCuttingBoard",
    inputs: [{ name: "valCoinbase", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IBeraChef.CuttingBoard",
        components: [
          {
            name: "startBlock",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "weights",
            type: "tuple[]",
            internalType: "struct IBeraChef.Weight[]",
            components: [
              {
                name: "receiver",
                type: "address",
                internalType: "address",
              },
              {
                name: "percentageNumerator",
                type: "uint96",
                internalType: "uint96",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDefaultCuttingBoard",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IBeraChef.CuttingBoard",
        components: [
          { name: "startBlock", type: "uint64", internalType: "uint64" },
          {
            name: "weights",
            type: "tuple[]",
            internalType: "struct IBeraChef.Weight[]",
            components: [
              {
                name: "receiver",
                type: "address",
                internalType: "address",
              },
              {
                name: "percentageNumerator",
                type: "uint96",
                internalType: "uint96",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOperator",
    inputs: [{ name: "valCoinbase", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getQueuedCuttingBoard",
    inputs: [{ name: "valCoinbase", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IBeraChef.CuttingBoard",
        components: [
          { name: "startBlock", type: "uint64", internalType: "uint64" },
          {
            name: "weights",
            type: "tuple[]",
            internalType: "struct IBeraChef.Weight[]",
            components: [
              {
                name: "receiver",
                type: "address",
                internalType: "address",
              },
              {
                name: "percentageNumerator",
                type: "uint96",
                internalType: "uint96",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "_distributor", type: "address", internalType: "address" },
      { name: "_governance", type: "address", internalType: "address" },
      {
        name: "_maxNumWeightsPerCuttingBoard",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isFriendOfTheChef",
    inputs: [{ name: "receiver", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isQueuedCuttingBoardReady",
    inputs: [{ name: "valCoinbase", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isReady",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxNumWeightsPerCuttingBoard",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "queueNewCuttingBoard",
    inputs: [
      { name: "valCoinbase", type: "address", internalType: "address" },
      { name: "startBlock", type: "uint64", internalType: "uint64" },
      {
        name: "weights",
        type: "tuple[]",
        internalType: "struct IBeraChef.Weight[]",
        components: [
          { name: "receiver", type: "address", internalType: "address" },
          {
            name: "percentageNumerator",
            type: "uint96",
            internalType: "uint96",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCuttingBoardBlockDelay",
    inputs: [
      {
        name: "_cuttingBoardBlockDelay",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDefaultCuttingBoard",
    inputs: [
      {
        name: "cb",
        type: "tuple",
        internalType: "struct IBeraChef.CuttingBoard",
        components: [
          { name: "startBlock", type: "uint64", internalType: "uint64" },
          {
            name: "weights",
            type: "tuple[]",
            internalType: "struct IBeraChef.Weight[]",
            components: [
              {
                name: "receiver",
                type: "address",
                internalType: "address",
              },
              {
                name: "percentageNumerator",
                type: "uint96",
                internalType: "uint96",
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMaxNumWeightsPerCuttingBoard",
    inputs: [
      {
        name: "_maxNumWeightsPerCuttingBoard",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setOperator",
    inputs: [
      {
        name: "operatorAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateFriendsOfTheChef",
    inputs: [
      { name: "receiver", type: "address", internalType: "address" },
      { name: "isFriend", type: "bool", internalType: "bool" },
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
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "ActivateCuttingBoard",
    inputs: [
      {
        name: "valCoinbase",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "startBlock",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "weights",
        type: "tuple[]",
        indexed: false,
        internalType: "struct IBeraChef.Weight[]",
        components: [
          { name: "receiver", type: "address", internalType: "address" },
          {
            name: "percentageNumerator",
            type: "uint96",
            internalType: "uint96",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CuttingBoardBlockDelaySet",
    inputs: [
      {
        name: "cuttingBoardBlockDelay",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FriendsOfTheChefUpdated",
    inputs: [
      {
        name: "receiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "isFriend",
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
    name: "MaxNumWeightsPerCuttingBoardSet",
    inputs: [
      {
        name: "maxNumWeightsPerCuttingBoard",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "QueueCuttingBoard",
    inputs: [
      {
        name: "valCoinbase",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "startBlock",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "weights",
        type: "tuple[]",
        indexed: false,
        internalType: "struct IBeraChef.Weight[]",
        components: [
          { name: "receiver", type: "address", internalType: "address" },
          {
            name: "percentageNumerator",
            type: "uint96",
            internalType: "uint96",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetDefaultCuttingBoard",
    inputs: [
      {
        name: "blockNumber",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "cuttingBoard",
        type: "tuple",
        indexed: false,
        internalType: "struct IBeraChef.CuttingBoard",
        components: [
          { name: "startBlock", type: "uint64", internalType: "uint64" },
          {
            name: "weights",
            type: "tuple[]",
            internalType: "struct IBeraChef.Weight[]",
            components: [
              {
                name: "receiver",
                type: "address",
                internalType: "address",
              },
              {
                name: "percentageNumerator",
                type: "uint96",
                internalType: "uint96",
              },
            ],
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetOperator",
    inputs: [
      {
        name: "valCoinbase",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operatorAddress",
        type: "address",
        indexed: true,
        internalType: "address",
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
    inputs: [{ name: "target", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC1967InvalidImplementation",
    inputs: [
      { name: "implementation", type: "address", internalType: "address" },
    ],
  },
  { type: "error", name: "ERC1967NonPayable", inputs: [] },
  { type: "error", name: "FailedInnerCall", inputs: [] },
  { type: "error", name: "InvalidCuttingBoardWeights", inputs: [] },
  { type: "error", name: "InvalidInitialization", inputs: [] },
  { type: "error", name: "InvalidStartBlock", inputs: [] },
  { type: "error", name: "NotDistributor", inputs: [] },
  { type: "error", name: "NotFriendOfTheChef", inputs: [] },
  { type: "error", name: "NotGovernance", inputs: [] },
  { type: "error", name: "NotInitializing", inputs: [] },
  { type: "error", name: "NotValidatorOrOperator", inputs: [] },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "QueuedCuttingBoardNotFound", inputs: [] },
  { type: "error", name: "QueuedCuttingBoardNotReady", inputs: [] },
  { type: "error", name: "TooManyWeights", inputs: [] },
  { type: "error", name: "UUPSUnauthorizedCallContext", inputs: [] },
  {
    type: "error",
    name: "UUPSUnsupportedProxiableUUID",
    inputs: [{ name: "slot", type: "bytes32", internalType: "bytes32" }],
  },
];

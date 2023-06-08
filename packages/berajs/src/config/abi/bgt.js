export const BGT_PRECOMPILE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "accAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BgtRedeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "consAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int64",
        name: "startEpoch",
        type: "int64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "numBlockProposals",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "remainingProposals",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct IBGTModule.Coin[]",
        name: "releasePerProposal",
        type: "tuple[]",
      },
    ],
    name: "BribeConsumed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "consAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int64",
        name: "startEpoch",
        type: "int64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "numBlockProposals",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "remainingProposals",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct IBGTModule.Coin[]",
        name: "releasePerProposal",
        type: "tuple[]",
      },
    ],
    name: "NewBribe",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operatorAddr",
        type: "address",
      },
      {
        internalType: "int64",
        name: "startEpoch",
        type: "int64",
      },
      {
        internalType: "uint64",
        name: "numBlockProposals",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
        ],
        internalType: "struct IBGTModule.Coin[]",
        name: "releasePerProposal",
        type: "tuple[]",
      },
    ],
    name: "createBribe",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "remainingBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
            ],
            internalType: "struct IBGTModule.Coin[]",
            name: "releasePerProposal",
            type: "tuple[]",
          },
        ],
        internalType: "struct IBGTModule.Bribe",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "operatorAddr",
        type: "string",
      },
    ],
    name: "getActiveBribesForValidator",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "remainingBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
            ],
            internalType: "struct IBGTModule.Coin[]",
            name: "releasePerProposal",
            type: "tuple[]",
          },
        ],
        internalType: "struct IBGTModule.Bribe[]",
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
        internalType: "address",
        name: "operatorAddr",
        type: "address",
      },
    ],
    name: "getActiveBribesForValidator",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "remainingBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
            ],
            internalType: "struct IBGTModule.Coin[]",
            name: "releasePerProposal",
            type: "tuple[]",
          },
        ],
        internalType: "struct IBGTModule.Bribe[]",
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
        internalType: "address",
        name: "operatorAddr",
        type: "address",
      },
      {
        internalType: "int64",
        name: "startEpoch",
        type: "int64",
      },
    ],
    name: "getBribeForValidator",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "remainingBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
            ],
            internalType: "struct IBGTModule.Coin[]",
            name: "releasePerProposal",
            type: "tuple[]",
          },
        ],
        internalType: "struct IBGTModule.Bribe",
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
        internalType: "string",
        name: "operatorAddr",
        type: "string",
      },
      {
        internalType: "int64",
        name: "startEpoch",
        type: "int64",
      },
    ],
    name: "getBribeForValidator",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "remainingBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
            ],
            internalType: "struct IBGTModule.Coin[]",
            name: "releasePerProposal",
            type: "tuple[]",
          },
        ],
        internalType: "struct IBGTModule.Bribe",
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
        internalType: "string",
        name: "operatorAddr",
        type: "string",
      },
    ],
    name: "getBribesForValidator",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "remainingBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
            ],
            internalType: "struct IBGTModule.Coin[]",
            name: "releasePerProposal",
            type: "tuple[]",
          },
        ],
        internalType: "struct IBGTModule.Bribe[]",
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
        internalType: "address",
        name: "operatorAddr",
        type: "address",
      },
    ],
    name: "getBribesForValidator",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "remainingBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
            ],
            internalType: "struct IBGTModule.Coin[]",
            name: "releasePerProposal",
            type: "tuple[]",
          },
        ],
        internalType: "struct IBGTModule.Bribe[]",
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
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "amount",
        type: "string",
      },
    ],
    name: "redeemBgtForBera",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

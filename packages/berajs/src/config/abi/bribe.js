export const BRIBE_PRECOMPILE_ABI = [
  {
    inputs: [],
    name: "bribeModule",
    outputs: [
      {
        internalType: "contract IBribeModule",
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
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "startEpoch",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "numBlockProposals",
        type: "uint64",
      },
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "createBribe",
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
  {
    inputs: [],
    name: "erc20Module",
    outputs: [
      {
        internalType: "contract IERC20Module",
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
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "getActiveValidatorBribes",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consensusAddress",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "startEpoch",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "address[]",
                name: "tokens",
                type: "address[]",
              },
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            internalType: "struct ERC20BribeModule.BribePerProposal",
            name: "bribePerProposal",
            type: "tuple",
          },
        ],
        internalType: "struct ERC20BribeModule.Bribe[]",
        name: "bribe",
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
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "startEpoch",
        type: "uint64",
      },
    ],
    name: "getBribeForValidator",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consensusAddress",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "startEpoch",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "address[]",
                name: "tokens",
                type: "address[]",
              },
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            internalType: "struct ERC20BribeModule.BribePerProposal",
            name: "bribePerProposal",
            type: "tuple",
          },
        ],
        internalType: "struct ERC20BribeModule.Bribe",
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
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "getValidatorBribes",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consensusAddress",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "startEpoch",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "numBlockProposals",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "address[]",
                name: "tokens",
                type: "address[]",
              },
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            internalType: "struct ERC20BribeModule.BribePerProposal",
            name: "bribePerProposal",
            type: "tuple",
          },
        ],
        internalType: "struct ERC20BribeModule.Bribe[]",
        name: "bribe",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

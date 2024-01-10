export const BRIBE_PRECOMPILE_ABI = [
  {
    type: "function",
    name: "bribeModule",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IBribeModule" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claimAllBribes",
    inputs: [{ name: "delegator", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimValidatorBribes",
    inputs: [
      { name: "delegator", type: "address", internalType: "address" },
      { name: "validator", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createBribe",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "startEpoch", type: "uint64", internalType: "uint64" },
      { name: "numBlockProposals", type: "uint64", internalType: "uint64" },
      { name: "tokens", type: "address[]", internalType: "address[]" },
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "distributionModule",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IDistributionModule",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "erc20Module",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IERC20BankModule" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getActiveValidatorBribes",
    inputs: [{ name: "operator", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "bribe",
        type: "tuple[]",
        internalType: "struct ERC20BribeModule.Bribe[]",
        components: [
          {
            name: "consensusAddress",
            type: "address",
            internalType: "address",
          },
          { name: "startEpoch", type: "uint64", internalType: "uint64" },
          { name: "numBlockProposals", type: "uint64", internalType: "uint64" },
          {
            name: "numBlockProposalsBribed",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "bribePerProposal",
            type: "tuple",
            internalType: "struct ERC20BribeModule.BribePerProposal",
            components: [
              { name: "tokens", type: "address[]", internalType: "address[]" },
              { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllValidatorBribes",
    inputs: [{ name: "operator", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "bribe",
        type: "tuple[]",
        internalType: "struct ERC20BribeModule.Bribe[]",
        components: [
          {
            name: "consensusAddress",
            type: "address",
            internalType: "address",
          },
          { name: "startEpoch", type: "uint64", internalType: "uint64" },
          { name: "numBlockProposals", type: "uint64", internalType: "uint64" },
          {
            name: "numBlockProposalsBribed",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "bribePerProposal",
            type: "tuple",
            internalType: "struct ERC20BribeModule.BribePerProposal",
            components: [
              { name: "tokens", type: "address[]", internalType: "address[]" },
              { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBribesForValidator",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "startEpoch", type: "uint64", internalType: "uint64" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct ERC20BribeModule.Bribe[]",
        components: [
          {
            name: "consensusAddress",
            type: "address",
            internalType: "address",
          },
          { name: "startEpoch", type: "uint64", internalType: "uint64" },
          { name: "numBlockProposals", type: "uint64", internalType: "uint64" },
          {
            name: "numBlockProposalsBribed",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "bribePerProposal",
            type: "tuple",
            internalType: "struct ERC20BribeModule.BribePerProposal",
            components: [
              { name: "tokens", type: "address[]", internalType: "address[]" },
              { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewClaimAllBribes",
    inputs: [{ name: "delegator", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "rewards",
        type: "tuple[]",
        internalType: "struct ERC20BribeModule.Reward[]",
        components: [
          { name: "token", type: "address", internalType: "address" },
          { name: "amount", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewClaimValidatorBribes",
    inputs: [{ name: "delegator", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "rewards",
        type: "tuple[]",
        internalType: "struct ERC20BribeModule.ValidatorReward[]",
        components: [
          { name: "validator", type: "address", internalType: "address" },
          {
            name: "reward",
            type: "tuple[]",
            internalType: "struct ERC20BribeModule.Reward[]",
            components: [
              { name: "token", type: "address", internalType: "address" },
              { name: "amount", type: "uint256", internalType: "uint256" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
];

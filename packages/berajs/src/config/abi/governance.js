export const GOVERNANCE_PRECOMPILE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "CancelProposal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "proposalId",
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
        internalType: "struct Cosmos.Coin[]",
        name: "amount",
        type: "tuple[]",
      },
    ],
    name: "ProposalDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "string",
        name: "option",
        type: "string",
      },
    ],
    name: "ProposalVote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "SubmitProposal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
    ],
    name: "cancelProposal",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
    ],
    name: "getProposal",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "id",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
          {
            internalType: "int32",
            name: "status",
            type: "int32",
          },
          {
            components: [
              {
                internalType: "string",
                name: "yesCount",
                type: "string",
              },
              {
                internalType: "string",
                name: "abstainCount",
                type: "string",
              },
              {
                internalType: "string",
                name: "noCount",
                type: "string",
              },
              {
                internalType: "string",
                name: "noWithVetoCount",
                type: "string",
              },
            ],
            internalType: "struct IGovernanceModule.TallyResult",
            name: "finalTallyResult",
            type: "tuple",
          },
          {
            internalType: "uint64",
            name: "submitTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "depositEndTime",
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
            internalType: "struct Cosmos.Coin[]",
            name: "totalDeposit",
            type: "tuple[]",
          },
          {
            internalType: "uint64",
            name: "votingStartTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "votingEndTime",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "summary",
            type: "string",
          },
          {
            internalType: "string",
            name: "proposer",
            type: "string",
          },
        ],
        internalType: "struct IGovernanceModule.Proposal",
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
        internalType: "int32",
        name: "proposalStatus",
        type: "int32",
      },
    ],
    name: "getProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "id",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
          {
            internalType: "int32",
            name: "status",
            type: "int32",
          },
          {
            components: [
              {
                internalType: "string",
                name: "yesCount",
                type: "string",
              },
              {
                internalType: "string",
                name: "abstainCount",
                type: "string",
              },
              {
                internalType: "string",
                name: "noCount",
                type: "string",
              },
              {
                internalType: "string",
                name: "noWithVetoCount",
                type: "string",
              },
            ],
            internalType: "struct IGovernanceModule.TallyResult",
            name: "finalTallyResult",
            type: "tuple",
          },
          {
            internalType: "uint64",
            name: "submitTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "depositEndTime",
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
            internalType: "struct Cosmos.Coin[]",
            name: "totalDeposit",
            type: "tuple[]",
          },
          {
            internalType: "uint64",
            name: "votingStartTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "votingEndTime",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "summary",
            type: "string",
          },
          {
            internalType: "string",
            name: "proposer",
            type: "string",
          },
        ],
        internalType: "struct IGovernanceModule.Proposal[]",
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
        internalType: "bytes",
        name: "proposal",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "submitProposal",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
      {
        internalType: "int32",
        name: "option",
        type: "int32",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "vote",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "voteOption",
            type: "int32",
          },
          {
            internalType: "string",
            name: "weight",
            type: "string",
          },
        ],
        internalType: "struct IGovernanceModule.WeightedVoteOption[]",
        name: "options",
        type: "tuple[]",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "voteWeighted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

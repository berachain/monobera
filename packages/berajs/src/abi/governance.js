/**
 * @deprecated
 */
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
        indexed: true,
        internalType: "address",
        name: "proposalSender",
        type: "address",
      },
    ],
    name: "ProposalSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "proposalId",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "voter",
            type: "address",
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
        indexed: false,
        internalType: "struct IGovernanceModule.Vote",
        name: "proposalVote",
        type: "tuple",
      },
    ],
    name: "ProposalVoted",
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
    inputs: [],
    name: "getConstitution",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDepositParams",
    outputs: [
      {
        components: [
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
            name: "minDeposit",
            type: "tuple[]",
          },
          {
            internalType: "uint64",
            name: "maxDepositPeriod",
            type: "uint64",
          },
        ],
        internalType: "struct IGovernanceModule.DepositParams",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getParams",
    outputs: [
      {
        components: [
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
            name: "minDeposit",
            type: "tuple[]",
          },
          {
            internalType: "uint64",
            name: "maxDepositPeriod",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "votingPeriod",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "quorum",
            type: "string",
          },
          {
            internalType: "string",
            name: "threshold",
            type: "string",
          },
          {
            internalType: "string",
            name: "vetoThreshold",
            type: "string",
          },
          {
            internalType: "string",
            name: "minInitialDepositRatio",
            type: "string",
          },
          {
            internalType: "string",
            name: "proposalCancelRatio",
            type: "string",
          },
          {
            internalType: "string",
            name: "proposalCancelDest",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "expeditedVotingPeriod",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "expeditedThreshold",
            type: "string",
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
            name: "expeditedMinDeposit",
            type: "tuple[]",
          },
          {
            internalType: "bool",
            name: "burnVoteQuorum",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "burnProposalDepositPrevote",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "burnVoteVeto",
            type: "bool",
          },
        ],
        internalType: "struct IGovernanceModule.Params",
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
            components: [
              {
                internalType: "string",
                name: "typeURL",
                type: "string",
              },
              {
                internalType: "bytes",
                name: "value",
                type: "bytes",
              },
            ],
            internalType: "struct Cosmos.CodecAny[]",
            name: "messages",
            type: "tuple[]",
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
            internalType: "address",
            name: "proposer",
            type: "address",
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
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
    ],
    name: "getProposalDeposits",
    outputs: [
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
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "depositor",
        type: "address",
      },
    ],
    name: "getProposalDepositsByDepositor",
    outputs: [
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
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
    ],
    name: "getProposalTallyResult",
    outputs: [
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
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "string",
            name: "key",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "offset",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "limit",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "countTotal",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "reverse",
            type: "bool",
          },
        ],
        internalType: "struct Cosmos.PageRequest",
        name: "pagination",
        type: "tuple",
      },
    ],
    name: "getProposalVotes",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "proposalId",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "voter",
            type: "address",
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
        internalType: "struct IGovernanceModule.Vote[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "nextKey",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "total",
            type: "uint64",
          },
        ],
        internalType: "struct Cosmos.PageResponse",
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
        internalType: "uint64",
        name: "proposalId",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "getProposalVotesByVoter",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "proposalId",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "voter",
            type: "address",
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
        internalType: "struct IGovernanceModule.Vote",
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
      {
        components: [
          {
            internalType: "string",
            name: "key",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "offset",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "limit",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "countTotal",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "reverse",
            type: "bool",
          },
        ],
        internalType: "struct Cosmos.PageRequest",
        name: "pagination",
        type: "tuple",
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
            components: [
              {
                internalType: "string",
                name: "typeURL",
                type: "string",
              },
              {
                internalType: "bytes",
                name: "value",
                type: "bytes",
              },
            ],
            internalType: "struct Cosmos.CodecAny[]",
            name: "messages",
            type: "tuple[]",
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
            internalType: "address",
            name: "proposer",
            type: "address",
          },
        ],
        internalType: "struct IGovernanceModule.Proposal[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "nextKey",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "total",
            type: "uint64",
          },
        ],
        internalType: "struct Cosmos.PageResponse",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTallyParams",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "quorum",
            type: "string",
          },
          {
            internalType: "string",
            name: "threshold",
            type: "string",
          },
          {
            internalType: "string",
            name: "vetoThreshold",
            type: "string",
          },
        ],
        internalType: "struct IGovernanceModule.TallyParams",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotingParams",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "votingPeriod",
            type: "uint64",
          },
        ],
        internalType: "struct IGovernanceModule.VotingParams",
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
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "typeURL",
                type: "string",
              },
              {
                internalType: "bytes",
                name: "value",
                type: "bytes",
              },
            ],
            internalType: "struct Cosmos.CodecAny[]",
            name: "messages",
            type: "tuple[]",
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
            name: "initialDeposit",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "proposer",
            type: "address",
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
            internalType: "bool",
            name: "expedited",
            type: "bool",
          },
        ],
        internalType: "struct IGovernanceModule.MsgSubmitProposal",
        name: "proposal",
        type: "tuple",
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

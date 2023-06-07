export const STAKING_PRECOMPILE_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "validatorSrcAddr",
        type: "string",
      },
      {
        internalType: "string",
        name: "validatorDstAddr",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "beginRedelegate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "validatorSrcAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "validatorDstAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "beginRedelegate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "validatorAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "int64",
        name: "creationHeight",
        type: "int64",
      },
    ],
    name: "cancelUnbondingDelegation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "validatorAddress",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "int64",
        name: "creationHeight",
        type: "int64",
      },
    ],
    name: "cancelUnbondingDelegation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "validatorAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "validatorAddress",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "validatorAddress",
        type: "string",
      },
    ],
    name: "getDelegation",
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
        internalType: "address",
        name: "validatorAddress",
        type: "address",
      },
    ],
    name: "getDelegation",
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
        internalType: "address",
        name: "validatorSrcAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "validatorDstAddr",
        type: "address",
      },
    ],
    name: "getRedelegations",
    outputs: [
      {
        components: [
          {
            internalType: "int64",
            name: "creationHeight",
            type: "int64",
          },
          {
            internalType: "string",
            name: "completionTime",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "initialBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sharesDst",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "unbondingId",
            type: "uint64",
          },
        ],
        internalType: "struct IStakingModule.RedelegationEntry[]",
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
        internalType: "string",
        name: "validatorSrcAddr",
        type: "string",
      },
      {
        internalType: "string",
        name: "validatorDstAddr",
        type: "string",
      },
    ],
    name: "getRedelegations",
    outputs: [
      {
        components: [
          {
            internalType: "int64",
            name: "creationHeight",
            type: "int64",
          },
          {
            internalType: "string",
            name: "completionTime",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "initialBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sharesDst",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "unbondingId",
            type: "uint64",
          },
        ],
        internalType: "struct IStakingModule.RedelegationEntry[]",
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
        internalType: "string",
        name: "validatorAddress",
        type: "string",
      },
    ],
    name: "getUnbondingDelegation",
    outputs: [
      {
        components: [
          {
            internalType: "int64",
            name: "creationHeight",
            type: "int64",
          },
          {
            internalType: "string",
            name: "completionTime",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "initialBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "unbondingId",
            type: "uint64",
          },
        ],
        internalType: "struct IStakingModule.UnbondingDelegationEntry[]",
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
        name: "validatorAddress",
        type: "address",
      },
    ],
    name: "getUnbondingDelegation",
    outputs: [
      {
        components: [
          {
            internalType: "int64",
            name: "creationHeight",
            type: "int64",
          },
          {
            internalType: "string",
            name: "completionTime",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "initialBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "unbondingId",
            type: "uint64",
          },
        ],
        internalType: "struct IStakingModule.UnbondingDelegationEntry[]",
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
        name: "validatorAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "undelegate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "validatorAddress",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "undelegate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

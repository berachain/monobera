export const STAKING_PRECOMPILE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "validator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
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
      {
        indexed: false,
        internalType: "int64",
        name: "creationHeight",
        type: "int64",
      },
    ],
    name: "CancelUnbondingDelegation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "validator",
        type: "address",
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
    name: "CreateValidator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "validator",
        type: "address",
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
    name: "Delegate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sourceValidator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "destinationValidator",
        type: "address",
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
    name: "Redelegate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "validator",
        type: "address",
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
    name: "Unbond",
    type: "event",
  },

  {
    inputs: [
      {
        internalType: "address",
        name: "srcValidator",
        type: "address",
      },
      {
        internalType: "address",
        name: "dstValidator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "beginRedelegate",
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
    inputs: [
      {
        internalType: "string",
        name: "srcValidator",
        type: "string",
      },
      {
        internalType: "string",
        name: "dstValidator",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "beginRedelegate",
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
    name: "getActiveValidators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatorAddress",
        type: "address",
      },
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
        name: "delegatorAddress",
        type: "address",
      },
    ],
    name: "getDelegatorValidators",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "operatorAddress",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "consensusPubkey",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "jailed",
            type: "bool",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "delegatorShares",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "moniker",
                type: "string",
              },
              {
                internalType: "string",
                name: "identity",
                type: "string",
              },
              {
                internalType: "string",
                name: "website",
                type: "string",
              },
              {
                internalType: "string",
                name: "securityContact",
                type: "string",
              },
              {
                internalType: "string",
                name: "details",
                type: "string",
              },
            ],
            internalType: "struct IStakingModule.Description",
            name: "description",
            type: "tuple",
          },
          {
            internalType: "int64",
            name: "unbondingHeight",
            type: "int64",
          },
          {
            internalType: "string",
            name: "unbondingTime",
            type: "string",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "rate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxChangeRate",
                    type: "uint256",
                  },
                ],
                internalType: "struct IStakingModule.CommissionRates",
                name: "commissionRates",
                type: "tuple",
              },
              {
                internalType: "string",
                name: "updateTime",
                type: "string",
              },
            ],
            internalType: "struct IStakingModule.Commission",
            name: "commission",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "minSelfDelegation",
            type: "uint256",
          },
          {
            internalType: "int64",
            name: "unbondingOnHoldRefCount",
            type: "int64",
          },
          {
            internalType: "uint64[]",
            name: "unbondingIds",
            type: "uint64[]",
          },
        ],
        internalType: "struct IStakingModule.Validator[]",
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
        name: "delegatorAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "srcValidator",
        type: "address",
      },
      {
        internalType: "address",
        name: "dstValidator",
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
        name: "delegatorAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "srcValidator",
        type: "string",
      },
      {
        internalType: "string",
        name: "dstValidator",
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
        internalType: "address",
        name: "delegatorAddress",
        type: "address",
      },
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
    ],
    name: "getValidator",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "operatorAddress",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "consensusPubkey",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "jailed",
            type: "bool",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "delegatorShares",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "moniker",
                type: "string",
              },
              {
                internalType: "string",
                name: "identity",
                type: "string",
              },
              {
                internalType: "string",
                name: "website",
                type: "string",
              },
              {
                internalType: "string",
                name: "securityContact",
                type: "string",
              },
              {
                internalType: "string",
                name: "details",
                type: "string",
              },
            ],
            internalType: "struct IStakingModule.Description",
            name: "description",
            type: "tuple",
          },
          {
            internalType: "int64",
            name: "unbondingHeight",
            type: "int64",
          },
          {
            internalType: "string",
            name: "unbondingTime",
            type: "string",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "rate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxChangeRate",
                    type: "uint256",
                  },
                ],
                internalType: "struct IStakingModule.CommissionRates",
                name: "commissionRates",
                type: "tuple",
              },
              {
                internalType: "string",
                name: "updateTime",
                type: "string",
              },
            ],
            internalType: "struct IStakingModule.Commission",
            name: "commission",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "minSelfDelegation",
            type: "uint256",
          },
          {
            internalType: "int64",
            name: "unbondingOnHoldRefCount",
            type: "int64",
          },
          {
            internalType: "uint64[]",
            name: "unbondingIds",
            type: "uint64[]",
          },
        ],
        internalType: "struct IStakingModule.Validator",
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
        name: "validatorAddress",
        type: "string",
      },
    ],
    name: "getValidator",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "operatorAddress",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "consensusPubkey",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "jailed",
            type: "bool",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "delegatorShares",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "moniker",
                type: "string",
              },
              {
                internalType: "string",
                name: "identity",
                type: "string",
              },
              {
                internalType: "string",
                name: "website",
                type: "string",
              },
              {
                internalType: "string",
                name: "securityContact",
                type: "string",
              },
              {
                internalType: "string",
                name: "details",
                type: "string",
              },
            ],
            internalType: "struct IStakingModule.Description",
            name: "description",
            type: "tuple",
          },
          {
            internalType: "int64",
            name: "unbondingHeight",
            type: "int64",
          },
          {
            internalType: "string",
            name: "unbondingTime",
            type: "string",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "rate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxChangeRate",
                    type: "uint256",
                  },
                ],
                internalType: "struct IStakingModule.CommissionRates",
                name: "commissionRates",
                type: "tuple",
              },
              {
                internalType: "string",
                name: "updateTime",
                type: "string",
              },
            ],
            internalType: "struct IStakingModule.Commission",
            name: "commission",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "minSelfDelegation",
            type: "uint256",
          },
          {
            internalType: "int64",
            name: "unbondingOnHoldRefCount",
            type: "int64",
          },
          {
            internalType: "uint64[]",
            name: "unbondingIds",
            type: "uint64[]",
          },
        ],
        internalType: "struct IStakingModule.Validator",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValidators",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "operatorAddress",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "consensusPubkey",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "jailed",
            type: "bool",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "delegatorShares",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "moniker",
                type: "string",
              },
              {
                internalType: "string",
                name: "identity",
                type: "string",
              },
              {
                internalType: "string",
                name: "website",
                type: "string",
              },
              {
                internalType: "string",
                name: "securityContact",
                type: "string",
              },
              {
                internalType: "string",
                name: "details",
                type: "string",
              },
            ],
            internalType: "struct IStakingModule.Description",
            name: "description",
            type: "tuple",
          },
          {
            internalType: "int64",
            name: "unbondingHeight",
            type: "int64",
          },
          {
            internalType: "string",
            name: "unbondingTime",
            type: "string",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "rate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxChangeRate",
                    type: "uint256",
                  },
                ],
                internalType: "struct IStakingModule.CommissionRates",
                name: "commissionRates",
                type: "tuple",
              },
              {
                internalType: "string",
                name: "updateTime",
                type: "string",
              },
            ],
            internalType: "struct IStakingModule.Commission",
            name: "commission",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "minSelfDelegation",
            type: "uint256",
          },
          {
            internalType: "int64",
            name: "unbondingOnHoldRefCount",
            type: "int64",
          },
          {
            internalType: "uint64[]",
            name: "unbondingIds",
            type: "uint64[]",
          },
        ],
        internalType: "struct IStakingModule.Validator[]",
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

export const BERACHAIN_REWARD_VAULTS_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_bgt",
        type: "address",
        internalType: "address",
      },
      {
        name: "_distributor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_berachef",
        type: "address",
        internalType: "address",
      },
      {
        name: "_governance",
        type: "address",
        internalType: "address",
      },
      {
        name: "_vaultImpl",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allVaults",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
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
    name: "allVaultsLength",
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
    name: "beacon",
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
    name: "berachef",
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
    name: "bgt",
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
    name: "createRewardsVault",
    inputs: [
      {
        name: "stakingToken",
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
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "distributor",
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
    name: "getVault",
    inputs: [
      {
        name: "stakingToken",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "vault",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
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
    name: "predictRewardsVaultAddress",
    inputs: [
      {
        name: "stakingToken",
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
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "VaultCreated",
    inputs: [
      {
        name: "stakingToken",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "vault",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AlreadyInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "AmountLessThanMinIncentiveRate",
    inputs: [],
  },
  {
    type: "error",
    name: "BlockDoesNotExist",
    inputs: [],
  },
  {
    type: "error",
    name: "BlockNotInBuffer",
    inputs: [],
  },
  {
    type: "error",
    name: "CannotRecoverRewardToken",
    inputs: [],
  },
  {
    type: "error",
    name: "CannotRecoverStakingToken",
    inputs: [],
  },
  {
    type: "error",
    name: "DelegateStakedOverflow",
    inputs: [],
  },
  {
    type: "error",
    name: "InsolventReward",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientDelegateStake",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientSelfStake",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientStake",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidCommission",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidCuttingBoardWeights",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidMaxIncentiveTokensCount",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidMinter",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidStartBlock",
    inputs: [],
  },
  {
    type: "error",
    name: "InvariantCheckFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "MaxNumWeightsPerCuttingBoardIsZero",
    inputs: [],
  },
  {
    type: "error",
    name: "NoWhitelistedTokens",
    inputs: [],
  },
  {
    type: "error",
    name: "NotActionableBlock",
    inputs: [],
  },
  {
    type: "error",
    name: "NotApprovedSender",
    inputs: [],
  },
  {
    type: "error",
    name: "NotBGT",
    inputs: [],
  },
  {
    type: "error",
    name: "NotBlockRewardController",
    inputs: [],
  },
  {
    type: "error",
    name: "NotDelegate",
    inputs: [],
  },
  {
    type: "error",
    name: "NotDistributor",
    inputs: [],
  },
  {
    type: "error",
    name: "NotEnoughBalance",
    inputs: [],
  },
  {
    type: "error",
    name: "NotEnoughTime",
    inputs: [],
  },
  {
    type: "error",
    name: "NotFeeCollector",
    inputs: [],
  },
  {
    type: "error",
    name: "NotFriendOfTheChef",
    inputs: [],
  },
  {
    type: "error",
    name: "NotGovernance",
    inputs: [],
  },
  {
    type: "error",
    name: "NotOperator",
    inputs: [],
  },
  {
    type: "error",
    name: "NotProver",
    inputs: [],
  },
  {
    type: "error",
    name: "NotRootFollower",
    inputs: [],
  },
  {
    type: "error",
    name: "NotValidatorOrOperator",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "PayoutAmountIsZero",
    inputs: [],
  },
  {
    type: "error",
    name: "PayoutTokenIsZero",
    inputs: [],
  },
  {
    type: "error",
    name: "QueuedCuttingBoardNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "QueuedCuttingBoardNotReady",
    inputs: [],
  },
  {
    type: "error",
    name: "RewardCycleNotEnded",
    inputs: [],
  },
  {
    type: "error",
    name: "RewardCycleStarted",
    inputs: [],
  },
  {
    type: "error",
    name: "StakeAmountIsZero",
    inputs: [],
  },
  {
    type: "error",
    name: "TokenAlreadyWhitelistedOrLimitReached",
    inputs: [],
  },
  {
    type: "error",
    name: "TokenNotWhitelisted",
    inputs: [],
  },
  {
    type: "error",
    name: "TooManyWeights",
    inputs: [],
  },
  {
    type: "error",
    name: "TotalSupplyOverflow",
    inputs: [],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "VaultAlreadyExists",
    inputs: [],
  },
  {
    type: "error",
    name: "WithdrawAmountIsZero",
    inputs: [],
  },
  {
    type: "error",
    name: "ZeroAddress",
    inputs: [],
  },
];

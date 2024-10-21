export const honeyRouterAbi = [
  {
    type: "function",
    name: "UPGRADE_INTERFACE_VERSION",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeReceiver",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMintRate",
    inputs: [{ name: "asset", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRedeemRate",
    inputs: [{ name: "asset", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "honey",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract Honey" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "numRegisteredAssets",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
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
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "pauseVault",
    inputs: [
      { name: "asset", type: "address", internalType: "contract ERC20" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewHoneyToRedeem",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "exactAmount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewMint",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "honeyAmount", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewRedeem",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "honeyAmount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewRequiredCollateral",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      {
        name: "exactHoneyAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
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
    name: "redeem",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "honeyAmount", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registerVault",
    inputs: [
      {
        name: "vault",
        type: "address",
        internalType: "contract ERC4626",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registeredAssets",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "contract ERC20" }],
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
    name: "setFeeReceiver",
    inputs: [
      { name: "_feeReceiver", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setHoney",
    inputs: [
      {
        name: "_honey",
        type: "address",
        internalType: "contract Honey",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMintRate",
    inputs: [
      {
        name: "asset",
        type: "address",
        internalType: "contract ERC20",
      },
      { name: "mintRate", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRedeemRate",
    inputs: [
      {
        name: "asset",
        type: "address",
        internalType: "contract ERC20",
      },
      { name: "redeemRate", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setVaultFactory",
    inputs: [
      {
        name: "_vaultFactory",
        type: "address",
        internalType: "contract VaultFactory",
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
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unpauseVault",
    inputs: [
      { name: "asset", type: "address", internalType: "contract ERC20" },
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
    type: "function",
    name: "upgradeVault",
    inputs: [
      {
        name: "vault",
        type: "address",
        internalType: "contract ERC4626Vault",
      },
      { name: "newVaultImpl", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "vaultFactory",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract VaultFactory",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "vaults",
    inputs: [
      { name: "asset", type: "address", internalType: "contract ERC20" },
    ],
    outputs: [
      {
        name: "vault",
        type: "address",
        internalType: "contract ERC4626",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawAllFee",
    inputs: [{ name: "receiver", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawFee",
    inputs: [
      {
        name: "asset",
        type: "address",
        internalType: "contract ERC20",
      },
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "assets", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "HoneyMinted",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "assetAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "mintAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "HoneyRedeemed",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "assetAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "redeemAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
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
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
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
    name: "AssetNotRegistered",
    inputs: [{ name: "asset", type: "address", internalType: "address" }],
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
  { type: "error", name: "ERC1967NonPayable", inputs: [] },
  { type: "error", name: "EnforcedPause", inputs: [] },
  { type: "error", name: "ExpectedPause", inputs: [] },
  { type: "error", name: "FailedInnerCall", inputs: [] },
  {
    type: "error",
    name: "InsufficientAssets",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "shares", type: "uint256", internalType: "uint256" },
    ],
  },
  { type: "error", name: "InvalidInitialization", inputs: [] },
  {
    type: "error",
    name: "MismatchedOwner",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      {
        name: "expectedOwner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  { type: "error", name: "NotInitializing", inputs: [] },
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
  {
    type: "error",
    name: "PRBMath_MulDiv18_Overflow",
    inputs: [
      { name: "x", type: "uint256", internalType: "uint256" },
      { name: "y", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "PRBMath_MulDiv_Overflow",
    inputs: [
      { name: "x", type: "uint256", internalType: "uint256" },
      { name: "y", type: "uint256", internalType: "uint256" },
      { name: "denominator", type: "uint256", internalType: "uint256" },
    ],
  },
  { type: "error", name: "UUPSUnauthorizedCallContext", inputs: [] },
  {
    type: "error",
    name: "UUPSUnsupportedProxiableUUID",
    inputs: [{ name: "slot", type: "bytes32", internalType: "bytes32" }],
  },
  {
    type: "error",
    name: "UnauthorizedCaller",
    inputs: [
      { name: "caller", type: "address", internalType: "address" },
      {
        name: "expectedCaller",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "VaultAlreadyRegistered",
    inputs: [{ name: "asset", type: "address", internalType: "address" }],
  },
];

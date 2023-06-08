export const DEX_PRECOMPILE_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "assetsIn",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amountsIn",
        type: "uint256[]",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "address[]",
        name: "shares",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shareAmounts",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "liquidity",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "liquidityAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IERC20DexModule.SwapKind",
        name: "kind",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "address",
            name: "poolId",
            type: "address",
          },
          {
            internalType: "address",
            name: "assetIn",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "assetOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "userData",
            type: "bytes",
          },
        ],
        internalType: "struct IERC20DexModule.BatchSwapStep[]",
        name: "swaps",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "batchSwap",
    outputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "assetsIn",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amountsIn",
        type: "uint256[]",
      },
      {
        internalType: "string",
        name: "poolType",
        type: "string",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "weight",
                type: "uint256",
              },
            ],
            internalType: "struct IERC20DexModule.AssetWeight[]",
            name: "weights",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "swapFee",
            type: "uint256",
          },
        ],
        internalType: "struct IERC20DexModule.PoolOptions",
        name: "options",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "createPool",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPoolAddresses",
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
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "baseAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "quoteAsset",
        type: "address",
      },
    ],
    name: "getExchangeRate",
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
        name: "pool",
        type: "address",
      },
    ],
    name: "getLiquidity",
    outputs: [
      {
        internalType: "address[]",
        name: "asset",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "getPoolName",
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
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "getPoolOptions",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "weight",
                type: "uint256",
              },
            ],
            internalType: "struct IERC20DexModule.AssetWeight[]",
            name: "weights",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "swapFee",
            type: "uint256",
          },
        ],
        internalType: "struct IERC20DexModule.PoolOptions",
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
        name: "pool",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "getPreviewAddLiquidityNoSwap",
    outputs: [
      {
        internalType: "address[]",
        name: "shares",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shareAmounts",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "liqOut",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "liquidityAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "liquidity",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "getPreviewAddLiquidityStaticPrice",
    outputs: [
      {
        internalType: "address[]",
        name: "shares",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shareAmounts",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "liqOut",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "liquidityAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "getPreviewBurnShares",
    outputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "getPreviewSharesForLiquidity",
    outputs: [
      {
        internalType: "address[]",
        name: "shares",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shareAmounts",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "liquidity",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "liquidityAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "getPreviewSharesForSingleSidedLiquidityRequest",
    outputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "baseAsset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "baseAssetAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "quoteAsset",
        type: "address",
      },
    ],
    name: "getPreviewSwapExact",
    outputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "assetIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "assetAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sharesIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sharesAmount",
        type: "uint256",
      },
    ],
    name: "getRemoveLiquidityExactAmountOut",
    outputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "getTotalShares",
    outputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "assetIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "removeLiquidityBurningShares",
    outputs: [
      {
        internalType: "address[]",
        name: "liquidity",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "liquidityAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "assetOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sharesIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maxSharesIn",
        type: "uint256",
      },
    ],
    name: "removeLiquidityExactAmount",
    outputs: [
      {
        internalType: "address[]",
        name: "shares",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shareAmounts",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "liquidity",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "liquidityAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IERC20DexModule.SwapKind",
        name: "kind",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "poolId",
        type: "address",
      },
      {
        internalType: "address",
        name: "assetIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "assetOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

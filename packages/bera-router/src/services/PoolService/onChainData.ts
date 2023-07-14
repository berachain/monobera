import { cloneDeep, set, unset } from "lodash";
import { type Address, type PublicClient } from "viem";

import { ERC20ABI } from "./erc20abi";
import {
  type Pool,
  type PoolData,
  type PoolRecords,
  type RawPool,
  type WeightEntry,
} from "./types";

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
    ],
    name: "getPreviewBatchSwap",
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

const DEX_PRECOMPILE_ADDRESS = "0x0d5862FDbdd12490f9b4De54c236cff63B038074";

function mapPoolsToRecord(pools: RawPool[]): Record<string, PoolData> {
  return pools?.reduce((record, pool) => {
    record[pool.pool] = pool;
    return record;
  }, {} as Record<string, PoolData>);
}

export class MultiCallPools {
  private multiAddress: string;
  private rawPools = {} as Record<string, PoolData>;
  private poolRecords = {} as PoolRecords;
  private pools = {} as Pool[];
  private provider: PublicClient;
  private calls: [string, any[], string, unknown[] | undefined][] = [];
  private paths: string[] = [];
  constructor(multiAddress: string, provider: PublicClient) {
    this.multiAddress = multiAddress;
    this.provider = provider;
  }

  call(
    path: string,
    abi: any[],
    address: string,
    functionName: string,
    params?: unknown[],
  ): MultiCallPools {
    this.calls.push([address, abi, functionName, params]);
    this.paths.push(path);
    return this;
  }

  public getPoolRecords = (): PoolRecords => {
    return this.poolRecords;
  };

  public getPools = (): Pool[] => {
    return this.pools;
  };

  public getPoolData = (pools: RawPool[]): any => {
    this.calls = [];
    this.paths = [];

    pools.forEach((pool) => {
      // this needs share address
      this.call(
        `${pool.pool}.totalSupply`,
        ERC20ABI,
        pool.poolShareDenom,
        "totalSupply",
        [],
      );
      this.call(
        `${pool.pool}.liquidity`,
        DEX_PRECOMPILE_ABI,
        DEX_PRECOMPILE_ADDRESS,
        "getLiquidity",
        [pool.pool],
      );
    });

    pools.forEach((pool) => {
      pool.poolOptions.weights.forEach(
        (weight: { denom: string; weight: string }) => {
          this.call(
            `${pool.pool}.tokens.${weight.denom}.symbol`,
            ERC20ABI,
            weight.denom,
            "symbol",
            [],
          );
          this.call(
            `${pool.pool}.tokens.${weight.denom}.decimals`,
            ERC20ABI,
            weight.denom,
            "decimals",
            [],
          );
          this.call(
            `${pool.pool}.tokens.${weight.denom}.name`,
            ERC20ABI,
            weight.denom,
            "name",
            [],
          );
        },
      );
    });
  };

  async execute(pools: RawPool[]): Promise<boolean> {
    const rawObj: Record<string, PoolData> = mapPoolsToRecord(pools);

    const calls = this.calls.map((call) => {
      return {
        address: call[0] as Address,
        abi: call[1],
        functionName: call[2],
        args: call[3] as any[],
      };
    });

    const results: any[] = await this.provider.multicall({
      contracts: calls,
      multicallAddress: this.multiAddress as Address,
      allowFailure: true,
    });

    results.forEach((result, i) =>
      set(rawObj, this.paths[i] ?? "", result.result),
    );

    this.rawPools = rawObj;
    this.formatRecords();
    return true;
  }

  public formatRecords = () => {
    for (const key in this.rawPools) {
      if (Object.prototype.hasOwnProperty.call(this.rawPools, key)) {
        const poolData: PoolData | undefined = this.rawPools[key];
        if (poolData && poolData.liquidity) {
          const totalWeight = calculateTotalWeight(
            poolData.poolOptions.weights,
          );
          set(this.rawPools, `${key}.totalWeight`, totalWeight);
          poolData.liquidity[0].forEach((tokenAddress, i) => {
            const weight = poolData.poolOptions.weights.find(
              (weight) => weight.denom === tokenAddress,
            );
            const normalizedWeight = weight
              ? (Number(weight.weight) * 100) / totalWeight
              : 0;
            const swapFee = poolData.poolOptions.swapFee;
            set(
              this.rawPools,
              `${key}.tokens.${tokenAddress}.normalizedWeight`,
              normalizedWeight * 100,
            );
            set(
              this.rawPools,
              `${key}.tokens.${tokenAddress}.weight`,
              weight?.weight,
            );
            set(
              this.rawPools,
              `${key}.tokens.${tokenAddress}.address`,
              tokenAddress,
            );
            set(
              this.rawPools,
              `${key}.tokens.${tokenAddress}.balance`,
              poolData.liquidity?.[1]?.[i] ?? 0n,
            );
            set(this.rawPools, `${key}.swapFee`, swapFee);
          });
        }
      }
    }
    const rawPools = cloneDeep(this.rawPools);
    for (const key in rawPools) {
      if (Object.prototype.hasOwnProperty.call(this.rawPools, key)) {
        const poolData: PoolData | undefined = this.rawPools[key];

        set(rawPools, `${key}.shareAddress`, poolData?.poolShareDenom);
        unset(rawPools, `${key}.poolShareDenom`);
        unset(rawPools, `${key}.liquidity`);
        unset(rawPools, `${key}.poolOptions`);
      }
    }
    this.poolRecords = rawPools as unknown as PoolRecords;
    const flattenedPools = flattenPoolRecords(this.poolRecords);
    this.pools = flattenedPools;
  };
}

function calculateTotalWeight(weights: WeightEntry[]): number {
  let totalWeight = 0;
  for (const entry of weights) {
    const weight = Number(entry.weight);
    totalWeight += weight;
  }
  return totalWeight;
}

function flattenPoolRecords(poolRecords: PoolRecords): Pool[] {
  return Object.entries(poolRecords).flatMap(([_, pool]) => {
    const tokens = Object.values(pool.tokens);
    return [
      {
        ...pool,
        tokens: [...tokens],
      },
    ];
  });
}

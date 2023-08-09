import { cloneDeep, set, unset } from "lodash";
import { formatUnits, type Address, type PublicClient } from "viem";

import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "../constants";
import { ERC20ABI } from "./erc20abi";
import {
  type Pool,
  type PoolData,
  type PoolRecords,
  type RawPool,
  type WeightEntry,
} from "./types";

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
  private tokenMap = {} as Record<string, any>;
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

  public setTokenMap = (tokenMap: Record<string, any>) => {
    this.tokenMap = tokenMap;
  };

  public getTokenMap = (): Record<string, any> => {
    return this.tokenMap;
  };
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
      // this.call(
      //   `${pool.pool}.totalSupply`,
      //   DEX_PRECOMPILE_ABI,
      //   DEX_PRECOMPILE_ADDRESS,
      //   "getTotalShares",
      //   [pool.pool],
      // );
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
          if (!this.tokenMap && !this.tokenMap[weight.denom]) {
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
          }
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

    console.log("results", results);
    results.forEach((result, i) =>
      set(rawObj, this.paths[i] ?? "", result.result),
    );
    this.rawPools = rawObj;
    this.formatRecords();
    return true;
  }

  public formatRecords = () => {
    console.log("formatting records", this.rawPools);
    for (const key in this.rawPools) {
      if (key === "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0") return;
      if (Object.prototype.hasOwnProperty.call(this.rawPools, key)) {
        const poolData: PoolData | undefined = this.rawPools[key];
        console.log("pooldata", poolData);

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
            if (this.tokenMap && this.tokenMap[tokenAddress]) {
              set(
                this.rawPools,
                `${key}.tokens.${tokenAddress}`,
                this.tokenMap[tokenAddress],
              );
            }
            set(
              this.rawPools,
              `${key}.tokens.${tokenAddress}.normalizedWeight`,
              normalizedWeight,
            );
            set(
              this.rawPools,
              `${key}.tokens.${tokenAddress}.weight`,
              weight?.weight,
            );

            // TODO: figure out this crap
            set(this.rawPools, `${key}.totalSupply`, 0n);

            set(
              this.rawPools,
              `${key}.tokens.${tokenAddress}.balance`,
              formatUnits(
                poolData.liquidity?.[1]?.[i] ?? 0n,
                poolData.tokens?.[tokenAddress]?.decimals ?? 18,
              ),
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
        // unset(rawPools, `${key}.liquidity`);
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

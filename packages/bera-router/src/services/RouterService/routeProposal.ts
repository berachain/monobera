import { cloneDeep } from "lodash";
import { getAddress } from "viem";

import { type RouterConfig } from "~/config";
import { WeightedPool } from "~/pools/weighted";
import { type Pool, type Token } from "../PoolService/types";
import {
  INFINITY,
  PoolTypes,
  SwapTypes,
  type NewPath,
  type PoolBase,
  type PoolDictionary,
  type PoolPairBase,
  type Swap,
  type SwapOptions,
  type hopDictionary,
} from "./types";

export class RouteProposer {
  cache: Record<string, { paths: NewPath[] }> = {};

  constructor(private readonly config: RouterConfig) {}
  /**
   * Given a list of pools and a desired input/output, returns a set of possible paths to route through
   */
  getCandidatePaths(
    tokenIn: string,
    tokenOut: string,
    swapType: SwapTypes,
    pools: Pool[],
    swapOptions: SwapOptions,
  ): NewPath[] {
    tokenIn = tokenIn.toLowerCase();
    tokenOut = tokenOut.toLowerCase();

    if (pools.length === 0) return [];

    // If token pair has been processed before that info can be reused to speed up execution
    // If timestamp has not been manually set in `getSwaps` then default (set on instantiation) is used which means cache will be used
    // const cache =
    //   this.cache[`${tokenIn}${tokenOut}${swapType}${swapOptions.timestamp}`];

    // // forceRefresh can be set to force fresh processing of paths/prices
    // if (!!cache) {
    //   // Using pre-processed data from cache
    //   return cache.paths;
    // }

    const poolsAllDict = parseToPoolsDict(pools);

    const [directPools, hopsIn, hopsOut] = filterPoolsOfInterest(
      poolsAllDict,
      tokenIn,
      tokenOut,
      10,
    );

    const pathData = producePaths(
      tokenIn,
      tokenOut,
      directPools,
      hopsIn,
      hopsOut,
      poolsAllDict,
    );

    const combinedPathData = pathData;
    this.cache[`${tokenIn}${tokenOut}${swapType}${swapOptions.timestamp}`] = {
      paths: combinedPathData,
    };
    return combinedPathData;
  }

  /**
   * Given a pool dictionary and a desired input/output, returns a set of possible paths to route through.
   * @param {string} tokenIn - Address of tokenIn
   * @param {string} tokenOut - Address of tokenOut
   * @param {SwapTypes} swapType - SwapExactIn where the amount of tokens in (sent to the Pool) is known or SwapExactOut where the amount of tokens out (received from the Pool) is known.
   * @param {PoolDictionary} poolsAllDict - Dictionary of pools.
   * @param {number }maxPools - Maximum number of pools to hop through.
   * @returns {NewPath[]} Array of possible paths sorted by liquidity.
   */
  getCandidatePathsFromDict(
    tokenIn: string,
    tokenOut: string,
    swapType: SwapTypes,
    poolsAllDict: PoolDictionary,
    maxPools: number,
  ): NewPath[] {
    tokenIn = tokenIn.toLowerCase();
    tokenOut = tokenOut.toLowerCase();
    if (Object.keys(poolsAllDict).length === 0) return [];

    const [directPools, hopsIn, hopsOut] = filterPoolsOfInterest(
      poolsAllDict,
      tokenIn,
      tokenOut,
      maxPools,
    );

    const pathData = producePaths(
      tokenIn,
      tokenOut,
      directPools,
      hopsIn,
      hopsOut,
      poolsAllDict,
    );

    const combinedPathData = pathData;
    const [paths] = calculatePathLimits(combinedPathData, swapType);
    return paths;
  }
}

export function parseToPoolsDict(pools: Pool[]): PoolDictionary {
  const t1 = cloneDeep(pools).filter((pool: Pool) => {
    return (
      pool.tokens.length > 0 &&
      (pool.tokens[0]?.balance as unknown as string) !== "0"
    );
  });
  const t2 = t1.map((pool) => [pool.pool, parseNewPool(pool)]);
  const temp = Object.fromEntries(t2.filter(([, pool]) => pool !== undefined));
  return temp;
}

export function parseNewPool(pool: Pool): WeightedPool | undefined {
  // We're not interested in any pools which don't allow swapping
  // if (!pool.swapEnabled) return undefined;

  let newPool: any;

  try {
    newPool = WeightedPool.fromPool(pool);
  } catch (err: any) {
    console.log("Error parsing pool", err);
    return undefined;
  }
  return newPool as WeightedPool;
}

export function calculatePathLimits(
  paths: NewPath[],
  swapType: SwapTypes,
): [NewPath[], bigint] {
  let maxLiquidityAvailable = 0n;
  paths.forEach((path) => {
    // Original parsedPoolPairForPath here but this has already been done.
    path.limitAmount = getLimitAmountSwapForPath(path, swapType);
    // if (path.limitAmount.isNaN()) throw 'path.limitAmount.isNaN';
    maxLiquidityAvailable += path.limitAmount;
  });
  const sortedPaths = paths.sort((a, b) => {
    return b.limitAmount > a.limitAmount ? 1 : -1;
  });
  return [sortedPaths, maxLiquidityAvailable];
}

export function getLimitAmountSwapForPath(
  path: NewPath,
  swapType: SwapTypes,
): bigint {
  const poolPairData = path.poolPairData;
  let limit: bigint;
  if (swapType === SwapTypes.SwapExactIn) {
    limit =
      path.pools[poolPairData.length - 1]?.getLimitAmountSwap(
        poolPairData[poolPairData.length - 1],
        SwapTypes.SwapExactIn,
      ) ?? 0n;

    for (let i = poolPairData.length - 2; i >= 0; i--) {
      const poolLimitExactIn =
        path.pools[i]?.getLimitAmountSwap(
          poolPairData[i],
          SwapTypes.SwapExactIn,
        ) ?? 0n;

      const poolLimitExactOut =
        path.pools[i]?.getLimitAmountSwap(
          poolPairData[i],
          SwapTypes.SwapExactOut,
        ) ?? 0n;

      if (poolLimitExactOut <= limit) {
        limit = poolLimitExactIn;
      } else {
        const pulledLimit = getOutputAmountSwap(
          path.pools[i],
          path.poolPairData[i],
          SwapTypes.SwapExactOut,
          limit,
        );
        limit = pulledLimit < poolLimitExactIn ? pulledLimit : poolLimitExactIn;
      }
    }
    if (limit === 0n) return 0n;
    // const result = parseUnits(
    //   `${Number(limit)}`,
    //   poolPairData[0]?.decimalsIn ?? 18,
    // );

    return limit;
  } else {
    limit =
      path.pools[0]?.getLimitAmountSwap(
        poolPairData[0],
        SwapTypes.SwapExactOut,
      ) ?? 0n;
    for (let i = 1; i < poolPairData.length; i++) {
      const poolLimitExactIn =
        path.pools[i]?.getLimitAmountSwap(
          poolPairData[i],
          SwapTypes.SwapExactIn,
        ) ?? 0n;
      const poolLimitExactOut =
        path.pools[i]?.getLimitAmountSwap(
          poolPairData[i],
          SwapTypes.SwapExactOut,
        ) ?? 0n;
      if (poolLimitExactIn <= limit) {
        limit = poolLimitExactOut;
      } else {
        const pushedLimit = getOutputAmountSwap(
          path.pools[i],
          path.poolPairData[i],
          SwapTypes.SwapExactIn,
          limit,
        );
        limit =
          pushedLimit < poolLimitExactOut ? pushedLimit : poolLimitExactOut;
      }
    }
    if (limit === 0n) return 0n;
    // return parseUnits(
    //   `${Number(limit)}`,
    //   poolPairData[poolPairData.length - 1]?.decimalsOut ?? 18,
    // );
    return limit;
  }
}

export function getOutputAmountSwap(
  pool: PoolBase | undefined,
  poolPairData: PoolPairBase | undefined,
  swapType: SwapTypes,
  amount: bigint,
): bigint {
  if (pool === undefined || poolPairData === undefined) return 0n;
  // TODO: check if necessary to check if amount > limitAmount
  if (swapType === SwapTypes.SwapExactIn) {
    if (
      poolPairData.poolType !== PoolTypes.Linear &&
      poolPairData.balanceIn === 0n
    ) {
      return 0n;
    } else {
      return pool._exactTokenInForTokenOut(poolPairData, amount);
    }
  } else {
    if (poolPairData.balanceOut === 0n) {
      return 0n;
    } else if (amount >= poolPairData.balanceOut) {
      return INFINITY;
    } else {
      return pool._tokenInForExactTokenOut(poolPairData, amount);
    }
  }
  throw Error("Unsupported swap");
}

/*
The purpose of this function is to build dictionaries of direct pools 
and plausible hop pools.
*/
export function filterPoolsOfInterest(
  allPools: PoolDictionary,
  tokenIn: string,
  tokenOut: string,
  maxPools: number,
): [PoolDictionary, hopDictionary, hopDictionary] {
  const directPools: PoolDictionary = {};
  const hopsIn: hopDictionary = {};
  const hopsOut: hopDictionary = {};
  console.log("WTF", allPools);

  Object.keys(allPools).forEach((id) => {
    const pool = allPools[id];
    const tokenListSet = new Set(pool?.tokensList);
    const containsTokenIn = tokenListSet.has(tokenIn.toLowerCase());
    const containsTokenOut = tokenListSet.has(tokenOut.toLowerCase());

    // This is a direct pool as has both tokenIn and tokenOut
    if (containsTokenIn && containsTokenOut && pool) {
      directPools[pool.id] = pool;
      return;
    }

    if (maxPools > 1 && pool) {
      if (containsTokenIn && !containsTokenOut) {
        for (const hopToken of tokenListSet) {
          if (!hopsIn[hopToken]) hopsIn[hopToken] = new Set([]);
          hopsIn[hopToken]?.add(pool.id);
        }
      } else if (!containsTokenIn && containsTokenOut) {
        for (const hopToken of [...tokenListSet]) {
          if (!hopsOut[hopToken]) hopsOut[hopToken] = new Set([]);
          hopsOut[hopToken]?.add(pool.id);
        }
      }
    }
  });
  return [directPools, hopsIn, hopsOut];
}

export function producePaths(
  tokenIn: string,
  tokenOut: string,
  directPools: PoolDictionary,
  hopsIn: hopDictionary,
  hopsOut: hopDictionary,
  pools: PoolDictionary,
): NewPath[] {
  const paths: NewPath[] = [];

  // Create direct paths
  for (const id in directPools) {
    // @ts-ignore
    const path = createPath([tokenIn, tokenOut], [pools[id]]);
    paths.push(path);
  }

  for (const hopToken in hopsIn) {
    if (hopsOut[hopToken]) {
      let highestNormalizedLiquidityFirst = 0n; // Aux variable to find pool with most liquidity for pair (tokenIn -> hopToken)
      let highestNormalizedLiquidityFirstPoolId: string | undefined; // Aux variable to find pool with most liquidity for pair (tokenIn -> hopToken)
      let highestNormalizedLiquiditySecond = 0n; // Aux variable to find pool with most liquidity for pair (hopToken -> tokenOut)
      let highestNormalizedLiquiditySecondPoolId: string | undefined; // Aux variable to find pool with most liquidity for pair (hopToken -> tokenOut)
      for (const poolInId of [...(hopsIn[hopToken] ?? [])]) {
        const poolIn = pools[poolInId];
        const poolPairData = poolIn?.parsePoolPairData(tokenIn, hopToken);
        const normalizedLiquidity =
          poolIn?.getNormalizedLiquidity(poolPairData);
        // Cannot be strictly greater otherwise highestNormalizedLiquidityPoolId = 0 if hopTokens[i] balance is 0 in this pool.
        if (
          normalizedLiquidity &&
          normalizedLiquidity >= highestNormalizedLiquidityFirst
        ) {
          highestNormalizedLiquidityFirst = normalizedLiquidity;
          highestNormalizedLiquidityFirstPoolId = poolIn?.id;
        }
      }
      for (const poolOutId of [...(hopsOut[hopToken] ?? [])]) {
        const poolOut = pools[poolOutId];
        const poolPairData = poolOut?.parsePoolPairData(hopToken, tokenOut);
        const normalizedLiquidity =
          poolOut?.getNormalizedLiquidity(poolPairData);
        // Cannot be strictly greater otherwise highestNormalizedLiquidityPoolId = 0 if hopTokens[i] balance is 0 in this pool.
        if (
          normalizedLiquidity &&
          normalizedLiquidity >= highestNormalizedLiquiditySecond
        ) {
          highestNormalizedLiquiditySecond = normalizedLiquidity ?? 0n;
          highestNormalizedLiquiditySecondPoolId = poolOut?.id;
        }
      }
      if (
        pools &&
        highestNormalizedLiquidityFirstPoolId &&
        highestNormalizedLiquiditySecondPoolId
      ) {
        const poolFirst = pools[highestNormalizedLiquidityFirstPoolId];
        const poolSecond = pools[highestNormalizedLiquiditySecondPoolId];

        if (poolFirst && poolSecond) {
          const path = createPath(
            [tokenIn, hopToken, tokenOut],
            [poolFirst, poolSecond],
          );
          paths.push(path);
        }
      }
    }
  }
  return paths;
}

// Creates a path with pools.length hops
// i.e. tokens[0]>[Pool0]>tokens[1]>[Pool1]>tokens[2]>[Pool2]>tokens[3]
export function createPath(
  tokens: string[],
  pools: PoolBase[] | undefined,
): NewPath {
  if (!pools) throw Error("createPath: pools is undefined");
  let tI: string, tO: string;
  const swaps: Swap[] = [];
  const poolPairData: PoolPairBase[] = [];
  let id = "";

  for (let i = 0; i < pools.length; i++) {
    tI = tokens[i] ?? "";
    tO = tokens[i + 1] ?? "";
    const poolPair = pools[i]?.parsePoolPairData(tI, tO);
    if (poolPair) poolPairData.push(poolPair);
    id = id + poolPair?.id;

    const swap: Swap = {
      pool: pools[i]?.id ?? "",
      tokenInObj:
        (pools[i]?.tokens.find(
          (token) => getAddress(token.address) === getAddress(tI),
        ) as unknown as Token) ?? undefined,
      tokenOutObj:
        (pools[i]?.tokens.find(
          (token) => getAddress(token.address) === getAddress(tO),
        ) as unknown as Token) ?? undefined,
      tokenIn: tI,
      tokenOut: tO,
      tokenInDecimals: poolPair?.decimalsIn ?? 18,
      tokenOutDecimals: poolPair?.decimalsOut ?? 18,
    };

    swaps.push(swap);
  }

  const path: NewPath = {
    id,
    swaps,
    limitAmount: 0n,
    poolPairData,
    pools,
  };

  return path;
}

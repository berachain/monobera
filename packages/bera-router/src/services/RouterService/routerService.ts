import cloneDeep from "lodash";
import {
  formatUnits,
  getAddress,
  parseUnits,
  type Address,
  type Chain,
  type SimulateContractReturnType,
} from "viem";

import { type RouterConfig } from "~/config";
import { PoolService } from "../PoolService/poolService";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "../constants";
import { RouteNotFound } from "./errors";
import { RouteProposer } from "./routeProposal";
import {
  SwapTypes,
  type BatchSwapStep,
  type NewPath,
  type ResultPath,
  type Swap,
  type SwapInfo,
  type SwapOptions,
  type SwapV2,
} from "./types";
import { getWrappedInfo, setWrappedInfo } from "./wrappers";

export const EMPTY_SWAPINFO: SwapInfo = {
  swaps: [],
  tokenIn: "" as Address,
  tokenOut: "" as Address,
  swapAmount: 0n,
  returnAmount: 0n,
  batchSwapSteps: [],
  tokenInObj: undefined,
  tokenOutObj: undefined,
  formattedSwapAmount: "",
  formattedReturnAmount: "",
  pools: [],
};

export class RouterService {
  private routeProposer: RouteProposer;
  public poolService: PoolService;
  private readonly defaultSwapOptions: SwapOptions = {
    gasPrice: parseUnits(`${85000}`, 9),
    swapGas: parseUnits(`${85000}`, 18),
    maxPools: 4,
    timestamp: Math.floor(Date.now() / 1000),
  };

  constructor(private readonly config: RouterConfig) {
    this.routeProposer = new RouteProposer(config);
    this.poolService = new PoolService(config);
  }

  public isReady() {
    return this.poolService.finishedFetching;
  }
  public async fetchPools() {
    await this.poolService.fetchPools();
  }

  public getPools() {
    return this.poolService.getPools();
  }

  public getPool(poolId: string) {
    return this.poolService.getPools().find((pool) => pool.pool === poolId);
  }

  public async getSwaps(
    tokenIn: Address,
    tokenOut: Address,
    swapType: SwapTypes,
    swapAmount: bigint,
    swapOptions?: Partial<any>,
  ): Promise<SwapInfo> {
    if (!this.poolService.finishedFetching) {
      console.error("Pools not fetched yet");
      return cloneDeep(EMPTY_SWAPINFO) as unknown as SwapInfo;
    }
    if (swapAmount === 0n)
      return cloneDeep(EMPTY_SWAPINFO) as unknown as SwapInfo;
    // Set any unset options to their defaults
    const options: SwapOptions = {
      ...this.defaultSwapOptions,
      ...swapOptions,
    };
    // @ts-ignore
    const pools: Pool[] = this.poolService.getPools();

    const wrappedInfo = getWrappedInfo(
      tokenIn,
      tokenOut,
      this.config,
      swapAmount,
    );

    let swapInfo: SwapInfo = await this.findPath(
      wrappedInfo.tokenIn.addressForSwaps as Address,
      wrappedInfo.tokenOut.addressForSwaps as Address,
      swapType,
      wrappedInfo.swapAmountForSwaps,
      pools,
      options,
    );

    if (swapInfo.returnAmount === 0n) return swapInfo;

    swapInfo = setWrappedInfo(swapInfo, wrappedInfo);

    return swapInfo;
  }

  // Will process swap/pools data and return best swaps
  private async findPath(
    tokenIn: Address,
    tokenOut: Address,
    swapType: SwapTypes,
    swapAmount: bigint,
    pools: any[],
    swapOptions: SwapOptions,
  ): Promise<SwapInfo> {
    if (pools.length === 0)
      return cloneDeep(EMPTY_SWAPINFO) as unknown as SwapInfo;

    const paths = this.routeProposer.getCandidatePaths(
      tokenIn,
      tokenOut,
      swapType,
      pools,
      swapOptions,
    );

    if (paths.length == 0) throw new RouteNotFound("No route found for swap");
    const resultPaths = await this.getOnChainBestPaths(
      paths,
      swapAmount,
      swapType,
    );

    const swapInfo = this.getBestPath(resultPaths, swapAmount);

    return swapInfo;
  }

  private getBestPath(resultPaths: ResultPath[], swapAmount: bigint): SwapInfo {
    if (resultPaths.length === 0)
      throw new RouteNotFound("No route found for swap");

    let bestPath: ResultPath | undefined;
    let highestReturnAmount = 0n;
    let lowestSwapCount = Infinity;

    for (const path of resultPaths) {
      if (path.returnAmount > highestReturnAmount) {
        highestReturnAmount = path.returnAmount;
        lowestSwapCount = path.swaps.length;
        bestPath = path;
      } else if (
        path.returnAmount === highestReturnAmount &&
        path.swaps.length < lowestSwapCount
      ) {
        lowestSwapCount = path.swaps.length;
        bestPath = path;
      }
    }

    if (!bestPath) throw new RouteNotFound("Unable to find optimal route");

    const tokenInObj = bestPath.swaps[0]?.tokenInObj;
    const tokenOutObj = bestPath.swaps[bestPath.swaps.length - 1]?.tokenOutObj;

    const result: SwapInfo = {
      swaps: bestPath.swaps,
      returnAmount: bestPath.returnAmount,
      tokenIn: bestPath.swaps[0]?.tokenIn as Address,
      tokenOut: bestPath.swaps[bestPath.swaps.length - 1]?.tokenOut as Address,
      tokenInObj,
      tokenOutObj,
      batchSwapSteps: bestPath.batchSwapSteps,
      swapAmount,
      pools: bestPath.pools,
      formattedSwapAmount: formatUnits(swapAmount, tokenInObj?.decimals ?? 18),
      formattedReturnAmount: formatUnits(
        bestPath.returnAmount,
        tokenOutObj?.decimals ?? 18,
      ),
    };
    return result;
  }
  /**
   * Find optimal routes for trade from given candidate paths
   */
  private async getOnChainBestPaths(
    paths: NewPath[],
    swapAmount: bigint,
    swapType: SwapTypes,
  ): Promise<ResultPath[]> {
    const client = this.config.publicClient;
    const cachedSteps: BatchSwapStep[][] = [];
    const asyncOperations: Promise<
      | SimulateContractReturnType<
          any[],
          "batchSwap",
          Chain | undefined,
          undefined
        >
      | any
    >[] = paths.map((path: NewPath) => {
      const batchSwapSteps: BatchSwapStep[] = path.swaps.map(
        (swap: Swap, index: number) => {
          const amountIn = swapType === 0 ? swapAmount : 0n;
          const amountOut = swapType === 1 ? swapAmount : 0n;
          const batchSwapStep = {
            poolId: getAddress(swap.pool),
            assetIn: getAddress(swap.tokenIn),
            amountIn: swapType === 0 && index === 0 ? amountIn : 0n,
            assetOut: getAddress(swap.tokenOut),
            amountOut:
              swapType === 1 && index === path.swaps.length - 1
                ? amountOut
                : 0n,
            userData: "",
          };
          return batchSwapStep;
        },
      );
      cachedSteps.push(batchSwapSteps);
      return client.readContract({
        address: DEX_PRECOMPILE_ADDRESS as Address,
        abi: DEX_PRECOMPILE_ABI as any[],
        functionName: "getPreviewBatchSwap",
        args: [swapType, batchSwapSteps],
      });
    });

    const promises = asyncOperations.map(
      (operation: Promise<any>) => operation,
    );
    const results = await Promise.all(promises);
    const resultPaths: ResultPath[] = paths.map((path: NewPath, i: number) => {
      return {
        ...path,
        batchSwapSteps: cachedSteps[i] ?? [],
        returnAmount: (results[i][1] as bigint) ?? 0n,
      };
    });

    return resultPaths;
  }
}

export function formatSwaps(
  swapsOriginal: Swap[][],
  swapType: SwapTypes,
  swapAmount: bigint,
  tokenIn: Address,
  tokenOut: Address,
  returnAmount: bigint,
  returnAmountConsideringFees: bigint,
  marketSpotPrice: string,
): any {
  if (swapsOriginal.length === 0) {
    return cloneDeep(EMPTY_SWAPINFO) as unknown as SwapInfo;
  }

  const swapsClone = cloneDeep(swapsOriginal) as unknown as Swap[][];
  const tokenAddresses = getTokenAddresses(swapsClone);
  const swaps: any[] = swapsClone.flatMap((sequence) =>
    formatSequence(swapType, sequence, tokenAddresses),
  ) as unknown as SwapV2[];

  // We need to account for any rounding losses by adding dust to first path
  const dust = swapAmount - getTotalSwapAmount(swaps);
  if (dust > 0 && swaps[0]) {
    swaps[0].amount = swaps[0]?.amount + dust;
  }

  const swapInfo: any = {
    swapAmount,
    swapAmountForSwaps: swapAmount,
    returnAmount,
    returnAmountFromSwaps: returnAmount,
    returnAmountConsideringFees,
    swaps,
    tokenAddresses,
    tokenIn,
    tokenOut,
    marketSpotPrice,
  };

  return swapInfo;
}

export const formatSequence = (
  swapKind: SwapTypes,
  sequence: Swap[],
  tokenAddresses: string[],
): SwapV2[] => {
  if (swapKind === SwapTypes.SwapExactOut) {
    // GIVEN_OUT sequences must be passed to the vault in reverse order.
    // After reversing the sequence we can treat them almost equivalently to GIVEN_IN sequences
    sequence = sequence.reverse();
  }

  return sequence.map((swap, i) => {
    // Multihop swaps can be executed by passing an `amountIn` value of zero for a swap. This will cause the amount out
    // of the previous swap to be used as the amount in of the current one. In such a scenario, `tokenIn` must equal the
    // previous swap's `tokenOut`.
    let amountScaled = "0";

    // First swap needs to be given a value so we inject this from SOR solution
    if (i === 0) {
      // If it's a GIVEN_IN swap then swapAmount is in terms of tokenIn
      // and vice versa for GIVEN_OUT
      const scalingFactor =
        swapKind === SwapTypes.SwapExactIn
          ? swap.tokenInDecimals
          : swap.tokenOutDecimals;

      amountScaled = parseUnits(
        `${Number(swap.swapAmount)}`,
        scalingFactor,
      ).toString();
    }
    const scalingFactorReturn =
      swapKind === SwapTypes.SwapExactIn
        ? swap.tokenOutDecimals
        : swap.tokenInDecimals;

    const returnScaled = parseUnits(
      `${Number(swap.returnAmount)}`,
      scalingFactorReturn,
    ).toString();

    const assetInIndex = tokenAddresses.indexOf(swap.tokenIn);
    const assetOutIndex = tokenAddresses.indexOf(swap.tokenOut);
    return {
      poolId: swap.pool,
      assetInIndex,
      assetOutIndex,
      amount: amountScaled,
      userData: "",
      returnAmount: returnScaled,
    };
  }) as unknown as SwapV2[];
};

const getTokenAddresses = (swaps: Swap[][]): string[] => {
  const tokenAddressesSet: Set<string> = new Set(
    swaps.flatMap((sequence) =>
      sequence.flatMap((swap): [string, string] => [
        swap.tokenIn,
        swap.tokenOut,
      ]),
    ),
  );

  return [...tokenAddressesSet];
};

const getTotalSwapAmount = (swaps: SwapV2[]) => {
  return swaps.reduce((acc, { amount }) => acc + amount, 0n);
};

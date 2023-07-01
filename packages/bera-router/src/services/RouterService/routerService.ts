import cloneDeep from "lodash";
import { parseUnits, type Address } from "viem";

import { type RouterConfig } from "~/config";
import { PoolService } from "../PoolService/poolService";
import { getBestPaths } from "./bestPath";
import { RouteProposer } from "./routeProposal";
import {
  SwapTypes,
  type NewPath,
  type Swap,
  type SwapInfo,
  type SwapOptions,
  type SwapV2,
} from "./types";
import { getWrappedInfo, setWrappedInfo } from "./wrappers";

export const EMPTY_SWAPINFO: SwapInfo = {
  tokenAddresses: [],
  swaps: [],
  swapAmount: 0n,
  tokenIn: "" as Address,
  tokenOut: "" as Address,
  returnAmount: 0n,
  returnAmountConsideringFees: 0n,
  marketSpotPrice: 0n.toString(),
};

export class RouterService {
  private routeProposer: RouteProposer;
  private poolService: PoolService;
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

  // new pool service
  // new price service
  // new event service

  getSwaps(
    tokenIn: Address,
    tokenOut: Address,
    swapType: SwapTypes,
    swapAmount: bigint,
    swapOptions?: Partial<any>,
  ): SwapInfo {
    if (!this.poolService.finishedFetching)
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

    let swapInfo: SwapInfo;
    swapInfo = this.findPath(
      wrappedInfo.tokenIn.addressForSwaps as Address,
      wrappedInfo.tokenOut.addressForSwaps as Address,
      swapType,
      wrappedInfo.swapAmountForSwaps,
      pools,
      options,
    );

    if (swapInfo.returnAmount === 0n) return swapInfo;

    swapInfo = setWrappedInfo(swapInfo, wrappedInfo, this.config);

    return swapInfo;
  }

  // Will process swap/pools data and return best swaps
  private findPath(
    tokenIn: Address,
    tokenOut: Address,
    swapType: SwapTypes,
    swapAmount: bigint,
    pools: any[],
    swapOptions: SwapOptions,
  ): SwapInfo {
    if (pools.length === 0)
      return cloneDeep(EMPTY_SWAPINFO) as unknown as SwapInfo;

    const paths = this.routeProposer.getCandidatePaths(
      tokenIn,
      tokenOut,
      swapType,
      pools,
      swapOptions,
    );

    if (paths.length == 0)
      return cloneDeep(EMPTY_SWAPINFO) as unknown as SwapInfo;

    // Path is guaranteed to contain both tokenIn and tokenOut
    let tokenInDecimals = 0;
    let tokenOutDecimals = 0;
    paths[0]?.swaps.forEach(
      (swap: {
        tokenIn: any;
        tokenInDecimals: any;
        tokenOut: any;
        tokenOutDecimals: any;
      }) => {
        // Inject token decimals to avoid having to query onchain
        if (swap.tokenIn === tokenIn) {
          tokenInDecimals = swap.tokenInDecimals;
        }
        if (swap.tokenOut === tokenOut) {
          tokenOutDecimals = swap.tokenOutDecimals;
        }
      },
    );

    // TODO: this is used for further optimizing stuff

    // const costOutputToken = await this.getCostOfSwapInToken(
    //     swapType === SwapTypes.SwapExactIn ? tokenOut : tokenIn,
    //     swapType === SwapTypes.SwapExactIn
    //         ? tokenOutDecimals
    //         : tokenInDecimals,
    //     swapOptions.gasPrice,
    //     swapOptions.swapGas
    // );

    // Returns list of swaps
    const [swaps, total, marketSp, totalConsideringFees] = this.getBestPaths(
      paths,
      swapAmount,
      swapType,
      tokenInDecimals,
      tokenOutDecimals,
      0n,
      swapOptions.maxPools,
    );

    const swapInfo = formatSwaps(
      swaps,
      swapType,
      swapAmount,
      tokenIn,
      tokenOut,
      total,
      totalConsideringFees,
      marketSp,
    );

    return swapInfo;
  }

  /**
   * Find optimal routes for trade from given candidate paths
   */
  private getBestPaths(
    paths: NewPath[],
    swapAmount: bigint,
    swapType: SwapTypes,
    tokenInDecimals: number,
    tokenOutDecimals: number,
    costOutputToken: bigint,
    maxPools: number,
  ): [Swap[][], bigint, string, bigint] {
    // swapExactIn - total = total amount swap will return of tokenOut
    // swapExactOut - total = total amount of tokenIn required for swap

    const [inputDecimals, outputDecimals] =
      swapType === SwapTypes.SwapExactIn
        ? [tokenInDecimals, tokenOutDecimals]
        : [tokenOutDecimals, tokenInDecimals];

    const [swaps, total, marketSp, totalConsideringFees] = getBestPaths(
      paths,
      swapType,
      swapAmount,
      inputDecimals,
      outputDecimals,
      maxPools,
      costOutputToken,
    );

    return [swaps, total, marketSp.toString(), totalConsideringFees];
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
): SwapInfo {
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

  const swapInfo: SwapInfo = {
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
      userData: "0x",
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

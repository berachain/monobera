import { type Address, parseUnits } from "viem";
import { type RouterConfig } from "~/config";
import cloneDeep from 'lodash';
import { getBestPaths } from "./bestPath";
import { formatSwaps } from "./optimize";
import { type SwapInfo, type SwapOptions, SwapTypes, type NewPath, type Swap } from "./types";

export const EMPTY_SWAPINFO: SwapInfo = {
    tokenAddresses: [],
    swaps: [],
    swapAmount: 0n,
    tokenIn: '' as Address,
    tokenOut: '' as Address,
    returnAmount: 0n,
    returnAmountConsideringFees: 0n,
    marketSpotPrice: 0n.toString(),
};

export class RouterService {
    private readonly defaultSwapOptions: SwapOptions = {
        gasPrice: parseUnits(`${85000}`, 9),
        swapGas: parseUnits(`${85000}`, 18),
        maxPools: 4,
        timestamp: Math.floor(Date.now() / 1000),
    };
    constructor(
        private readonly config: RouterConfig,
      ) {}

    // new pool service
    // new price service
    // new event service

    async getSwaps(
        tokenIn: string,
        tokenOut: string,
        swapType: SwapTypes,
        swapAmount: bigint,
        swapOptions?: Partial<any>,
    ): Promise<SwapInfo> {
        return {}
    }

    // Will process swap/pools data and return best swaps
    private async findPath(
        tokenIn: string,
        tokenOut: string,
        swapType: SwapTypes,
        swapAmount: bigint,
        pools: any[],
        swapOptions: SwapOptions
    ): Promise<SwapInfo> {
        if (pools.length === 0) return (cloneDeep(EMPTY_SWAPINFO) as unknown as SwapInfo);

        const paths = getCandidatePaths(
            tokenIn,
            tokenOut,
            swapType,
            pools,
            swapOptions
        );

        if (paths.length == 0) return (cloneDeep(EMPTY_SWAPINFO) as unknown as SwapInfo);

        // Path is guaranteed to contain both tokenIn and tokenOut
        let tokenInDecimals = 0;
        let tokenOutDecimals = 0;
        paths[0].swaps.forEach((swap: { tokenIn: any; tokenInDecimals: any; tokenOut: any; tokenOutDecimals: any; }) => {
            // Inject token decimals to avoid having to query onchain
            if (swap.tokenIn === tokenIn) {
                tokenInDecimals = swap.tokenInDecimals;
            }
            if (swap.tokenOut === tokenOut) {
                tokenOutDecimals = swap.tokenOutDecimals;
            }
        });
 
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
        const [swaps, total, marketSp, totalConsideringFees] =
            this.getBestPaths(
                paths,
                swapAmount,
                swapType,
                tokenInDecimals,
                tokenOutDecimals,
                0n,
                swapOptions.maxPools
            );

        const swapInfo = formatSwaps(
            swaps,
            swapType,
            swapAmount,
            tokenIn,
            tokenOut,
            total,
            totalConsideringFees,
            marketSp
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
        maxPools: number
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
            costOutputToken
        );

        return [
            swaps,
            total,
            marketSp.toString(),
            totalConsideringFees
        ];
    }
}

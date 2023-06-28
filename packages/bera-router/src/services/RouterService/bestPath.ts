import { optimizeSwapAmounts, formatSwaps } from "./optimize";
import { type NewPath, type SwapTypes, type Swap } from "./types";

export const getBestPaths = (
    paths: NewPath[],
    swapType: SwapTypes,
    totalSwapAmount: bigint,
    inputDecimals: number,
    outputDecimals: number,
    maxPools: number,
    costReturnToken: bigint
): [Swap[][], bigint, bigint, bigint] => {
    // No paths available or totalSwapAmount == 0, return empty solution
    if (paths.length == 0 || totalSwapAmount === 0n) {
        return [[], 0n, 0n, 0n];
    }

    // Before we start the main loop, we first check if there is enough liquidity for this totalSwapAmount
    const highestLimitAmounts = getHighestLimitAmountsForPaths(paths, maxPools);
    const sumLimitAmounts = highestLimitAmounts.reduce(
        (r: bigint[], pathLimit: bigint) => {
            r.push(pathLimit + (r[r.length - 1] || 0n));
            return r;
        },
        []
    );

    // If the cumulative limit across all paths is lower than totalSwapAmount then no solution is possible
    if (totalSwapAmount >sumLimitAmounts[sumLimitAmounts.length - 1]) {
        return [[], 0n, 0n, 0n];
    }

    // We use the highest limits to define the initial number of pools considered and the initial guess for swapAmounts.
    const initialNumPaths =
        sumLimitAmounts.findIndex((cumulativeLimit : any) =>
            // If below is true, it means we have enough liquidity
            totalSwapAmount <= cumulativeLimit
        ) + 1;

    const initialSwapAmounts = highestLimitAmounts.slice(0, initialNumPaths);

    //  Since the sum of the first i highest limits will be less than totalSwapAmount, we remove the difference to the last swapAmount
    //  so we are sure that the sum of swapAmounts will be equal to totalSwapAmount
    const difference =
        sumLimitAmounts[initialNumPaths - 1].sub(totalSwapAmount);
    initialSwapAmounts[initialSwapAmounts.length - 1] =
        initialSwapAmounts[initialSwapAmounts.length - 1].sub(difference);

    const [bestPaths, bestSwapAmounts, bestTotalReturnConsideringFees] =
        optimizeSwapAmounts(
            paths,
            swapType,
            totalSwapAmount,
            initialSwapAmounts,
            highestLimitAmounts,
            inputDecimals,
            outputDecimals,
            initialNumPaths,
            maxPools,
            costReturnToken
        );

    const [swaps, bestTotalReturn, marketSp] = formatSwaps(
        bestPaths,
        swapType,
        totalSwapAmount, // TODO WTF
        bestSwapAmounts
    );

    if (bestTotalReturn === 0n ) return [[], 0n, 0n, 0n];

    return [swaps, bestTotalReturn, marketSp, bestTotalReturnConsideringFees];
};

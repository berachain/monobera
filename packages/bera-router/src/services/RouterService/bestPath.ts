import { formatSwaps, optimizeSwapAmounts } from "./optimize";
import { type NewPath, type Swap, type SwapTypes } from "./types";

export const getBestPaths = (
  paths: NewPath[],
  swapType: SwapTypes,
  totalSwapAmount: bigint,
  inputDecimals: number,
  outputDecimals: number,
  maxPools: number,
  costReturnToken: bigint,
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
    [],
  );

  // If the cumulative limit across all paths is lower than totalSwapAmount then no solution is possible
  if (totalSwapAmount > (sumLimitAmounts[sumLimitAmounts.length - 1] ?? 0n)) {
    return [[], 0n, 0n, 0n];
  }

  // We use the highest limits to define the initial number of pools considered and the initial guess for swapAmounts.
  const initialNumPaths =
    sumLimitAmounts.findIndex(
      (cumulativeLimit: any) =>
        // If below is true, it means we have enough liquidity
        totalSwapAmount <= cumulativeLimit,
    ) + 1;

  const initialSwapAmounts = highestLimitAmounts.slice(0, initialNumPaths);

  //  Since the sum of the first i highest limits will be less than totalSwapAmount, we remove the difference to the last swapAmount
  //  so we are sure that the sum of swapAmounts will be equal to totalSwapAmount
  const difference =
    (sumLimitAmounts[initialNumPaths - 1] ?? 0n) - totalSwapAmount;
  initialSwapAmounts[initialSwapAmounts.length - 1] =
    (initialSwapAmounts[initialSwapAmounts.length - 1] ?? 0n) - difference;

  console.log("difference", difference);
  console.log("initialSwapAmounts", initialSwapAmounts);
  console.log("initialNumPaths", initialNumPaths);
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
      costReturnToken,
    );

  console.log("bestPaths", bestPaths);
  console.log("bestSwapAmounts", bestSwapAmounts);
  console.log("bestTotalReturnConsideringFees", bestTotalReturnConsideringFees);
  console.log("hi7");
  const [swaps, bestTotalReturn, marketSp] = formatSwaps(
    bestPaths,
    swapType,
    totalSwapAmount, // TODO WTF
    bestSwapAmounts,
  );

  if (bestTotalReturn === 0n) return [[], 0n, 0n, 0n];

  return [swaps, bestTotalReturn, marketSp, bestTotalReturnConsideringFees];
};

export function getHighestLimitAmountsForPaths(
  paths: NewPath[],
  maxPools: number,
): bigint[] {
  if (paths.length === 0) return [];
  const limitAmounts: bigint[] = [];
  for (let i = 0; i < maxPools; i++) {
    if (i < paths.length) {
      const limitAmount = paths[i]?.limitAmount;
      limitAmounts.push(limitAmount ?? 0n);
    }
  }
  return limitAmounts;
}

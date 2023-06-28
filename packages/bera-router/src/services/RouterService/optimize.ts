import { cloneDeep } from "lodash";
import { type NewPath, SwapTypes, type Swap, INFINITY, PRICE_ERROR_TOLERANCE, type PoolBase, type PoolPairBase, INFINITESIMAL, MINIMUM_VALUE } from "./types";
import { EVMgetOutputAmountSwap } from "./utils";
import { parseUnits } from "viem";

export const optimizeSwapAmounts = (
    paths: NewPath[],
    swapType: SwapTypes,
    totalSwapAmount: bigint,
    initialSwapAmounts: bigint[],
    highestLimitAmounts: bigint[],
    inputDecimals: number,
    outputDecimals: number,
    initialNumPaths: number,
    maxPools: number,
    costReturnToken: bigint
): [NewPath[], bigint[], bigint] => {
    // First get the optimal totalReturn to trade 'totalSwapAmount' with
    // one path only (b=1). Then increase the number of pools as long as
    // improvementCondition is true (see more information below)
    let bestTotalReturnConsideringFees =
        swapType === SwapTypes.SwapExactIn ? (INFINITY * -1n) : INFINITY;
    let bestSwapAmounts: bigint[] = [];
    let bestPaths: NewPath[] = [];
    let swapAmounts = initialSwapAmounts.map((amount) =>
        amount
    );
    for (let b = initialNumPaths; b <= paths.length; b++) {
        if (b != initialNumPaths) {
            // We already had a previous iteration and are adding another pool this new iteration
            // swapAmounts.push(ONE); // Initialize new swapAmount with 1 wei to
            // make sure that it won't be considered as a non viable amount (which would
            // be the case if it started at 0)

            // Start new path at 1/b of totalSwapAmount (i.e. if this is the 5th pool, we start with
            // 20% of the totalSwapAmount for this new swapAmount added). However, we need to make sure
            // that this value is not higher then the bth limit of the paths available otherwise there
            // won't be any possible path to process this swapAmount:
            const humanTotalSwapAmount =
                totalSwapAmount

        const newSwapAmount = BigInt(Math.min(
            Number(humanTotalSwapAmount * (1n / BigInt(b))),
            Number(highestLimitAmounts[b - 1])
        ));
            // We need then to multiply all current
            // swapAmounts by 1-newSwapAmount/totalSwapAmount.

            swapAmounts.forEach((swapAmount, i) => {
                swapAmounts[i] = (swapAmount * (1n - newSwapAmount / humanTotalSwapAmount))
            });
            if (newSwapAmount !== 0n) swapAmounts.push(newSwapAmount);
        }

        const { paths: selectedPaths, swapAmounts: bestAmounts } =
            optimizePathDistribution(
                paths,
                swapType,
                totalSwapAmount,
                swapAmounts,
                inputDecimals,
                outputDecimals,
                costReturnToken
            );
        swapAmounts = bestAmounts;

        const totalReturn = calcTotalReturn(
            selectedPaths,
            swapType,
            swapAmounts,
            inputDecimals
        );

        // Calculates the number of pools in all the paths to include the gas costs
        const totalNumberOfPools = selectedPaths.reduce(
            (acc, path) => acc + path.swaps.length,
            0
        );

        // improvementCondition is true if we are improving the totalReturn
        // Notice that totalReturn has to be maximized for 'swapExactIn'
        // and MINIMIZED for 'swapExactOut'
        // This is because for the case of 'swapExactOut', totalReturn means the
        // amount of tokenIn needed to buy totalSwapAmount of tokenOut
        const costReturnTokenHuman = costReturnToken
        let improvementCondition = false;
        let totalReturnConsideringFees = 0n;
        
        const gasFees = BigInt(totalNumberOfPools) * costReturnTokenHuman;

        if (swapType === SwapTypes.SwapExactIn) {
            totalReturnConsideringFees = totalReturn - gasFees;
            improvementCondition = totalReturnConsideringFees >
                bestTotalReturnConsideringFees
        } else {
            totalReturnConsideringFees = totalReturn + gasFees;
            improvementCondition = totalReturnConsideringFees <
                bestTotalReturnConsideringFees
        }

        // Stop if improvement has stopped
        if (!improvementCondition) break;

        bestSwapAmounts = [...swapAmounts]; // Copy to avoid linking variables
        bestPaths = [...selectedPaths];
        bestTotalReturnConsideringFees = totalReturnConsideringFees;

        // Stop if max number of pools has been reached
        if (totalNumberOfPools >= maxPools) break;
    }

    // 0 swap amounts can occur due to rounding errors but we don't want to pass those on so filter out
    bestPaths = bestPaths.filter((_, i) => bestSwapAmounts[i] !== 0n);
    bestSwapAmounts = bestSwapAmounts.filter(
        (swapAmount) => swapAmount !== 0n
    );

    return [bestPaths, bestSwapAmounts, bestTotalReturnConsideringFees];
};

/**
 * For a fixed number of possible paths, finds the optimal distribution of swap amounts to maximise output
 */
const optimizePathDistribution = (
    allPaths: NewPath[],
    swapType: SwapTypes,
    totalSwapAmount: bigint,
    initialSwapAmounts: bigint[],
    inputDecimals: number,
    outputDecimals: number,
    costReturnToken: bigint
): { paths: NewPath[]; swapAmounts: bigint[] } => {
    let [selectedPaths, exceedingAmounts] = getBestPathIds(
        allPaths,
        swapType,
        initialSwapAmounts,
        inputDecimals,
        outputDecimals,
        costReturnToken
    );

    let swapAmounts = initialSwapAmounts;

    // Trivial case of only allowing a single path
    if (initialSwapAmounts.length === 1) {
        return {
            swapAmounts,
            paths: selectedPaths,
        };
    }

    const humanTotalSwapAmount = totalSwapAmount

    // We store the next set of paths to consider separately so that can always retrieve the previous paths
    let newSelectedPaths = selectedPaths;

    // We now loop to iterateSwapAmounts until we converge.
    const historyOfSortedPathIds: string[] = [];
    let sortedPathIdsJSON = JSON.stringify(
        newSelectedPaths.map(({ id }) => id).sort()
    );

    while (!historyOfSortedPathIds.includes(sortedPathIdsJSON)) {
        // Local minima can result in infinite loops
        // We then maintain a log of the sorted paths ids which we have already considered to prevent getting stuck
        historyOfSortedPathIds.push(sortedPathIdsJSON);
        selectedPaths = newSelectedPaths;

        [swapAmounts, exceedingAmounts] = iterateSwapAmounts(
            selectedPaths,
            swapType,
            humanTotalSwapAmount,
            swapAmounts,
            exceedingAmounts
        );
        [newSelectedPaths, exceedingAmounts] = getBestPathIds(
            allPaths,
            swapType,
            swapAmounts,
            inputDecimals,
            outputDecimals,
            costReturnToken
        );

        if (newSelectedPaths.length === 0) break;

        const pathIds = newSelectedPaths.map(({ id }) => id).sort();
        sortedPathIdsJSON = JSON.stringify(pathIds);
    }

    return {
        swapAmounts,
        paths: selectedPaths,
    };
};

export const formatSwaps = (
    bestPaths: NewPath[],
    swapType: SwapTypes,
    totalSwapAmount: bigint,
    bestSwapAmounts: bigint[]
): [Swap[][], bigint, bigint] => {
    //// Prepare swap data from paths
    const swaps: Swap[][] = [];
    let highestSwapAmt = (bestSwapAmounts[0] ?? 0n);
    // @ts-ignore
    let largestSwapPath: NewPath = bestPaths[0];
    let bestTotalReturn = 0n; // Reset totalReturn as this time it will be
    // calculated with the EVM maths so the return is exactly what the user will get
    // after executing the transaction (given there are no front-runners)

    bestPaths.forEach((path, i) => {
        const swapAmount = bestSwapAmounts[i];
        if(!swapAmount) return
        if (swapAmount > highestSwapAmt) {
            highestSwapAmt = swapAmount;
            largestSwapPath = path;
        }
        // // TODO: remove. To debug only!
        /*
        console.log(
            'Prices should be all very close (unless one of the paths is on the limit!'
        );
        console.log(
            getSpotPriceAfterSwapForPath(path, swapType, swapAmount).toNumber()
        );
        */
        const poolPairData = path.poolPairData;
        const pathSwaps: Swap[] = [];
        const amounts: bigint[] = [];
        let returnAmount: bigint;
        const n = poolPairData.length;
        amounts.push(swapAmount);
        if (swapType === SwapTypes.SwapExactIn) {
            for (let i = 0; i < n; i++) {
                amounts.push(
                    EVMgetOutputAmountSwap(
                        path.pools[i],
                        poolPairData[i],
                        SwapTypes.SwapExactIn,
                        amounts[amounts.length - 1]
                    )
                );

                        
                const swap: Swap = {
                    pool: (path.swaps[i]?.pool ?? ''),
                    tokenIn: (path.swaps[i]?.tokenIn ?? ''),
                    tokenOut: (path.swaps[i]?.tokenOut ?? ''),
                    swapAmount: amounts[i]?.toString(),
                    tokenInDecimals: (path.poolPairData[i]?.decimalsIn ?? 18),
                    tokenOutDecimals: (path.poolPairData[i]?.decimalsOut ?? 18),
                    returnAmount: amounts[amounts.length - 1]?.toString(),
                };
                pathSwaps.push(swap);
            }
            returnAmount = (amounts[n] ?? 0n);
        } else {
            for (let i = 0; i < n; i++) {
                amounts.unshift(
                    EVMgetOutputAmountSwap(
                        path.pools[n - 1 - i],
                        poolPairData[n - 1 - i],
                        SwapTypes.SwapExactOut,
                        amounts[0]
                    )
                );
                const swap: Swap = {
                    pool: (path.swaps[n - 1 - i]?.pool ?? ''),
                    tokenIn: (path.swaps[n - 1 - i]?.tokenIn ?? ''),
                    tokenOut: (path.swaps[n - 1 - i]?.tokenOut ?? ''),
                    swapAmount: amounts[1]?.toString(),
                    tokenInDecimals: (path.poolPairData[n - 1 - i]?.decimalsIn ?? 18),
                    tokenOutDecimals: (path.poolPairData[n - 1 - i]?.decimalsOut ?? 18),
                    returnAmount: amounts[0]?.toString(),
                };
                pathSwaps.unshift(swap);
            }
            returnAmount =( amounts[0] ?? 0n);
        }
        swaps.push(pathSwaps);
        bestTotalReturn = bestTotalReturn + returnAmount;
    });

    // Since the individual swapAmounts for each path are integers, the sum of all swapAmounts
    // might not be exactly equal to the totalSwapAmount the user requested. We need to correct that rounding error
    // and we do that by adding the rounding error to the first path.
    if (swaps.length > 0) {
        const totalSwapAmountWithRoundingErrors = bestSwapAmounts.reduce(
            (a, b) => a + b,
            0n
        );
        const dust = totalSwapAmount - totalSwapAmountWithRoundingErrors
        if (swapType === SwapTypes.SwapExactIn) {
            // As swap is ExactIn, add dust to input pool
            // @ts-ignore
            swaps[0][0].swapAmount = (BigInt(swaps[0][0].swapAmount ?? '0') + dust).toString();
        } else {
            // As swap is ExactOut, add dust to output pool
            // @ts-ignore
            const firstPathLastPoolIndex = bestPaths[0].swaps.length - 1;
            // @ts-ignore
            swaps[0][firstPathLastPoolIndex].swapAmount = (BigInt(swaps[0][firstPathLastPoolIndex].swapAmount ?? '0') + dust).toString();
        }
    }

    if (bestTotalReturn === 0n) return [[], 0n, 0n];

    const marketSp = getSpotPriceAfterSwapForPath(
        largestSwapPath,
        swapType,
        0n
    );

    return [swaps, bestTotalReturn, marketSp];
};

//  For a given list of swapAmounts, gets list of pools with best effective price for these amounts
//  Always choose best pool for highest swapAmount first, then 2nd swapAmount and so on. This is
//  because it's best to use the best effective price for the highest amount to be traded
function getBestPathIds(
    originalPaths: NewPath[],
    swapType: SwapTypes,
    swapAmounts: bigint[],
    inputDecimals: number,
    outputDecimals: number,
    costReturnToken: bigint
): [NewPath[], bigint[]] {
    const selectedPaths: NewPath[] = [];
    const selectedPathExceedingAmounts: bigint[] = [];
    const paths = cloneDeep(originalPaths); // Deep copy to avoid changing the original path data

    // Sort swapAmounts in descending order without changing original: https://stackoverflow.com/a/42442909
    const sortedSwapAmounts = [...swapAmounts].sort((a, b) => {
        return Number(b) - Number(a);
    });
    
    sortedSwapAmounts.forEach((swapAmount) => {
        // Find path that has best effective price
        let bestPathIndex = -1;
        let bestEffectivePrice = INFINITY; // Start with worst price possible
        paths.forEach((path, i) => {
            // Do not consider this path if its limit is below swapAmount
            if (
                path.limitAmount >= swapAmount
            ) {
                // Calculate effective price of this path for this swapAmount
                // If path.limitAmount = swapAmount we set effectivePrice as
                // Infinity because we know this path is maxed out and we want
                // to select other paths that can still be improved on
                let effectivePrice: bigint;
                if (
                    path.limitAmount === swapAmount
                ) {
                    effectivePrice = INFINITY;
                } else {
                    // TODO for optimization: pass already calculated limitAmount as input
                    // to getEffectivePriceSwapForPath()
                    effectivePrice = getEffectivePriceSwapForPath(
                        path,
                        swapType,
                        swapAmount,
                        inputDecimals,
                        outputDecimals,
                        costReturnToken
                    );
                }
                if (effectivePrice <= bestEffectivePrice) {
                    bestEffectivePrice = effectivePrice;
                    bestPathIndex = i;
                }
            }
        });

        if (bestPathIndex === -1) {
            selectedPaths.push({
                id: '',
                swaps: [],
                poolPairData: [],
                limitAmount: 0n,
                pools: [],
            });
            selectedPathExceedingAmounts.push(0n);
            return;
        } else {
            //@ts-ignore
            selectedPaths.push(paths[bestPathIndex]);
            //@ts-ignore
            selectedPathExceedingAmounts.push(swapAmount - paths[bestPathIndex].limitAmount);
            paths.splice(bestPathIndex, 1); // Remove path from list
        }
    });

    return [selectedPaths, selectedPathExceedingAmounts];
}

// This functions finds the swapAmounts such that all the paths that have viable swapAmounts (i.e.
// that are not negative or equal to limitAmount) bring their respective prices after swap to the
// same price (which means that this is the optimal solution for the paths analyzed)
function iterateSwapAmounts(
    selectedPaths: NewPath[],
    swapType: SwapTypes,
    totalSwapAmount: bigint,
    swapAmounts: bigint[],
    exceedingAmounts: bigint[]
): [bigint[], bigint[]] {
    let priceError = 1n; // Initialize priceError just so that while starts
    let prices: bigint[] = [];
    // // Since this is the beginning of an iteration with a new set of paths, we
    // // set any swapAmounts that were 0 previously to 1 wei or at the limit
    // // to limit minus 1 wei just so that they
    // // are considered as viable for iterateSwapAmountsApproximation(). If they were
    // // left at 0 iterateSwapAmountsApproximation() would consider them already outside
    // // the viable range and would not iterate on them. This is useful when
    // // iterateSwapAmountsApproximation() is being repeatedly called within the while loop
    // // below, but not when a new execution of iterateSwapAmounts() happens with new
    // // paths.
    // for (let i = 0; i < swapAmounts.length; ++i) {
    //     if (swapAmounts[i].isZero()) {
    //         // Very small amount: TODO put in config file
    //         const epsilon = totalSwapAmount.times(INFINITESIMAL);
    //         swapAmounts[i] = epsilon;
    //         exceedingAmounts[i] = exceedingAmounts[i].plus(epsilon);
    //     }
    //     if (exceedingAmounts[i].isZero()) {
    //         // Very small amount: TODO put in config file
    //         const epsilon = totalSwapAmount.times(INFINITESIMAL);
    //         swapAmounts[i] = swapAmounts[i].minus(epsilon); // Very small amount
    //         exceedingAmounts[i] = exceedingAmounts[i].minus(epsilon);
    //     }
    // }
    let iterationCount = 0;
    while (priceError > PRICE_ERROR_TOLERANCE) {
        [prices, swapAmounts, exceedingAmounts] =
            iterateSwapAmountsApproximation(
                selectedPaths,
                swapType,
                totalSwapAmount,
                swapAmounts,
                exceedingAmounts,
                iterationCount
            );
        const [minPrice, maxPrice] = bigIntMinAndMax(prices)
        priceError = maxPrice.minus(minPrice).div(minPrice);
        iterationCount++;
        if (iterationCount > 100) break;
    }
    return [swapAmounts, exceedingAmounts];
}

function iterateSwapAmountsApproximation(
    selectedPaths: NewPath[],
    swapType: SwapTypes,
    totalSwapAmount: bigint,
    swapAmounts: bigint[],
    exceedingAmounts: bigint[], // This is the amount by which swapAmount exceeds the pool limit_amount
    iterationCount: number
): [bigint[], bigint[], bigint[]] {
    let sumInverseDerivativeSPaSs = 0n;
    let sumSPaSDividedByDerivativeSPaSs = 0n;
    const SPaSs: bigint[] = [];
    const derivativeSPaSs: bigint[] = [];

    // We only iterate on the swapAmounts that are viable (i.e. no negative or > than path limit)
    // OR if this is the first time "iterateSwapAmountsApproximation" is called
    // within "iterateSwapAmounts()". In this case swapAmounts should be considered viable
    // also if they are on the limit.
    swapAmounts.forEach((swapAmount, i) => {
        if (
          (iterationCount === 0 &&
            swapAmount >= 0n &&
            (exceedingAmounts[i] ?? 0n) <= 0n) ||
          (iterationCount !== 0 &&
            swapAmount > 0n &&
            (exceedingAmounts[i] ?? 0n) < 0n)
        ) {
          const path = selectedPaths[i];
          const SPaS: bigint = getSpotPriceAfterSwapForPath(
            path,
            swapType,
            swapAmount
          );
          SPaSs.push(SPaS);
          const derivative_SPaS = getDerivativeSpotPriceAfterSwapForPath(
            path,
            swapType,
            swapAmount
          );
          derivativeSPaSs.push(derivative_SPaS);
          sumInverseDerivativeSPaSs += 1n / derivative_SPaS;
          sumSPaSDividedByDerivativeSPaSs +=
            SPaS / derivative_SPaS;
        } else {
          derivativeSPaSs.push(BigInt(NaN));
          SPaSs.push(BigInt(NaN));
        }
      });
      
    // // This division using bigint below lost precision. Its result was for example
    // 1.042818e-12 while using normal js math operations it was
    // 1.0428184989387553e-12. This loss of precision caused an important bug

    // let weighted_average_SPaS = sumSPaSDividedByDerivativeSPaSs.div(
    //     sumInverseDerivativeSPaSs
    // );
    const weighted_average_SPaS =
        sumSPaSDividedByDerivativeSPaSs /
            sumInverseDerivativeSPaSs


            swapAmounts.forEach((swapAmount, i) => {
                if (
                  (iterationCount === 0 &&
                    swapAmount >= 0n &&
                    (exceedingAmounts[i] ?? 0n) <= 0n) ||
                  (iterationCount !== 0 &&
                    swapAmount > 0n &&
                    (exceedingAmounts[i] ?? 0n) < 0n)
                ) {
                  const deltaSwapAmount = weighted_average_SPaS - ((SPaSs[i] ?? 0n) / (derivativeSPaSs[i] ?? 0n));
                  swapAmounts[i] += deltaSwapAmount;
                  exceedingAmounts[i] += deltaSwapAmount;
                }
              });
              

    // Make sure no input amount is negative or above the path limit
    while (
        whileLoopCondition(swapAmounts, exceedingAmounts)
    ) {
        [swapAmounts, exceedingAmounts] = redistributeInputAmounts(
            swapAmounts,
            exceedingAmounts,
            derivativeSPaSs
        );
    }

    const pricesForViableAmounts: bigint[] = []; // Get prices for all non-negative AND below-limit input amounts
    let swapAmountsSumWithRoundingErrors = 0n;
    swapAmounts.forEach((swapAmount, i) => {
        swapAmountsSumWithRoundingErrors += swapAmount;
        if (
            (iterationCount === 0 &&
                swapAmount >= 0n &&
                (exceedingAmounts[i] ?? 0n) <= 0n) ||
            (iterationCount !== 0 &&
                swapAmount > 0n &&
                (exceedingAmounts[i] ?? 0n) < 0n)
        ) {
            pricesForViableAmounts.push(
                getSpotPriceAfterSwapForPath(
                    selectedPaths[i],
                    swapType,
                    swapAmount
                )
            );
        }
    });
    
    const roundingError = totalSwapAmount - swapAmountsSumWithRoundingErrors;
    // console.log("Rounding error")
    // console.log(roundingError.div(totalSwapAmount).toNumber())
    // // let errorLimit = totalSwapAmount.times(bnum(0.001))
    // // if(roundingError>errorLimit)
    // //     throw "Rounding error in iterateSwapAmountsApproximation() too large";

    // Add rounding error to make sum be exactly equal to totalSwapAmount to avoid error compounding
    // Add to the first swapAmount that is already not zero or at the limit
    // AND only if swapAmount would not leave the viable range (i.e. swapAmoung
    // would still be >0 and <limit) after adding the error
    // I.d. we need: (swapAmount+error)>0 AND (exceedingAmount+error)<0
    for (let i = 0; i < swapAmounts.length; ++i) {
        if ((swapAmounts[i] ?? 0n) > 0n && (exceedingAmounts[i] ?? 0n) < 0n) {
            if (
                (swapAmounts[i] ?? 0n) + roundingError > 0n &&
                (exceedingAmounts[i] ?? 0n) + roundingError < 0n
            ) {
                swapAmounts[i] += roundingError;
                exceedingAmounts[i] += roundingError;
                break;
            }
        }
    }

    return [pricesForViableAmounts, swapAmounts, exceedingAmounts];
}

function redistributeInputAmounts(
    swapAmounts: bigint[],
    exceedingAmounts: bigint[],
    derivativeSPaSs: bigint[]
): [bigint[], bigint[]] {
    let sumInverseDerivativeSPaSsForViableAmounts = 0n;
    let sumInverseDerivativeSPaSsForNegativeAmounts = 0n;
    let sumInverseDerivativeSPaSsForExceedingAmounts = 0n;
    let sumNegativeOrExceedingSwapAmounts = 0n;
    swapAmounts.forEach((swapAmount, i) => {
        // Amount is negative
        if (swapAmount <= 0n) {
            sumNegativeOrExceedingSwapAmounts += swapAmount;
            sumInverseDerivativeSPaSsForNegativeAmounts += 1n / (derivativeSPaSs[i] ?? 1n);
        }
        // Amount is above limit (exceeding > 0)
        else if ((exceedingAmounts[i] ?? 0n) >= 0n) {
            sumNegativeOrExceedingSwapAmounts += (exceedingAmounts[i] ?? 0n);
            sumInverseDerivativeSPaSsForExceedingAmounts += 1n / (derivativeSPaSs[i] ?? 0n) ;
        }
        // Sum the inverse of the derivative if the swapAmount is viable,
        // i.e. if swapAmount > 0 or swapAmount < limit
        else {
            sumInverseDerivativeSPaSsForViableAmounts += 1n / (derivativeSPaSs[i] ?? 0n);
        }
    });
    // Now redestribute sumNegativeOrExceedingSwapAmounts
    // to non-exceeding pools if sumNegativeOrExceedingSwapAmounts > 0
    // or to non zero swapAmount pools if sumNegativeOrExceedingSwapAmounts < 0
swapAmounts.forEach((swapAmount, i) => {
    if (swapAmount <= 0n) {
        swapAmounts[i] = 0n;
        exceedingAmounts[i] -= swapAmount;
    } else if ((exceedingAmounts[i] ?? 0n) >= 0n) {
        swapAmounts[i] -= (exceedingAmounts[i] ?? 0n); // This is the same as swapAmounts[i] = pathLimitAmounts[i]
        exceedingAmounts[i] = 0n;
    } else {
        const deltaSwapAmount = sumNegativeOrExceedingSwapAmounts * (1n / (derivativeSPaSs[i] ?? 0n)) / sumInverseDerivativeSPaSsForViableAmounts;
        swapAmounts[i] += deltaSwapAmount;
        exceedingAmounts[i] += deltaSwapAmount;
    }
});

    // If there were no viable amounts (i.e all amounts were either negative or above limit)
    // We run this extra loop to redistribute the excess
    if (sumInverseDerivativeSPaSsForViableAmounts === 0n) {
        if (sumNegativeOrExceedingSwapAmounts < 0n) {
            // This means we need to redistribute to the exceeding amounts that
            // were now set to the limit
            swapAmounts.forEach((swapAmount, i) => {
                if (exceedingAmounts[i] === 0n) {
                    const deltaSwapAmount = sumNegativeOrExceedingSwapAmounts
                        * (1n / (derivativeSPaSs[i] ?? 0n))
                        / sumInverseDerivativeSPaSsForExceedingAmounts;
                    swapAmounts[i] += deltaSwapAmount;
                    exceedingAmounts[i] += deltaSwapAmount;
                }
            });
        } else {
            // This means we need to redistribute to the negative amounts that
            // were now set to zero
            swapAmounts.forEach((swapAmount, i) => {
                if (swapAmounts[i] === 0n) {
                    const deltaSwapAmount = sumNegativeOrExceedingSwapAmounts
                        * (1n / (derivativeSPaSs[i] ?? 0n))
                        / sumInverseDerivativeSPaSsForNegativeAmounts;
                    swapAmounts[i] += deltaSwapAmount;
                    exceedingAmounts[i] += deltaSwapAmount;
                }
            });
        }
    }
    
    return [swapAmounts, exceedingAmounts];
}

// TODO: calculate EVM return (use bmath) and update pool balances like current SOR
export const calcTotalReturn = (
    paths: NewPath[],
    swapType: SwapTypes,
    swapAmounts: bigint[],
    inputDecimals: number
): bigint => {
    let totalReturn = 0n;
    // changing the contents of pools (parameter passed as reference)
    paths.forEach((path, i) => {
        totalReturn +=
            getOutputAmountSwapForPath(
                path,
                swapType,
                swapAmounts[i] ?? 0n,
                inputDecimals
            )
    });
    return totalReturn;
};


const bigIntMinAndMax = (...args: any[]) => {
    return args.reduce(([min,max], e) => {
       return [
         e < min ? e : min, 
         e > max ? e : max,
       ];
    }, [args[0], args[0]]);
  };

  const whileLoopCondition = (args: any[], args2: any[]) => {
    const [min] = bigIntMinAndMax(args);
    const [_, max] = bigIntMinAndMax(args2);

    return min < 0n || max > 0n;
  }        

  export function getSpotPriceAfterSwapForPath(
    path: NewPath | undefined,
    swapType: SwapTypes,
    amount: bigint
): bigint {
    if(!path || !swapType || !amount) return 0n
    const amounts = getAmounts(path, swapType, amount);
    const prodsSpotPrices = getProdsSpotPrices(path, swapType, amounts);
    return prodsSpotPrices[0] ?? 0n;
}

function getProdsSpotPrices(
    path: NewPath,
    swapType: SwapTypes,
    amounts: bigint[]
): bigint[] {
    const pools = path.pools;
    const poolPairData = path.poolPairData;
    const ans = [1n];
    const n = pools.length;
    let oneIfExactOut = 0;
    if (swapType === SwapTypes.SwapExactOut) oneIfExactOut = 1;
    for (let i = 0; i < pools.length; i++) {
        ans.unshift(
            getSpotPriceAfterSwap(
                pools[n - 1 - i],
                poolPairData[n - 1 - i],
                swapType,
                amounts[n - 1 - i + oneIfExactOut]
            ) * (ans[0] ?? 1n)
        );
    }
    return ans;
}
// TODO: Add cases for pairType = [BTP->token, token->BTP] and poolType = [weighted, stable]
export function getSpotPriceAfterSwap(
    pool: PoolBase | undefined,
    poolPairData: PoolPairBase | undefined,
    swapType: SwapTypes,
    amount: bigint | undefined
): bigint {
    if(!pool || !poolPairData || !amount) return 0n
    // TODO: check if necessary to check if amount > limitAmount
    if (swapType === SwapTypes.SwapExactIn) {
        if (poolPairData.balanceIn === 0n) {
            return 0n;
        }
    } else {
        if (poolPairData.balanceOut === 0n) {
            return 0n;
        }
        if (
            parseUnits(`${Number(amount)}`, poolPairData.decimalsOut) >= poolPairData.balanceOut
        )
            return INFINITY;
    }
    if (swapType === SwapTypes.SwapExactIn) {
        return pool._spotPriceAfterSwapExactTokenInForTokenOut(
            poolPairData,
            amount
        );
    } else {
        return pool._spotPriceAfterSwapTokenInForExactTokenOut(
            poolPairData,
            amount
        );
    }
    throw Error('Unsupported swap');
}

function getAmounts(
    path: NewPath,
    swapType: SwapTypes,
    amount: bigint
): bigint[] {
    const pools = path.pools;
    const poolPairData = path.poolPairData;
    const ans = [amount];

    if (swapType === SwapTypes.SwapExactIn) {
        for (let i = 0; i < pools.length; i++) {
            ans.push(
                getOutputAmountSwap(
                    pools[i],
                    poolPairData[i],
                    swapType,
                    ans[ans.length - 1]
                )
            );
        }
    } else {
        const n = pools.length;
        for (let i = 0; i < pools.length; i++) {
            ans.unshift(
                getOutputAmountSwap(
                    pools[n - 1 - i],
                    poolPairData[n - 1 - i],
                    swapType,
                    ans[0]
                )
            );
        }
    }
    return ans;
}

export function getOutputAmountSwap(
    pool: PoolBase | undefined,
    poolPairData: PoolPairBase | undefined,
    swapType: SwapTypes,
    amount: bigint | undefined
): bigint {
    if(!pool || !poolPairData || !amount) return 0n
    // TODO: check if necessary to check if amount > limitAmount
    if (swapType === SwapTypes.SwapExactIn) {

        return pool._exactTokenInForTokenOut(poolPairData, amount);
    } else {
        if (poolPairData.balanceOut === 0n) {
            return 0n;
        } else if (
            parseUnits(`${Number(amount)}`, poolPairData.decimalsOut) >= poolPairData.balanceOut
        ) {
            return INFINITY;
        } else {
            return pool._tokenInForExactTokenOut(poolPairData, amount);
        }
    }
    throw Error('Unsupported swap');
}

export function getOutputAmountSwapForPath(
    path: NewPath | undefined,
    swapType: SwapTypes | undefined,
    amount: bigint ,
    inputDecimals: number
): bigint {
    if(!path || !swapType ) return 0n
    // First of all check if the amount is above limit, if so, return 0 for
    // 'swapExactIn' or Inf for swapExactOut
    if (amount > parseUnits(`${Number(path.limitAmount)}`, inputDecimals)) {
        // @ts-ignore
        if (swapType === SwapTypes.SwapExactIn) {
            return 0n;
        } else {
            return INFINITY;
        }
    }

    const amounts = getAmounts(path, swapType, amount);
    // @ts-ignore
    if (swapType === SwapTypes.SwapExactIn) {
        return amounts[amounts.length - 1] ?? 0n;
    } else {
        return amounts[0] ?? 0n;
    }
}

export function getEffectivePriceSwapForPath(
    path: NewPath,
    swapType: SwapTypes,
    amount: bigint,
    inputDecimals: number,
    outputDecimals: number,
    costReturnToken: bigint
): bigint {
    if (amount < INFINITESIMAL) {
        // Return spot price as code below would be 0/0 = undefined
        // or small_amount/0 or 0/small_amount which would cause bugs
        return getSpotPriceAfterSwapForPath(path, swapType, amount);
    }

    let outputAmountSwap = getOutputAmountSwapForPath(
        path,
        swapType,
        amount,
        inputDecimals
    );
    const gasCost = parseUnits(`${Number(costReturnToken)}`, outputDecimals) * BigInt(path.pools.length)
    if (swapType === SwapTypes.SwapExactIn) {
        outputAmountSwap = outputAmountSwap - gasCost
        return amount / outputAmountSwap // amountIn/AmountOut
    } else {
        amount = amount + gasCost
        return outputAmountSwap / amount // amountIn/AmountOut
    }
}

export function getDerivativeSpotPriceAfterSwapForPath(
    path: NewPath | undefined,
    swapType: SwapTypes,
    amount: bigint
): bigint {
    if(!path || !swapType || !amount) return 0n
    const poolPairData = path.poolPairData;
    const pools = path.pools;
    const n = pools.length;

    const amounts = getAmounts(path, swapType, amount);
    const prodsSpotPrices = getProdsSpotPrices(path, swapType, amounts);
    let ans = 0n;
    // @ts-ignore
    if (swapType === SwapTypes.SwapExactIn) {
        for (let i = 0; i < n; i++) {
            const newTerm = getDerivativeSpotPriceAfterSwap(
                pools[i],
                poolPairData[i],
                swapType,
                amounts[i]
            ) * (prodsSpotPrices[i + 1] ?? 1n);
            ans = ans + newTerm;
        }
    } else {
        const prodsFirstSpotPrices = getProdsFirstSpotPrices(
            path,
            swapType,
            amounts
        );
        for (let i = 0; i < n; i++) {
            let newTerm = getDerivativeSpotPriceAfterSwap(
                pools[i],
                poolPairData[i],
                swapType,
                amounts[i + 1]
            ) * (prodsSpotPrices[i + 1] ?? 1n);
            newTerm = newTerm * (prodsSpotPrices[i + 1] ?? 1n) * (prodsFirstSpotPrices[i] ?? 1n);
            // The following option is more efficient but returns less precision due to the division
            /*          let thisSpotPrice = getSpotPriceAfterSwap(pools[i], poolPairData[i], swapType, amounts[i + 1]);
            newTerm = newTerm.div(thisSpotPrice).times(prodsSpotPrices[0]);*/
            ans = ans + newTerm;
        }
    }
    if (ans === 0n) ans = MINIMUM_VALUE;
    return ans;
}

// TODO: Add cases for pairType = [BPT->token, token->BPT] and poolType = [weighted, stable]
export function getDerivativeSpotPriceAfterSwap(
    pool: PoolBase | undefined,
    poolPairData: PoolPairBase | undefined,
    swapType: SwapTypes,
    amount: bigint | undefined
): bigint {
    if(!pool || !poolPairData || !amount) return 0n
    // TODO: check if necessary to check if amount > limitAmount
    if (swapType === SwapTypes.SwapExactIn) {
        if (poolPairData.balanceIn === 0n) {
            return 0n;
        }
    } else {
        if (poolPairData.balanceOut === 0n) {
            return 0n;
        }
        if (
            parseUnits(`${Number(amount)}`, poolPairData.decimalsOut) >= poolPairData.balanceOut
        )
            return INFINITY;
    }
    if (swapType === SwapTypes.SwapExactIn) {
        return pool._derivativeSpotPriceAfterSwapExactTokenInForTokenOut(
            poolPairData,
            amount
        );
    } else {
        return pool._derivativeSpotPriceAfterSwapTokenInForExactTokenOut(
            poolPairData,
            amount
        );
    }
    throw Error('Unsupported swap');
}

function getProdsFirstSpotPrices(
    path: NewPath,
    swapType: SwapTypes,
    amounts: bigint[]
): bigint[] {
    if (swapType !== SwapTypes.SwapExactOut)
        // Throw error?
        return [0n];

    const pools = path.pools;
    const poolPairData = path.poolPairData;
    const ans = [1n];
    for (let i = 0; i < pools.length; i++) {
        ans.push(
            getSpotPriceAfterSwap(
                pools[i],
                poolPairData[i],
                swapType,
                amounts[i + 1]
            ) * (ans[ans.length - 1] ?? 1n)
        );
    }
    return ans;
}

// We need do pass 'pools' here because this function has to update the pools state

import { INFINITY, type PoolBase, PoolTypes, SwapTypes, type PoolPairBase } from "./types";

// in case a pool is used twice in two different paths
export function EVMgetOutputAmountSwap(
    pool: PoolBase | undefined,
    poolPairData: PoolPairBase | undefined,
    swapType: SwapTypes,
    amount: bigint | undefined,
): bigint {
    if (!pool || !poolPairData || !amount) return 0n;
    //we recalculate the pool pair data since balance updates are not reflected immediately in cached poolPairData
    poolPairData = pool.parsePoolPairData(
        poolPairData.tokenIn,
        poolPairData.tokenOut
    );

    const { balanceIn, balanceOut, tokenIn, tokenOut } = poolPairData;

    let returnAmount: bigint;

    if (swapType === SwapTypes.SwapExactIn) {
        if (
            poolPairData.poolType !== PoolTypes.Linear &&
            poolPairData.balanceIn === 0n
        ) {
            return 0n;
        }
    } else {
        if (poolPairData.balanceOut === 0n) {
            return 0n;
        }
        if (
            amount >= poolPairData.balanceOut
        )
            return INFINITY;
    }
    if (swapType === SwapTypes.SwapExactIn) {
            // Will accept/return normalised values
            returnAmount = pool._exactTokenInForTokenOut(poolPairData, amount);

    } else {

            returnAmount = pool._tokenInForExactTokenOut(poolPairData, amount);
    }

    const amountIn = swapType === SwapTypes.SwapExactIn ? amount : returnAmount;
    const amountOut =
        swapType === SwapTypes.SwapExactIn ? returnAmount : amount;

    // Update balances of tokenIn and tokenOut
    pool.updateTokenBalanceForPool(
        tokenIn,
        balanceIn + amountIn
        )
    pool.updateTokenBalanceForPool(
        tokenOut,
        balanceOut - amountOut
    );

    return returnAmount;
}

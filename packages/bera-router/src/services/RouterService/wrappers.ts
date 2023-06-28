import { parseUnits, type Address } from "viem";
import { type RouterConfig } from "~/config";
import { type SwapInfo } from "./types";

export interface WrappedInfo {
    swapAmountOriginal: bigint;
    swapAmountForSwaps: bigint;
    tokenIn: TokenInfo;
    tokenOut: TokenInfo;
}

export interface TokenInfo {
    addressOriginal: string;
    addressForSwaps: string;
    wrapType: WrapTypes;
    rate: bigint;
}

export enum WrapTypes {
    None,
    ETH, // ETH -> WETH
    stETH, // stETH -> wSTETH
    Unbutton, // [rebasing Token] -> ubToken
}

const ONE = parseUnits(`${1}`, 18);

export function getWrappedInfo(
    tokenIn: Address,
    tokenOut: Address,
    config: RouterConfig,
    swapAmount: bigint
): WrappedInfo {
    // The Subgraph returns tokens in lower case format so we must match this
    tokenIn = tokenIn;
    tokenOut = tokenOut;

    const swapAmountForSwaps = swapAmount;
    let tokenInForSwaps = tokenIn;
    let tokenInWrapType = WrapTypes.None;
    let tokenOutForSwaps = tokenOut;
    let tokenOutWrapType = WrapTypes.None;
    const tokenInRate = ONE
    const tokenOutRate = ONE

    //--------------------------------------------------------------------------
    // ETH/WETH

    // Handle ETH wrapping
    if (tokenIn === '0x0000000000000000000000000000000000000000') {
        tokenInForSwaps =  config.contracts.wbera;
        tokenInWrapType = WrapTypes.ETH;
    }

    // Handle WETH unwrapping
    if (tokenOut === '0x0000000000000000000000000000000000000000') {
        tokenOutForSwaps = config.contracts.wbera;
        tokenOutWrapType = WrapTypes.ETH;
    }

    return {
        swapAmountOriginal: swapAmount,
        swapAmountForSwaps: swapAmountForSwaps,
        tokenIn: {
            addressOriginal: tokenIn,
            addressForSwaps: tokenInForSwaps,
            wrapType: tokenInWrapType,
            rate: tokenInRate,
        },
        tokenOut: {
            addressOriginal: tokenOut,
            addressForSwaps: tokenOutForSwaps,
            wrapType: tokenOutWrapType,
            rate: tokenOutRate,
        },
    };
}

export function setWrappedInfo(
    swapInfo: SwapInfo,
    wrappedInfo: WrappedInfo,
    config: RouterConfig
): SwapInfo {
    if (swapInfo.swaps.length === 0) return swapInfo;

    swapInfo.tokenIn = wrappedInfo.tokenIn.addressOriginal as `0x${string}`;
    swapInfo.tokenOut = wrappedInfo.tokenOut.addressOriginal as `0x${string}`;
    // No wrapping required
    if (
        wrappedInfo.tokenIn.wrapType === WrapTypes.None &&
        wrappedInfo.tokenOut.wrapType === WrapTypes.None
    ) {
        return swapInfo;
    }

    //--------------------------------------------------------------------------
    // Wrappers which are 1:1 (ETH/WETH), ie UnscaledWrappers
    // Replace weth with ZERO/ETH in assets for Vault to handle ETH directly
    if (
        wrappedInfo.tokenIn.wrapType === WrapTypes.ETH ||
        wrappedInfo.tokenOut.wrapType === WrapTypes.ETH
    ) {
        swapInfo.tokenAddresses = swapInfo.tokenAddresses.map((addr: string) =>
            addr === config.contracts.wbera ? '0x0000000000000000000000000000000000000000' : addr
        );
    }


    return swapInfo;
}

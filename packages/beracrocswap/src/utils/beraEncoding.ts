import { BigNumber, ethers } from "ethers"
import { PoolInitEncoder } from "../encoding/init"
import { BeraSdkResponse } from "../types"
import { AddressZero } from '@ethersproject/constants';
import { getBeraLpAddress } from "./getBeraLpAddress";
import { beraTokenAddress } from "@bera/config";
// import { beraTokenAddress } from "@bera/config";

interface IToken {
    decimals: number
    address: string
}


function sortBaseQuoteViews (base: IToken, quote: IToken): 
  [IToken, IToken] {
  if(base.address === AddressZero) {
    console.log('1')
    return beraTokenAddress.toLowerCase() > quote.address.toLowerCase() ? [quote, base] : [base, quote]
  }

  if(quote.address === AddressZero) {
    console.log('2')
    return beraTokenAddress.toLowerCase() < base.address.toLowerCase() ? [quote, base] : [base, quote]
  } 

  return base.address.toLowerCase() < quote.address.toLowerCase() ?
    [base, quote] : [quote, base]
}

export const initPool = (initPrice: number, baseToken: IToken, quoteToken: IToken, poolIndex: number): BeraSdkResponse => {
    // Very small amount of ETH in economic terms but more than sufficient for min init burn
    const ETH_INIT_BURN = BigNumber.from(10).pow(12)
    
    const [sortedBaseToken, sortedQuoteToken] = sortBaseQuoteViews(baseToken, quoteToken)

    const encoder = new PoolInitEncoder(sortedBaseToken.address, sortedQuoteToken.address, poolIndex)
    const spotPrice = fromDisplayPrice(initPrice, sortedBaseToken.decimals,sortedQuoteToken.decimals, false)
    const calldata = encoder.encodeInitialize(spotPrice)        

    return {
        calldata, 
        value: sortedBaseToken.address === AddressZero ? ETH_INIT_BURN.toString() : undefined
    }
}

//limits is based on price & slippage

export const encodeWarmPath = (
    baseAddress: string,
    quoteAddress: string,
    callCode: number,
    lowerTick: number,
    upperTick: number,
    qty: bigint,
    limitLow: BigNumber,
    limitHigh: BigNumber,
    useSurplus: number,
    poolIdx: number,
  ) => {
    let abiCoder = new ethers.utils.AbiCoder()
    console.log([
      callCode,
      baseAddress,
      quoteAddress,
      poolIdx,
      lowerTick,
      upperTick,
      qty,
      limitLow,
      limitHigh,
      useSurplus,
      getBeraLpAddress(baseAddress, quoteAddress),
    ])
    return abiCoder.encode([
        "uint8", // Type call
        "address", // Base
        "address", // Quote
        "uint24", // Pool Index
        "int24", // Lower Tick
        "int24", // Upper Tick
        "uint128", // Liquidity
        "uint128", // Lower limit
        "uint128", // Upper limit
        "uint8", // reserve flags
        "address", // deposit vault
      ], [
      callCode,
      baseAddress,
      quoteAddress,
      poolIdx,
      lowerTick,
      upperTick,
      qty,
      limitLow,
      limitHigh,
      useSurplus,
      getBeraLpAddress(baseAddress, quoteAddress),
    ]);
  }


  export function transformLimits (limits: [number,number], baseDecimals: number, quoteDecimals: number): [BigNumber,BigNumber] {
    let left = fromDisplayPrice(limits[0], baseDecimals, quoteDecimals)
    let right = fromDisplayPrice(limits[1], baseDecimals, quoteDecimals)
    return (left < right) ?
        [encodeCrocPrice(left),encodeCrocPrice(right)] :
        [encodeCrocPrice( right), encodeCrocPrice( left)]
}

function fromDisplayPrice(
    price: number,
    baseDecimals: number,
    quoteDecimals: number,
    isInverted = false
  ): number {
    const scaled = isInverted ? 1 / price : price
    return scaled * Math.pow(10, baseDecimals - quoteDecimals)
  }
  


  function encodeCrocPrice(price: number): BigNumber {
    let floatPrice = Math.sqrt(price) * 2 ** 64;
    let scale = 0;
  
    const PRECISION_BITS = 16;
    while (floatPrice > Number.MAX_SAFE_INTEGER) {
      floatPrice = floatPrice / 2 ** PRECISION_BITS;
      scale = scale + PRECISION_BITS;
    }
  
    const pinPrice = Math.round(floatPrice);
    const bnSeed = BigNumber.from(pinPrice);
  
    return bnSeed.mul(BigNumber.from(2).pow(scale));
  }


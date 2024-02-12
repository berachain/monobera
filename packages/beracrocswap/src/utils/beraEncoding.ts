import { BigNumber } from "ethers"
import { PoolInitEncoder } from "../encoding/init"
import { BeraSdkResponse } from "../types"
import { fromDisplayPrice } from "./price"
import { AddressZero } from '@ethersproject/constants';
// import { beraTokenAddress } from "@bera/config";

interface IToken {
    decimals: number
    address: string
}


function sortBaseQuoteViews (base: IToken, quote: IToken): 
  [IToken, IToken] {
  // if(base.address.toLowerCase() === AddressZero.toLowerCase() && beraTokenAddress.toLowerCase() > quote.address.toLowerCase()) {
  //   return [quote, base]
  // }
  // if(quote.address.toLowerCase() === AddressZero.toLowerCase() && beraTokenAddress.toLowerCase() < base.address.toLowerCase()) { 
  //   return [quote, base]
  // }
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




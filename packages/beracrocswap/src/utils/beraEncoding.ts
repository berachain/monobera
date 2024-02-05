import { BigNumber } from "ethers"
import { PoolInitEncoder } from "../encoding/init"
import { BeraSdkResponse } from "../types"
import { fromDisplayPrice } from "./price"
import { AddressZero } from '@ethersproject/constants';

interface IToken {
    decimals: number
    address: string
}

export const initPool = (initPrice: number, baseToken: IToken, quoteToken: IToken, poolIndex: number): BeraSdkResponse => {
    // Very small amount of ETH in economic terms but more than sufficient for min init burn
    const ETH_INIT_BURN = BigNumber.from(10).pow(12)
    
    const encoder = new PoolInitEncoder(baseToken.address, quoteToken.address, poolIndex)
    const spotPrice = fromDisplayPrice(initPrice, baseToken.decimals,quoteToken.decimals, false)
    const calldata = encoder.encodeInitialize(spotPrice)        

    return {
        calldata, 
        value: baseToken.address === AddressZero ? ETH_INIT_BURN.toString() : undefined
    }
}

//limits is based on price & slippage




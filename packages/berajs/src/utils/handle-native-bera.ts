import { beraTokenAddress, nativeTokenAddress } from "@bera/config";
import { getAddress, isAddress } from "viem";

export const handleNativeBera = (tokenAddress: any) => {
  if (!isAddress(tokenAddress)) {
    return tokenAddress;
  }
  if (getAddress(tokenAddress) === getAddress(nativeTokenAddress)) {
    return getAddress(beraTokenAddress);
  }
  return getAddress(tokenAddress);
};

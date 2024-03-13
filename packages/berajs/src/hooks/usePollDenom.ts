import { erc20ModuleAddress } from "@bera/config";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { ERC20_MODULE_ABI } from "~/config/abi";

export const usePollDenom = () => {
  const publicClient = usePublicClient();
  const getDenom = async (address: Address) => {
    if (!publicClient) return undefined;
    try {
      await publicClient.readContract({
        address: erc20ModuleAddress,
        abi: ERC20_MODULE_ABI,
        functionName: "transferERC20ToCoin",
        args: [address, 0],
      });
      return await publicClient.readContract({
        address: erc20ModuleAddress,
        abi: ERC20_MODULE_ABI,
        functionName: "coinDenomForERC20Address",
        args: [address],
      });
    } catch (e) {
      console.log("error", e);
      return null;
    }
  };
  const getAddress = async (denom: string) => {
    if (!publicClient) return undefined;
    try {
      return await publicClient.readContract({
        address: erc20ModuleAddress,
        abi: ERC20_MODULE_ABI,
        functionName: "erc20AddressForCoinDenom",
        args: [denom],
      });
    } catch (e) {
      console.log("error", e);
      return null;
    }
  };
  return {
    getDenom,
    getAddress,
  };
};

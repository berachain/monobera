import { honeyRouterAddress, multicallAddress } from "@bera/config";
import BigNumber from "bignumber.js";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, getAddress, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { honeyRouterAbi } from "~/abi";

interface CollateralRates {
  mintFee: number;
  redeemFee: number;
}

export const usePollHoneyParams = (collateralList: Address[]) => {
  const publicClient = usePublicClient();
  const method = "usePollHoneyParams";
  const QUERY_KEY = [method, ...collateralList];

  const swrResponse = useSWR(QUERY_KEY, async () => {
    if (!publicClient) return undefined;
    const calls: any[] = [];
    collateralList.forEach((collateral: Address) => {
      calls.push({
        address: honeyRouterAddress,
        abi: honeyRouterAbi,
        functionName: "getMintRate",
        args: [collateral],
      });
      calls.push({
        address: honeyRouterAddress,
        abi: honeyRouterAbi,
        functionName: "getRedeemRate",
        args: [collateral],
      });
    });

    const results = await publicClient.multicall({
      contracts: calls,
      multicallAddress: multicallAddress,
    });
    const obj: Record<Address, CollateralRates> = {};
    results.map((result: any, index: number) => {
      const collateral = collateralList[Math.floor(index / 2)] as Address;
      if (!obj[collateral]) obj[collateral] = { mintFee: 0, redeemFee: 0 };
      if (index % 2 === 0) {
        if (result.status === "success") {
          obj[collateral]!.mintFee = BigNumber(1)
            .minus(BigNumber(formatUnits(result.result, 18)))
            .toNumber();
        }
      } else {
        if (result.status === "success") {
          obj[collateral]!.redeemFee = BigNumber(1)
            .minus(BigNumber(formatUnits(result.result, 18)))
            .toNumber();
        }
      }
    });
    return obj;
  });

  const useHoneyParams = (collateral: Address | undefined) => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (!data || !collateral) return undefined;
    return data[getAddress(collateral)];
  };

  return {
    ...swrResponse,
    useHoneyParams,
  };
};

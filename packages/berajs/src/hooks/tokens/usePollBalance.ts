import {
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
  nativeTokenAddress,
} from "@bera/config";
import useSWR from "swr";
import { Address, erc20Abi, formatEther, formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";
import { DefaultHookReturnType } from "~/types";
import { BalanceToken } from "~/types/dex";
import { useBeraJs } from "../../contexts";
import { useTokenInformation } from "./useTokenInformation";

export const usePollBalance = ({
  address,
  owner,
}: {
  address: string | undefined;
  owner?: Address | undefined;
}): Omit<DefaultHookReturnType<BalanceToken | undefined>, "mutate"> & {
  /**
   *
   * @deprecated you can use data instead
   */
  useBalance: () => BalanceToken | undefined;
} => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const assetOwner = owner ?? account;

  const QUERY_KEY =
    publicClient && assetOwner ? [assetOwner, address, "balance"] : null;
  const { data: tokenInformation, isLoading: isLoadingTokenInformation } =
    useTokenInformation({ address });

  const isNativeToken = address === nativeTokenAddress;

  const { isLoading, data, error, ...rest } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (assetOwner && address) {
        if (address !== nativeTokenAddress) {
          return await publicClient.readContract({
            address: address as `0x${string}`,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [assetOwner!],
          });
        }
        return await publicClient.getBalance({
          address: assetOwner!,
        });
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const formattedBalance =
    !error && data
      ? address === nativeTokenAddress
        ? formatEther(data as bigint)
        : tokenInformation && !isLoadingTokenInformation
          ? formatUnits(data, tokenInformation.decimals)
          : undefined
      : undefined;

  const tokenBalance = {
    balance: data ?? 0n,
    formattedBalance: formattedBalance ?? "0",
    address: address as `0x${string}`,
    decimals: isNativeToken
      ? gasTokenDecimals
      : tokenInformation?.decimals ?? 0,
    symbol: isNativeToken ? gasTokenSymbol : tokenInformation?.symbol ?? "",
    name: isNativeToken ? gasTokenName : tokenInformation?.name ?? "",
  } satisfies BalanceToken;

  const useBalance = () => {
    return tokenBalance;
  };

  return {
    ...rest,
    refresh: () => {
      rest.mutate();
    },
    isLoading: isLoading || isNativeToken ? isLoadingTokenInformation : false,
    error: error || !isNativeToken ? error : undefined,
    data: tokenBalance,
    useBalance,
  };
};

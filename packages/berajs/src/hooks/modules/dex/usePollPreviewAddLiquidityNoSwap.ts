import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { parseUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollPreviewAddLiquidityNoSwap = (
  poolAddress: `0x${string}`,
  assets: Token[],
  amounts: number[],
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getPreviewAddLiquidityNoSwap";
  const addresses = assets.map((asset: Token) => asset.address);
  const formattedAmounts = amounts.map((amount: number, i) =>
    parseUnits(`${amount}`, assets[i]?.decimals ?? 18),
  );
  const QUERY_KEY = [poolAddress, ...addresses, ...formattedAmounts, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.erc20DexAddress as Address,
        abi: DEX_PRECOMPILE_ABI,
        functionName: method,
        args: [poolAddress, addresses, formattedAmounts],
      });

      return result;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const usePreviewAddLiquidityNoSwap = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePreviewAddLiquidityNoSwap,
  };
};
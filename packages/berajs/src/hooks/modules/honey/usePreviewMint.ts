import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, parseUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { HONEY_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

// this is going to be slow for now until we have event indexing
export const usePollPreviewMint = (
  collateral: Token | undefined,
  amount: number,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "previewMint";
  const QUERY_KEY = [method, collateral, amount];
  console.log("QUERY_KEY", QUERY_KEY)
  useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (collateral === undefined || amount === 0) return undefined;
        console.log('REEEEEe')
        const formattedAmount = parseUnits(
          `${amount}`,
          collateral.decimals ?? 18,
        );
        const result = await publicClient.readContract({
          address: networkConfig.precompileAddresses
            .erc20HoneyAddress as Address,
          abi: HONEY_PRECOMPILE_ABI,
          functionName: method,
          args: [collateral.address, formattedAmount],
        });
        return result;
      } catch (e) {
        console.log("error", e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.FAST, // make it rlly slow TODO CHANGE
    },
  );

  const usePreviewMint = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data ? Number(formatUnits(data, collateral?.decimals ?? 18)) : 0;
  };
  return {
    usePreviewMint,
  };
};

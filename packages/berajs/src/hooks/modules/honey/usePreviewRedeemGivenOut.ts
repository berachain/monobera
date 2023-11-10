import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, parseUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { HONEY_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";
import { laggy } from "~/hooks/laggy";

// this is going to be slow for now until we have event indexing
export const usePollPreviewRedeemGivenOut = (
  collateral: Token | undefined,
  amount: `${number}`,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "previewExactOutCollateral";
  const QUERY_KEY = [method, collateral, amount];
  useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (collateral === undefined || Number(amount) === 0) return undefined;
        const formattedAmount = parseUnits(
          `${amount}`,
          collateral.decimals ?? 18,
        );
        const result = await publicClient.readContract({
          address: networkConfig.precompileAddresses
            .erc20HoneyAddress as Address,
          abi: HONEY_PRECOMPILE_ABI,
          functionName: method,
          args: [formattedAmount, collateral.address],
        });
        return formatUnits(result as bigint, collateral.decimals ?? 18);
      } catch (e) {
        console.log("error", e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.FAST, // make it rlly slow TODO CHANGE
      use: [laggy],
    },
  );

  const usePreviewRedeemGivenOut = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePreviewRedeemGivenOut,
  };
};

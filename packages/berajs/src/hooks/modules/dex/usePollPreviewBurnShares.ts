import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { isAddress, parseUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

interface DataItem {
  address: string;
  output: bigint;
}

function convertToRecord(
  data: DataItem[] | undefined,
): Record<string, bigint> | undefined {
  if (!data) return undefined;
  const record: Record<string, bigint> = {};
  data.forEach((item) => {
    record[item.address] = item.output;
  });
  return record;
}
export const usePollPreviewBurnShares = (
  amount: bigint,
  poolAddress?: string | undefined,
  shareAddress?: string | undefined,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getPreviewBurnShares";
  const QUERY_KEY = [poolAddress, shareAddress, amount, method];
  console.log("QUERY_KEY", QUERY_KEY);
  useSWR(
    QUERY_KEY,
    async () => {
      if (!poolAddress || !shareAddress || !isAddress(shareAddress))
        return undefined;
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.erc20DexAddress as Address,
        abi: DEX_PRECOMPILE_ABI,
        functionName: method,
        args: [poolAddress, shareAddress, amount],
      });

      const preview = (result as any[][])[0]?.map((r, i) => {
        return {
          address: r,
          output: (result as any[][])[1]?.[i],
        };
      });

      return convertToRecord(preview);
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const usePreviewBurnShares = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePreviewBurnShares,
  };
};

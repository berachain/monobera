import { bgtTokenAddress } from "@bera/config";
import useSWR from "swr";
import { usePublicClient } from "wagmi";

import { GetBGTInfo, getBGTInfo } from "~/actions/bgt/getBGTInfo";
import { getTokenTotalSupply } from "~/actions/bgt/getTokenTotalSupply";
import { DefaultHookOptions, DefaultHookReturnType, useBeraJs } from "../../..";
import { formatEther } from "viem";

interface GlobalData {
  bgtInfo: GetBGTInfo | undefined;
  bgtTotalSupply: string | undefined;
}
export interface IUsePollGlobalDataResponse
  extends DefaultHookReturnType<GlobalData> {}

export const usePollGlobalData = (
  options?: DefaultHookOptions,
): IUsePollGlobalDataResponse => {
  const publicClient = usePublicClient();
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = "usePollGlobalData";
  const swrResponse = useSWR<GlobalData, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      const bgtInfo = await getBGTInfo(config);
      const bgtTotalSupply = await getTokenTotalSupply({
        token: bgtTokenAddress,
        publicClient,
      });
      return { bgtInfo, bgtTotalSupply: formatEther(bgtTotalSupply ?? 0n) };
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: swrResponse.mutate,
  };
};

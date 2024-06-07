import { bgtTokenAddress } from "@bera/config";
import useSWR from "swr";
import { usePublicClient } from "wagmi";

import { GlobalInfo, getBGTGlobalInfo } from "~/actions/bgt/getBGTGlobalInfo";
import { getTokenTotalSupply } from "~/actions/bgt/getTokenTotalSupply";
import { DefaultHookOptions, DefaultHookReturnType, useBeraJs } from "../../..";

interface GlobalData extends GlobalInfo {
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
      const [globalData, bgtTotalSupply] = await Promise.all([
        getBGTGlobalInfo(config),
        getTokenTotalSupply({
          token: bgtTokenAddress,
          publicClient,
        }),
      ]);
      return {
        bgtTotalSupply,
        ...globalData,
      } as any;
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

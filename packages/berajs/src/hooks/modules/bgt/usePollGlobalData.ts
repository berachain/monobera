import useSWR from "swr";

import { GetBGTInfo, getBGTInfo } from "~/actions/bgt/getBGTInfo";
import { DefaultHookOptions, DefaultHookReturnType, useBeraJs } from "../../..";

interface GlobalData {
  bgtInfo: GetBGTInfo | undefined;
}
export interface IUsePollGlobalDataResponse
  extends DefaultHookReturnType<GlobalData> {}

export const usePollGlobalData = (
  options?: DefaultHookOptions,
): IUsePollGlobalDataResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = "usePollGlobalData";
  const swrResponse = useSWR<GlobalData, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      const bgtInfo = await getBGTInfo(config);
      return { bgtInfo };
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

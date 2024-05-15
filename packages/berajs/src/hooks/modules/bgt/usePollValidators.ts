import useSWR, { mutate } from "swr";

import { getValidators } from "~/actions/bgt/getValidators";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType, Validator } from "~/types";

export const usePollValidators = (
  page?: number,
  options?: DefaultHookOptions,
): DefaultHookReturnType<Validator[]> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePoolRecentProvisions", page ?? 0];
  const swrResponse = useSWR<Validator[], any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getValidators(page ?? 0),
    {
      ...options?.opts,
    },
  );

  return { ...swrResponse, refresh: () => mutate(QUERY_KEY) };
};

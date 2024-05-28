import useSWR, { mutate } from "swr";

import { ValidatorFilter, getValidators } from "~/actions/bgt/getValidators";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType, Validator } from "~/types";

export interface UsePollValidatorsResponse
  extends DefaultHookReturnType<Validator[]> {}

export const usePollValidators = (
  filter?: ValidatorFilter,
  options?: DefaultHookOptions,
): UsePollValidatorsResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePoolRecentProvisions", filter];
  const swrResponse = useSWR<Validator[], any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getValidators(filter),
    {
      ...options?.opts,
    },
  );

  return { ...swrResponse, refresh: () => mutate(QUERY_KEY) };
};

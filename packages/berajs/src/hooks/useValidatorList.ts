import useSWRImmutable from "swr/immutable";
import { DefaultHookOptions, DefaultHookReturnType, useBeraJs } from "..";
import {
  getValidators,
  GetValidators,
} from "../actions/shared/getValidatorList";

export interface IUseValidators extends DefaultHookReturnType<GetValidators> {}

export const useValidatorList = (
  options?: DefaultHookOptions,
): IUseValidators => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;

  const swrResponse = useSWRImmutable<GetValidators>(
    ["defaultValidatorList", config],
    async () => {
      return getValidators({ config });
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};

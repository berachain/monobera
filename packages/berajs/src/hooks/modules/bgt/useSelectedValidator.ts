import { bgtEndpointUrl } from "@bera/config";
import useSWR, { mutate } from "swr";
import { Address } from "viem";
import { DefaultHookOptions, DefaultHookReturnType, Validator } from "~/types";

export interface UsePollValidatorInfoResponse
  extends DefaultHookReturnType<Validator | undefined> {}

export const useSelectedValidator = (
  id: Address,
  options?: DefaultHookOptions,
): UsePollValidatorInfoResponse => {
  const QUERY_KEY = ["useSelectedValidator", id];
  const swrResponse = useSWR<Validator | undefined, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      if (!id) return undefined;
      const url = `${bgtEndpointUrl}/validators/${id}`;
      const validatorList = await fetch(url);
      const temp = await validatorList.json();
      return temp.validator;
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: () => mutate(QUERY_KEY),
  };
};

import { bgtEndpointUrl } from "@bera/config";
import useSWR, { mutate } from "swr";
import { Address } from "viem";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  Gauge,
  Validator,
} from "~/types";

export interface UsePollValidatorInfoResponse
  extends DefaultHookReturnType<Validator[] | undefined> {}

export const useSelectedGaugeValidators = (
  id: Address,
  options?: DefaultHookOptions,
): UsePollValidatorInfoResponse => {
  const QUERY_KEY = ["useSelectedGaugeValidators", id];
  const swrResponse = useSWR<Validator[] | undefined, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      if (!id) return undefined;
      const url = `${bgtEndpointUrl}/validators?vaultId=${id}`;
      const gauge = await fetch(url);
      const temp = await gauge.json();
      return temp.validators;
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

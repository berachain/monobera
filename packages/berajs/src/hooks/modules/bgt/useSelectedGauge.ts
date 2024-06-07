import useSWR, { mutate } from "swr";
import { Address } from "viem";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  Gauge,
  Validator,
} from "~/types";

export interface UsePollValidatorInfoResponse
  extends DefaultHookReturnType<Gauge | undefined> {}

export const useSelectedGauge = (
  id: Address,
  options?: DefaultHookOptions,
): UsePollValidatorInfoResponse => {
  const QUERY_KEY = ["useSelectedValidator", id];
  const swrResponse = useSWR<Gauge | undefined, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      if (!id) return undefined;
      const url = `http://localhost:3001/berachain/v1alpha1/beacon/vaults/${id}`;
      const gauge = await fetch(url);
      const temp = await gauge.json();
      return temp.vault;
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

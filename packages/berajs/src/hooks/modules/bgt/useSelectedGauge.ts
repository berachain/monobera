import { bgtEndpointUrl } from "@bera/config";
import useSWR, { mutate } from "swr";
import { Address, isAddress } from "viem";
import { getGauge } from "~/actions";
import { DefaultHookOptions, DefaultHookReturnType, Gauge } from "~/types";

export interface UsePollValidatorInfoResponse
  extends DefaultHookReturnType<Gauge | null> {}

export const useSelectedGauge = (
  id: Address,
  options?: DefaultHookOptions,
): UsePollValidatorInfoResponse => {
  const QUERY_KEY = ["useSelectedValidator", id];
  const swrResponse = useSWR<Gauge | null, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      if (!id || !isAddress(id)) throw new Error("Invalid address");
      return getGauge(id);
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

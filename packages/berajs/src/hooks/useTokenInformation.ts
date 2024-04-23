import useSWRImmutable from "swr/immutable";
import { Address, isAddress } from "viem";
import { usePublicClient } from "wagmi";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  Token,
  getTokenInformation,
  useBeraJs,
} from "..";

export type UseTokenInformationResponse = DefaultHookReturnType<
  Token | undefined
>;

export type useTokenInformationArgs = {
  address: Address | undefined;
};
export const useTokenInformation = (
  args: useTokenInformationArgs,
  options?: DefaultHookOptions,
): UseTokenInformationResponse => {
  const publicClient = usePublicClient();
  const { config: beraConfig } = useBeraJs();
  const QUERY_KEY = [args?.address, publicClient];
  const swrResponse = useSWRImmutable<Token | undefined>(
    QUERY_KEY,
    async () => {
      if (!args?.address) return undefined;
      if (!isAddress(args.address, { strict: false })) {
        throw new Error("Invalid address");
      }
      return await getTokenInformation({
        address: args.address,
        config: options?.beraConfigOverride ?? beraConfig,
        publicClient,
      });
    },
    { ...options?.opts },
  );

  return {
    ...swrResponse,
    refetch: () => swrResponse?.mutate?.(),
  };
};

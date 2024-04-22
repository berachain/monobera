import { Address, isAddress } from "viem";
import {
  DefaultHookProps,
  DefaultHookReturnType,
  Token,
  getTokenInformation,
} from "..";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

export type UseTokenInformationRequest = DefaultHookProps<
  {
    address: Address | undefined;
  },
  false
>;

export type UseTokenInformationResponse = DefaultHookReturnType<
  Token | undefined
>;

const useTokenInformation = ({
  args,
  config,
  opts,
}: UseTokenInformationRequest): UseTokenInformationResponse => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [args?.address, config, publicClient];
  const swrResponse = useSWRImmutable<Token | undefined>(
    QUERY_KEY,
    async () => {
      if (!args?.address) return undefined;
      if (!isAddress(args.address, { strict: false })) {
        throw new Error("Invalid address");
      }
      return await getTokenInformation({
        address: args.address,
        config,
        publicClient,
      });
    },
    { ...opts },
  );

  return {
    ...swrResponse,
  };
};

export default useTokenInformation;

import { Address, getAddress, http, isAddress } from "viem";
import {
  DefaultHookProps,
  DefaultHookReturnType,
  Token,
  getTokenInformation,
} from "..";
import useSWRImmutable from "swr/immutable";
import { createConfig, useChains } from "wagmi";

export type UseTokenInformation = DefaultHookProps<
  {
    address: Address | undefined;
  },
  false
>;

const useTokenInformation = ({
  args,
  config,
  opts,
}: UseTokenInformation): DefaultHookReturnType<Token | undefined> => {
  const chains = useChains();
  const wagmiConfig = createConfig({
    chains: [chains[0]],
    transports: {
      [chains[0].id]: http(),
    },
  });
  const QUERY_KEY = [args?.address, config];
  const swrResponse = useSWRImmutable<Token | undefined>(
    QUERY_KEY,
    async () => {
      console.log("args", args);
      if (!args?.address) return undefined;
      if (!isAddress(args.address, { strict: false })) {
        throw new Error("Invalid address");
      }
      return await getTokenInformation({
        address: args.address,
        config,
        wagmiConfig,
      });
    },
    { ...opts },
  );

  return {
    ...swrResponse,
  };
};

export default useTokenInformation;

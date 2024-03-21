import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

interface Call {
  abi: any;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export interface IBHoneyEpoch {
  currentEpoch: number;
  currentEpochStart: number;
  currentEpochEnd: number;
}

export const usePollBHoneyEpochs = () => {
  const publicClient = usePublicClient();
  const method = "epochs";
  const QUERY_KEY = ["bhoney", method];
  const { networkConfig } = useBeraConfig();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const call: Call[] = [
          {
            abi: BTOKEN_ABI,
            address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
            functionName: "currentEpoch",
            args: [],
          },
          {
            abi: BTOKEN_ABI,
            address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
            functionName: "currentEpochStart",
            args: [],
          },
          {
            abi: BTOKEN_ABI,
            address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
            functionName: "currentEpochEnd",
            args: [],
          },
        ];
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: networkConfig.precompileAddresses
            .multicallAddress as Address,
        });

        const currentEpoch = Number((result[0] as any).result);
        const currentEpochStart = Number((result[1] as any).result);
        const currentEpochEnd = Number((result[2] as any).result);

        const epochs = {
          currentEpoch,
          currentEpochStart,
          currentEpochEnd: currentEpochEnd,
        };

        return epochs;
      } catch (e) {
        console.error(e);
        return {
          currentEpoch: 0,
          currentEpochStart: 0,
          currentEpochEnd: 0,
        };
      }
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useBHoneyEpoch = () => {
    const { data = undefined } = useSWRImmutable<IBHoneyEpoch | undefined>(
      QUERY_KEY,
    );
    return data;
  };

  return {
    useBHoneyEpoch,
    QUERY_KEY,
    isLoading,
  };
};

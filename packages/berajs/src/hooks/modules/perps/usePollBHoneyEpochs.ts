import { gTokenContractAddress, multicallAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/enum";
import POLLING from "~/enum/polling";

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
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const call: Call[] = [
          {
            abi: BTOKEN_ABI,
            address: gTokenContractAddress,
            functionName: "currentEpoch",
            args: [],
          },
          {
            abi: BTOKEN_ABI,
            address: gTokenContractAddress,
            functionName: "currentEpochStart",
            args: [],
          },
          {
            abi: BTOKEN_ABI,
            address: gTokenContractAddress,
            functionName: "currentEpochEnd",
            args: [],
          },
        ];
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: multicallAddress,
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

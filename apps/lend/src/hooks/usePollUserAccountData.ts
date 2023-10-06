import { useBeraJs } from "@bera/berajs";
import { lendPoolImplementationAddress, multicallAddress } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
// import { formatUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { lendPoolImplementationABI } from "./abi";

interface Call {
  abi: typeof lendPoolImplementationABI;
  address: Address;
  functionName: string;
  args: any[];
}
const REFRESH_BLOCK_INTERVAL = 2000;

export const usePollUserAccountData = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account, error } = useBeraJs();
  // const { networkConfig } = useBeraConfig();

  const QUERY_KEY = [account, "getUserAccountData"];
  useSWR(
    QUERY_KEY,
    async () => {
      if (account && !error) {
        const call: Call[] = [
          {
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "getUserAccountData",
            args: [account],
          },
        ];
        const result = await publicClient.multicall({
          //@ts-ignore
          contracts: call,
          multicallAddress: multicallAddress,
        });
        if (result[0]?.status === "success") {
          return {
            totalCollateralBase: (result[0].result as any[])[0],
            totalDebtBase: (result[0].result as any[])[1],
            availableBorrowsBase: (result[0].result as any[])[2],
            currentLiquidationThreshold: (result[0].result as any[])[3],
            ltv: (result[0].result as any[])[4],
            healthFactor: (result[0].result as any[])[5],
          };
        } else {
          return undefined;
        }
      } else return undefined;
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    },
  );

  const useUserAccountData = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  return {
    refetch: ()=>void mutate(QUERY_KEY),
    useUserAccountData,
  };
};

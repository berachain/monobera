import { lendPoolImplementationAddress } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { LEND_POOL_IMPLEMENTATION_ABI } from "~/abi";
import POLLING from "~/enum/polling";
import { useBeraJs } from "~/contexts";

const REFRESH_BLOCK_INTERVAL = POLLING.FAST;

export const usePollUserAccountData = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account } = useBeraJs();

  const QUERY_KEY = [account, "getUserAccountData"];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (account) {
        try {
          const result = await publicClient.readContract({
            address: lendPoolImplementationAddress,
            abi: LEND_POOL_IMPLEMENTATION_ABI,
            functionName: "getUserAccountData",
            args: [account],
          });

          // Here we assert that result is of type any[] with at least six elements.
          const [
            totalCollateralBase,
            totalDebtBase,
            availableBorrowsBase,
            currentLiquidationThreshold,
            ltv,
            healthFactor,
          ] = result as [any, any, any, any, any, any];

          return {
            totalCollateralBase,
            totalDebtBase,
            availableBorrowsBase,
            currentLiquidationThreshold,
            ltv,
            healthFactor,
          };
        } catch (e) {
          console.log(e);
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
    refetch: () => void mutate(QUERY_KEY),
    useUserAccountData,
  };
};

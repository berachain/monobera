import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { lendPoolImplementationABI } from "~/config";
import { useBeraJs } from "~/contexts";
import { DefaultHookTypes } from "~/types";

export interface UserAccountData {
  totalCollateralBase: bigint;
  totalDebtBase: bigint;
  availableBorrowsBase: bigint;
  currentLiquidationThreshold: bigint;
  ltv: bigint;
  healthFactor: bigint;
}

export const usePollUserAccountData = ({ config, opts }: DefaultHookTypes) => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account } = useBeraJs();

  const QUERY_KEY = [account, "getUserAccountData"];
  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!config.contracts?.lendPoolProxyAddress) return undefined;
      if (account) {
        try {
          const result = await publicClient.readContract({
            address: config.contracts.lendPoolProxyAddress,
            abi: lendPoolImplementationABI,
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
          ] = result as [bigint, bigint, bigint, bigint, bigint, bigint];

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
      ...opts,
    },
  );

  const useUserAccountData = (): UserAccountData | undefined => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    isValidating,
    refetch: () => void mutate(QUERY_KEY),
    useUserAccountData,
  };
};

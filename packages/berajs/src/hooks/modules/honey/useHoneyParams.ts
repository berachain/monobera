import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { HONEY_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

// this is going to be slow for now until we have event indexing
export const usePollHoneyParams = () => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getExchangable";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = (await publicClient.readContract({
        address: networkConfig.precompileAddresses.erc20HoneyAddress as Address,
        abi: HONEY_PRECOMPILE_ABI,
        functionName: method,
        args: [],
      })) as any[];

      console.log(result);
      return result;
    },
    {
      refreshInterval: POLLING.SLOW, // make it rlly slow TODO CHANGE
    },
  );

  const useHoneyParams = (collateral: Address | undefined) => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (!data || !collateral) return undefined;
    const honeyParams = data.find((p: any) => {
      return p.collateral === collateral;
    });
    if (!honeyParams) return undefined;
    const mintRate = formatUnits(honeyParams.mintRate, 36);
    const redeemRate = formatUnits(honeyParams.redemptionRate, 36);
    const mintFee = 1 - Number(mintRate);
    const redeemFee = 1 - Number(redeemRate);
    return {
      mintRate,
      redeemRate,
      mintFee,
      redeemFee,
      enabled: honeyParams.enabled,
    };
  };
  return {
    useHoneyParams,
  };
};

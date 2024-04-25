import useSWRImmutable from "swr/immutable";
import { getAddress, type Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  CollateralRates,
  CollateralRatesMap,
  getCollateralRates,
} from "~/actions/honey";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export interface UseCollateralsRatesResponse
  extends DefaultHookReturnType<CollateralRatesMap | undefined> {
    getCollateralRate: (collateral: string) => CollateralRates | undefined;
}

export const useCollateralsRates = ({
  args: { collateralList },
  options,
}: {
  args: { collateralList: Address[] };
  options?: DefaultHookOptions;
}): UseCollateralsRatesResponse => {
  const publicClient = usePublicClient();
  const method = "useCollateralsRates";
  const QUERY_KEY = [method, ...collateralList];
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;

  const swrResponse = useSWRImmutable(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config) throw new Error("missing beraConfig");
      if (!config.contracts?.honeyRouterAddress)
        throw new Error("missing contract address honeyRouterAddress");
      if (!config.contracts?.multicallAddress)
        throw new Error("missing contract address multicallAddress");
      return await getCollateralRates({
        client: publicClient,
        config,
        collateralList,
      });
    },
    { ...options?.opts },
  );

  const getCollateralRate = (
    collateral: string,
  ): CollateralRates | undefined => swrResponse.data?.[getAddress(collateral)];

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
    getCollateralRate,
  };
};
